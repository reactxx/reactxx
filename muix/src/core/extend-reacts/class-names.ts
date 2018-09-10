import { TSheeter, TExtends, TCompiler, TRulesetConditions } from '../index-d'
import { compileRuleset, isCompiledRuleset, isCompiledValues } from '../sheeter/ruleset'
import { testConditions } from '../sheeter/ruleset-conditions'


export const deleteUnusedProps = props => propsToDelete.forEach(p => delete props[p])

export function classNamesForBind(...rulesets: TExtends.ClassNameItem[]) {
    return classNamesWithQuery(this.$system.sheetQuery, ...rulesets)
}

export const classNames = (...rulesets: TExtends.ClassNameItem[]) => classNamesWithQuery({}, ...rulesets)

/******************************************
  PRIVATE
*******************************************/

const propsToDelete: TSheeter.CommonPropertiesCodeKeys[] = ['sheetQuery', 'classes', 'classNames']

// merge rulesets and apply query to ruleset's conditional parts ($whenUed, $mediaq etc.)
const classNamesWithQuery = (query: TRulesetConditions.Query, ...rulesets: TExtends.ClassNameItem[]) => {
    if (!rulesets || rulesets.length === 0) return [] as TCompiler.Values
    if (isCompiledValues(rulesets)) return rulesets
    // when used query par
    if (!query) query = {}
    if (!query.whenUsed) query.whenUsed = {}
    rulesets.forEach((r: TSheeter.Ruleset) => {
        if (!r || !r.name) return
        query.whenUsed[r.name] = true
    })
    const values: TCompiler.Values[] = []
    for (let i = 0; i < rulesets.length; i++) {
        const val = rulesets[i]
        if (!val) continue
        if (isCompiledValues(val)) {
            values.push(val)
            continue
        }
        const rs = isCompiledRuleset(val) ? val : compileRuleset(val) // adjust compiled
        for (let j = 0; j < rs.list.length; j++) {
            const rsi = rs.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.rules)
        }

    }
    return [].concat.apply([], values) as TCompiler.Values
}


