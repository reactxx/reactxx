import warning from 'warning'
import { isObject } from '../utils/deep-merge'
import { TAtomize, TSheeter, TCommonStyles, TVariants } from '../d-index'
import { toVariantParts } from '../sheeter/variants'

// platform dependent import
import { toAtomicArray } from 'reactxx-core'

export const atomizeRulesetLow = <T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape>(
    ruleset: TSheeter.Ruleset<T, R> | TSheeter.RulesetArray<T, R>,
    rulesetName?: string
) => {
    if (!ruleset) return null

    const name = rulesetName || ruleset.name || 'unknown'
    const parts: [string, TVariants.VariantPart][] = []

    const addParts = (r: TSheeter.Ruleset, idxPrefix: string) => {
        if (!r) return
        parts.push([idxPrefix, r])
        const { $web, $native } = r
        if (window.isWeb && $web) {
            if (Array.isArray($web)) $web.forEach((r, idx) => parts.push([`${idxPrefix}/$web[${idx}]`, r] as any))
            else parts.push([idxPrefix + '/$web', $web] as any)
        } else if (!window.isWeb && $native) {
            if (Array.isArray($native)) $native.forEach((r, idx) => parts.push([`${idxPrefix}/$native[${idx}]`, r] as any))
            else parts.push([idxPrefix + '/$native', $native] as any)
        }
    }

    if (Array.isArray(ruleset)) ruleset.forEach((r, idx) => addParts(r, `[${idx}]`))
    else addParts(ruleset, '')

    const list: TAtomize.Variants = []
    parts.forEach(part => atomizeRulesetInner(
        list, part[1],
        `${name}${part[0]}`,
        [], [], part[1]
    ))
    return {
        name,
        list,
        [TAtomize.TypedInterfaceProp]: TAtomize.TypedInterfaceTypes.atomizedRuleset
    } as TAtomize.AtomizedRuleset
}

// linearize ruleset tree
export const atomizeRulesetInner: TVariants.ToVariantProc = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

    // push to ruleset list
    if (rulesetToQueue) pushToList(list, rulesetToQueue, conditions, path)

    // process variant part of ruleset: $mediaq, $whenFlag, $animation etc.
    toVariantParts(ruleset).forEach(part => part.proc(
        list, part.part, path, pseudoPrefixes, conditions)
    )

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

const pushToList = (list: TAtomize.Variants, ruleset: TSheeter.Ruleset, conditions: TVariants.Conditions, path: string) => {
    if (!ruleset) return
    list.push({ atomicArray: toAtomicArray(ruleset, path), conditions })
}
