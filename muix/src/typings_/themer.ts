import { TSheeter } from 'reactxx-typings';

export namespace TTheme {
  export interface Theme {
    $cache?: { [componentId: number]: TSheeter.Sheet }
  }

  export interface ThemeProviderProps<T extends {} = Theme> {
    registeredThemeName?: string
    theme?: T
  }

}
