﻿import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { TCommonStyles, TCommon } from 'reactxx-basic'

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
  export interface Shape extends TCommon.Shape, TAddIn.Shape { }

  export interface ShapeDefault extends TAddIn.ShapeDefault {
    common: {}; native: {}; web: null
    style: 'View'
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    variant: never,
    theme: TCommon.ThemeBase
    nameType: null
  }

  export type OverwriteShape<R extends Shape> = PartialOverwrite<ShapeDefault, R>

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddIn.SheetAddInX<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & TAddIn.SheetAddInX<R>

  export type SheetXCommon<R extends Shape> = { [P in keyof TCommon.getCommon<R>]: Partial<RulesetX<TCommon.getCommon<R>[P], R>> }
  export type SheetXNative<R extends Shape> = { [P in keyof TCommon.getNative<R>]: { $native?: TCommonStyles.RulesetNative<TCommon.getNative<R>[P]> } & TAddIn.RulesetAddInX<TCommon.getNative<R>[P], R> }
  export type SheetXWeb<R extends Shape> = { [P in TCommon.getWeb<R>]: { $web?: TCommonStyles.RulesetWeb } & TAddIn.RulesetAddInX<TCommon.getNative<R>[P], R> }

  export type SheetCreatorX<R extends Shape = Shape> = themeCreator<R, SheetX<R>>

  //******************** Platform specific sheet
  export type SheetWeb<R extends Shape = Shape> = Record<(keyof TCommon.getCommon<R>) | TCommon.getWeb<R>, TCommonStyles.RulesetWeb>
  export type SheetNative<R extends Shape = Shape> =
    { [P in keyof TCommon.getCommon<R>]: TCommonStyles.RulesetNative<TCommon.getCommon<R>[P]> } &
    { [P in keyof TCommon.getNative<R>]: TCommonStyles.RulesetNative<TCommon.getNative<R>[P]> }

  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  /******************************************
      CREATORS
   *******************************************/
  export type themeCreator<R extends Shape, T extends {}> = T | ((theme: TCommon.getTheme<R>, variant: TCommon.getVariant<R>) => T)
  export type RootRulesetCreatorX<R extends Shape = Shape, TRulesetAddIn extends {} = {}> = themeCreator<R, RulesetX<TCommon.getStyle<R>, R>>
  export type PartialSheetCreatorX<R extends Shape = Shape> = themeCreator<R, PartialSheetX<R>>

  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types

  export type PropsX<R extends Shape = Shape> = PartialOverwrite<TCommon.getProps<R>,
    {
      style?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<TCommon.getStyle<R>, R>>
      $web?: Partial<TCommon.getPropsWeb<R>> //web specific style
      $native?: Partial<TCommon.getPropsNative<R>> //native specific style
      classes?: PartialSheetCreatorX<R> // cross platform sheet
      className?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<TCommon.getStyle<R>, R>>
      developer_flag?: boolean
    } & TAddIn.PropX<R>
    >

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape = Shape> = React.SFC<PropsX<R>>

  //******************** Platform specific 

  export type omitPropNames = 'system' | 'style' | 'classes' | 'className' | keyof TAddIn.CodeProps

  // *** web
  export type CodePropsWeb<R extends Shape = Shape, TCodePropsWebAddIn extends {} = {}> = Omit<TCommon.getProps<R> & TCommon.getPropsWeb<R>, omitPropNames> & TCommonStyles.OnPressAllWeb & {
    system:
    {
      style: TCommonStyles.RulesetWeb
      classes: SheetWeb<R>
      developer_flag: boolean
    } & TAddIn.CodePropsWeb<R>
  }

  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // *** native
  export type CodePropsNative<R extends Shape = Shape> = Omit<TCommon.getProps<R> & TCommon.getPropsNative<R>, omitPropNames> & TCommonStyles.OnPressAllNative & {
    system:
    {
      style: TCommonStyles.RulesetNative<TCommon.getStyle<R>>
      classes: SheetNative<R>
      developer_flag: boolean
    } & TAddIn.CodePropsNative<R>
  }

  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  export type CodeProps<R extends Shape = Shape> = Omit<TCommon.getProps<R> & (TCommon.getPropsNative<R> | TCommon.getPropsWeb<R>), omitPropNames> & (TCommonStyles.OnPressAllNative | TCommonStyles.OnPressAllWeb) & {
    system:
    {
      style: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<TCommon.getStyle<R>>
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
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<TCommon.getProps<R>, {
    $web?: Partial<TCommon.getPropsWeb<R>> //web specific style
    $native?: Partial<TCommon.getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    className?: never
  }>>


  /******************************************
      THEME
   *******************************************/
  export type PropsXOverwrite<R extends Types.Shape> = PartialOverwrite<Types.PropsX<R>, {
    style?: Types.RulesetX<TCommon.getStyle<R>>
    classes?: Types.PartialSheetX<R>
    className?: Types.RulesetX<TCommon.getStyle<R>>
  }>

  export interface WithStyleOptions_ComponentX<R extends Types.Shape =  Types.Shape> extends TCommon.WithStyleOptions {
    getVariant?: (props: Types.PropsX<R> & TAddIn.GetVariant<R>, theme?: TCommon.getTheme<R>) => TCommon.getVariant<R>
    variantToString?: (variant: TCommon.getVariant<R>) => string
    defaultProps?: PropsXOverwrite<R>
  }

}