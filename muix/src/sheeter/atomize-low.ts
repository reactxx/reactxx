import warning from 'warning'
import { isObject } from './utils/deep-merge'
import { wrapPseudoPrefixes } from './utils/wrap-pseudo-prefixes'
import { TSheeter, TVariants, TAtomize } from 'reactxx-typings'
import { atomizeVariants } from './conditions'

// platform dependent import
import { platform } from 'reactxx-sheeter'

// processes: 
// - atomizedRuleset or atomicArray
// - [...{}, {$web: PART, ...], $native:PART, ...], 
//   where PART is PARTITEM | [PARTITEM, ...]
//   where PARTITEM atomizedRuleset or atomicArray or {}
// returns:
// - fill list with parts
export const adjustAtomized = (
    list: TAtomize.Variants, ruleset: TAtomize.Source,
    path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions,
) => {
    const linear = linearize$web$native(ruleset)
    atomizedToList(linear, list, path, pseudoPrefixes, conditions)
}

// processed:
// - variants
// - pseudo
const processVariantsPseudos = (
    list: TAtomize.Variants,
    ruleset: TAtomize.ToAtomize,
    path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions,
    isInPseudo?: boolean
) => {

    const variantList: TAtomize.Variants = []
    // process variant part of ruleset: $widths, $switch etc.
    atomizeVariants(variantList, ruleset as any, path, pseudoPrefixes, conditions)

    // parse pseudo rules (:hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TAtomize.ToAtomize
        if (!value || p.charAt(0) === '$' || typeof value !== 'object') continue
        if (isAtomized(value))
            warning(false, 'Web pseudo properties cannot contain atomized value')
        else if (isToAtomizeArray(value))
            warning(false, 'Web pseudo properties cannot contain array of rulesets')
        else
            processVariantsPseudos(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, true)
    }

    // push to ruleset list (dont push when in pseudo definition)
    if (!isInPseudo) atomizeNonVariantPart(list, wrapPseudoPrefixes(ruleset, pseudoPrefixes), conditions, path)

    if (variantList.length > 0)
        Array.prototype.push.apply(list, variantList)
}

//*********************************************************
//  PRIVATE
//*********************************************************

const pushToList = (list: TAtomize.Variants, variant: TAtomize.Variant, conditions: TVariants.Conditions) => {
    if (!variant) return
    list.push(variant)
    if (conditions && conditions.length > 0) variant.conditions = conditions
}

const atomizeNonVariantPart = (
    list: TAtomize.Variants, sourceRuleset: TSheeter.Ruleset,
    conditions: TVariants.Conditions, path: string
) => {
    if (!sourceRuleset) return
    const variant = platform.toPlatformAtomizeRuleset(sourceRuleset, path)
    pushToList(list, variant, conditions)
}

export function isToAtomizeArray(obj): obj is TAtomize.ItemArray { return obj && !obj.type && Array.isArray(obj) }
export function isToAtomize(obj): obj is TAtomize.ToAtomize { return obj && !obj.type && !Array.isArray(obj) }
export function isAtomized(obj): obj is TAtomize.Ruleset { return !obj || obj.type }
//export function isQueried(obj): obj is TAtomize.ToAtomize { return !obj || obj.type === 'q' }
//export function isQueriedVarint(obj): obj is TAtomize.Variant { return !obj || !obj.conditions }
//export function toQueryVarint(obj): obj is TAtomize.Variant { return obj && obj.conditions && obj.conditions.length > 0 }

const linearize$web$native = (ruleset: TAtomize.Source) => {

    const parts: [string, TAtomize.Item][] = []

    const addParts = (r: TAtomize.Item, idxPrefix: string) => {
        if (!r) return
        parts.push([idxPrefix, r])
        if (!isToAtomize(r)) return
        const { $web, $native } = r
        if (window.isWeb && $web) {
            if (isToAtomizeArray($web))
                $web.forEach((r, idx) => parts.push([`${idxPrefix}/$web[${idx}]`, r] as any))
            else
                parts.push([idxPrefix + '/$web', $web] as any)
        } else if (!window.isWeb && $native) {
            if (isToAtomizeArray($native))
                $native.forEach((r, idx) => parts.push([`${idxPrefix}/$native[${idx}]`, r] as any))
            else
                parts.push([idxPrefix + '/$native', $native] as any)
        }
        if ($web) delete r.$web
        if ($native) delete r.$native
    }

    if (isToAtomizeArray(ruleset))
        ruleset.forEach((r, idx) => addParts(r, `[${idx}]`))
    else
        addParts(ruleset, '') // atomicArray or atomicRuleset

    return parts
}

const atomizedToList = (
    parts: [string, TAtomize.Item][],
    list: TAtomize.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions,
) => {
    parts.forEach(part => {
        const item = part[1]
        if (isAtomized(item)) {
            warning(!pseudoPrefixes || pseudoPrefixes.length === 0, 'Incorrect behavior')
            item.forEach(it => {
                if (!conditions || conditions.length === 0)
                    pushToList(list, it, null)
                else {
                    pushToList(list, { ...it },
                        it.conditions ? [...conditions, ...it.conditions] : conditions)
                }
            })
        } else
            processVariantsPseudos(
                list, item,
                `${path}${part[0]}`,
                pseudoPrefixes, conditions
            )

    })
}