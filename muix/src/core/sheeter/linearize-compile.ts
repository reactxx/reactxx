import { deepMerge, isObject } from '../utils/deep-merge'
import { TCompiler, TSheeter, TCommonStyles, TVariants } from '../d-index'
import { toVariantPart } from './variants'

import 'reactxx-fela'

// platform dependent import
import { toAtomicClasses } from 'reactxx-core'

export const toVariantClassList = <T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape>(
    ruleset: TSheeter.Ruleset<T, R> | TSheeter.RulesetArray<T, R>,
    rulesetName?: string
) => {
    if (!ruleset) return null

    const name = rulesetName || ruleset.name || 'unknown'
    const parts: [string, TVariants.VariantPart][] = []

    const addParts = (r: TSheeter.Ruleset) => {
        if (!r) return
        parts.push(['', r])
        const { $web, $native } = r
        if (window.isWeb && $web) parts.push(['/$web', $web] as any)
        else if (!window.isWeb && $native) parts.push(['/$native', $native] as any)
    }

    if (Array.isArray(ruleset)) ruleset.forEach(r => addParts(r))
    else addParts(ruleset)

    const list: TCompiler.Variants = []
    parts.forEach(part => linearizeAndCompileRulesetInner(
        list, part[1],
        `${name}${part[0]}`,
        [], [], part[1]
    ))
    return { 
        name, 
        list, 
        [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.compiled 
    } as TCompiler.NamedVariants
}

// linearize ruleset tree
export const linearizeAndCompileRulesetInner: TVariants.ToVariantProc = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

    // push to ruleset list
    if (rulesetToQueue) pushToList(list, rulesetToQueue, conditions, path)

    toVariantPart(ruleset).forEach(part => part.proc(
        list, part.part, path, pseudoPrefixes, conditions)
    )

    // parse pseudo rules (:hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TSheeter.Ruleset
        if (p.charAt(0) === '$' || !isObject(value)) continue
        // null at compileTree(...,null) => don't push to list, just parse addIns
        linearizeAndCompileRulesetInner(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

export const adjustSheetCompiled = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX<R>) => {
    if (!sheet) return null
    if (isCompiledSheet<R>(sheet)) return sheet
    return compileSheet<R>(sheet)
}

export const adjustRulesetCompiled = (ruleset: TSheeter.ClassName, rulesetName?: string) => {
    if (!ruleset) return null
    return !isVariableList(ruleset) ? toVariantClassList(ruleset as TSheeter.Ruleset, rulesetName) : ruleset
}

export function isVariableList(obj: Object): obj is TCompiler.NamedVariants {
    return obj && obj[TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.compiled
}
export function isCompiledValues(obj): obj is TCompiler.AtomicClasses {
    if (!obj || !Array.isArray(obj)) return false
    if (obj.length === 0) return true
    return window.isWeb ? typeof obj[0] === 'string' : obj[0][TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.nativeValue
}
export function isCompiledSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TCompiler.Sheet<R> {
    for (const p in sheet)
        return isVariableList(sheet[p])
    return true
}

//*********************************************************
//  PRIVATE
//*********************************************************

const DEV_MODE = process.env.NODE_ENV === 'development'

// in place sheet compilation
const compileSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.Sheet<R>) => {
    if (!sheet) return null //as TCompiler.Sheet<R>
    for (const p in sheet) sheet[p] = toVariantClassList(sheet[p], p)
    return sheet as any as TCompiler.Sheet<R>
}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

const pushToList = (list: TCompiler.Variants, ruleset: TSheeter.Ruleset, conditions: TVariants.Conditions, path: string) => {
    if (!ruleset) return
    if (DEV_MODE)
        list.push({ atomicClasses: toAtomicClasses(ruleset), conditions, path, trace: makeTrace(ruleset) })
    else
        list.push({ atomicClasses: toAtomicClasses(ruleset), conditions })
}

const makeTrace = (rules) => {
    const res = deepMerge({}, rules)
    removeSystem(res)
    return res
}

function removeSystem(rules) {
    for (const p in rules) {
        if (p.startsWith('$')) delete rules[p]
        else if (isObject(rules[p])) removeSystem(rules[p])
    }
}