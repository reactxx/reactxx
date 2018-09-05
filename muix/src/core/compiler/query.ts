import { TSheeter, ClassNameItem, TCompiler, Query } from '../typings/index'
import { compileRuleset, isCompiledRuleset, isValues } from './compiler'

// merge rulesets and apply query to ruleset's conditional parts ($whenUed, $mediaq etc.)
export const queryClassNames = (query: Query, ...rulesets: ClassNameItem[]) => {
    if (!rulesets || rulesets.length===0) return [] as TCompiler.Values
    if (isValues(rulesets)) return rulesets
    // when used query par
    query.whenUsed = {}
    rulesets.forEach((r: TSheeter.Ruleset) => {
        if (!r || !r.name) return
        query.whenUsed[r.name] = true
    })
    const values: TCompiler.Values[] = []
    for (let i = 0; i < rulesets.length; i++) {
        const val = rulesets[i]
        if (!val) continue
        if (isValues(val)) values.push(val)
        const rs = isCompiledRuleset(val) ? val : compileRuleset(val as TSheeter.Ruleset) // adjust compiled
        for (let j = 0; j < rs.list.length; j++) {
            const rsi = rs.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.rules)
        }

    }
    return [].concat.apply([], values) as TCompiler.Values
}

export const classNames = (...rulesets: ClassNameItem[]) => queryClassNames({}, ...rulesets)

const testConditions = (conditions: TCompiler.Conditions, query: Query) => {
    if (!conditions || conditions.length === 0) return true
    const firstFalse = conditions.find(cond => {
        switch (cond.type) {
            case 'whenUsed': return query.whenUsed && query.whenUsed[cond.rulesetName]
            case 'mediaq': return typeof query.mediaq === 'number' && cond.start <= query.mediaq && cond.end > query.mediaq
            case 'animation': return query.animation === (cond.opened ? 'opened' : 'closed')
        }
    })
    return firstFalse === null
}

