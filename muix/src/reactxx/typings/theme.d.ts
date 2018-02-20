declare namespace ReactXX {

  interface Theme {
    direction: Direction
    //overrides?: Sheets
  }

  interface ThemeOptionsX {
  }

  type Direction = 'ltr' | 'rtl';

  type ThemeContextValue = { theme: Theme }
  type OverridesContext = { childOverrides: Sheets }

  interface ThemerProps {
    creator: ThemeCreator
    defaultOptions?: ThemeOptionsX
  }

  type ThemeCreator = (options?: ThemeOptionsX) => Theme

  interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  interface AppContainerProps { themerProps: ThemerProps }


}