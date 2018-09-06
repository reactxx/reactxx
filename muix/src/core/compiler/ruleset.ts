import { deepMerge, isObject } from '../utils/deep-merge'
import { TCompiler, TSheeter, TCommonStyles, TExtends, TValue } from '../typings/index'

import 'reactxx-fela'
// platform dependent import
import { rulesetCompiler } from 'reactxx-core'

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
    ].filter(p => !!p[1]) as [string, TSheeter.RulesetInnerLow][]

    const list: TCompiler.RulesetList = []
    parts.forEach(part => compileTree(
        list, part[1],
        `${name}${part[0]}`,
        [], [], part[1]
    ))
    return { name, list, [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.compiled } as TCompiler.Ruleset
}

export const compileSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.Sheet<R>) => {
    if (!sheet) return null
    const res: TCompiler.Sheet = {} as any
    for (const p in sheet) res[p] = compileRuleset(sheet[p], p)
    return res
}

export function isCompiledRuleset(obj: Object): obj is TCompiler.Ruleset {
    return obj && obj[TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.compiled
}
export function isValues(obj): obj is TCompiler.Values {
    if (!obj || !Array.isArray(obj)) return false
    if (obj.length === 0) return true
    return window.isWeb ? typeof obj[0] === 'string' : obj[0][TCompiler.TypedInterfaceProp] === TCompiler.TypedInterfaceTypes.nativeValue
}

//*********************************************************
//  PRIVATE
//*********************************************************
const DEV_MODE = process.env.NODE_ENV === 'development'

type CompileProc = (
    list: TCompiler.RulesetList, ruleset: TSheeter.RulesetInnerLow, path: string,
    pseudoPrefixes: string[], conditions: TCompiler.Conditions,
    rulesetToQueue?: TSheeter.RulesetInnerLow
) => void


// linearize ruleset tree
const compileTree: CompileProc = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

    // push to ruleset list
    if (rulesetToQueue) pushToList(list, rulesetToQueue, conditions, path)

    // compile root addIns
    const { $whenUsed, $mediaq, $animation } = ruleset;

    const addIns =
        [[compileWhenUsed, $whenUsed],
        [compileMediaQ, $mediaq],
        [compileAnimation, $animation]]

    addIns
        .filter(p => p[1])
        .forEach(part => part[0](
            list, part[1], path, pseudoPrefixes, conditions)
        )

    // parse pseudo rules (:hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TSheeter.RulesetInner
        if (p.charAt(0) === '$' || !isObject(value)) continue
        // null at compileTree(...,null) => don't push to list, just parse addIns
        compileTree(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

const compileWhenUsed: CompileProc = (list, ruleset, path, pseudoPrefixes, conditions) => {
    for (const p in ruleset) {
        const rules = ruleset[p] as TSheeter.RulesetInner
        compileTree(
            list, rules,
            `${path}/$whenUsed.${p}`,
            pseudoPrefixes,
            [...conditions, { type: 'whenUsed', rulesetName: p } as TCompiler.WhenUsedCondition],
            wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}
const compileMediaQ: CompileProc = (list, ruleset, path, pseudoPrefixes, conditions) => {
}
const compileAnimation: CompileProc = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

const pushToList = (list: TCompiler.RulesetList, ruleset: TSheeter.RulesetInner, conditions: TCompiler.Conditions, path: string) => {
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