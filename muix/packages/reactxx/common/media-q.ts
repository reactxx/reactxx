import warning from 'warning'

import { deepMerges, createBreakPoint /*platform dependent*/, getWindowWidth /*platform dependent*/ } from 'reactxx'

export class ComponentsMediaQ<TState extends string = string> implements MediaQ.ComponentsMediaQ<TState> {
  constructor(private component: React.Component, notifySheet: MediaQ.NotifySheetX<TState>) {
    if (!notifySheet) return

  }

  state: {[P in TState]: boolean}

  private componentId = ComponentsMediaQ.componentsMediaCount++
  private breaks: boolean[] = []

  unsubscribe() {
    for (const idx in this.breaks) unSubscribe(parseInt(idx), this.componentId)
    this.breaks = []
  }

  processRuleset(ruleset) {
    const { $media } = ruleset
    if (!$media) return ruleset
    const { componentId, breaks, component } = this
    const patches = []
    const width = getWindowWidth()
    for (const p in $media) {
      const interval = p.split('-').map((i, idx) => !i ? (idx == 0 ? 0 : 1000000) : parseInt(i))
      warning(interval.length == 2, `'-480' or '480-1024' or '1024-' expected, ${p} found`)
      breaks[interval[0]] = true; breaks[interval[1]] = true
      if (width >= interval[0] && width < interval[1]) patches.push($media[p])
    }
    for (const idx in breaks) subscribe(parseInt(idx), componentId, component)
    if (patches.length === 0) return ruleset
    return deepMerges(false, {}, ruleset, ...patches)
  }
  static componentsMediaCount = 0
}

export class BreakPoint {
  constructor(breakPoint: number) { }
  active = false
  subscribers: React.Component[] = []
  notify() {
    const { subscribers } = this
    for (const p in subscribers) subscribers[p].forceUpdate()
  }
}

const breaks: BreakPoint[] = []

const subscribe = (breakPoint: number, componentId: number, component: React.Component) => {
  let actBreak = breaks[breakPoint]
  if (!actBreak) actBreak = breaks[breakPoint] = createBreakPoint(breakPoint)
  actBreak.subscribers[componentId] = component
}
const unSubscribe = (breakPoint: number, id: number) => {
  delete breaks[breakPoint].subscribers[id]
}
