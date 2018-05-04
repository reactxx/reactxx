import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { TCommonStyles } from 'reactxx-basic'

import { TAddIn } from './add-in'

export namespace Types {

  /******************************************
    RULESET
  *******************************************/

  //*************** Cross platform ruleset for web and native

  export type RulesetX<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    {
      $native?: TCommonStyles.RulesetNative<T> // native specific rules
      $web?: TCommonStyles.RulesetWeb // web specific rules
      $props?: PropsInRulesetX<R>
    } &
    TAddIn.RulesetAddInX<T, R>

  export interface ViewRulesetX<TAddIn extends {} = {}> extends RulesetX<'View'> { }
  export interface TextRulesetX<TAddIn extends {} = {}> extends RulesetX<'Text'> { }
  export interface ImageRulesetX<TAddIn extends {} = {}> extends RulesetX<'Image'> { }
  export interface ScrollViewRulesetX<TAddIn extends {} = {}> extends RulesetX<'ScrollView'> { }

  //******************** Shape
  export interface Shape extends TAddIn.Shape {
    //**** sheet constrains
    common?: Record<string, TCommonStyles.RulesetNativeIds> // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
    native?: Record<string, TCommonStyles.RulesetNativeIds> // ruleset types, which are used only in native code
    web?: string | null // ruleset names, which are used only in web code (its export type is always React.CSSProperties)
    //******************** native style constrain
    style?: TCommonStyles.RulesetNativeIds // for native: export type of component style property (for web, style has always React.CSSProperties type)
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

  export interface ShapeDefault extends TAddIn.ShapeDefault {
    common: {}; native: {}; web: null
    style: 'View'
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    variant: never,
    theme: ThemeBase
    nameType: null
  }

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeScrollViews<P extends string> = { [p in P]: 'ScrollView' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }

  export type OverwriteShape<R extends Shape> = PartialOverwrite<ShapeDefault, R>

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddIn.SheetAddInX<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & TAddIn.SheetAddInX<R>

  export type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: Partial<RulesetX<getCommon<R>[P], R>> }
  export type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: { $native?: TCommonStyles.RulesetNative<getNative<R>[P]> } & TAddIn.RulesetAddInX<getNative<R>[P], R> }
  export type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: { $web?: TCommonStyles.RulesetWeb } & TAddIn.RulesetAddInX<getNative<R>[P], R> }

  export type SheetCreatorX<R extends Shape = Shape> = themeCreator<R, SheetX<R>>

  //******************** Platform specific sheet
  export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, TCommonStyles.RulesetWeb>
  export type SheetNative<R extends Shape = Shape> =
    { [P in keyof getCommon<R>]: TCommonStyles.RulesetNative<getCommon<R>[P]> } &
    { [P in keyof getNative<R>]: TCommonStyles.RulesetNative<getNative<R>[P]> }

  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  /******************************************
      CREATORS
   *******************************************/
  export type themeCreator<R extends Shape, T extends {}> = T | ((theme: getTheme<R>, variant: getVariant<R>) => T)
  export type RootRulesetCreatorX<R extends Shape = Shape, TRulesetAddIn extends {} = {}> = themeCreator<R, RulesetX<getStyle<R>, R>>
  export type PartialSheetCreatorX<R extends Shape = Shape> = themeCreator<R, PartialSheetX<R>>

  export interface ThemeBase {
    type?: 'ThemeX'
  }

  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types

  export type PropsX<R extends Shape = Shape> = PartialOverwrite<getProps<R>,
    {
      style?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<getStyle<R>, R>>
      $web?: Partial<getPropsWeb<R>> //web specific style
      $native?: Partial<getPropsNative<R>> //native specific style
      classes?: PartialSheetCreatorX<R> // cross platform sheet
      className?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<getStyle<R>, R>>
      developer_flag?: boolean
    } & TAddIn.PropX<R>
    >

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape = Shape> = React.SFC<PropsX<R>>

  //******************** Platform specific 

  export type omitPropNames = 'system' | 'style' | 'classes' | 'className' | keyof TAddIn.CodeProps

  // *** web
  export type CodePropsWeb<R extends Shape = Shape, TCodePropsWebAddIn extends {} = {}> = Omit<getProps<R> & getPropsWeb<R>, omitPropNames> & TCommonStyles.OnPressAllWeb & {
    system:
    {
      style: TCommonStyles.RulesetWeb
      classes: SheetWeb<R>
      developer_flag: boolean
    } & TAddIn.CodePropsWeb<R>
  }

  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // *** native
  export type CodePropsNative<R extends Shape = Shape> = Omit<getProps<R> & getPropsNative<R>, omitPropNames> & TCommonStyles.OnPressAllNative & {
    system:
    {
      style: TCommonStyles.RulesetNative<getStyle<R>>
      classes: SheetNative<R>
      developer_flag: boolean
    } & TAddIn.CodePropsNative<R>
  }

  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  export type CodeProps<R extends Shape = Shape> = Omit<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), omitPropNames> & (TCommonStyles.OnPressAllNative | TCommonStyles.OnPressAllWeb) & {
    system:
    {
      style: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<getStyle<R>>
      classes: Sheet<R>
      developer_flag: boolean
    } & TAddIn.CodeProps<R>
  }

  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape = Shape> = React.ComponentType<CodeProps<R>>

  /******************************************
      $props IN RULESETs
   *******************************************/
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    className?: never
  }>>



}
