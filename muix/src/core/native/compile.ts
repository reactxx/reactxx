import { RulesetCompiler, NormalizeClassNames, TSheeterCompiled } from '../types'

export const rulesetCompiler: RulesetCompiler = style => null

// apply LAST WIN strategy for classnames
export const normalizeClassNames: NormalizeClassNames = (values: TSheeterCompiled.Values) => {
    const res: TSheeterCompiled.PlatformValuesNative = {}
    for (let k = values.length - 1; k >= 0; k--) {
        const value = values[k] as TSheeterCompiled.ValueNative
        if (typeof res[value.propId] !== 'undefined') continue
        res[value.propId] = value.value
    }
    return res
}

