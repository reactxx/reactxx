declare namespace MediaQ {

  type Shape = string

  type NotifySheetX<TState extends string> = {[P in TState]: [number | null, number | null]}

  interface ComponentsMediaQ<TState extends string> {
    state: {[P in TState]: boolean}
  }
  
  interface SheetX<T extends ReactXX.RulesetNative = ReactN.TextStyle, R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: ReactXX.RulesetX<T, R>
  }

  interface SheetXWeb<R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: React.CSSProperties & ReactXX.RulesetAddInX<never, R>
  }

  interface SheetXNative<T extends ReactXX.RulesetNative = ReactN.TextStyle, R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: T & ReactXX.RulesetAddInX<T, R>
  }

}