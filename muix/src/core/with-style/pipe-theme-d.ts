import { TSheeter } from '../index-d'

export namespace TTheme {
  export interface Theme { 
    $cache?: {[componentId: number]: TSheeter.Sheet}
  }

  export interface ThemeProviderProps<T extends Theme = Theme> { 
    registeredThemeName?: string
    theme?: T
  }

  export type GetDefaultTheme = () => Theme
}