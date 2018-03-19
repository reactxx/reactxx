import ReactN from 'react-native'

import { TSheets } from 'reactxx-typings'

export namespace TMediaQ {

  export const enum Consts {
    maxBreakpoint = 10000000
  }

  export type Shape = string

  export type NotifySheetX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export interface ComponentsMediaQ<TState extends string> {
    state: { [P in TState]?: boolean }
  }

  export interface SheetX<T extends TSheets.RulesetNative = ReactN.TextStyle, R extends TSheets.Shape = TSheets.Shape> {
    [query: string]: TSheets.RulesetX<T, R>
  }

  export interface SheetXWeb<R extends TSheets.Shape = TSheets.Shape> {
    [query: string]: React.CSSProperties & TSheets.RulesetAddInX<never, R>
  }

  export interface SheetXNative<T extends TSheets.RulesetNative = ReactN.TextStyle, R extends TSheets.Shape = TSheets.Shape> {
    [query: string]: T & TSheets.RulesetAddInX<T, R>
  }

  export interface Patch { start: number; end: number; ruleset: TSheets.RulesetWithAddIn }

}
