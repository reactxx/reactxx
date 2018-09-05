import { renderer } from 'reactxx-fela'
import { Query, RulesetCompiler, NormalizeClassNames, TCompiler } from '../typings/compiled'
import {queryClassNames, classNames} from './query'
import { TSheeter } from '../typings/sheeter'

export type QueryClassNamesWeb = (query: Query, ...rulesets: TSheeter.Ruleset[]) => TCompiler.ValueWeb[]
export type ClassNamesWeb = (...rulesets: TSheeter.Ruleset[]) => TCompiler.ValueWeb[]


const _queryClassNames = queryClassNames as QueryClassNamesWeb
const _classNames = classNames as ClassNamesWeb

export {_queryClassNames as queryClassNames, _classNames as classNames}

export const rulesetCompiler: RulesetCompiler = renderer.renderRuleEx

// apply LAST WIN strategy for classnames
export const normalizeValues: NormalizeClassNames = (values: TCompiler.Values) => {
    const res: TCompiler.ValueWeb[] = []
    const usedPropIds: { [propId: string]: boolean } = {}
    for (let k = values.length - 1; k >= 0; k--) {
        const value = values[k] as TCompiler.ValueWeb
        const propId = renderer.propIdCache[value]
        if (!propId) continue
        if (usedPropIds[propId]) continue
        usedPropIds[propId] = true
        res.push(value)
    }
    return res.join(' ')
}

