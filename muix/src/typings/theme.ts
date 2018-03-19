import { SheetsT } from 'reactxx-typings'

import { Theme as ThemeConfig, ThemeOptionsX as ThemeOptionsXConfig } from 'typescript-config'

export namespace ThemeT {

  export type PartialSheetCreatorX<R extends SheetsT.Shape = SheetsT.Shape> = SheetsT.PartialSheetX<R> | ((themeX: ThemeX, compThemePar: SheetsT.getCompTheme<R>) => SheetsT.PartialSheetX<R>)
  export type SheetCreatorX<R extends SheetsT.Shape = SheetsT.Shape> = SheetsT.SheetX<R> | ((themeX: ThemeX, compThemePar: SheetsT.getCompTheme<R>) => SheetsT.SheetX<R>)
  export type ThemeParCreatorX<R extends SheetsT.Shape = SheetsT.Shape> = SheetsT.getCompTheme<R> | ((themeX: ThemeX) => SheetsT.getCompTheme<R>)
  export type RulesetCreatorX<R extends SheetsT.Shape = SheetsT.Shape> = SheetsT.RulesetX<SheetsT.getStyle<R>> | ((theme: ThemeX, compThemePar: SheetsT.getCompTheme<R>) => SheetsT.RulesetX<SheetsT.getStyle<R>>)

  export interface Theme extends ThemeConfig {
    type: 'Theme'
  }
  export type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX' }>>

  export interface ThemeOptionsX extends ThemeOptionsXConfig {
  }

  export interface ThemeCompX<R extends SheetsT.Shape = SheetsT.Shape> { sheet?: SheetsT.PartialSheetX<R>, par?: SheetsT.getCompTheme<R> }
  export interface ThemeCompSelectedX<R extends SheetsT.Shape = SheetsT.Shape> { theme: ThemeX, compThemeSheet?: SheetsT.PartialSheetX<R>, compThemePar?: SheetsT.getCompTheme<R> }

  export interface ThemeCompCreatorX<R extends SheetsT.Shape = SheetsT.Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  export type ThemeState = { theme: ThemeX } & { [P in keyof SheetsT.Shapes]?: ThemeCompX<SheetsT.Shapes[P]> }
  export type ThemeModifier = (state: ThemeState) => ThemeState

  export interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  
}