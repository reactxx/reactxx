declare namespace ReactXX {

  interface ComponentsTheme { }

  interface Theme {
    direction: Direction
    //components?: ComponentsTheme
    //overrides?: Sheets
  }

  interface ThemeOptionsX {
  }

  type Direction = 'ltr' | 'rtl';

  type ThemeContextValue = { theme: Theme }
  type ThemeExContextValue = { themeEx: { theme: Theme; childOverrides: Sheets; componentsTheme: ComponentsTheme } }

  interface ThemerProps {
    creator: ThemeCreator
    defaultOptions?: ThemeOptionsX
  }

  type ThemeCreator = (options?: ThemeOptionsX) => Theme

  interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  interface AppContainerProps { themerProps: ThemerProps }


}