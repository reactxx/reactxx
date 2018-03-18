export { }

declare global {
  namespace ReactXX {

    type PartialSheetCreatorX<R extends Shape = Shape> = PartialSheetX<R> | ((themeX: ThemeX, compThemePar: getCompTheme<R>) => PartialSheetX<R>)
    type SheetCreatorX<R extends Shape = Shape> = SheetX<R> | ((themeX: ThemeX, compThemePar: getCompTheme<R>) => SheetX<R>)
    type ThemeParCreatorX<R extends Shape = Shape> = getCompTheme<R> | ((themeX: ThemeX) => getCompTheme<R>)
    type RulesetCreatorX<R extends Shape = Shape> = RulesetX<getStyle<R>> | ((theme: ThemeX, compThemePar: getCompTheme<R>) => RulesetX<getStyle<R>>)

    interface Theme {
      type: 'Theme'
    }
    type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX' }>>

    interface ThemeOptionsX {
    }

    interface ThemeCompX<R extends Shape = Shape> { sheet?: PartialSheetX<R>, par?: getCompTheme<R> }
    interface ThemeCompSelectedX<R extends Shape = Shape> { theme: ThemeX, compThemeSheet?: PartialSheetX<R>, compThemePar?: getCompTheme<R> }

    interface ThemeCompCreatorX<R extends Shape = Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

    type ThemeState = { theme: ThemeX } & { [P in keyof Shapes]?: ThemeCompX<Shapes[P]> }
    type ThemeModifier = (state: ThemeState) => ThemeState

    interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }


  }
}