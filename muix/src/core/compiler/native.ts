import { RulesetCompiler, NormalizeClassNames, TValue, TSheeterCompiled } from './types'

export const rulesetCompiler: RulesetCompiler = style => {
    if (!style) return []
    const res: TSheeterCompiled.Values = []
    for (const p in style) {
        if (p.charAt(0) === '$') continue
        res.push({ propId: p, value: style[p] as TValue, [TSheeterCompiled.TypedInterfaceProp]: TSheeterCompiled.TypedInterfaceTypes.nativeValue })
    }
    return res
}

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

