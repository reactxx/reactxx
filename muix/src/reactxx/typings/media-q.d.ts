declare namespace MediaQ {
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