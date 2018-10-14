import { TAtomize } from 'reactxx-typings'

export const toPlatformAtomizeRuleset: TAtomize.ToPlatformAtomizeRuleset = (style, tracePath) => {
    const res: TAtomize.AtomicArray = [] as any
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
    if (!style) return res
    //if ((style as TVariants.Deffered).deffered) { res.push(style)
    for (const propId in style) {
        if (propId.charAt(0) === '$') continue
        res.push({
            propId,
            value: window.__DEV__ ? { tracePath, value: style[propId] } : style[propId]
            //value: style[propId],
            //...window.__DEV__ ? { tracePath } : null
        } as TAtomize.AtomicNative)
    }
    return res
}

// export const getPlatformTracePath: TAtomize.GetPlatformTracePath = (value: TAtomize.AtomicNative) =>
//     value.deffered ? JSON.stringify(value) : value.tracePath + '/' + value.propId + ': ' + value.value

export const dumpAtomized = (array) => {
    return array
}

