import { renderer } from 'reactxx-fela'
import { Query, Ruleset, RulesetCompiler, NormalizeClassNames, TSheeterCompiled } from './types'
import {queryClassNames, classNames} from './query'

export type QueryClassNamesWeb = (query: Query, ...rulesets: Ruleset[]) => TSheeterCompiled.ValueWeb[]
export type ClassNamesWeb = (...rulesets: Ruleset[]) => TSheeterCompiled.ValueWeb[]


const _queryClassNames = queryClassNames as QueryClassNamesWeb
const _classNames = classNames as ClassNamesWeb

export {_queryClassNames as queryClassNames, _classNames as classNames}

export const rulesetCompiler: RulesetCompiler = renderer.renderRuleEx

// apply LAST WIN strategy for classnames
export const normalizeClassNames: NormalizeClassNames = (values: TSheeterCompiled.Values) => {
    const res: TSheeterCompiled.ValueWeb[] = []
    const usedPropIds: { [propId: string]: boolean } = {}
    for (let k = values.length - 1; k >= 0; k--) {
        const value = values[k] as TSheeterCompiled.ValueWeb
        const propId = renderer.propIdCache[value]
        if (!propId) continue
        if (usedPropIds[propId]) continue
        usedPropIds[propId] = true
        res.push(value)
    }
    return res.join(' ')
}

