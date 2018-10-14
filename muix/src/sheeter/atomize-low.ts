import warning from 'warning'
import { isObject } from './utils/deep-merge'
import { TAtomize, TSheeter, TCommonStyles, TVariants } from 'reactxx-typings'
import { atomizeVariants } from './variants'
import { isAtomicArray, isAtomizedRuleset } from './atomize'

// platform dependent import
import { platform } from 'reactxx-sheeter'

export const atomizeRulesetLow = (ruleset: TSheeter.RulesetOrAtomized /*| TSheeter.RulesetItem[]*/, rulesetName?: string) => {
    if (!ruleset) return null

    const name = rulesetName || ruleset['name'] || 'unknown'
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

    if (!isAtomicArray(ruleset) && Array.isArray(ruleset))
        ruleset.forEach((r, idx) => addParts(r, `[${idx}]`))
    else
        addParts(ruleset, '')

    const list: TAtomize.Variants = []
    parts.forEach(part => {
        const item = part[1]
        if (isAtomicArray(item)) {
            list.push({ atomicArray: item, conditions: [] })
        } else if (isAtomizedRuleset(item)) {
            Array.prototype.push.apply(list, item.list)
            //item.list.forEach(l => list.push(l))
        } else
            atomizeRulesetInner(
                list, item,
                `${name}${part[0]}`,
                [], [], item
            )
    })
    return list.length===0 ? null : {
        name,
        list,
        [TAtomize.TypedInterfaceTypes.prop]: TAtomize.TypedInterfaceTypes.atomizedRuleset
        //['~']: TAtomize.TypedInterfaceTypes.atomizedRuleset
    } as TAtomize.AtomizedRuleset
}

// linearize ruleset tree
export const atomizeRulesetInner: TVariants.AtomizeRulesetInner = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

    // push to ruleset list
    if (rulesetToQueue) pushToList(list, rulesetToQueue, conditions, path)

    // process variant part of ruleset: $transition, $sheetSwitch etc.
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

const pushToList = (list: TAtomize.Variants, ruleset: TSheeter.Ruleset, conditions: TVariants.Conditions, path: string) => {
    if (!ruleset) return
    const atomicArray = platform.toPlatformAtomizeRuleset(ruleset, path)
    if (!atomicArray) return
    list.push(conditions.length>0 ? { atomicArray, conditions } : { atomicArray })
}
