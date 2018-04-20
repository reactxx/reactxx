import { TBasic, TThemeConfig } from './basic'

export namespace TTheme {

  export type PartialSheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.PartialSheetX<R> | ((themeX: ThemeX, compThemePar: TBasic.getCompTheme<R>) => TBasic.PartialSheetX<R>)
  export type SheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.SheetX<R> | ((themeX: ThemeX, compThemePar: TBasic.getCompTheme<R>) => TBasic.SheetX<R>)
  export type ThemeParCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.getCompTheme<R> | ((themeX: ThemeX) => TBasic.getCompTheme<R>)
  export type RulesetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.RulesetX<TBasic.getStyle<R>> | ((theme: ThemeX, compThemePar: TBasic.getCompTheme<R>) => TBasic.RulesetX<TBasic.getStyle<R>>)

  export interface Theme extends TThemeConfig.Theme {
    type: 'Theme'
  }
  export type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX' }>>

  export interface ThemeCompX<R extends TBasic.Shape = TBasic.Shape> { sheet?: TBasic.PartialSheetX<R>, par?: TBasic.getCompTheme<R> }
  export interface ThemeCompSelectedX<R extends TBasic.Shape = TBasic.Shape> { theme: ThemeX, compThemeSheet?: TBasic.PartialSheetX<R>, compThemePar?: TBasic.getCompTheme<R> }

  export interface ThemeCompCreatorX<R extends TBasic.Shape = TBasic.Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  export type ThemeState = { theme: ThemeX } & { [P in keyof TBasic.Shapes]?: ThemeCompX<TBasic.Shapes[P]> }
  export type ThemeModifier = (state: ThemeState) => ThemeState

  export interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  
}