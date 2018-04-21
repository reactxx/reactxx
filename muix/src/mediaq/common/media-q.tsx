import React from 'react'
import warning from 'warning'

import * as MediaQ from '../common/media-q2'

export interface Breakpoint2 {
  id: number // 0..31
  value: number  // e.g. 1024
  active?: boolean
}

export class AppProvider extends React.Component<null, any> {
  constructor() {
    super(null)
    warning(!appProvider, 'Only single mediaq.AppProvider component instance allowed')
    appProvider = this
  }
  context = React.createContext<any>(null)
  render() {
    return <this.context.Provider value={this.state}>
      {this.props.children}
    </this.context.Provider>
  }
}

export let appProvider: AppProvider
export const subscribe = (...values: number[]) => {
  let mask = 0
  values.forEach(value => {
    let b = breakpoints[value]
    if (!b) breakpoints[value] = b = { id: counter++, value }
    mask = mask | 1 << b.id
  })
  return mask
}

const breakpoints: Breakpoint2[] = []
let counter = 0

export abstract class ComponentsMediaQLow<TState extends string = string>  {

  constructor(protected component: React.Component) { }

  destroy() {
    for (const idx in this.notifyBreaks) this.unSubscribe(parseInt(idx), this.componentId)
    this.notifyBreaks = []
    this.state = {}
  }

  init(notifySheet: MediaQ.NotifySheetX<TState>) {
    if (!notifySheet) return
    const { componentId, notifyBreaks, component } = this
    const width = this.getWindowWidth()
    for (const p in notifySheet) {
      const interval = notifySheet[p].map((i, idx) => !i ? (idx == 0 ? 0 : MediaQ.Consts.maxBreakpoint) : i)
      notifyBreaks[interval[0]] = true; notifyBreaks[interval[1]] = true
      this.state[p] = width >= interval[0] && width < interval[1]
    }
    for (const idx in this.notifyBreaks) this.subscribe(parseInt(idx), componentId, component)
  }

  private notifyBreaks: boolean[] = []
  protected componentId = ComponentsMediaQLow.componentsMediaCount++
  state: { [P in TState]?: boolean } = {}

  subscribe(breakPoint: number, componentId: number, component: React.Component) {
    let actBreak = breaks[breakPoint]
    if (!actBreak) actBreak = breaks[breakPoint] = this.createBreakPoint(breakPoint)
    actBreak.subscribers[componentId] = component
  }
  unSubscribe(breakPoint: number, id: number) {
    delete breaks[breakPoint].subscribers[id]
  }
  abstract createBreakPoint(breakPoint: number): BreakPoint
  abstract processRuleset(ruleset: MediaQ.RulesetWithAddIn)
  abstract getWindowWidth(): number
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