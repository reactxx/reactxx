import * as MediaQ from 'reactxx-mediaq'

import { TBasic, TThemeConfig } from './basic'

export namespace TTheme {

  export interface WithStyleOptions {
    withTheme?: boolean // preference: props => component => typeof sheetCreator === 'function' => global
    withPropsModifier?: boolean // preference: props => component => global
  }

  export interface WithStyleOptions_Component<R extends TBasic.Shape =  TBasic.Shape> extends WithStyleOptions {
    getVariant?: (props: TBasic.PropsX<R> & MediaQ.CodeProps<TBasic.getMediaQ<R>>) => TBasic.getVariant<R>
    variantToString?: (variant: TBasic.getVariant<R>) => string
    defaultProps?: Partial<TBasic.PropsX<R>>
  }

  export type PartialSheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.PartialSheetX<R> | ((themeX: ThemeX, variant: TBasic.getVariant<R>) => TBasic.PartialSheetX<R>)
  export type SheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.SheetX<R> | ((themeX: ThemeX, variant: TBasic.getVariant<R>) => TBasic.SheetX<R>)
  //export type ThemeParCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.get_$CompTheme<R> | ((themeX: ThemeX) => TBasic.get_$CompTheme<R>)
  export type RulesetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.RulesetX<TBasic.getStyle<R>> | ((theme: ThemeX, variant: TBasic.getVariant<R>) => TBasic.RulesetX<TBasic.getStyle<R>>)

  export interface ThemeBase {
    type: 'ThemeX'
    $cache: {
      [P in string]?: { [id: string]: {} }
    }
  }
  export interface Theme extends TThemeConfig.Theme {
    type: 'Theme'
  }
  export type ThemeX = Partial<Overwrite<Theme, ThemeBase>>

  //export interface ThemeCompX<R extends TBasic.Shape = TBasic.Shape> { sheet?: TBasic.PartialSheetX<R>, par?: TBasic.get_$CompTheme<R> }
  //export interface ThemeCompSelectedX<R extends TBasic.Shape = TBasic.Shape> { theme: ThemeX, compThemeSheet?: TBasic.PartialSheetX<R>, compThemePar?: TBasic.get_$CompTheme<R> }

  //export interface ThemeCompCreatorX<R extends TBasic.Shape = TBasic.Shape> { sheet?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  //export type ThemeState = { theme: ThemeX } & { [P in keyof TBasic.Shapes]?: ThemeCompX<TBasic.Shapes[P]> }
  //export type ThemeModifier = (state: ThemeState) => ThemeState

  export interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  
}