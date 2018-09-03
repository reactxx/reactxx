import { deepMerge, isObject } from './deep-merge'
import { TSheeterSource, TSheeterCompiled2 } from './types'

// platform dependent import
import { rulesetCompiler } from 'reactxx-sheeter2'

const DEV_MODE = process.env.NODE_ENV === 'development'

type Node = TSheeterSource.RulesTree<string>

export const compile = (ruleset: TSheeterSource.RulesRoot<string>, rulesetName?: string) => {
    const { $before, $web, $native, $after } = ruleset
    const parts = [['/$before', $before], ['', ruleset], window.isWeb ? ['/$web', $web] : ['/$native', $native], ['/$after', $after]].filter(p => p[1])
    const queue: TSheeterCompiled2.Queue = []
    parts.forEach((part: [string, Node]) => parsePseudo(
        queue, part[1],
        `${rulesetName || 'unknown'}${part[0]}`,
        [], []
    ))
    return queue
}

// interface parseTreePar {
//     queue: TSheeterCompiled2.Queue, ruleset: Node, path: string,
//     pseudoPrefixes: string[], conditions: TSheeterCompiled2.Conditions
// }
// queue, ruleset, path, pseudoPrefixes, conditions

const parsePseudo = (
    queue: TSheeterCompiled2.Queue, ruleset: Node, path: string,
    pseudoPrefixes: string[], conditions: TSheeterCompiled2.Conditions,
    rulesetToQueue?
) => {

    // push to ruleset queue
    pushToQueue(queue, typeof rulesetToQueue === 'undefined' ? ruleset : rulesetToQueue, conditions, path)

    // parse root addIns
    const { $whenUsed, $mediaq, $animation } = ruleset
    const parts = [[parseWhenUsed, $whenUsed], [parseMediaQ, $mediaq], [parseAnimation, $animation]].filter(p => p[1])
    parts.forEach(part => part[0](queue, part[1], path, pseudoPrefixes, conditions))

    // parse addIns sub-rules
    for (const p in ruleset) {
        const value = ruleset[p] as Node
        if (p.charAt(0)==='$' || !isObject(value)) continue
        // null at the end => don't push to queue, just parse addIns
        parsePseudo(queue, value, `${path}/${p}`, [...pseudoPrefixes, p], conditions, null)
    }

}

const parseWhenUsed = (queue: TSheeterCompiled2.Queue, ruleset: Node, path: string, pseudoPrefixes: string[], conditions: TSheeterCompiled2.Conditions) => {
    for (const p in ruleset) {
        const rules = ruleset[p] as Node
        parsePseudo(
            queue, rules,
            `${path}/$whenUsed.${p}`,
            pseudoPrefixes,
            [...conditions, { type: 'whenUsed', rulesetName: p } as TSheeterCompiled2.WhenUsedCondition],
            wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}
const parseMediaQ = (queue: TSheeterCompiled2.Queue, ruleset: Node, path: string, pseudoPrefixes: string[], conditions: TSheeterCompiled2.Conditions) => {
}
const parseAnimation = (queue: TSheeterCompiled2.Queue, ruleset: Node, path: string, pseudoPrefixes: string[], conditions: TSheeterCompiled2.Conditions) => {
}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

const pushToQueue = (queue: TSheeterCompiled2.Queue, ruleset: TSheeterSource.RulesTree<string>, conditions: TSheeterCompiled2.Conditions, path: string) => {
    if (!ruleset) return
    if (DEV_MODE)
        queue.push({ path, rules: rulesetCompiler(ruleset), rulesTrace: makeTrace(ruleset), conditions })
    else
        queue.push({ rules: rulesetCompiler(ruleset), conditions })
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