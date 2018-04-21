import React from 'react'
import warning from 'warning'

import { Types } from 'reactxx-basic'

export type RulesetWithAddIn<T extends Types.RulesetNativeIds = 'Text'> = Types.Ruleset & { $mediaq?: Sheet }

//export interface TComponentsMediaQ<TState extends string> {
//  state: { [P in TState]?: boolean }
//}

export interface Sheet {
  [query: string]: Types.Ruleset
}

export const enum Consts {
  maxBreakpoint = 10000000
}

export interface Breakpoint {
  id: number // 0..31, index to breakpoints array
  value: number // e.g. 640
  active?: boolean
}

export type NotifySheetX<TState extends string> = { [P in TState]: [number | null, number | null] }
export type SheetAddInX<TState extends string = string> = { $mediaq?: NotifySheetX<TState> }

export type NotifySheet<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }
export type SheetAddIn<TState extends string = string> = { $mediaqCode?: NotifySheet<TState> }

export type NotifySheetCode<TState extends string = string> = { [P in TState]: boolean }

export class MediaQ_AppContainer extends React.Component {
  constructor() {
    super(null)
    warning(!appContainer, 'Only single mediaq.AppContainer component instance allowed')
    appContainer = this
  }
  render() {
    return <context.Provider value={breakpoints}>
      {this.props.children}
    </context.Provider>
  }
}

export const refresh = () => {
  breakpoints = [...breakpoints] // change reference for <context.Provider value={breakpoints}>
  appContainer.forceUpdate()
}

export const withMediaQ = <TProps extends SheetAddInX>(Component: React.ComponentType<SheetAddIn>) => {
  const res: React.ComponentType<TProps> = props => {
    const { $mediaq, ...rest } = props as SheetAddInX
    if (!$mediaq) return <Component {...rest} />
    const newMedia: NotifySheet = {}
    let observedBits = 0
    for (const p in $mediaq)
      newMedia[p] = $mediaq[p].map((i, idx) => {
        if (!i) return idx == 0 ? BMin : BMax
        const breakpoint = subscribe(i)
        observedBits = observedBits | 1 << breakpoint.id
        return breakpoint
      }) as [Breakpoint, Breakpoint]
    return <context.Consumer unstable_observedBits={observedBits}>
      {breakpoints => {
        const outputProps = rest
        return <Component {...outputProps} $mediaqCode={newMedia} />
      }}
    </context.Consumer>
  }
  return res
}

export const toCode = <TState extends string = string>(sheet: NotifySheet<TState>) => {
  const res = {} as NotifySheetCode<TState>
  for (const p in sheet) {
    const sheetp = sheet[p]
    res[p] = sheetp[0].active && !sheetp[1].active
  }
  return res
}

//*********************************

const subscribe = (value: number) => {
  let b: Breakpoint = breakpoints.find(b => b.value === value)
  if (!b) {
    warning(breakpoints.length > 31, 'reactxx-mediaq: too many different breakpoints (max 32 allowed)')
    breakpoints.push(b = { id: breakpoints.length, value })
    //TODO for web, create window.matchMedia(`(min-width: ${breakPoint}px)`)
  }
  return b
}

let breakpoints: Breakpoint[] = []
let counter = 0
let appContainer: MediaQ_AppContainer

const context = React.createContext<Breakpoint[]>([], (prev, next) => {
  let res = 0
  for (let i = 0; i < Math.max(prev.length, next.length); i++) {
    if (i >= prev.length) res = res | 1 << next[i].id
    else if (i >= next.length) res = res | 1 << prev[i].id
    else if (prev[i].active !== next[i].active) res = res | 1 << prev[i].id
  }
  return res
})

const BMin: Breakpoint = { active: true, id: -1, value: 0 }
const BMax: Breakpoint = { active: false, id: -1, value: Consts.maxBreakpoint } 
