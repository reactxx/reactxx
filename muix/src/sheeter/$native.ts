import { TAtomize } from 'reactxx-typings'
import { applyLastwinsStrategy, finalizeClassName, createElement } from './reacts/$native'
import { assignPlatform } from './globals'

export const init = () => assignPlatform({
    toPlatformAtomizeRuleset: (style, tracePath) => {
        const res: TAtomize.AtomicNatives = []
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
        return res.length === 0 ? null : res
    },
    dumpAtomized: array => {
        if (!array || Array.isArray(array) || !(typeof array === 'object')) return array
        const res = []
        for (const p in array) {
            const val = array[p] as TAtomize.__dev_AtomicNative
            if (val===undefined) continue
            res.push(`${p}: ` + (window.__TRACE__ ? `${val.value} /*${val.tracePath || ''}*/` : val))
        }
        return (res.length > 0 ? '\n' : '') + res.join('\n')
    },
    applyLastwinsStrategy,
    finalizeClassName,
    createElement
})

function toJSON() { 
    return `${this.propId}: ${this.value.value} /*${this.value.tracePath}*/` 
}