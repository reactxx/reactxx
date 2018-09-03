// platform dependent import
import { rulesetCompiler, getPropIdFromValue } from 'reactxx-sheeter2'
import { deepMerge, isObject } from './deep-merge'
import { TSheeterSource, TSheeterCompiled2 } from './types'

const DEV_MODE = process.env.NODE_ENV === 'development'

type Node = TSheeterSource.RulesTree<string>

export const compile = (ruleset: TSheeterSource.RulesRoot<string>, rulesetName?: string) => {
    const { $before, $web, $native, $after } = ruleset
    const parts = [['/$before', $before], ['', ruleset], window.isWeb ? ['/$web', $web] : ['/$native', $native], ['/$after', $after]].filter(p => p[1])
    const queue: TSheeterCompiled2.Queue = []
    parts.forEach((part: [string, Node]) => parsePseudo({
        queue,
        ruleset: part[1],
        path: `${rulesetName || 'unknown'}${part[0]}`,
        pseudoPrefixes: [],
        conditions: []
    }))
    return queue
}

interface parseTreePar {
    queue: TSheeterCompiled2.Queue,
    ruleset: Node,
    path: string,
    pseudoPrefixes: string[],
    conditions: TSheeterCompiled2.Conditions
}

const parsePseudo = (par: parseTreePar, rulesetToQueue?) => {
    const { ruleset, path, pseudoPrefixes, queue, conditions } = par
    const toQueue = typeof rulesetToQueue==='undefined' ? ruleset : rulesetToQueue
    if (rulesetToQueue)
        queue.push({ path, rules: null, rulesTrace: makeTrace(rulesetToQueue), conditions })
    for (const p in ruleset) {
        const value = ruleset[p] as Node
        if (p.startsWith('$') || !isObject(value)) continue
        parsePseudo({ ...par, ruleset: value, path: `${path}/${p}`, pseudoPrefixes: [...pseudoPrefixes, p] }, null)
    }
    const { $whenUsed, $mediaq, $animation } = ruleset
    const parts = [['$whenUsed', $whenUsed], ['$mediaq', $mediaq], ['$animation', $animation]].filter(p => p[1])
    parts.forEach(part => {
        const partPar = { ...par, ruleset: part[1] }
        switch (part[0]) {
            case '$whenUsed': parseWhenUsed(partPar); break;
            case '$mediaq': parseMediaQ(partPar); break;
            case '$animation': parseAnimation(partPar); break;
        }
    })
}

const parseWhenUsed = (par: parseTreePar) => {
    const { queue, ruleset, path, conditions, pseudoPrefixes } = par
    for (const p in ruleset) {
        const rules = ruleset[p] as Node
        parsePseudo({ 
            ...par, 
            ruleset: rules, 
            path: `${path}/$whenUsed.${p}`, 
            conditions: [...conditions, { type: 'whenUsed', rulesetName: p } as TSheeterCompiled2.WhenUsedCondition] 
        }, wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}
const parseMediaQ = (par: parseTreePar) => {
}
const parseAnimation = (par: parseTreePar) => {
}

const wrapPseudoPrefixes = (par: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return par
    let res = par
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
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
