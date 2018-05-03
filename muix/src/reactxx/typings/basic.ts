//TODO - remove to MUI package
import { Muix } from 'reactxx-mui/typings/muix'

import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { Types, TCommonStyles } from 'reactxx-basic'
import { TMediaQ } from 'reactxx-mediaq'
import { TActivable } from 'reactxx-activable'

import { TAnimation } from 'reactxx-animation'
import { TTheme } from '../common/theme'

export namespace TBasic {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

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
    //**** export type of component name
    nameType?: string | null
    //**** animation shape
    animation?: TAnimation.Shapes
    //**** mediaq shape
    mediaq?: string | null
    //**** component theme par
    variant?: {}
    //**** component theme par
    theme?: TTheme.ThemeBase
    //**** activable
    activable?: boolean | never
  }
  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getAnimation<R extends Shape> = R['animation']
  export type getNameType<R extends Shape> = R['nameType']
  //export type get_$CompTheme<R extends Shape = Shape> = R['_$compTheme']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']
  export type getVariant<R extends Shape = Shape> = R['variant']
  export type getTheme<R extends Shape = Shape> = R['theme']
  export type getActivable<R extends Shape = Shape> = R['activable']

  //export interface Shapes { }

  //******************** Helpers for Shape.common and Shape.native definitin
  export type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
    common: {}; native: {}; web: null
    style: 'View'
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    animation: {}; mediaq: null,
    nameType: null
    variant: never,
    theme: TTheme.ThemeBase
    activable: never
  }, R>

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddInConfig.SheetAddInX<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & TAddInConfig.SheetAddInX<R>

  //Cross platform sheet helpers
  export type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
  export type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: (RulesetNative<getNative<R>[P]> & TAddInConfig.RulesetAddInX<getNative<R>[P], R>) }
  export type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: (RulesetWeb & TAddInConfig.RulesetAddInX<never, R>) }

  //******************** Platform specific sheets
  export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, TAddInConfig.RulesetWithAddInWeb<R>> //& TAddInConfig.SheetAddInWeb<R>
  export type SheetNative<R extends Shape = Shape> =
    { [P in keyof getCommon<R>]: TAddInConfig.RulesetWithAddInNative<getCommon<R>[P], R> } &
    { [P in keyof getNative<R>]: TAddInConfig.RulesetWithAddInNative<getNative<R>[P], R> }
  //TAddInConfig.SheetAddInNative<R>

  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>


  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types
  export type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>,
    {
      style?: TTheme.RulesetCreatorX<R> //cross platform style
      $web?: Partial<TBasic.getPropsWeb<R>> //web specific style
      $native?: Partial<TBasic.getPropsNative<R>> //native specific style
      classes?: TTheme.PartialSheetCreatorX<R> // cross platform sheet
      className?: TTheme.RulesetCreatorX<R> // cross platform root ruleset
      developer_log?: boolean
    } &
    TAddInConfig.PropX<R>
    >>

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape = Shape> = React.SFC<PropsX<R>>


  //******************** Platform specific sheets
  export type omitPropNames = 'system' | 'style' | 'classes' | 'className' | keyof TAddInConfig.CodePropsWeb

  // *** web
  export type CodePropsWeb<R extends Shape = Shape> = Omit<getProps<R> & getPropsWeb<R>, omitPropNames> & Types.OnPressAllWeb & {
    system:
    {
      style: RulesetWeb
      classes: SheetWeb<R>
      developer_log: boolean
    } &
    TAddInConfig.CodePropsWeb<R> 
  }

  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // *** native
  export type CodePropsNative<R extends Shape = Shape> = Omit<getProps<R> & getPropsNative<R>, omitPropNames> & Types.OnPressAllNative & {
    system:
    {
      style: RulesetNative<getStyle<R>>
      classes: SheetNative<R>
      developer_log: boolean
    } &
    TAddInConfig.CodePropsNative<R> 
  }

  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  export type CodeProps<R extends Shape = Shape> = Omit<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), omitPropNames> & (Types.OnPressAllNative | Types.OnPressAllWeb) & {
    system:
    {
      style: RulesetWeb | RulesetNative<getStyle<R>>
      classes: Sheet<R>
      developer_log: boolean
    } &
    TAddInConfig.CodeProps<R>
  }

  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape = TBasic.Shape> = React.ComponentType<CodeProps<R>>

  /******************************************
     $props IN RULESETs
  *******************************************/
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<TBasic.getProps<R>, {
    $web?: Partial<TBasic.getPropsWeb<R>> //web specific style
    $native?: Partial<TBasic.getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    childClasses?: never
    className?: never
  }>>

  export type PropsInRulesetWeb<R extends Shape = Shape> = TBasic.getProps<R> & TBasic.getPropsWeb<R>
  export type PropsInRulesetNative<R extends Shape = Shape> = TBasic.getProps<R> & TBasic.getPropsNative<R>
  export type PropsInRuleset<R extends Shape = Shape> = TBasic.getProps<R> & (TBasic.getPropsNative<R> | TBasic.getPropsWeb<R>)

  /******************************************
     OBSOLETE
  *******************************************/

  export type MergeRulesetWithOverrides = (...rulesets: (TAddInConfig.RulesetWithAddIn | boolean)[]) => TBasic.Ruleset
  export type MergeRulesetWithOverridesNative = (...rulesets: (TAddInConfig.RulesetWithAddInNative | ReactN.TextStyle | boolean)[]) => TBasic.RulesetNative
  export type MergeRulesetWithOverridesWeb = (...rulesets: (TAddInConfig.RulesetWithAddInWeb | boolean)[]) => TBasic.RulesetWeb
}

export function isType<TWeb>(arg): arg is TWeb { return window.isWeb }

export namespace TAddInConfig {

  /******************************************
    ADD INS
  *******************************************/

  //******************** Cross platform
  export interface RulesetAddInX<T extends Types.RulesetNativeIds, R extends TBasic.Shape> extends TMediaQ.MediaQRulesetPartX<T> { $overrides?: TBasic.PartialSheetX<R>; $name?: string; $props?: TBasic.PropsInRulesetX<R> }
  export interface SheetAddInX<R extends TBasic.Shape = TBasic.Shape> { $animations?: TAnimation.SheetsX<TBasic.getAnimation<R>> }

  //******************** Platform specific
  export interface RulesetWithAddInWeb<R extends TBasic.Shape = TBasic.Shape> extends TBasic.RulesetWeb, TMediaQ.MediaQRulesetPart { $overrides?: TBasic.SheetWeb<R>; $name?: string; $props?: TBasic.PropsInRulesetWeb<R> }
  export type RulesetWithAddInNative<T extends Types.RulesetNativeIds = 'Text', R extends TBasic.Shape = TBasic.Shape> = TBasic.RulesetNative<T> & TMediaQ.MediaQRulesetPart & { $overrides?: TBasic.SheetNative<R>; $name?: string; $props?: TBasic.PropsInRulesetNative<R> }
  export type RulesetWithAddIn<T extends Types.RulesetNativeIds = 'Text', R extends TBasic.Shape = TBasic.Shape> = (RulesetWithAddInNative<T, R> | RulesetWithAddInWeb<R>)
  export interface RulesetWithAddInAny { $overrides?; $name?; $props?}

  //export interface SheetAddInWeb<R extends TBasic.Shape = TBasic.Shape> { } //$animations?: TAnimation.SheetsX<TBasic.getAnimation<R>> }
  //export interface SheetAddInNative<R extends TBasic.Shape = TBasic.Shape> { } //$animations?: TAnimation.SheetsX<TBasic.getAnimation<R>> }


  /******************************************
    COMPONENT PROPS
  *******************************************/

  //******************** Cross platform 
  export interface PropX<R extends TBasic.Shape = TBasic.Shape> {
    ignore?: boolean
    CONSTANT?: boolean,
    $mediaq?: TMediaQ.NotifyIntervalCreator<TBasic.getMediaQ<R>>
    $active?: TBasic.getActivable<R> extends boolean ? boolean : never
  }

  //******************** Platform specific
  export interface CodePropsWeb<R extends TBasic.Shape = TBasic.Shape> {
    theme: TBasic.getTheme<R>
    variant: TBasic.getVariant<R>
    mergeRulesetWithOverrides: TBasic.MergeRulesetWithOverridesWeb
    animations: TAnimation.DriversWeb<TBasic.getAnimation<R>>
    mediaqFlags: TMediaQ.MediaFlags<TBasic.getMediaQ<R>>
    activeFlag?: TBasic.getActivable<R>
  }

  export interface CodePropsNative<R extends TBasic.Shape = TBasic.Shape> {
    theme: TBasic.getTheme<R>
    variant: TBasic.getVariant<R>
    mergeRulesetWithOverrides: TBasic.MergeRulesetWithOverridesNative
    animations: TAnimation.DriversNative<TBasic.getAnimation<R>>
    mediaqFlags: TMediaQ.MediaFlags<TBasic.getMediaQ<R>>
    activeFlag?: TBasic.getActivable<R>
  }

  export interface CodeProps<R extends TBasic.Shape = TBasic.Shape> {
    mergeRulesetWithOverrides: TBasic.MergeRulesetWithOverrides
    theme: TBasic.getTheme<R>
    variant: TBasic.getVariant<R>
    animations: TAnimation.Drivers<TBasic.getAnimation<R>>
    mediaqFlags: TMediaQ.MediaFlags<TBasic.getMediaQ<R>>
    activeFlag?: TBasic.getActivable<R>
  }

}
