import React from 'react'
import warning from 'warning'

import { Types, TCommonStyles } from 'reactxx-basic'

import { onSubscribe, modifyRuleset } from 'reactxx-mediaq' // import platform dependent code

export namespace TMediaQ {

  /************************
  * RULESET TYPINGS
  *************************/
  //*** Cross platform:

  // Ruleset
  export type RulesetWithAddInX<T extends TCommonStyles.RulesetNativeIds = 'Text'> = Types.RulesetX & MediaQRulesetPartX<T>

  // $mediaq ruleset part. 'query' has '-640' or '640-1024' or '1024-' format
  export interface MediaQRulesetPartX<T extends TCommonStyles.RulesetNativeIds = 'Text'> {
    $mediaq?: { [query: string]: Types.RulesetX<T> }
  }

  //*** Platform dependent
  export type MediaQSheet = { [P in string]: RulesetWithAddIn }

  export type RulesetWithAddIn = TCommonStyles.Ruleset & MediaQRulesetPart

  export interface MediaQRulesetPart {
    $mediaq?: { [query: string]: TCommonStyles.Ruleset }
  }

  //*** decoded MediaQSheet
  export interface MediaQRulesetDecoded {
    rulesetName: string // ruleset name in sheet
    items: RulesetDecoded[] // decoded MediaQRulesetPartX
  }

  export interface RulesetDecoded {
    from: Breakpoint
    to: Breakpoint
    ruleset: TCommonStyles.Ruleset
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
  export type NotifyIntervalCreator<TState extends string = string> = NotifyIntervalX<TState> | ((theme) => NotifyIntervalX<TState>)
  export type NotifyIntervalX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export type NotifyIntervalDecoded<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }

  export interface CodeProps<TState extends string = string> { mediaqFlags?: MediaFlags<TState> }
  export type MediaFlags<TState extends string = string> = { [P in TState]: boolean }

}

/************************
* EXPORTED
*************************/

export const mediaQFlags = <T extends string>(input: () => { $mediaq: TMediaQ.NotifyIntervalCreator<T>; theme? }, output: (outputPar: TMediaQ.MediaFlags<T>) => void, next: () => React.ReactNode) => {
  let getNotifyBreakpointsResult: ReturnType<typeof getNotifyBreakpoints>
  const render = () => {
    const { notifyBreakpoints, observedBits: ob } = getNotifyBreakpointsResult
    const mediaqFlags = ob === 0 ? null : getMediaCode(notifyBreakpoints)
    output(mediaqFlags as TMediaQ.MediaFlags<T>)
    return next()
  }
  const res = () => {
    const { $mediaq, theme } = input()
    getNotifyBreakpointsResult = getNotifyBreakpoints($mediaq, theme)
    if (getNotifyBreakpointsResult.observedBits !== 0) return <MediaQConsumer unstable_observedBits={getNotifyBreakpointsResult.observedBits}>{render}</MediaQConsumer>
    output(null)
    return next()
  }
  return res
}

export const mediaQSheet = <T extends string>(input: () => TMediaQ.MediaQSheet, output: (outputPar: TMediaQ.MediaQSheet) => void, next: () => React.ReactNode) => {
  let breaks: ReturnType<typeof getSheetBreakpoints>
  let codeSheet: TMediaQ.MediaQSheet
  const render = () => {
    const sheetPatch = getSheetPatch(breaks.observedBits === 0, codeSheet, breaks.sheetBreakpoints)
    output(sheetPatch)
    return next()
  }
  const res = () => {
    codeSheet = input()
    breaks = getSheetBreakpoints(codeSheet)
    if (breaks.observedBits !== 0) return <MediaQConsumer unstable_observedBits={breaks.observedBits}>{render}</MediaQConsumer>
    output(null)
    return next()
  }
  return res
}

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

export const mediaQProviderExists = () => !!appContainer

export const refresh = () => {
  checkAppContainer()
  appContainer.setState({})
}

export const breaksToString = (start: number, end: number) => `${start ? start : ''}-${end ? end : ''}`


/************************
* PRIVATE
*************************/

const getNotifyBreakpoints = <T extends string>($mediaq: TMediaQ.NotifyIntervalCreator, theme) => {
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

  return { notifyBreakpoints: newMedia, observedBits: observedBits }
}

const getMediaCode = <T extends string>(sheet: TMediaQ.NotifyIntervalDecoded<T>) => {
  if (!sheet) return null as TMediaQ.MediaFlags<T>
  const res = {} as TMediaQ.MediaFlags<T>
  for (const p in sheet) {
    const sheetp = sheet[p]
    res[p] = sheetp[0].active && !sheetp[1].active
  }
  return res
}

const getSheetBreakpoints = (sheet: TMediaQ.MediaQSheet) => {
  let observedBits = 0
  const res: TMediaQ.MediaQRulesetDecoded[] = []
  for (const p in sheet) {
    const rs = sheet[p]
    if (!rs || !rs.$mediaq) continue
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
  return { sheetBreakpoints: observedBits === 0 ? null : res, observedBits: observedBits }
}

const getSheetPatch = (ignore: boolean, classesIn: TMediaQ.MediaQSheet, usedSheetBreakpoints: TMediaQ.MediaQRulesetDecoded[]) => {
  if (ignore || !usedSheetBreakpoints) return null
  const classesOut: TMediaQ.MediaQSheet = { }
  usedSheetBreakpoints.forEach(used => {
    const ruleset = classesIn[used.rulesetName];
    warning(ruleset, `Missing ruleset ${used.rulesetName}`); //`
    classesOut[used.rulesetName] = modifyRuleset(ruleset, used.items)
  })
  return classesOut
}

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
  for (let i = 0; i < Math.max(prev.length, next.length); i++)
    if (i >= prev.length || i >= next.length || prev[i] !== next[i]) res |= 1 << i
  return res
})

const BMin: TMediaQ.Breakpoint = { active: true, id: -1, value: 0 }
const BMax: TMediaQ.Breakpoint = { active: false, id: -1, value: TMediaQ.Consts.maxBreakpoint }


export const MediaQConsumer = context.Consumer