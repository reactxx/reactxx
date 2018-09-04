import { renderer } from 'reactxx-fela'
import { RulesetCompiler, NormalizeClassNames, TSheeterCompiled } from '../types'

export const rulesetCompiler: RulesetCompiler = renderer.renderRuleEx

// apply LAST WIN strategy for classnames
export const normalizeClassNames: NormalizeClassNames = (values: TSheeterCompiled.Values) => {
    const res: TSheeterCompiled.ValueWeb[] = []
    const usedPropIds: { [propId: string]: boolean } = {}
    for (let k = values.length - 1; k >= 0; k--) {
        const value = values[k] as TSheeterCompiled.ValueWeb
        const propId = renderer.propIdCache[value]
        if (usedPropIds[propId]) continue
        usedPropIds[propId] = true
        res.push(value)
    }
    return res.join(' ')
}

