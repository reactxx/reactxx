import { TSheeter, TCompiler, TRulesetConditions, TComponents } from '../index-d'
import { compileRuleset, isCompiledRuleset, isCompiledValues } from '../sheeter/ruleset'
import { testConditions } from '../sheeter/ruleset-conditions'


export const deleteUnusedProps = props => propsToDelete.forEach(p => delete props[p])

export function classNamesForBind(...rulesets: TSheeter.ClassNameItem[]) {
    return classNamesWithQuery(this.sheetQuery, this.theme, ...rulesets)
}

export const classNames = (...rulesets: TSheeter.ClassNameItem[]) => classNamesWithQuery({}, null, ...rulesets)
export const classNamesWithTheme = (theme, ...rulesets: TSheeter.ClassNameItem[]) => classNamesWithQuery({}, theme, ...rulesets)

/******************************************
  PRIVATE
*******************************************/

const propsToDelete: TComponents.CommonPropertiesCodeKeys[] = ['sheetQuery', 'classes', 'classNames']

// merge rulesets and apply query to ruleset's conditional parts ($whenUed, $mediaq etc.)
const classNamesWithQuery = (query: TRulesetConditions.Query, theme, ...rulesets: TSheeter.ClassNameItem[]) => {
    if (!rulesets || rulesets.length === 0) return [] as TCompiler.Values
    if (isCompiledValues(rulesets)) return rulesets
    // when used query par
    if (query)
      query = {...query, whenUsed: query.whenUsed ? {...query.whenUsed} : {}}
    else 
      query = {}

    rulesets.forEach((r: TSheeter.Ruleset & {name?:string}) => {
        if (!r || !r.name) return
        query.whenUsed[r.name] = true
    })
    const values: TCompiler.Values[] = []
    for (let i = 0; i < rulesets.length; i++) {
        const val = rulesets[i] as TSheeter.RulesetOrCreator
        if (!val) continue
        if (isCompiledValues(val)) {
            values.push(val)
            continue
        }
        const rs = isCompiledRuleset(val) ? val : compileRuleset(typeof val === 'function' ? val(theme) : val) // adjust compiled
        for (let j = 0; j < rs.list.length; j++) {
            const rsi = rs.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.rules)
        }

    }
    return [].concat.apply([], values) as TCompiler.Values
}


