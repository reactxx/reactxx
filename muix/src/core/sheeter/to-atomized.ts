import { isObject } from '../utils/deep-merge'
import { TCompiler, TSheeter, TCommonStyles, TVariants } from '../d-index'
import { toVariantParts } from './variants'

// platform dependent import
import { toAtomicClasses, getTracePath } from 'reactxx-core'

export const toAtomizedRuleset = <T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape>(
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

    const list: TCompiler.Variants = []
    parts.forEach(part => toAtomizedRulesetInner(
        list, part[1],
        `${name}${part[0]}`,
        [], [], part[1]
    ))
    return {
        name,
        list,
        [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.atomizedRuleset
    } as TCompiler.AtomizedRuleset
}

export const trace = (values: TCompiler.AtomicArray) => values.map(v => getTracePath(v)).join('\n')
export const traceAtomizedRuleset = (rs: TCompiler.AtomizedRuleset) => {
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
export const toAtomizedRulesetInner: TVariants.ToVariantProc = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

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
        if (Array.isArray(value)) {
            value.forEach((r, idx) => {
                toAtomizedRulesetInner(list, r, `${path}/${p}[${idx}]`, [...pseudoPrefixes, p], conditions, null)
            })
            continue
        }
        if (isObject(value))
            toAtomizedRulesetInner(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

// in place sheet compilation
export const toAtomizedSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.Sheet<R>) => {
    if (!sheet) return null //as TCompiler.Sheet<R>
    for (const p in sheet) sheet[p] = toAtomizedRuleset(sheet[p], p)
    return sheet as any as TCompiler.Sheet<R>
}

export const adjustSheetCompiled = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX<R>) => {
    if (!sheet) return null
    if (isAtomizedSheet<R>(sheet)) return sheet
    return toAtomizedSheet<R>(sheet)
}

export const adjustRulesetCompiled = (ruleset: TSheeter.ClassName, rulesetName?: string) => {
    if (!ruleset) return null
    return !isAtomizedRuleset(ruleset) ? toAtomizedRuleset(ruleset as TSheeter.Ruleset, rulesetName) : ruleset
}

export function isRuleset(obj: Object): obj is TSheeter.Ruleset {
    return isObject(obj) && typeof obj[TCompiler.TypedInterfaceProp] === 'undefined'
}

export function isAtomizedRuleset(obj: Object): obj is TCompiler.AtomizedRuleset {
    return obj && obj[TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.atomizedRuleset
}
export function isAtomicArray(obj): obj is TCompiler.AtomicArray {
    return obj && obj[TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.atomicArray
    // if (!obj || !Array.isArray(obj)) return false
    // if (obj.length === 0) return true
    // return window.isWeb ? typeof obj[0] === 'string' : obj[0][TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.nativeValue
}
export function isAtomizedSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TCompiler.Sheet<R> {
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

const pushToList = (list: TCompiler.Variants, ruleset: TSheeter.Ruleset, conditions: TVariants.Conditions, path: string) => {
    if (!ruleset) return
    // if (DEV_MODE)
    //     list.push({ atomicArray: toAtomicClasses(ruleset, path), conditions, path, trace: makeTrace(ruleset) })
    // else
    list.push({ atomicArray: toAtomicClasses(ruleset, path), conditions })
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