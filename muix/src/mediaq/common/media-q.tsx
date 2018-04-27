import React from 'react'
import warning from 'warning'

import { Types } from 'reactxx-basic'

import { onSubscribe, modifyRuleset } from 'reactxx-mediaq' // import platform dependent code

/************************
* RULESET TYPINGS
*************************/
export namespace TMediaQ {

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
  export type PropsX<TState extends string = string> = { $mediaq?: NotifyIntervalX<TState> | ((theme) => NotifyIntervalX<TState>) }
  export type NotifyIntervalX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export type NotifyIntervalDecoded<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }

  export interface CodeProps<TState extends string = string> { mediaqCode?: CodePropsItems<TState> }
  export type CodePropsItems<TState extends string = string> = { [P in TState]: boolean }

}

/************************
* EXPORTED
*************************/

export class MediaQ_AppContainer extends React.Component {
  constructor(props) {
    super(props)
    warning(!appContainer, 'Only single mediaq.AppContainer component instance allowed')
    appContainer = this
    mediaQBreaks = []
  }
  render() {
    return <context.Provider value={mediaQBreaks.map(b => b.active)}>
      {this.props.children}
    </context.Provider>
  }
}

export const refresh = () => {
  checkAppContainer()
  appContainer.forceUpdate()
}

export const mediaqGetNotifyBreakpoints = <T extends string>(props: TMediaQ.PropsX<T>, theme) => {
  const { $mediaq, ...rest } = props as TMediaQ.PropsX
  if (!$mediaq) return { usedNotifyBreakpoints: null as TMediaQ.NotifyIntervalDecoded<T>, observedBits: 0 }
  const mediaq = typeof $mediaq === 'function' ? $mediaq(theme) : $mediaq
  const newMedia = {} as TMediaQ.NotifyIntervalDecoded<T>
  let observedBits = 0
  for (const p in mediaq)
    newMedia[p] = mediaq[p].map((i, idx) => {
      if (!i) return idx == 0 ? BMin : BMax
      const breakpoint = subscribe(i, false)
      observedBits |= 1 << breakpoint.id
      return breakpoint
    }) as [TMediaQ.Breakpoint, TMediaQ.Breakpoint]

  return { usedNotifyBreakpoints: newMedia, observedBits: observedBits }
}

export const mediaqActualizetNotifyBreakpoints = <T extends string>(sheet: TMediaQ.NotifyIntervalDecoded<T>) => {
  if (!sheet) return null as TMediaQ.CodePropsItems<T>
  const res = {} as TMediaQ.CodePropsItems<T>
  for (const p in sheet) {
    const sheetp = sheet[p]
    res[p] = sheetp[0].active && !sheetp[1].active
  }
  return res
}

export const mediaqGetSheetBreakpoints = (sheet: TMediaQ.MediaQSheet) => {
  if (!sheet) return null
  let observedBits = 0
  const res: TMediaQ.MediaQRulesetDecoded[] = []
  for (const p in sheet) {
    const rs = sheet[p]
    if (!rs.$mediaq) continue
    const rsCode: TMediaQ.MediaQRulesetDecoded = { rulesetName: p, items: [] }
    res.push(rsCode)
    for (const pm in rs.$mediaq) {
      const interval = pm.split('-').map((i, idx) => {
        if (!i) return idx == 0 ? BMin : BMax
        const breakpoint = subscribe(parseInt(i), true)
        observedBits |= 1 << breakpoint.id
        return breakpoint
      })
      const rsCodeItem: TMediaQ.RulesetDecoded = {
        from: interval[0],
        to: interval[1],
        ruleset: rs.$mediaq[pm]
      }
      rsCode.items.push(rsCodeItem)
    }
  }
  return { usedSheetBreakpoints: observedBits === 0 ? null : res, observedBits: observedBits }
}

export const mediaqActualizeSheetBreakpoints = (classesIn: TMediaQ.MediaQSheet, usedSheetBreakpoints: TMediaQ.MediaQRulesetDecoded[]) => {
  if (!usedSheetBreakpoints) return classesIn
  const classes = { ...classesIn }
  usedSheetBreakpoints.forEach(used => {
    const ruleset = classes[used.rulesetName];
    warning(ruleset, `Missing ruleset ${used.rulesetName}`); //`
    classes[used.rulesetName] = modifyRuleset(ruleset, used.items)
  })
  return classes
}

export const mediaQProviderExists = () => !!appContainer

/************************
* PRIVATE
*************************/

const checkAppContainer = () => warning(mediaQBreaks, 'reactxx-mediaq: missing MediaQ_AppContainer component in your application root')

const subscribe = (value: number, inRuleset: boolean) => {
  checkAppContainer()
  if (inRuleset && window.isWeb) return { id: -1, value } // generate FELA media query ruleset
  let b = byValue[value]
  if (!b) {
    warning(mediaQBreaks.length <= 31, 'reactxx-mediaq: too many different breakpoints (max 32 allowed)')
    mediaQBreaks.push(b = { id: mediaQBreaks.length, value })
    byValue[value] = b
    onSubscribe(b, inRuleset)
  }
  return b
}

export let mediaQBreaks: TMediaQ.Breakpoint[]
let byValue: TMediaQ.Breakpoint[] = []
let counter = 0
let appContainer: MediaQ_AppContainer

const context = React.createContext<boolean[]>([], (prev, next) => {
  let res = 0
  for (let i = 0; i < Math.max(prev.length, next.length); i++) {
    if (i >= prev.length) res = res | 1 << i
    else if (i >= next.length) res = res | 1 << i
    else if (prev[i] !== next[i]) res = res | 1 << i
  }
  return res
})

const BMin: TMediaQ.Breakpoint = { active: true, id: -1, value: 0 }
const BMax: TMediaQ.Breakpoint = { active: false, id: -1, value: TMediaQ.Consts.maxBreakpoint }


export const MediaQConsumer = context.Consumer