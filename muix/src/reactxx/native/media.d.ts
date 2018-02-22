declare namespace Media {
  interface MediaSheetX<T extends ReactXX.RulesetNative = ReactN.TextStyle, R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: ReactXX.RulesetX<T, R>
  }

  interface MediaSheetXWeb<R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: React.CSSProperties & ReactXX.SheetOverridesX<R>
  }

  interface MediaSheetXNative<T extends ReactXX.RulesetNative = ReactN.TextStyle, R extends ReactXX.Shape = ReactXX.Shape> {
    [query: string]: T & ReactXX.SheetOverridesX<R>
  }

}