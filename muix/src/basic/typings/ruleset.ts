import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { TCommonStyles } from './common-styles'
import { Type } from 'material-ui/Table';

export namespace Types {

  /******************************************
    RULESET
  *******************************************/

  export type RulesetNativeIds = 'Text' | 'View' | 'Image' | 'ScrollView'

  //*************** Cross platform ruleset for web and native

  export type RulesetX<T extends RulesetNativeIds = 'Text', R extends Shape = Shape> = RulesetWithAddInX<T, R>

  export type RulesetWithAddInX<T extends RulesetNativeIds = 'Text', R extends Shape = Shape, TAddIn extends {} = {}> =
    RulesetCommon<T> & // native rules which are compatible with web
    {
      $native?: RulesetNative<T> // native specific rules
      $web?: RulesetWeb // web specific rules
    } & TAddIn
    

  export interface ViewRulesetX<TAddIn extends {} = {}> extends RulesetX<'View'> { }
  export interface TextRulesetX<TAddIn extends {} = {}> extends RulesetX<'Text'> { }
  export interface ImageRulesetX<TAddIn extends {} = {}> extends RulesetX<'Image'> { }
  export interface ScrollViewRulesetX<TAddIn extends {} = {}> extends RulesetX<'ScrollView'> { }

  //******************** Native ruleset which are compatible with web
  export type RulesetCommon<T extends RulesetNativeIds> =
    T extends 'Text' ? TCommonStyles.TextStyle :
    T extends 'Image' ? TCommonStyles.ImageStyle :
    T extends 'ScrollView' ? TCommonStyles.ScrollViewStyle :
    TCommonStyles.ViewStyle

  //******************** Platform specific ruleset
  export type RulesetNative<T extends RulesetNativeIds = never> =
    T extends 'Text' ? ReactN.TextStyle :
    T extends 'Image' ? ReactN.ImageStyle :
    T extends 'ScrollView' ? ReactN.ScrollViewStyle :
    ReactN.ViewStyle

  export type RulesetWeb = CSS.Properties & { [P in CSS.SimplePseudos]?: CSS.Properties }
  export type Ruleset<T extends RulesetNativeIds = 'Text'> = RulesetWeb | RulesetNative<T>

  //******************** Shape
  export interface Shape {
    //**** sheet constrains
    common?: Record<string, RulesetNativeIds> // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
    native?: Record<string, RulesetNativeIds> // ruleset types, which are used only in native code
    web?: string | null // ruleset names, which are used only in web code (its export type is always React.CSSProperties)
    //******************** native style constrain
    style?: RulesetNativeIds // for native: export type of component style property (for web, style has always React.CSSProperties type)
    //**** component property constrains
    props?: {} //common (web and native) props
    propsNative?: {} //native only props 
    propsWeb?: React.HTMLAttributes<Element>//web only props
    //**** export type of component name
    nameType?: string | null
    //**** component theme par
    variant?: {}
    //**** component theme par
    theme?: ThemeBase
  }
  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getNameType<R extends Shape> = R['nameType']
  export type getVariant<R extends Shape = Shape> = R['variant']
  export type getTheme<R extends Shape = Shape> = R['theme']

  export interface ShapeDefault {
    common: {}; native: {}; web: null
    style: 'View'
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    variant: never,
    theme: ThemeBase
    nameType: null
  }

  export type OverwriteShape<R extends Shape> = PartialOverwrite<ShapeDefault, R>

  //******************** Sheets
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>>

  type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
  type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: RulesetNative<getNative<R>[P]> }
  type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: RulesetWeb }

  export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWeb>
  export type SheetNative<R extends Shape = Shape> =
    { [P in keyof getCommon<R>]: RulesetNative<getCommon<R>[P]> } &
    { [P in keyof getNative<R>]: RulesetNative<getNative<R>[P]> }

  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  /******************************************
      CREATORS
   *******************************************/
  export type themeCreator<R extends Shape, T extends {}> = T | ((theme: Types.getTheme<R>, variant: Types.getVariant<R>) => T)
  export type RootRulesetCreatorX<R extends Shape = Shape, TRulesetAddIn extends {} = {}> = themeCreator<R, RulesetWithAddInX<Types.getStyle<R>, R, TRulesetAddIn>>
  export type PartialSheetCreatorX<R extends Shape = Shape> = themeCreator<R, PartialSheetX<R>>

  export interface ThemeBase {
    type?: 'ThemeX'
  }

  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types

  export type PropsX<R extends Shape, PartialSheetX extends PartialSheet<R> = PartialSheet<R>, TRulesetAddIn extends {} = {}, TPropsAddIn extends {} = {}> = PartialOverwrite<getProps<R>,
    {
      style?: RootRulesetCreatorX<R, TRulesetAddIn> //TTheme.RootRulesetCreatorX<R> //cross platform style
      $web?: Partial<Types.getPropsWeb<R>> //web specific style
      $native?: Partial<Types.getPropsNative<R>> //native specific style
      classes?: themeCreator<R, PartialSheetX> // cross platform sheet
      className?: RootRulesetCreatorX<R, TRulesetAddIn> //TTheme.RootRulesetCreatorX<R> // cross platform root ruleset
      developer_flag?: boolean
    } & TPropsAddIn
    >

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape = Shape> = React.SFC<PropsX<R>>

  //******************** Platform specific 

  export type omitPropNames = 'system' | 'style' | 'classes' | 'className'

  // *** web
  export type CodePropsWeb<R extends Shape = Shape, TCodePropsWebAddIn extends {} = {}> = Omit<Types.getProps<R> & Types.getPropsWeb<R>, omitPropNames | keyof TCodePropsWebAddIn> & Types.OnPressAllWeb & {
    system:
    {
      style: Types.RulesetWeb
      classes: Types.SheetWeb<R>
      developer_flag: boolean
    } & TCodePropsWebAddIn
  }

  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // *** native
  export type CodePropsNative<R extends Shape = Shape, TCodePropsNativeAddIn extends {} = {}> = Omit<Types.getProps<R> & Types.getPropsNative<R>, omitPropNames | keyof TCodePropsNativeAddIn> & Types.OnPressAllNative & {
    system:
    {
      style: Types.RulesetNative<Types.getStyle<R>>
      classes: Types.SheetNative<R>
      developer_flag: boolean
    } & TCodePropsNativeAddIn
  }

  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  export type CodeProps<R extends Shape = Shape, TCodePropsAddIn extends {} = {}> = Omit<Types.getProps<R> & (Types.getPropsNative<R> | Types.getPropsWeb<R>), omitPropNames | keyof TCodePropsAddIn> & (Types.OnPressAllNative | Types.OnPressAllWeb) & {
    system:
    {
      style: Types.RulesetWeb | Types.RulesetNative<Types.getStyle<R>>
      classes: Types.Sheet<R>
      developer_flag: boolean
    } & TCodePropsAddIn
  }

  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape = Shape> = React.ComponentType<CodeProps<R>>

  /******************************************
    EVENTS
  *******************************************/

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void

  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }


  /******************************************
      $props IN RULESETs
   *******************************************/
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<Types.getProps<R>, {
    $web?: Partial<Types.getPropsWeb<R>> //web specific style
    $native?: Partial<Types.getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    className?: never
  }>>



}
