import warning from 'warning'

import { TMediaQ } from 'reactxx'

import { TAddInConfig } from 'typescript-config'

export abstract class ComponentsMediaQLow<TState extends string = string>  {

  constructor(protected component: React.Component) { }

  destroy() {
    for (const idx in this.notifyBreaks) this.unSubscribe(parseInt(idx), this.componentId)
    this.notifyBreaks = []
  }

  setNotifyBreakpoints(notifySheet: TMediaQ.NotifySheetX<TState>) {
    if (!notifySheet) return
    const { componentId, notifyBreaks, component } = this
    const width = this.getWindowWidth()
    const patches: TAddInConfig.RulesetWithAddIn[] = []
    for (const p in notifySheet) {
      const interval = notifySheet[p].map((i, idx) => !i ? (idx == 0 ? 0 : TMediaQ.Consts.maxBreakpoint) : i)
      notifyBreaks[interval[0]] = true; notifyBreaks[interval[1]] = true
      this.state[p] = width >= interval[0] && width < interval[1]
    }
    for (const idx in this.notifyBreaks) this.subscribe(parseInt(idx), componentId, component)
  }

  private notifyBreaks: boolean[] = []
  protected componentId = ComponentsMediaQLow.componentsMediaCount++
  state: {[P in TState]?: boolean} = {}
  
  subscribe (breakPoint: number, componentId: number, component: React.Component) {
    let actBreak = breaks[breakPoint]
    if (!actBreak) actBreak = breaks[breakPoint] = this.createBreakPoint(breakPoint)
    actBreak.subscribers[componentId] = component
  }
  unSubscribe (breakPoint: number, id: number) {
    delete breaks[breakPoint].subscribers[id]
  }
  abstract createBreakPoint(breakPoint: number): BreakPoint
  abstract processRuleset(ruleset: TAddInConfig.RulesetWithAddIn)
  abstract getWindowWidth() :number
  static componentsMediaCount = 0
}

export class BreakPoint {
  constructor(breakPoint: number) { }
  active = false
  subscribers: React.Component[] = []
  notify() {
    const { subscribers } = this
    for (const p in subscribers) subscribers[p].forceUpdate()
    //for (const p in subscribers) subscribers[p].setState(st => ({ x: new Date().getTime() }))
  }
}

export const breaks: BreakPoint[] = []
