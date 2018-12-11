import Fela from 'reactxx-fela'
import { assignPlatform, platform } from 'reactxx-styles'
import { TEngine, TTyped } from 'reactxx-typings'
import { setActWidth } from './queryable/$widths/store'
import { toClassNamesWithQuery } from './utils/to-classnames'
import { TAsEngineClassName } from './utils/from-engine'

export const init = () => {
  Fela.initFela$Web(platform)

  platform._styles.breakpointSet = new Set()

  assignPlatform({
    actWidth: () => window.innerWidth || 0,

    watchBreakpointChange: (breakpoint: number) => {
      const { _styles: { breakpointSet } } = platform
      if (!breakpoint || breakpointSet.has(breakpoint)) return
      breakpointSet.add(breakpoint)
      //**WIDHT**
      const mediaQuery = window.matchMedia(`(min-width: ${breakpoint + 1}px)`)
      mediaQuery.addListener(onWidthChanged)
    },

    toPlatformAtomizeRuleset: platform.renderer.renderRuleEx,
    applyLastwinsStrategy,
    finalizeClassName: platform.renderer.finalizeClassName,

    styleProps: (propsCode, rulesets, className, style) => {
      const css = toClassNamesWithQuery(propsCode, ...rulesets, className)
      let reduced = platform.applyLastwinsStrategy(TAsEngineClassName(css)) as TEngine.AtomicWebLows
      const res: TTyped.StylePropsWeb = {
          style: style as React.CSSProperties,
          className: platform.finalizeClassName(reduced) as string
      }
      if (window.__TRACE__) {
        const trace =  Fela.dataTrace(reduced, window.__TRACE__.dataTraceFlag)
        if (trace) res['data-trace'] = trace
      }
      return res
  }
})
}

const onWidthChanged = () => {
  const { _styles: s } = platform
  if (s.widthsTimer) return
  s.widthsTimer = window.setTimeout(() => {
    s.widthsTimer = 0
    setActWidth(window.innerWidth)
  }, 1)
}

// apply LAST WIN strategy for web className
const applyLastwinsStrategy: TEngine.ApplyLastwinsStrategy = (values: TEngine.AtomicWebs[]) => {

  if (!values) return null
  const { renderer } = platform
  const res: { items?: TEngine.AtomicWebLows } = {}

  for (let i = values.length - 1; i >= 0; i--) {
    const valuesi = values[i]
    if (!valuesi) continue
    for (let k = valuesi.length - 1; k >= 0; k--)
      renderer.lastWin(valuesi[k], res)
  }

  return res.items as TEngine.AtomicLow
}

