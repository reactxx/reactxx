import * as MediaQ from 'reactxx-mediaq'

import { TBasic, TThemeConfig } from './basic'

export namespace TTheme {

  export interface WithStyleOptions {
    withTheme?: boolean // preference: props => component => typeof sheetCreator === 'function' => global
    withCascading?: boolean // preference: props => component => global
  }

  export interface WithStyleOptions_Component<R extends TBasic.Shape =  TBasic.Shape> extends WithStyleOptions {
    getVariant?: (props: TBasic.PropsX<R> & MediaQ.CodeProps<TBasic.getMediaQ<R>>, theme?: TBasic.getTheme<R>) => TBasic.getVariant<R>
    variantToString?: (variant: TBasic.getVariant<R>) => string
    defaultProps?: Partial<TBasic.PropsX<R>>
  }

  export type PartialSheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.PartialSheetX<R> | ((themeX: TBasic.getTheme<R>, variant: TBasic.getVariant<R>) => TBasic.PartialSheetX<R>)
  export type SheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.SheetX<R> | ((themeX: TBasic.getTheme<R>, variant: TBasic.getVariant<R>) => TBasic.SheetX<R>)
  export type RulesetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.RulesetX<TBasic.getStyle<R>> | ((theme: TBasic.getTheme<R>, variant: TBasic.getVariant<R>) => TBasic.RulesetX<TBasic.getStyle<R>>)

  export interface ThemeBase {
    type?: 'ThemeX'
  }
  export interface Theme extends TThemeConfig.Theme {
    type: 'Theme'
  }
  export type ThemeX = Partial<Overwrite<Theme, ThemeBase>>
  
}