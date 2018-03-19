import { Theme as ThemeConfig, ThemeOptionsX as ThemeOptionsXConfig } from 'typescript-config'

export namespace ThemeT {

  export type PartialSheetCreatorX<R extends ReactXX.Shape = ReactXX.Shape> = ReactXX.PartialSheetX<R> | ((themeX: ThemeX, compThemePar: ReactXX.getCompTheme<R>) => ReactXX.PartialSheetX<R>)
  export type SheetCreatorX<R extends ReactXX.Shape = ReactXX.Shape> = ReactXX.SheetX<R> | ((themeX: ThemeX, compThemePar: ReactXX.getCompTheme<R>) => ReactXX.SheetX<R>)
  export type ThemeParCreatorX<R extends ReactXX.Shape = ReactXX.Shape> = ReactXX.getCompTheme<R> | ((themeX: ThemeX) => ReactXX.getCompTheme<R>)
  export type RulesetCreatorX<R extends ReactXX.Shape = ReactXX.Shape> = ReactXX.RulesetX<ReactXX.getStyle<R>> | ((theme: ThemeX, compThemePar: ReactXX.getCompTheme<R>) => ReactXX.RulesetX<ReactXX.getStyle<R>>)

  export interface Theme extends ThemeConfig {
    type: 'Theme'
  }
  export type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX' }>>

  export interface ThemeOptionsX extends ThemeOptionsXConfig {
  }

  export interface ThemeCompX<R extends ReactXX.Shape = ReactXX.Shape> { sheet?: ReactXX.PartialSheetX<R>, par?: ReactXX.getCompTheme<R> }
  export interface ThemeCompSelectedX<R extends ReactXX.Shape = ReactXX.Shape> { theme: ThemeX, compThemeSheet?: ReactXX.PartialSheetX<R>, compThemePar?: ReactXX.getCompTheme<R> }

  export interface ThemeCompCreatorX<R extends ReactXX.Shape = ReactXX.Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  export type ThemeState = { theme: ThemeX } & { [P in keyof ReactXX.Shapes]?: ThemeCompX<ReactXX.Shapes[P]> }
  export type ThemeModifier = (state: ThemeState) => ThemeState

  export interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  
}