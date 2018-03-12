//https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js
declare namespace ReactXX {

    type PartialSheetCreatorX<R extends Shape = Shape> = PartialSheetX<R> | ((themeX: ThemeX, compThemePar: getCompTheme<R>) => PartialSheetX<R>)
  type SheetCreatorX<R extends Shape = Shape> = SheetX<R> | ((themeX: ThemeX, compThemePar: getCompTheme<R>) => SheetX<R>)
  type ThemeParCreatorX<R extends Shape = Shape> = getCompTheme<R> | ((themeX: ThemeX) => getCompTheme<R>)
  type RulesetCreatorX<R extends Shape = Shape> = RulesetX<getStyle<R>> | ((theme: ThemeX, compThemePar: getCompTheme<R>) => RulesetX<getStyle<R>>)

  interface Theme {
    type: 'Theme'
  }
  type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX'}>>

  interface ThemeOptionsX {
  }

  //type Direction = 'ltr' | 'rtl';

  //type ThemeContextValue = { theme: Theme }
  //interface ThemeStatesX { theme: Theme; overrides?: OverridesX }

  interface ThemeCompX<R extends Shape = Shape> { sheet?: PartialSheetX<R>, par?: getCompTheme<R> }
  interface ThemeCompSelectedX<R extends Shape = Shape> { theme: ThemeX, compThemeSheet?: PartialSheetX<R>, compThemePar?: getCompTheme<R> }

  interface ThemeCompCreatorX<R extends Shape = Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  type ThemeState = { theme: ThemeX } & {[P in keyof Shapes]?: ThemeCompX<Shapes[P]> }
  type ThemeModifier = (state: ThemeState) => ThemeState

  //type ThemeStateX<R extends Shape = Shape> = { theme: Theme; override?: PartialSheetX<R> }
  
  //interface ThemerProps {
  //  creator: ThemeCreator
  //  defaultOptions?: ThemeOptionsX
  //}

  //type ThemeCreator = (options?: ThemeOptionsX) => Theme

  interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  //interface AppContainerProps { themerProps: ThemerProps }


}
