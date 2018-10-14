import { TAtomize } from 'reactxx-typings'
import { applyLastwinsStrategy } from './reacts/$native'

export const platform: TAtomize.ToPlatformAtomizeRuleset = {
    toPlatformAtomizeRuleset: (style, tracePath) => {
        const res: TAtomize.AtomicArray = [] as any
        res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
        if (!style) return res
        for (const propId in style) {
            if (propId.charAt(0) === '$') continue
            const at = {
                propId,
                value: window.__DEV__ ? { tracePath, value: style[propId] } : style[propId]
            } as TAtomize.AtomicNative
            if (window.__DEV__) {
                at['toJSON'] = toJSON.bind(at)
            }
            res.push(at)
        }
        return res.length===0 ? null : res
    },
    dumpAtomized: array => array,
    applyLastwinsStrategy
}

function toJSON() { return `${this.propId}: ${this.value.value}` }