import { Dimensions } from 'react-native'
import { TEngine } from 'reactxx-typings'
import { assignPlatform } from './utils/globals'
import { setActWidth } from './queryable/$widths/store'

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
})

function toJSON() {
    return `${this.propId}: ${this.value.value} @${this.value.tracePath}`
}

const finalizeClassName = (lastWinResult: TEngine.AtomicNativeLow) => {
    if (!lastWinResult) return undefined
    if (window.__TRACE__) {
      const res = {}
      for (const p in lastWinResult) res[p] = (lastWinResult[p] as TEngine.__dev_AtomicNative).value
      return res
    }
    return lastWinResult
  }
  
  const applyLastwinsStrategy: TEngine.ApplyLastwinsStrategy = values => {
    if (!values) return null
    const res: TEngine.NativeStyle = {}
    for (let i = values.length - 1; i >= 0; i--) {
      const vals = values[i] as any[]
      if (!vals) continue
      for (let k = vals.length - 1; k >= 0; k--) {
        let value = vals[k]
        if (!value) continue
        if (Array.isArray(value)) {
          Array.prototype.push.apply(res, value)
          continue
        }
        // last win strategy
        if (typeof res[value.propId] !== 'undefined') continue
        res[value.propId] = value.value
      }
    }
    return res as TEngine.AtomicArrayLow
  }
  
  