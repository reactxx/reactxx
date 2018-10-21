import { TAtomize } from 'reactxx-typings'
import { applyLastwinsStrategy, finalClassNameStep, createElement } from './reacts/$native'

export const platform: TAtomize.Platform = {
    toPlatformAtomizeRuleset: (style, tracePath) => {
        const res: TAtomize.AtomicArray = [] as any
        res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
        if (!style) return res
        for (const propId in style) {
            if (propId.charAt(0) === '$') continue
            const at = {
                propId,
                value: window.__TRACE__ ? { tracePath, value: style[propId] } : style[propId]
            } as TAtomize.AtomicNative
            if (window.__TRACE__) {
                at['toJSON'] = toJSON.bind(at)
            }
            res.push(at)
        }
        return res.length===0 ? null : res
    },
    dumpAtomized: array => array,
    applyLastwinsStrategy,
    finalClassNameStep,
    createElement
}

function toJSON() { return `${this.propId}: ${this.value.value} /*${this.value.tracePath}*/` }