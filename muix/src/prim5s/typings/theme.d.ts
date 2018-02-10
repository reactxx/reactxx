declare namespace Prim5s {

  interface Theme {
    direction: Direction
    overrides?: Sheets
  }

  type ThemeOptionsX = Partial<Overwrite<Theme, {
    overrides?: SheetsX
  }>>

  type Direction = 'ltr' | 'rtl';

  type MuiThemeContextValue = { theme: Theme }
  type MuiCascadingContext = { childCascading: Sheets }

  interface ThemerProps {
    creator: ThemeCreator
    defaultOptions?: ThemeOptionsX
  }

  type ThemeCreator = (options: ThemeOptionsX) => Theme

  interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  interface AppContainerProps { themerProps: ThemerProps }


}