import React, { Component } from 'react';
import ReactN from 'react-native';
import { TCommonStyles } from 'reactxx-basic';
import { TCommon } from 'reactxx-basic';
import { Ruleset as SheeterRuleset } from 'reactxx-styler';
import { TAddIn } from './add-in';
import * as Sheeter from 'reactxx-styler';

export namespace Types {

  /******************************************
    RULESET
  *******************************************/

  //*************** Cross platform ruleset for web and native
  export interface RulesetXPureLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> {
    $native?: TCommonStyles.RulesetNative<T> // native specific rules
    $web?: TCommonStyles.RulesetWeb // web specific rules
    $before?: RulesetX<T, R>
    $after?: RulesetX<T, R>
    //AddIns
    $mediaq?: { [query: string]: RulesetX<T> }
    $switch?: Types.PartialSheetX<R>
  }

  export type RulesetXPure<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    RulesetXPureLow<T, R>

  export type RulesetX<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> = RulesetXPure<T, R> & TAddIn.RulesetAddInX<T, R>

  export interface ViewRulesetX extends RulesetX<'View'> { }
  export interface TextRulesetX extends RulesetX<'Text'> { }
  export interface ImageRulesetX extends RulesetX<'Image'> { }

  //******************** Shape
  export interface Shape extends TCommon.Shape, TAddIn.Shape { }

  export interface ShapeDefault<TWeb extends string = null, TEvents extends string = null> {
    common: TCommon.EmptySheet
    native: TCommon.EmptySheet
    web: TWeb
    style: string
    events: TEvents
    props: {}
    propsNative: ReactN.ViewProperties
    propsWeb: React.DOMAttributes<Element>
    variant: never,
    theme: TCommon.ThemeBase
  }

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddIn.SheetX<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & DeepPartial<TAddIn.SheetX<R>>

  export type SheetXCommon<R extends Shape> = { [P in keyof TCommon.getCommon<R>]: Partial<RulesetX<TCommon.getCommon<R>[P], R>> }
  export type SheetXNative<R extends Shape> = { [P in keyof TCommon.getNative<R>]: { $native?: TCommonStyles.RulesetNative<TCommon.getNative<R>[P]> }
    & TAddIn.RulesetAddInX<TCommon.getNative<R>[P], R> }
  export type SheetXWeb<R extends Shape> = { [P in TCommon.getWeb<R>]: { $web?: TCommonStyles.RulesetWeb } & TAddIn.RulesetAddInX<'Text', R> }

  export type SheetCreatorX<R extends Shape = Shape> = themeCreator<R, SheetX<R>>

  //******************** Platform specific sheet
  export type RulesetNamesWeb<R extends Shape = Shape> = keyof TCommon.getCommon<R> | TCommon.getWeb<R>
  export type RulesetNamesNative<R extends Shape = Shape> = keyof TCommon.getCommon<R> | keyof TCommon.getNative<R>
  export type RulesetNames<R extends Shape = Shape> = keyof TCommon.getCommon<R> | TCommon.getWeb<R> | keyof TCommon.getNative<R>

  export type SheetWeb<R extends Shape = Shape> = PartialRecord<RulesetNamesWeb<R>, SheeterRuleset>
  export type SheetNative<R extends Shape = Shape> = PartialRecord<RulesetNamesNative<R>, SheeterRuleset>
  export type Sheet<R extends Shape = Shape> = PartialRecord<RulesetNames<R>, SheeterRuleset>

  /******************************************
      CREATORS
   *******************************************/
  export type themeCreator<R extends Shape, T extends {}> = T | ((theme: TCommon.getTheme<R>, variant?: TCommon.getVariant<R>) => T)
  export type RootRulesetCreatorX<R extends Shape = Shape, TRulesetAddIn extends {} = {}> = themeCreator<R, RulesetX<TCommon.getStyle<R>, R>>
  export type PartialSheetCreatorX<R extends Shape = Shape> = themeCreator<R, PartialSheetX<R>>

  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types
  export type ThemedPropsX<R extends Shape = Shape> = (theme: TCommon.getTheme<R>) => PropsX<R>

  export interface PropsXEx<R extends Shape = Shape> {
    style?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<TCommon.getStyle<R>, R>>
    $web?: Partial<TCommon.getPropsWeb<R>> //web specific props
    $native?: Partial<TCommon.getPropsNative<R>> //native specific props
    $themedProps?: ThemedPropsX<R>
    classes?: PartialSheetCreatorX<R> // cross platform sheet
    className?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<TCommon.getStyle<R>, R>>
  }
  export type PropsX<R extends Shape = Shape> = PartialOverwrite<
    TCommon.getProps<R>,
    PropsXEx<R> & TEventsX<R> & TAddIn.PropsX<R>
    >

  export type TEventsX<R extends Shape = Shape> = PartialRecord<TCommon.getEvents<R>, MouseEventEx<R>>
  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape = Shape> = React.SFC<PropsX<R>>

  //******************** Platform specific 

  export type omitPropNames = 'system' | 'style' | 'classes' | 'className' | keyof TAddIn.CodeProps

  export type TMergeRulesetsResult<T extends TCommonStyles.RulesetNativeIds | 'Web' | {}> =
    T extends TCommonStyles.RulesetNativeIdsLow ? TCommonStyles.RulesetNative<T> :
    T extends 'Web' ? TCommonStyles.RulesetWeb : T

  export type CodeSystem<R extends Shape = Shape> =
    {
      theme?: TCommon.getTheme<R>
      variant?: TCommon.getVariant<R>
      mergeRulesets?: <T extends TCommonStyles.RulesetNativeIds | 'Web' | {}>(...rulesets) => TMergeRulesetsResult<T>
    } &
    TEventsX<R>  // events passed to cross platform component, used in custom component


  // *** web
  export type CodePropsWeb<R extends Shape = Shape> =
    OmitPartial<TCommon.getProps<R> & TCommon.getPropsWeb<R>, omitPropNames> &
    Types.OnPressAllWeb &
    TAddIn.CodeProps<R> &
    {
      // style?: TCommonStyles.RulesetWeb
      // className?: TCommonStyles.RulesetWeb
      // classes?: SheetWeb<R>
      style?: { [rule: string]: any }
      className?: { [rule: string]: any } | string
      classes?: { [ruleset: string]: any }
      children?: React.ReactNode
      $system?: $SystemLow<R>
    }
  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  //// *** native
  export type CodePropsNative<R extends Shape = Shape> =
    OmitPartial<TCommon.getProps<R> & TCommon.getPropsNative<R>, omitPropNames> &
    Types.OnPressAllNative &
    TAddIn.CodeProps<R> &
    {
      //style: TCommonStyles.RulesetNative<TCommon.getStyle<R>>
      className: TCommonStyles.RulesetNative<TCommon.getStyle<R>>
      classes: SheetNative<R>
      children?: React.ReactNode
      $system?: $SystemLow<R>
    }
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  type $SystemLow<R extends Shape = Shape> =
    TEventsX<R>
    & {
      theme?: TCommon.getTheme<R>
      variant?: TCommon.getVariant<R>
      classNames?: <T extends TCommonStyles.RulesetNativeIds | 'Web' | {}> (...rulesets) => TMergeRulesetsResult<T>
      classNamesStr?: (...rulesets) => string
      classNamesAny?: (Component, ...rulesets) => string | TMergeRulesetsResult<any>
      $ignore?: boolean
      $constant?: boolean
      $developer_flag?: boolean
      $developer_RenderCounter?: number,
    }
    & Sheeter.AddIns


  export type CodeProps<R extends Shape = Shape> =
    OmitPartial<TCommon.getProps<R> & (TCommon.getPropsNative<R> | TCommon.getPropsWeb<R>), omitPropNames> &
    Types.OnPressAllNative &
    Types.OnPressAllWeb &
    TAddIn.CodeProps<R> &
    {
      $system?: $SystemLow<R>
      children?: React.ReactNode
      style?: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<TCommon.getStyle<R>>
      className?: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<TCommon.getStyle<R>>
      classes?: Sheet<R>
    }

  export type PartialCodeProps<R extends Shape = Shape> = Partial<CodeProps<Shape>>


  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape = Shape> = React.ComponentType<CodeProps<R>>

  /******************************************
      OPTIONS AND STYLES FROM PROPS
   *******************************************/

  export interface SeparatedProps {
    classes?: Types.PartialSheetCreatorX
    className?: Types.RootRulesetCreatorX
    style?: Types.RootRulesetCreatorX
    $themedProps?: Types.ThemedPropsX
    rest?: Types.PropsX
  }

  // all classes's, className's and style's, accumulated from 
  export interface AccumulatedStylesFromProps {
    classes: Types.PartialSheetCreatorX[]
    className: Types.RootRulesetCreatorX[]
    style: Types.RootRulesetCreatorX[]
  }


  export interface WithStyleOptions_ComponentX<R extends Types.Shape =  Types.Shape> extends TCommon.WithStyleOptions {
    getVariant?: (props: Types.CodeProps<R>, theme?: TCommon.getTheme<R>) => TCommon.getVariant<R>
    variantToString?: (variant: TCommon.getVariant<R>) => string
    defaultProps?: Types.PropsX<R>
  }

  /******************************************
    EVENTS
  *******************************************/

  export interface MouseEventPar<R extends Types.Shape = Types.Shape> extends React.MouseEvent<Element> { current?: CodeProps<R> }
  export type MouseEventEx<R extends Types.Shape = Types.Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  export interface OnPressX<R extends Types.Shape = Types.Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  export interface OnPressAllX<R extends Types.Shape = Types.Shape> extends OnPressX<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }

  export interface NativeEventPar<R extends Types.Shape = Types.Shape> extends ReactN.GestureResponderEvent { current?: CodeProps<R> }
  export interface OnPressAllNative { onPress?: () => void; onPressIn?: () => void; onPressOut?: () => void; onLongPress?: () => void }

}
