import { TSheeter } from './index'

declare namespace TTheme {
  export interface Theme extends TSheeter.FakeInterface {
    $cache?: { [componentId: number]: TSheeter.Sheet }
  }

  export interface ThemeProviderProps<T extends {} = Theme> {
    registeredThemeName?: string
    theme?: T
  }

}
