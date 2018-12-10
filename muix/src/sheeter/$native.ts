import { Dimensions } from 'react-native'
import { TEngine, TTypedNative } from 'reactxx-typings'
import { assignPlatform } from './utils/globals'
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
    const {conditions, toJSON, ...rest} = this
    return rest
}

const applyLastwinsStrategy: TEngine.ApplyLastwinsStrategy = (values: TEngine.AtomicNatives[]) => {
    if (!values) return null
    const res = Object.assign.apply({}, values) as TEngine.AtomicLow
    if (window.__TRACE__)
        for (const p in res) delete res['toJSON']
    res['toJSON'] = toJSON2.bind(res)
    return res
}

export const View: TTypedNative.ViewStatic = View_ as any
export const Text: TTypedNative.TextStatic = Text_ as any
export const ScrollView: TTypedNative.ScrollViewStatic = ScrollView_ as any
export const Image: TTypedNative.ImageStatic = Image_ as any
