import { Dimensions } from 'react-native'
import { TEngine, TTyped } from 'reactxx-typings'
import { platform, assignPlatform } from './utils/globals'
import { toClassNamesWithQuery } from './utils/to-classnames'
import { TAsTypedClassName } from './utils/from-engine'
import { setActWidth } from './queryable/$widths/store'

import { View as View_, Text as Text_, Image as Image_, ScrollView as ScrollView_ } from 'react-native'

if (Dimensions)
    Dimensions.addEventListener('change', arg => setActWidth(Dimensions.get('window').width))

export const init = () => assignPlatform({
    //addBreakpoint: null,
    actWidth: () => Dimensions ? Dimensions.get('window').width : 0,

    toPlatformAtomizeRuleset: (style, tracePath) => {
        if (!style) return null
        if (window.__TRACE__) {
            const res = { ...style } as TEngine.AtomicNatives
            let empty = true
            for (const p in res) {
                if (p.charAt(0) === '$') continue
                empty = false
                res[p] = { tracePath, value: style[p] }
            }
            if (empty) return null
            res['toJSON'] = toJSON.bind(res)
            return res
        } else
            return style as TEngine.AtomicNatives
    },

    applyLastwinsStrategy,
    finalizeClassName,

    getStyleProps: (propsCode, rulesets, classNames, style) => {
        const css = toClassNamesWithQuery(propsCode, ...rulesets, classNames, style)
        if (!css) return undefined
        let reduced = platform.applyLastwinsStrategy(TAsTypedClassName(css)) as TEngine.AtomicNativeLows
        const res: TTyped.StylePropsNative<TTyped.RulesetIds> = {
            style: platform.finalizeClassName(reduced) as TEngine.AtomicNativeLows
        }
        if (window.__TRACE__) {
            const trace = dataTrace(reduced, window.__TRACE__.dataTraceFlag)
            if (trace) res['data-trace'] = trace
        }
        return res
    }
})

function toJSON() {
    const res = { ...this }
    delete res['toJSON']
    delete res['conditions']
    for (const p in res) {
        const val = this[p] as TEngine.__dev_AtomicNative
        res[p] = `${val.value} @${val.tracePath}`
    }
    return res
}

const finalizeClassName = (lastWinResult: TEngine.AtomicNativeLows) => {
    if (!lastWinResult) return undefined
    if (window.__TRACE__) {
        const res = {}
        for (const p in lastWinResult) {
            if (p === 'conditions' || p === 'toJSON') continue
            const val = lastWinResult[p] as TEngine.__dev_AtomicNative
            res[p] = val.value
        }
        return res
    }
    // TODO
    return lastWinResult as any as TEngine.AtomicWebFinals
}

function toJSON2() {
    const { conditions, toJSON, ...rest } = this
    return rest
}

const applyLastwinsStrategy: TEngine.ApplyLastwinsStrategy = (values: TEngine.AtomicNatives[]) => {
    if (!values) return null
    const res = Object.assign({}, ...values) as TEngine.AtomicLow
    if (window.__TRACE__)
        for (const p in res) delete res['toJSON']
    res['toJSON'] = toJSON2.bind(res)
    return res
}

const dataTrace = (ruleset, flags = 'long') => {
    if (!ruleset) return ''
    const res = []
    for (const p in ruleset) {
        if (p==='toJSON' || p==='conditions') continue
        const val = ruleset[p] as TEngine.__dev_AtomicNative
        if (typeof val === 'undefined' || !window.__TRACE__ || flags === 'short') continue

        res.push(`${p} @${val.tracePath}`)
    }
    return res.length > 0 ? '\n' + res.join('\n') : ''
}

export const View: TTyped.ViewStatic = View_ as any
export const Text: TTyped.TextStatic = Text_ as any
export const ScrollView: TTyped.ScrollViewStatic = ScrollView_ as any
export const Image: TTyped.ImageStatic = Image_ as any
