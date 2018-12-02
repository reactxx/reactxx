import Fela from 'reactxx-fela'
import { assignPlatform, platform } from 'reactxx-styler'
import{TEngine} from 'reactxx-typings'
import { setActWidth } from './queryable/$widths/store'

export const init = () => {
    Fela.initFela$Web(platform)

    platform._sheeter.widthDirs = new Set()

    assignPlatform({
        actWidth: () => window.innerWidth || 0,

        addBreakpoint: (width: number) => {
            const { _sheeter: { widthDirs } } = platform
            if (!width || widthDirs.has(width)) return
            widthDirs.add(width)
            const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
            mediaQuery.addListener(onWidthChanged)
        },

        toPlatformAtomizeRuleset: platform.renderer.renderRuleEx,
        dataTrace: Fela.dataTrace,
        applyLastwinsStrategy,
        finalizeClassName,
    })
}

const onWidthChanged = () => {
    const { _sheeter: s } = platform
    if (s.widthsTimer) return
    s.widthsTimer = window.setTimeout(() => {
        s.widthsTimer = 0
        setActWidth(window.innerWidth)
    }, 1)
}

const finalizeClassName = (lastWinResult: TEngine.AtomicWebsLow) => {
    if (!lastWinResult) return undefined
    if (window.__TRACE__) {
      lastWinResult = lastWinResult.map((r: TEngine.__dev_AtomicWeb) => r.cache.className) as any
    }
    return lastWinResult.join(' ')
  }
  
  // apply LAST WIN strategy for web className
  const applyLastwinsStrategy: TEngine.ApplyLastwinsStrategy = (values: TEngine.Queryables) => {
    if (!values) return null
  
    const { renderer } = platform
  
    const res: TEngine.AtomicWeb[] = []
    const usedPropIds: { [propId: string]: boolean } = {}
  
    for (let i = values.length - 1; i >= 0; i--)
      for (let k = values[i].length - 1; k >= 0; k--) {
        let value = values[i] && values[i][k]
        if (!value) continue
        if (Array.isArray(value)) {
          throw 'WHAT IS THIS CODE?'
          Array.prototype.push.apply(res, value)
          continue
        }
        let className: string = value as string
        if (window.__TRACE__) {
          className = (value as TEngine.__dev_AtomicWeb).cache.className
        }
        const propId = renderer.propIdCache[className]
        if (!propId || usedPropIds[propId])
          continue
        res.push(value as TEngine.AtomicWeb)
        usedPropIds[propId] = true
      }
  
    return res as TEngine.AtomicArrayLow
  }
  
  