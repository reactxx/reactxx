export namespace MediaQ {

  export const enum Consts {
    maxBreakpoint = 10000000
  }

  export type Shape = string

  export type NotifySheetX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export interface ComponentsMediaQ<TState extends string> {
    state: { [P in TState]?: boolean }
  }

  export interface SheetX<T extends ReactXX.RulesetNative = ReactN.TextStyle, R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: ReactXX.RulesetX<T, R>
  }

  export interface SheetXWeb<R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: React.CSSProperties & ReactXX.RulesetAddInX<never, R>
  }

  export interface SheetXNative<T extends ReactXX.RulesetNative = ReactN.TextStyle, R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: T & ReactXX.RulesetAddInX<T, R>
  }

  export interface Patch { start: number; end: number; ruleset: ReactXX.RulesetWithAddIn }

}
