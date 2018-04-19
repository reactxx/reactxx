//TODO
import { Muix } from 'reactxx-mui/typings/muix'

import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { Types, TCommonStyles } from 'reactxx-basic'

import { TSheets } from './sheets'
import { TAnimation } from 'reactxx-animation'
import { TMediaQ } from './media-q'
import { TTheme } from './theme'

//import { TAddInConfig } from './add-in'

//import { TCommonStyles } from './common-styles'

export namespace TBasic {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void

  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

  export type RulesetNativeIds = 'Text' | 'View' | 'Image' | 'ScrollView'


  /******************************************
    RULESET
  *******************************************/

  //*************** cross platform ruleset for web and native

  export type RulesetX<T extends Types.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    Types.RulesetX<T> &
    TAddInConfig.RulesetAddInX<T, R> // sheet addIn: sheet overriding, media query etc.
  export interface ViewRulesetX extends RulesetX<'View'> { }
  export interface TextRulesetX extends RulesetX<'Text'> { }
  export interface ImageRulesetX extends RulesetX<'Image'> { }
  export interface ScrollViewRulesetX extends RulesetX<'ScrollView'> { }

  //******************** Platform specific ruleset
  export type RulesetNative<T extends Types.RulesetNativeIds = never> =
    T extends 'Text' ? ReactN.TextStyle :
    T extends 'Image' ? ReactN.ImageStyle :
    T extends 'ScrollView' ? ReactN.ScrollViewStyle :
    T extends 'View' ? ReactN.ViewStyle :
    (ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle) & TAddInConfig.RulesetWithAddInAny

  export type RulesetWeb = CSS.Properties & { [P in CSS.SimplePseudos]?: CSS.Properties } & TAddInConfig.RulesetWithAddInAny // TAddInConfig.RulesetWithAddInWeb yield to error: recursive type using itself 
  export type Ruleset = RulesetWeb | RulesetNative

  /******************************************
    COMPONENT SHAPE
  *******************************************/
  export interface Shape {
    //**** sheet constrains
    common: Record<string, Types.RulesetNativeIds> // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
    native: Record<string, Types.RulesetNativeIds> // ruleset types, which are used only in native code
    web: string | null // ruleset names, which are used only in web code (its export type is always React.CSSProperties)
    //******************** native style constrain
    style: Types.RulesetNativeIds // for native: export type of component style property (for web, style has always React.CSSProperties type)
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: {} //native only props 
    propsWeb: React.HTMLAttributes<Element>//web only props
  }
  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddInConfig.SheetXAddIn<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & TAddInConfig.SheetXAddIn<R>

  //Cross platform sheet helpers
  export type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
  export type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: (RulesetNative<getNative<R>[P]> & TAddInConfig.RulesetAddInX<getNative<R>[P], R>) }
  export type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: (RulesetWeb & TAddInConfig.RulesetAddInX<never, R>) }

  //******************** Platform specific sheets
  export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, TAddInConfig.RulesetWithAddInWeb<R>> & TAddInConfig.SheetAddInWeb<R>
  export type SheetNative<R extends Shape = Shape> =
    { [P in keyof getCommon<R>]: TAddInConfig.RulesetWithAddInNative<getCommon<R>[P], R> } &
    { [P in keyof getNative<R>]: TAddInConfig.RulesetWithAddInNative<getNative<R>[P], R> } &
    TAddInConfig.SheetAddInNative<R>

  //export type Sheet<R extends Shape = Shape, T extends TPlatform = never> = T extends TPlatformWeb ? SheetWeb<R> : T extends TPlatformNative ? SheetNative<R> : SheetWeb<R> | SheetNative<R>
  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>


  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types
  export type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, TAddInConfig.PropX<R>>>

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //******************** Platform specific sheets
  // *** web
  export type CodePropsWeb<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsWeb<R>,
    {
      className_: RulesetWeb
      style: RulesetWeb
      classes: SheetWeb<R>
    } &
    TAddInConfig.CodePropsWeb<R> &
    OnPressAllWeb>

  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // *** native
  export type CodePropsNative<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsNative<R>,
    {
      className_: RulesetNative<getStyle<R>>
      style: RulesetNative<getStyle<R>>
      classes: SheetNative<R>
    } &
    TAddInConfig.CodePropsNative<R> &
    OnPressAllNative>

  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  export type CodeProps<R extends Shape = Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>),
    {
      className_: RulesetWeb | RulesetNative<getStyle<R>>
      style: RulesetWeb | RulesetNative<getStyle<R>>
      classes: Sheet<R>
    } &
    TAddInConfig.CodeProps<R> &
    (OnPressAllNative | OnPressAllWeb)>

  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

}

export function isType<TWeb>(arg): arg is TWeb { return window.isWeb }

export namespace TAddInConfig {

  /******************************************
    ADD INS
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends TBasic.RulesetNativeIds, R extends TBasic.Shape> { $overrides?: TBasic.PartialSheetX<R>; $name?: string; $mediaq?: TMediaQ.SheetX<T, R>; $props?: TSheets.PropsInRulesetX<R> }
  export interface SheetXAddIn<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }

  //******************** Platform specific
  export interface RulesetWithAddInWeb<R extends TSheets.Shape = TSheets.Shape> extends TBasic.RulesetWeb { $overrides?: TBasic.SheetWeb<R>; $name?: string; $props?: TSheets.PropsInRulesetWeb<R> }
  export type RulesetWithAddInNative<T extends TBasic.RulesetNativeIds = 'Text', R extends TSheets.Shape = TSheets.Shape> = TBasic.RulesetNative<T> & { $overrides?: TBasic.SheetNative<R>; $name?: string; $props?: TSheets.PropsInRulesetNative<R> }
  export type RulesetWithAddIn<T extends TBasic.RulesetNativeIds = 'Text', R extends TSheets.Shape = TSheets.Shape> = (RulesetWithAddInNative<T, R> | RulesetWithAddInWeb<R>) & { $mediaq?: TMediaQ.SheetX<T, R> }
  export interface RulesetWithAddInAny { $overrides?; $name?; $props?}

  export interface SheetAddInWeb<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }
  export interface SheetAddInNative<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }


  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropX<R extends TBasic.Shape = TBasic.Shape> {
    style?: TTheme.RulesetCreatorX<R> //cross platform style
    $web?: Partial<TBasic.getPropsWeb<R>> //web specific style
    $native?: Partial<TBasic.getPropsNative<R>> //native specific style
    ignore?: boolean
    classes?: TTheme.PartialSheetCreatorX<R> // cross platform sheet
    className?: TTheme.RulesetCreatorX<R> // cross platform root ruleset
  }

  //******************** Platform specific
  export interface CodePropsWeb<R extends TBasic.Shape = TBasic.Shape> {
    theme: TTheme.ThemeX
    mergeRulesetWithOverrides: TSheets.MergeRulesetWithOverridesWeb
    animations: TAnimation.DriversWeb<TSheets.getAnimation<R>>
    mediaq: TMediaQ.ComponentsMediaQ<TSheets.getMediaQ<R>>
  }

  export interface CodePropsNative<R extends TBasic.Shape = TBasic.Shape> {
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
