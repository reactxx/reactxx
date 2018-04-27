import React from 'react'
import warning from 'warning'

import { Types } from 'reactxx-basic'

import { onSubscribe, modifyRuleset } from 'reactxx-mediaq' // import platform dependent code

export namespace TMediaQ {

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
  export type MediaQSheet = { [P in string]: RulesetWithAddIn }

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
  export type NotifyIntervalCreator<TState extends string = string> = NotifyIntervalX<TState> | ((theme) => NotifyIntervalX<TState>)
  export type NotifyIntervalX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export type NotifyIntervalDecoded<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }

  export interface CodeProps<TState extends string = string> { mediaqCode?: MediaRecord<TState> }
  export type MediaRecord<TState extends string = string> = { [P in TState]: boolean }

  export interface MediaQComponentProps {
    children: () => React.ReactNode
    notifyIntervals: NotifyIntervalCreator
    theme?
    onNotifyRecord: (mediaNotifyRecord: TMediaQ.MediaRecord) => MediaQSheet
    onAfterSheet?: (sheet: MediaQSheet) => void
  }

}

/************************
* EXPORTED
*************************/

export class MediaQComponent extends React.Component<TMediaQ.MediaQComponentProps> {
  render() {
    const { notifyIntervals, theme } = this.props
    this.mediaqGetNotifyBreakpointsResult = mediaqGetNotifyBreakpoints(notifyIntervals, theme)
    return this.MediaQConsumer_RenderIfNeeded(this.mediaqGetNotifyBreakpointsResult.observedBits, this.AFTER_NOTIFY)
  }
  mediaqGetNotifyBreakpointsResult: { usedNotifyBreakpoints: TMediaQ.NotifyIntervalDecoded, observedBits: number }

  AFTER_NOTIFY = () => {
    const { usedNotifyBreakpoints, observedBits: ob } = this.mediaqGetNotifyBreakpointsResult
    // actualize media record with respect to actual screen size 
    const mediaNotifyRecord = ob === 0 ? null : mediaqActualizetNotifyBreakpoints(usedNotifyBreakpoints)
    // prepare platform dependent sheet
    const sheet = this.props.onNotifyRecord(mediaNotifyRecord)
    // get media breakpoints, used in sheet
    this.mediaqGetSheetBreakpointsResult = mediaqGetSheetBreakpoints(sheet)
    // observe for screen size changing
    return this.MediaQConsumer_RenderIfNeeded(this.mediaqGetSheetBreakpointsResult.observedBits, this.AFTER_SHEET)
  }
  mediaqGetSheetBreakpointsResult: { usedSheetBreakpoints: TMediaQ.MediaQRulesetDecoded[], observedBits: number, codeSheet: TMediaQ.MediaQSheet }

  AFTER_SHEET = () => {
    const { mediaqGetSheetBreakpointsResult: { usedSheetBreakpoints, observedBits, codeSheet } } = this
    // actualize sheet with respect to actual screen size 
    const afterMediaQSheet = observedBits !== 0 ? mediaqActualizeSheetBreakpoints(codeSheet, usedSheetBreakpoints) : codeSheet
    this.props.onAfterSheet(afterMediaQSheet)
    // returns statefull animation component, which: compute platform specific animation part of the sheet, change its state when animation opens x closes.
    return this.props.children()
  }

  MediaQConsumer_RenderIfNeeded(observedBits: number, child: () => React.ReactNode) {
    return observedBits === 0 ? child() : <MediaQConsumer unstable_observedBits={observedBits}>{child}</MediaQConsumer>
  }

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
  appContainer.forceUpdate()
}


/************************
* PRIVATE
*************************/

const mediaqGetNotifyBreakpoints = <T extends string>($mediaq: TMediaQ.NotifyIntervalCreator, theme) => {
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

const mediaqActualizetNotifyBreakpoints = <T extends string>(sheet: TMediaQ.NotifyIntervalDecoded<T>) => {
  if (!sheet) return null as TMediaQ.MediaRecord<T>
  const res = {} as TMediaQ.MediaRecord<T>
  for (const p in sheet) {
    const sheetp = sheet[p]
    res[p] = sheetp[0].active && !sheetp[1].active
  }
  return res
}

const mediaqGetSheetBreakpoints = (sheet: TMediaQ.MediaQSheet) => {
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
  return { usedSheetBreakpoints: observedBits === 0 ? null : res, observedBits: observedBits, codeSheet: sheet }
}

const mediaqActualizeSheetBreakpoints = (classesIn: TMediaQ.MediaQSheet, usedSheetBreakpoints: TMediaQ.MediaQRulesetDecoded[]) => {
  if (!usedSheetBreakpoints) return classesIn
  const classes: TMediaQ.MediaQSheet = { ...classesIn }
  usedSheetBreakpoints.forEach(used => {
    const ruleset = classes[used.rulesetName];
    warning(ruleset, `Missing ruleset ${used.rulesetName}`); //`
    classes[used.rulesetName] = modifyRuleset(ruleset, used.items)
  })
  return classes
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