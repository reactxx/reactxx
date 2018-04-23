import React from 'react'
import warning from 'warning'

import { Types } from 'reactxx-basic'
import { onSubscribe, modifyRuleset } from 'reactxx-mediaq' // import platform dependent code

/************************
* RULESET TYPINGS
*************************/

//*** Cross platform:

// Ruleset
export type RulesetWithAddInX<T extends Types.RulesetNativeIds = 'Text'> = Types.RulesetX & MediaQRulesetPartX<T>

// $mediaq ruleset part. 'query' has '-640' or '640-1024' or '1024-' format
export interface MediaQRulesetPartX<T extends Types.RulesetNativeIds = 'Text'> {
  $mediaq?: { [query: string]: Types.RulesetX<T> }
}

//*** Platform dependent
export type MediaQSheet = { [rulesetName: string]: RulesetWithAddIn }

export type RulesetWithAddIn = Types.Ruleset & MediaQRulesetPart

export interface MediaQRulesetPart {
  $mediaq?: { [query: string]: Types.Ruleset }
}

//*** decoded MediaQSheet
export interface MediaQRulesetDecoded {
  rulesetName: string // ruleset name in sheet
  items: RulesetDecoded[] // decoded MediaQRulesetPartX
}

export interface RulesetDecoded {
  from: Breakpoint
  to: Breakpoint
  ruleset: Types.Ruleset
}

/************************
* NOTIFY TYPINGS
*************************/

//*** breakpoint
export const enum Consts {
  maxBreakpoint = 10000000
}

export interface Breakpoint {
  id: number // 0..31, index to breakpoints array
  value: number // e.g. 640
  active?: boolean
}

//***  MediaQ Notify properties
export type PropsX<TState extends string = string> = { theme?, $mediaq?: NotifyIntervalX<TState> | ((theme) => NotifyIntervalX<TState>) }
export type NotifyIntervalX<TState extends string> = { [P in TState]: [number | null, number | null] }

export type NotifyIntervalDecoded<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }

export type CodeProps<TState extends string = string> = { $mediaqCode?: CodePropsItems<TState> }
export type CodePropsItems<TState extends string = string> = { [P in TState]: boolean }


/************************
* EXPORTED
*************************/

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


export const mediaqGetNotifyBreakpoints = <T extends string>(props: PropsX<T>) => {
  const { $mediaq, ...rest } = props as PropsX
  if (!$mediaq) return { usedNotifyBreakpoints: null as NotifyIntervalDecoded<T>, observedBits: 0 }
  const mediaq = typeof $mediaq === 'function' ? $mediaq(rest.theme) : $mediaq
  const newMedia = {} as NotifyIntervalDecoded<T>
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

export const mediaqActualizetNotifyBreakpoints = <T extends string>(sheet: NotifyIntervalDecoded<T>) => {
  if (!sheet) return null as CodePropsItems<T>
  const res = {} as CodePropsItems<T>
  for (const p in sheet) {
    const sheetp = sheet[p]
    res[p] = sheetp[0].active && !sheetp[1].active
  }
  return res
}

export const mediaqGetSheetBreakpoints = (sheet: MediaQSheet) => {
  if (!sheet) return null
  let observedBits = 0
  const res: MediaQRulesetDecoded[] = []
  for (const p in sheet) {
    const rs = sheet[p]
    if (!rs.$mediaq) continue
    const rsCode: MediaQRulesetDecoded = { rulesetName: p, items: [] }
    for (const pm in rs.$mediaq) {
      const interval = pm.split('-').map((i, idx) => {
        if (!i) return idx == 0 ? BMin : BMax
        const breakpoint = subscribe(parseInt(i), true)
        observedBits = observedBits | 1 << breakpoint.id
        return breakpoint
      })
      const rsCodeItem: RulesetDecoded = {
        from: interval[0],
        to: interval[1],
        ruleset: rs.$mediaq[pm]
      }
      rsCode.items.push(rsCodeItem)
    }
  }
  return { usedSheetBreakpoints: observedBits === 0 ? null : res, observedBits: observedBits }
}

export const mediaqActualizeSheetBreakpoints = (prop: MediaQSheet, usedSheetBreakpoints: MediaQRulesetDecoded[]) => {
  if (!usedSheetBreakpoints) return prop
  let classes
  const res: MediaQSheet = {
    ...prop, classes: classes = { ...prop.classes }
  }
  usedSheetBreakpoints.forEach(used => {
    const ruleset = classes[used.rulesetName]
    warning(ruleset, `Missing ruleset ${used.rulesetName}`)
    classes[used.rulesetName] = modifyRuleset(ruleset, used.items)
  })
  return res
}

/************************
* PRIVATE
*************************/

const subscribe = (value: number, inRuleset: boolean) => {
  warning(breakpoints, 'reactxx-mediaq: missing MediaQ_AppContainer component in your application root')
  let b = byValue[value]
  if (!b) {
    warning(breakpoints.length <= 31, 'reactxx-mediaq: too many different breakpoints (max 32 allowed)')
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