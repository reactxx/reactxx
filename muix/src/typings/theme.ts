import { TSheets } from 'reactxx-typings'
import { TBasic } from 'reactxx-basic/typings'

import { TThemeConfig } from 'typescript-config'

export namespace TTheme {

  export type PartialSheetCreatorX<R extends TSheets.Shape = TSheets.Shape> = TSheets.PartialSheetX<R> | ((themeX: ThemeX, compThemePar: TSheets.getCompTheme<R>) => TSheets.PartialSheetX<R>)
  export type SheetCreatorX<R extends TSheets.Shape = TSheets.Shape> = TSheets.SheetX<R> | ((themeX: ThemeX, compThemePar: TSheets.getCompTheme<R>) => TSheets.SheetX<R>)
  export type ThemeParCreatorX<R extends TSheets.Shape = TSheets.Shape> = TSheets.getCompTheme<R> | ((themeX: ThemeX) => TSheets.getCompTheme<R>)
  export type RulesetCreatorX<R extends TSheets.Shape = TSheets.Shape> = TBasic.RulesetX<TBasic.getStyle<R>> | ((theme: ThemeX, compThemePar: TSheets.getCompTheme<R>) => TBasic.RulesetX<TBasic.getStyle<R>>)

  export interface Theme extends TThemeConfig.Theme {
    type: 'Theme'
  }
  export type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX' }>>

  export interface ThemeCompX<R extends TSheets.Shape = TSheets.Shape> { sheet?: TSheets.PartialSheetX<R>, par?: TSheets.getCompTheme<R> }
  export interface ThemeCompSelectedX<R extends TSheets.Shape = TSheets.Shape> { theme: ThemeX, compThemeSheet?: TSheets.PartialSheetX<R>, compThemePar?: TSheets.getCompTheme<R> }

  export interface ThemeCompCreatorX<R extends TSheets.Shape = TSheets.Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  export type ThemeState = { theme: ThemeX } & { [P in keyof TSheets.Shapes]?: ThemeCompX<TSheets.Shapes[P]> }
  export type ThemeModifier = (state: ThemeState) => ThemeState

  export interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  
}