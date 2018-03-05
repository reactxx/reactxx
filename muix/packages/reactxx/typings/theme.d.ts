//https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js
declare namespace ReactXX {

  type ThemePars = { [name: string]: {} }
  type OverridesX = { [name: string]: PartialCreateSheetX }
  type PartialCreateSheetX<R extends Shape = Shape> = PartialSheetX<R> | ((theme: ReactXX.Theme, themePar) => PartialSheetX<R>)
  type CreateSheetX<R extends Shape = Shape> = SheetX<R> | ((theme: ReactXX.Theme, themePar: getThemePar<R>) => SheetX<R>)
  type CreateRulesetX<R extends Shape = Shape> = RulesetX<getStyle<R>> | ((theme: ReactXX.Theme, themePar) => RulesetX<getStyle<R>>)

  interface Theme {
    direction: Direction
    //components?: ComponentsTheme
    themePars: ThemePars
    //overridesNew?: FromThemeValueOrCreator<Sheets>
  }

  interface ThemeOptionsX {
  }

  type Direction = 'ltr' | 'rtl';

  type ThemeContextValue = { theme: Theme }
  type ThemeStatesX = { theme: Theme; overrides?: OverridesX }
  type ThemeStateX<R extends Shape = Shape> = { theme: Theme; override?: PartialSheetX<R> }
  type ThemeModifier = (state: ThemeStatesX) => ThemeStatesX

  interface ThemerProps {
    creator: ThemeCreator
    defaultOptions?: ThemeOptionsX
  }

  type ThemeCreator = (options?: ThemeOptionsX) => Theme

  interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  interface AppContainerProps { themerProps: ThemerProps }


}