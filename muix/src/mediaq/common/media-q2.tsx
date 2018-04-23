import React from 'react'
import warning from 'warning'

import { Types } from 'reactxx-basic'
import { onSubscribe, modifyRuleset } from 'reactxx-mediaq' // import platform dependent code

export type RulesetWithAddInX<T extends Types.RulesetNativeIds = 'Text'> = Types.Ruleset & { $mediaq?: SheetX<T> }

export type RulesetWithAddIn = Types.Ruleset & { $mediaq?: Sheet }

export type RulesetWithAddInCode = RulesetCode[]


export interface SheetX<T extends Types.RulesetNativeIds = 'Text'> {
  [query: string]: Types.RulesetX<T>
}

export interface Sheet {
  [query: string]: Types.Ruleset
}

export interface RulesetCodeItem {
  from: Breakpoint
  to: Breakpoint
  ruleset: Types.Ruleset
}
export interface RulesetCode {
  rulesetName: string
  items: RulesetCodeItem[]
}

export type ComponentSheet<T extends string = string> = Record<T, any>

export interface ComponentSheetUsed {
  [rulesetName: string]: RulesetWithAddInCode
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
export type SheetAddInX<TState extends string = string> = { theme?, $mediaq?: NotifySheetX<TState> | ((theme) => NotifySheetX<TState>) }

export type NotifySheet<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }
export type SheetAddIn<TState extends string = string> = { theme?, $mediaqCode?: NotifySheetCode<TState> }

export type NotifySheetCode<TState extends string = string> = { [P in TState]: boolean }
export type SheetCodeAddIn<TState extends string = string> = { $mediaqCode?: NotifySheetCode<TState> }

export class MediaQ_AppContainer extends React.Component {
  constructor() {
    super(null)
    warning(!appContainer, 'Only single mediaq.AppContainer component instance allowed')
    appContainer = this
    breakpoints = []
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


export const mediaqGetNotifyBreakpoints = <T extends string>(props: SheetAddInX<T>) => {
  const { $mediaq, ...rest } = props as SheetAddInX
  if (!$mediaq) return { usedNotifyBreakpoints: null as NotifySheet<T>, observedBits: 0 }
  const mediaq = typeof $mediaq === 'function' ? $mediaq(rest.theme) : $mediaq
  const newMedia = {} as NotifySheet<T>
  let observedBits = 0
  for (const p in mediaq)
    newMedia[p] = mediaq[p].map((i, idx) => {
      if (!i) return idx == 0 ? BMin : BMax
      const breakpoint = subscribe(i, false)
      observedBits = observedBits | 1 << breakpoint.id
      return breakpoint
    }) as [Breakpoint, Breakpoint]

  return { usedNotifyBreakpoints: newMedia, observedBits: observedBits }
}

export const mediaqActualizetNotifyBreakpoints = <T extends string>(sheet: NotifySheet<T>) => {
  if (!sheet) return null as NotifySheetCode<T>
  const res = {} as NotifySheetCode<T>
  for (const p in sheet) {
    const sheetp = sheet[p]
    res[p] = sheetp[0].active && !sheetp[1].active
  }
  return res
}

export const mediaqGetSheetBreakpoints = (sheet: ComponentSheet) => {
  if (!sheet) return null
  let observedBits = 0
  const res: RulesetCode[] = []
  for (const p in sheet) {
    const rs = sheet[p]
    if (!rs.$mediaq) continue
    const rsCode: RulesetCode = { rulesetName: p, items: [] }
    for (const pm in rs.$mediaq) {
      const interval = pm.split('-').map((i, idx) => {
        if (!i) return idx == 0 ? BMin : BMax
        const breakpoint = subscribe(parseInt(i), true)
        observedBits = observedBits | 1 << breakpoint.id
        return breakpoint
      })
      const rsCodeItem: RulesetCodeItem = {
        from: interval[0],
        to: interval[1],
        ruleset: rs.$mediaq[pm]
      }
      rsCode.items.push(rsCodeItem)
    }
  }
  return { usedSheetBreakpoints: observedBits === 0 ? null : res, observedBits: observedBits }
}

export const mediaqActualizeSheetBreakpoints = (prop: ComponentSheetUsed, usedSheetBreakpoints: RulesetCode[]) => {
  if (!usedSheetBreakpoints) return prop
  let classes
  const res = {
    ...prop, classes: classes = { ...prop.classes }
  }
  usedSheetBreakpoints.forEach(used => {
    const ruleset = classes[used.rulesetName]
    warning(ruleset, `Missing ruleset ${used.rulesetName}`)
    classes[used.rulesetName] = modifyRuleset(ruleset, used.items)
  })
  return res
}


//export const withMediaQ = <TProps extends SheetAddInX>(onFinish: () => any, Component: React.ComponentType<SheetAddIn>) => {

//  const res: React.SFC<TProps> = props => {
//    const { $mediaq, ...rest } = props as SheetAddInX
//    if (!$mediaq) return <Component {...rest} />
//    const mediaq = typeof $mediaq === 'function' ? $mediaq(rest.theme) : $mediaq
//    const newMedia: NotifySheet = {}
//    let observedBits = 0
//    for (const p in mediaq)
//      newMedia[p] = mediaq[p].map((i, idx) => {
//        if (!i) return idx == 0 ? BMin : BMax
//        const breakpoint = subscribe(i)
//        observedBits = observedBits | 1 << breakpoint.id
//        return breakpoint
//      }) as [Breakpoint, Breakpoint]
//    return <context.Consumer unstable_observedBits={observedBits}>
//      {breakpoints => {
//        const outputProps = rest
//        return <Component {...outputProps} $mediaqCode={newMedia} />
//      }}
//    </context.Consumer>
//  }

//  return res
//}

//export const toCode = <TState extends string = string>(sheet: NotifySheet<TState>) => {
//  const res = {} as NotifySheetCode<TState>
//  for (const p in sheet) {
//    const sheetp = sheet[p]
//    res[p] = sheetp[0].active && !sheetp[1].active
//  }
//  return res
//}

//*********************************

const subscribe = (value: number, inRuleset: boolean) => {
  warning(breakpoints, 'reactxx-mediaq: missing MediaQ_AppContainer component in your application root')
  let b = byValue[value]
  if (!b) {
    warning(breakpoints.length > 31, 'reactxx-mediaq: too many different breakpoints (max 32 allowed)')
    breakpoints.push(b = { id: breakpoints.length, value })
    byValue[value] = b
    onSubscribe(b, inRuleset)
  }
  return b
}

export let breakpoints: Breakpoint[]
let byValue: Breakpoint[] = []
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


export const MediaQConsumer = context.Consumer