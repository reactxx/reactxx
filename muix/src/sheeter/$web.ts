import Fela from 'reactxx-fela'
import { assignPlatform, platform } from 'reactxx-sheeter'
import { TEngine } from 'reactxx-typings'
import { setActWidth } from './queryable/$widths/store'

export const init = () => {
  Fela.initFela$Web(platform)

  platform._sheeter.breakpointSet = new Set()

  assignPlatform({
    actWidth: () => window.innerWidth || 0,

    watchBreakpointChange: (breakpoint: number) => {
      const { _sheeter: { breakpointSet } } = platform
      if (!breakpoint || breakpointSet.has(breakpoint)) return
      breakpointSet.add(breakpoint)
      //**WIDHT**
      const mediaQuery = window.matchMedia(`(min-width: ${breakpoint + 1}px)`)
      mediaQuery.addListener(onWidthChanged)
    },

    toPlatformAtomizeRuleset: platform.renderer.renderRuleEx,
    applyLastwinsStrategy,
    finalizeClassName: platform.renderer.finalizeClassName,
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
