import { TAtomize, TValue } from 'reactxx-typings'

export const toAtomicArray: TAtomize.ToAtomicClassesProc = (style, tracePath) => {
    const res: TAtomize.AtomicArray = [] as any
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
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

export const getTracePath: TAtomize.TraceAtomicClassProc = (value: TAtomize.AtomicNative) => value.tracePath + '/' + value.propId + ': ' + value.value

const DEV_MODE = process.env.NODE_ENV === 'development'