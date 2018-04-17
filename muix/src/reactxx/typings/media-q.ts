import ReactN from 'react-native'

import { Types } from 'reactxx-basic2'

import { TAddInConfig } from './add-in'
import { TBasic } from './basic'

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

  //export interface SheetXWeb<R extends TBasic.Shape = TBasic.Shape> {
  //  [query: string]: React.CSSProperties & TAddInConfig.RulesetAddInX<never, R>
  //}

  //export interface SheetXNative<T extends Types.RulesetNativeIds = 'Text', R extends TBasic.Shape = TBasic.Shape> {
  //  [query: string]: T & TAddInConfig.RulesetAddInX<T, R>
  //}

  export interface Patch { start: number; end: number; ruleset: TAddInConfig.RulesetWithAddIn }

}