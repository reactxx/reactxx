import { deepMerge, isObject } from '../utils/deep-merge'
import { TCompiler, TSheeter, TCommonStyles, TRulesetConditions } from '../typings/index'
import { compileConditionals } from './ruleset-conditions'

import 'reactxx-fela'

// platform dependent import
import {rulesetCompiler} from 'reactxx-core'

export const compileRuleset = <T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape>(
    ruleset: TSheeter.Ruleset<T, R>,
    rulesetName?: string
) => {
    if (!ruleset) return null
    const { $before, $web, $native, $after } = ruleset
    const name = rulesetName || ruleset.name || 'unknown'

    const parts = [
        ['/$before', $before],
        ['', ruleset],
        window.isWeb ? ['/$web', $web] : ['/$native', $native],
        ['/$after', $after]
    ].filter(p => !!p[1]) as [string, TRulesetConditions.ConditionalPart][]

    const list: TCompiler.RulesetList = []
    parts.forEach(part => compileTree(
        list, part[1],
        `${name}${part[0]}`,
        [], [], part[1]
    ))
    return { name, list, [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.compiled } as TCompiler.Ruleset
}

export const adjustSheetCompiled = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX<R>) => {
    if (!sheet) return null
    if (isCompiledSheet<R>(sheet)) return sheet
    return compileSheet<R>(sheet)
}

export const adjustRulesetCompiled = (ruleset: TSheeter.Ruleset, rulesetName?: string) => {
    if (!ruleset) return null
    return !isCompiledRuleset(ruleset) ? compileRuleset(ruleset, rulesetName) : ruleset
}

export function isCompiledRuleset(obj: Object): obj is TCompiler.Ruleset {
    return obj && obj[TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.compiled
}
export function isCompiledValues(obj): obj is TCompiler.Values {
    if (!obj || !Array.isArray(obj)) return false
    if (obj.length === 0) return true
    return window.isWeb ? typeof obj[0] === 'string' : obj[0][TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.nativeValue
}
export function isCompiledSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TCompiler.Sheet<R> {
    let isCompiled = false
    for (const p in sheet) {
        isCompiled = isCompiledRuleset(sheet[p])
        break
    }
    return isCompiled
}

//*********************************************************
//  PRIVATE
//*********************************************************

const DEV_MODE = process.env.NODE_ENV === 'development'

// in place sheet compilation
const compileSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.Sheet<R>) => {
    if (!sheet) return null //as TCompiler.Sheet<R>
    for (const p in sheet) sheet[p] = compileRuleset(sheet[p], p)
    return sheet as any as TCompiler.Sheet<R>
}

// linearize ruleset tree
export const compileTree: TRulesetConditions.CompileProc = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

    // push to ruleset list
    if (rulesetToQueue) pushToList(list, rulesetToQueue, conditions, path)

    compileConditionals(ruleset).forEach(part => part.proc(
        list, part.part, path, pseudoPrefixes, conditions)
    )

    // parse pseudo rules (:hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TSheeter.RulesetInner
        if (p.charAt(0) === '$' || !isObject(value)) continue
        // null at compileTree(...,null) => don't push to list, just parse addIns
        compileTree(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

const pushToList = (list: TCompiler.RulesetList, ruleset: TSheeter.RulesetInner, conditions: TRulesetConditions.Conditions, path: string) => {
    if (!ruleset) return
    if (DEV_MODE)
        list.push({ rules: rulesetCompiler(ruleset), conditions, path, rulesTrace: makeTrace(ruleset) })
    else
        list.push({ rules: rulesetCompiler(ruleset), conditions })
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