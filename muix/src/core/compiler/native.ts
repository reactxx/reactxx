import { RulesetCompiler, NormalizeClassNames, TValue, TCompiler } from '../typings/compiled'

export const rulesetCompiler: RulesetCompiler = style => {
    if (!style) return []
    const res: TCompiler.Values = []
    for (const p in style) {
        if (p.charAt(0) === '$') continue
        res.push({ propId: p, value: style[p] as TValue, [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.nativeValue })
    }
    return res
}

// apply LAST WIN strategy for classnames
export const normalizeValues: NormalizeClassNames = (values: TCompiler.Values) => {
    const res: TCompiler.PlatformValuesNative = {}
    for (let k = values.length - 1; k >= 0; k--) {
        const value = values[k] as TCompiler.ValueNative
        if (typeof res[value.propId] !== 'undefined') continue
        res[value.propId] = value.value
    }
    return res
}

