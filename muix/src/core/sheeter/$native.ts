import { TCompiler, TValue } from '../d-index'

export const toAtomicClasses: TCompiler.ToAtomicClassesProc = (style, tracePath) => {
    const res: TCompiler.AtomicArray = [] as any
    res[TCompiler.TypedInterfaceProp] = TCompiler.TypedInterfaceTypes.atomicArray
    if (!style) return res
    for (const propId in style) {
        if (propId.charAt(0) === '$') continue
        res.push({
            propId,
            value: style[propId] as TValue,
            //[TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.nativeValue,
            ...DEV_MODE ? { tracePath } : null
        })
    }
    return res
}

export const getTracePath: TCompiler.TraceAtomicClassProc = (value: TCompiler.AtomicNative) => value.tracePath + '/' + value.propId + ': ' + value.value

const DEV_MODE = process.env.NODE_ENV === 'development'