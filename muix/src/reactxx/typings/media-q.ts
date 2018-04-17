import ReactN from 'react-native'

import { Types } from 'reactxx-basic'

import { TBasic, TAddInConfig } from './basic'

export namespace TMediaQ {

  export const enum Consts {
    maxBreakpoint = 10000000
  }

  export type Shape = string

  export type NotifySheetX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export interface ComponentsMediaQ<TState extends string> {
    state: { [P in TState]?: boolean }
  }

  export interface SheetX<T extends Types.RulesetNativeIds = 'Text', R extends TBasic.Shape = TBasic.Shape> {
    [query: string]: TBasic.RulesetX<T, R>
  }

  export interface Patch { start: number; end: number; ruleset: TAddInConfig.RulesetWithAddIn }

}
