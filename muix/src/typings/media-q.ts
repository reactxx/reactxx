import ReactN from 'react-native'

import { SheetsT } from 'reactxx-typings'

export namespace MediaQ {

  export const enum Consts {
    maxBreakpoint = 10000000
  }

  export type Shape = string

  export type NotifySheetX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export interface ComponentsMediaQ<TState extends string> {
    state: { [P in TState]?: boolean }
  }

  export interface SheetX<T extends SheetsT.RulesetNative = ReactN.TextStyle, R extends SheetsT.Shape = SheetsT.Shape> {
    [query: string]: SheetsT.RulesetX<T, R>
  }

  export interface SheetXWeb<R extends SheetsT.Shape = SheetsT.Shape> {
    [query: string]: React.CSSProperties & SheetsT.RulesetAddInX<never, R>
  }

  export interface SheetXNative<T extends SheetsT.RulesetNative = ReactN.TextStyle, R extends SheetsT.Shape = SheetsT.Shape> {
    [query: string]: T & SheetsT.RulesetAddInX<T, R>
  }

  export interface Patch { start: number; end: number; ruleset: SheetsT.RulesetWithAddIn }

}
