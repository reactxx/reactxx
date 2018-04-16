import { TSheets } from './sheets'
import { TAnimation } from './animation'
import { TMediaQ } from './media-q'
import { TTheme } from './theme'
import { TBasic } from 'reactxx-basic'
import { Muix } from 'reactxx-mui/typings/muix'

export namespace TAddInConfig {

  /******************************************
    ADD INS
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TBasic.RulesetNativeIds, R extends TBasic.Shape> { $overrides?: TBasic.PartialSheetX<R>; $name?: string; $mediaq?: TMediaQ.SheetX<T, R>; $props?: TSheets.PropsInRulesetX<R> }
  export interface SheetXAddIn<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }

  //******************** Platform specific
  export interface RulesetWithAddInWeb<R extends TSheets.Shape = TSheets.Shape> extends TBasic.RulesetWeb { $overrides?: TBasic.SheetWeb<R>; $name?: string; $props?: TSheets.PropsInRulesetWeb<R> }
  export type RulesetWithAddInNative<T extends TBasic.RulesetNativeIds = 'Text', R extends TSheets.Shape = TSheets.Shape> = TBasic.NativeRules<T> & { $overrides?: TBasic.SheetNative<R>; $name?: string; $props?: TSheets.PropsInRulesetNative<R> }
  export type RulesetWithAddIn<T extends TBasic.RulesetNativeIds = 'Text', R extends TSheets.Shape = TSheets.Shape> = (RulesetWithAddInNative<T, R> | RulesetWithAddInWeb<R>) & { $mediaq?: TMediaQ.SheetX<T, R> }
  export interface RulesetWithAddInAny { $overrides?; $name?; $props?}

  export interface SheetAddInWeb<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }
  export interface SheetAddInNative<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }


  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropX<R extends TBasic.Shape = TBasic.Shape> {
    style?: TTheme.RulesetCreatorX<R> //| RulesetWeb | getStyle<R> //cross platform style
    $web?: Partial<TBasic.getPropsWeb<R>> //web specific style
    $native?: Partial<TBasic.getPropsNative<R>> //native specific style
    ignore?: boolean
    classes?: TTheme.PartialSheetCreatorX<R> //| PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
    //modifyThemeState?: TTheme.ThemeModifier
    className?: TTheme.RulesetCreatorX<R> /*cross platform root ruleset*/ //| RulesetWeb | getStyle<R> /*platform specific root ruleset (when component is used in other component)*/
  }

  //******************** Platform specific
  export interface CodePropsWeb<R extends TBasic.Shape = TBasic.Shape> {
    theme: TTheme.ThemeX
    mergeRulesetWithOverrides: TSheets.MergeRulesetWithOverridesWeb
    animations: TAnimation.DriversWeb<TSheets.getAnimation<R>>
    mediaq: TMediaQ.ComponentsMediaQ<TSheets.getMediaQ<R>>
  }

  export interface CodePropsNative<R extends TBasic.Shape = TBasic.Shape>  {
    theme: TTheme.ThemeX
    mergeRulesetWithOverrides: TSheets.MergeRulesetWithOverridesNative
    animations: TAnimation.DriversNative<TSheets.getAnimation<R>>
    mediaq: TMediaQ.ComponentsMediaQ<TSheets.getMediaQ<R>>
  }
  export interface CodeProps<R extends TBasic.Shape = TBasic.Shape> {
    mergeRulesetWithOverrides: TSheets.MergeRulesetWithOverrides
    theme: TTheme.ThemeX
    animations: TAnimation.Drivers<TSheets.getAnimation<R>>
    mediaq: TMediaQ.ComponentsMediaQ<TSheets.getMediaQ<R>>
  }

}

export namespace TThemeConfig {
  export interface Theme extends Muix.Theme { }
}
