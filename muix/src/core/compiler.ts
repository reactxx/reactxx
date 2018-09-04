import { deepMerge, isObject } from './utils/deep-merge'
import { TSheeterSource, TSheeterCompiled, Ruleset } from './types'

// platform dependent import
import { rulesetCompiler } from 'reactxx-core'

const DEV_MODE = process.env.NODE_ENV === 'development'

type Node = TSheeterSource.RulesTree<string>
type CompileProc = (
    list: TSheeterCompiled.RulesetList, ruleset: Node, path: string,
    pseudoPrefixes: string[], conditions: TSheeterCompiled.Conditions,
    rulesetToQueue?: Node
) => void

export const compileRuleset = (rs: Ruleset, rulesetName?: string) => {
    if (!rs) return null
    if (rs.type === 'compiled') return rs as TSheeterCompiled.Ruleset
    const ruleset = rs as Node
    const { $before, $web, $native, $after } = ruleset
    const name = ruleset.name || rulesetName || 'unknown'
    const parts = [['/$before', $before], ['', ruleset], window.isWeb ? ['/$web', $web] : ['/$native', $native], ['/$after', $after]].filter(p => p[1])
    const list: TSheeterCompiled.RulesetList = []
    parts.forEach((part: [string, Node]) => compileTree(
        list, part[1],
        `${name}${part[0]}`,
        [], [], part[1]
    ))
    return { name, list, type: 'compiled' } as TSheeterCompiled.Ruleset
}

export const compileClassName = (rs: Ruleset) => compileRuleset(rs, 'className')

export const compileSheet = <Keys extends string = string>(sheet: TSheeterSource.Sheet<string>) => {
    if (!sheet) return null
    const res: TSheeterCompiled.Sheet<Keys> = {} as any
    for (const p in sheet) res[p] = compileRuleset(sheet[p], p)
    return res
}

// linearize ruleset tree
const compileTree: CompileProc = (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) => {

    // push to ruleset list
    pushToList(list, rulesetToQueue, conditions, path)

    // parse root addIns
    const { $whenUsed, $mediaq, $animation } = ruleset
    const parts = [[compileWhenUsed, $whenUsed], [compileMediaQ, $mediaq], [compileAnimation, $animation]].filter(p => p[1])
    parts.forEach(part => part[0](list, part[1], path, pseudoPrefixes, conditions))

    // parse addIns sub-rules
    for (const p in ruleset) {
        const value = ruleset[p] as Node
        if (p.charAt(0) === '$' || !isObject(value)) continue
        // null at the end => don't push to list, just parse addIns
        compileTree(list, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

const compileWhenUsed: CompileProc = (list, ruleset, path, pseudoPrefixes, conditions) => {
    for (const p in ruleset) {
        const rules = ruleset[p] as Node
        compileTree(
            list, rules,
            `${path}/$whenUsed.${p}`,
            pseudoPrefixes,
            [...conditions, { type: 'whenUsed', rulesetName: p } as TSheeterCompiled.WhenUsedCondition],
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

const pushToList = (list: TSheeterCompiled.RulesetList, ruleset: TSheeterSource.RulesTree<string>, conditions: TSheeterCompiled.Conditions, path: string) => {
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