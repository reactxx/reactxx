import { TExtends, TCompiler, TValue } from '../typings/index'

export const rulesetCompiler: TExtends.RulesetCompiler = style => {
    if (!style) return []
    const res: TCompiler.Values = []
    for (const p in style) {
        if (p.charAt(0) === '$') continue
        res.push({ propId: p, value: style[p] as TValue, [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.nativeValue })
    }
    return res
}