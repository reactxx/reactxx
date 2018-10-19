import warning from 'warning'
import { isObject } from './utils/deep-merge'
import { wrapPseudoPrefixes } from './utils/wrap-pseudo-prefixes'
import { TAtomize, TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { atomizeVariants } from './variants'
import { isAtomicArray, isAtomizedRuleset } from './atomize'

// platform dependent import
import { platform } from 'reactxx-sheeter'

// processes: 
// - atomizedRuleset or atomicArray
// - [...{}, {$web: PART, ...], $native:PART, ...], 
//   where PART is PARTITEM | [PARTITEM, ...]
//   where PARTITEM atomizedRuleset or atomicArray or {}
// returns:
// - Atomized Ruleset with parts
export const atomizeRulesetLow = (ruleset: TSheeter.RulesetOrAtomized, rulesetName: string) => {

    if (!ruleset) return null

    const name = rulesetName || ruleset['name'] || '.'

    const parts = toParts(ruleset)

    const list = toList(parts, name)

    return list.length === 0 ? null : {
        name,
        list,
        [TAtomize.TypedInterfaceTypes.prop]: TAtomize.TypedInterfaceTypes.atomizedRuleset
    } as TAtomize.AtomizedRuleset
}

// processed:
// - variants
// - pseudo
export const atomizeRulesetInner = (list: TAtomize.Variants,
    ruleset: TVariants.VariantPart,
    path: string,
    pseudoPrefixes: string[],
    conditions: TVariants.Conditions,
    rulesetToQueue?: TVariants.VariantPart
) => {

    // push to ruleset list
    //if (rulesetToQueue) pushToList(list, rulesetToQueue, conditions, path)
    if (rulesetToQueue) pushToList(list, wrapPseudoPrefixes(ruleset, pseudoPrefixes), conditions, path)

    // process variant part of ruleset: $transition, $switch etc.
    atomizeVariants(list, ruleset, path, pseudoPrefixes, conditions)

    // parse pseudo rules (:hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TSheeter.Ruleset
        if (p.charAt(0) === '$') continue
        if (isObject(value))
            atomizeRulesetInner(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
        warning(!Array.isArray(value), 'Web pseudo properties cannot contain array')
    }

}

//*********************************************************
//  PRIVATE
//*********************************************************

const pushToList = (
    list: TAtomize.Variants, ruleset: TSheeter.Ruleset,
    conditions: TVariants.Conditions, path: string
) => {
    if (!ruleset) return
    const atomicArray = platform.toPlatformAtomizeRuleset(ruleset, path)
    if (!atomicArray) return
    list.push(conditions.length > 0 ? { atomicArray, conditions } : { atomicArray })
}

const toParts = (ruleset: TSheeter.RulesetOrAtomized) => {
    const parts: [string, TSheeter.RulesetItem][] = []

    const addParts = (r: TSheeter.RulesetItem, idxPrefix: string) => {
        if (!r) return
        parts.push([idxPrefix, r])
        const { $web, $native } = r as TSheeter.Ruleset
        if (window.isWeb && $web) {
            if (!isAtomicArray($web) && Array.isArray($web))
                $web.forEach((r, idx) => parts.push([`${idxPrefix}/$web[${idx}]`, r] as any))
            else
                parts.push([idxPrefix + '/$web', $web] as any)
        } else if (!window.isWeb && $native) {
            if (!isAtomicArray($native) && Array.isArray($native))
                $native.forEach((r, idx) => parts.push([`${idxPrefix}/$native[${idx}]`, r] as any))
            else
                parts.push([idxPrefix + '/$native', $native] as any)
        }
    }

    if (Array.isArray(ruleset) && !isAtomicArray(ruleset))
        ruleset.forEach((r, idx) => addParts(r, `[${idx}]`))
    else
        addParts(ruleset, '')

    return parts
}

const toList = (parts: [string, TSheeter.RulesetItem][], path: string
) => {
    const list: TAtomize.Variants = []
    parts.forEach(part => {
        const item = part[1]
        if (isAtomicArray(item))
            list.push({ atomicArray: item })
        else if (isAtomizedRuleset(item))
            Array.prototype.push.apply(list, item.list)
        else {
            atomizeRulesetInner(
                list, item,
                `${path}${part[0]}`,
                [], [], item
            )
        }
    })
    return list
}