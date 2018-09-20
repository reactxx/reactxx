import warning from 'warning'
import { isObject } from 'reactxx-core/utils/deep-merge'
import { TAtomize, TSheeter, TCommonStyles, TVariants } from 'reactxx-core/d-index'
import { toVariantParts } from 'reactxx-core/sheeter/variants'
import { createWithTheme } from '../utils/createWithTheme'

// platform dependent import
import { toAtomicArray, getTracePath } from 'reactxx-core'

export const atomizeRuleset = <T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape>(
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

export const trace = (values: TAtomize.AtomicArray) => values.map(v => getTracePath(v)).join('\n')
export const traceAtomizedRuleset = (rs: TAtomize.AtomizedRuleset) => {
    const res: string[] = [`******************** name: ${rs.name}`]
    rs.list.forEach(v => {
        if (v.atomicArray.length===0) return
        res.push(`***`)
        if (v.conditions && v.conditions.length > 0) res.push(`conditions: ${JSON.stringify(v.conditions)}`)
        v.atomicArray.forEach(v => res.push(v + ' {' + getTracePath(v) + '}'))
    })
    return res.join('\n')
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
        warning (!Array.isArray(value), 'Web pseudo properties cannot contain array')
        if (isObject(value))
            atomizeRulesetInner(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

// in place sheet compilation
export const atomizeSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.Sheet<R>) => {
    if (!sheet) return null 
    for (const p in sheet) sheet[p] = atomizeRuleset(sheet[p], p)
    return sheet as any as TAtomize.Sheet<R>
}

export const adjustSheetCompiled = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetOrCreator<R>, theme) => {
    if (!sheet) return null 
    const sh = createWithTheme(sheet, theme)
    for (const p in sh) sh[p] = adjustRulesetCompiled(sh[p], theme, p)
    return sh as any as TAtomize.Sheet<R>
}

export const adjustRulesetCompiled = (ruleset: TSheeter.ClassNameOrCreator, theme, rulesetName?: string) => {
    if (!ruleset) return null
    const rs = createWithTheme(ruleset, theme)
    if (isAtomizedRuleset(rs) || isAtomicArray(rs)) return rs
    if (Array.isArray(rs)) return rs.map(r => adjustRulesetCompiled(r, theme))
    return atomizeRuleset(rs as TSheeter.Ruleset, rulesetName)
}

export function isRuleset(obj: Object): obj is TSheeter.Ruleset {
    return isObject(obj) && typeof obj[TAtomize.TypedInterfaceProp] === 'undefined'
}

export function isAtomizedRuleset(obj: Object): obj is TAtomize.AtomizedRuleset {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomizedRuleset
}
export function isAtomicArray(obj): obj is TAtomize.AtomicArray {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomicArray
    // if (!obj || !Array.isArray(obj)) return false
    // if (obj.length === 0) return true
    // return window.isWeb ? typeof obj[0] === 'string' : obj[0][TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.nativeValue
}
export function isAtomizedSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TAtomize.Sheet<R> {
    for (const p in sheet)
        return isAtomizedRuleset(sheet[p])
    return true
}

//*********************************************************
//  PRIVATE
//*********************************************************

const DEV_MODE = process.env.NODE_ENV === 'development'

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

const pushToList = (list: TAtomize.Variants, ruleset: TSheeter.Ruleset, conditions: TVariants.Conditions, path: string) => {
    if (!ruleset) return
    // if (DEV_MODE)
    //     list.push({ atomicArray: toAtomicClasses(ruleset, path), conditions, path, trace: makeTrace(ruleset) })
    // else
    list.push({ atomicArray: toAtomicArray(ruleset, path), conditions })
}

// const makeTrace = (rules) => {
//     const res = deepMerge({}, rules)
//     removeSystem(res)
//     return res
// }

function removeSystem(rules) {
    for (const p in rules) {
        if (p.startsWith('$')) delete rules[p]
        else if (isObject(rules[p])) removeSystem(rules[p])
    }
}