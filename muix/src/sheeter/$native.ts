import { Dimensions } from 'react-native'
import { TEngine } from 'reactxx-typings'
import { applyLastwinsStrategy, finalizeClassName, createElement } from './reacts/$native'
import { assignPlatform } from './utils/globals'
import { setActWidth } from './conditions/$widths/store'

if (Dimensions)
    Dimensions.addEventListener('change', arg => setActWidth(Dimensions.get('window').width))

export const init = () => assignPlatform({
    addBreakpoint: (width: number) => { },
    actWidth: () => Dimensions ? Dimensions.get('window').width : 0,

    toPlatformAtomizeRuleset: (style, tracePath) => {
        const res: TEngine.AtomicNatives = []
        if (!style) return res
        for (const propId in style) {
            if (propId.charAt(0) === '$') continue
            const at = {
                propId,
                value: window.__TRACE__ ? { tracePath, value: style[propId] } : style[propId]
            } as TEngine.AtomicNative
            if (window.__TRACE__) {
                at['toJSON'] = toJSON.bind(at)
            }
            res.push(at)
        }
        return res.length === 0 ? null : res
    },
    dataTrace: (ruleset, flags = 'long') => {
        //if (!ruleset || Array.isArray(ruleset) || !(typeof ruleset === 'object')) return ruleset
        if (!ruleset) return ''
        const res = []
        for (const p in ruleset) {
            const val = ruleset[p] as TEngine.__dev_AtomicNative
            if (typeof val === 'undefined' || !window.__TRACE__ || flags === 'short') continue

            res.push(`${p} @${val.tracePath}`)
        }
        return res.length > 0 ? '\n'+ res.join('\n') : ''
    },
    applyLastwinsStrategy,
    finalizeClassName,
    createElement
})

function toJSON() {
    return `${this.propId}: ${this.value.value} @${this.value.tracePath}`
}