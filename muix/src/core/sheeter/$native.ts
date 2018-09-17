import { TCompiler, TValue } from '../d-index'

export const toAtomicClasses: TCompiler.ToAtomicClassesProc = style => {
    if (!style) return []
    const res: TCompiler.AtomicClasses = []
    for (const p in style) {
        if (p.charAt(0) === '$') continue
        res.push({ propId: p, value: style[p] as TValue, [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.nativeValue })
    }
    return res
}