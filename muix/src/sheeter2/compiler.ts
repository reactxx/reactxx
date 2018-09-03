// platform dependent import
import { rulesetCompiler, getPropIdFromValue } from 'reactxx-sheeter2'

import { TSheeterSource, TSheeterCompiled } from './types'
import { deepMerges, deepMerge, isObject } from './deep-merge'

const DEV_MODE = process.env.NODE_ENV === 'development'

export const compile = (ruleset: TSheeterSource.RulesRoot<string>, rulesetName?: string) => {
    const { $before, $web, $native, $after, ...rest } = ruleset
    // solve $before, $web, $native, $after
    const toMerge = [$before, rest, window.isWeb ? $web : $native, $after].filter(p => p)
    const merged = toMerge.length === 0 ? null : toMerge.length === 1 ? toMerge[0] : deepMerges({}, toMerge)
    const res = compileAndReturn(merged, [])
    res.rulesetName = rulesetName
    return res
}

type Node = TSheeterSource.RulesTree<string>
type ToFinish = TSheeterCompiled.RulesTree[]

const compileAndReturn = (ruleset: Node, pseudoPrefixes: string[]) => {
    // global $whenUsed, $mediaq, $animation
    const res: TSheeterCompiled.RulesTree = {}
    compileToRes(res, ruleset, pseudoPrefixes)
    // if (res.fixedToCompile)
    //     res.fixed = rulesetCompiler(res.fixedToCompile)
    return res
}

const compileToRes = (res: TSheeterCompiled.RulesTree, ruleset: Node, pseudoPrefixes: string[]) => {
    // global $whenUsed, $mediaq, $animation
    const { $whenUsed, $mediaq, $animation, ...rest } = ruleset
    compileWhenUsed(res, $whenUsed, pseudoPrefixes)
    compileMediaQ(res, $animation, pseudoPrefixes)
    compileAnimation(res, $mediaq, pseudoPrefixes)
    return compileRules(res, rest, pseudoPrefixes)
}

const compileRules = (res: TSheeterCompiled.RulesTree, ruleset: Node, pseudoPrefixes: string[]) => {
    if (!ruleset) return
    if (!res.fixedToCompile) res.fixedToCompile = {}

    let actPlace = res.fixedToCompile
    // merge fixed
    pseudoPrefixes.forEach(p => actPlace = actPlace[p] || (actPlace[p] = {}))

    for (const p in ruleset) {
        const value = ruleset[p]
        if (isObject(value)) { // => value is pseudo property
            // extract $whenUsed, $mediaq, $animation and inner pseudo
            actPlace[p] = compileToRes(res, value as {}, [...pseudoPrefixes, p])
        } else // value is scalar
            actPlace[p] = value
    }
    return actPlace
}

const compileWhenUsed = (res: TSheeterCompiled.RulesTree, whenUsed: TSheeterSource.PartialSheet<string>, pseudoPrefixes: string[]) => {
    if (!whenUsed) return
    if (!res.variable) res.variable = {}
    if (!res.variable.whenUsed) res.variable.whenUsed = {}

    for (const whenName in whenUsed) {
        const newValue = compileAndReturn(whenUsed[whenName], pseudoPrefixes)
        const oldValue = res.variable.whenUsed[whenName]
        res.variable.whenUsed[whenName] = oldValue ? deepMerge(oldValue, newValue) : newValue
    }
}

const compileMediaQ = (res: TSheeterCompiled.RulesTree, mediaq: Record<string, TSheeterSource.RulesTree<string>>, pseudoPrefixes: string[]) => {
    if (!mediaq) return
    if (!res.variable) res.variable = {}
    if (!res.variable.mediaq) res.variable.mediaq = []

    for (const mediaqName in mediaq) {
        const newValue = compileAndReturn(mediaq[mediaqName], pseudoPrefixes)
        const oldValue = res.variable.mediaq[mediaqName]
        res.variable.mediaq[mediaqName] = oldValue ? deepMerge(oldValue, newValue) : newValue
    }
}

const compileAnimation = (res: TSheeterCompiled.RulesTree, sheet, pseudoPrefixes: string[]) => {
    if (!sheet) return
}