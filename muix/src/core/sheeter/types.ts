﻿import React from 'react'
import ReactN from 'react-native'

import { TCommonStyles } from './common-styles'

export namespace Types {

  /******************************************
    RULESET
  *******************************************/

  //*************** Cross platform ruleset for web and native
  export interface RulesetLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> extends RulesetInnerLow<R> {
    name?: string
    $native?: TCommonStyles.RulesetNative<T> // native specific rules
    $web?: TCommonStyles.RulesetWeb // web specific rules
    $before?: RulesetInner<T, R>
    $after?: RulesetInner<T, R>
  }

  export interface RulesetInnerLow<R extends Shape = Shape> {
    $whenUsed?: PartialSheet<R>
    $mediaq?: Record<string, RulesetInner<R>> // record key has format eg. '-640' or '640-1024' or '1024-'
    $animation?: any
  }

  export type Ruleset<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    RulesetLow<T, R>

  export type RulesetInner<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    RulesetInnerLow<R>

  // export interface ViewRulesetX extends RulesetX<'View'> { }
  // export interface TextRulesetX extends RulesetX<'Text'> { }
  // export interface ImageRulesetX extends RulesetX<'Image'> { }

  /******************************************
    STYLE
  *******************************************/

  //*************** Cross platform ruleset for web and native
  export interface StyleLow<T extends TCommonStyles.RulesetNativeIds = 'Text'> {
    $native?: TCommonStyles.RulesetNative<T> // native specific rules
    $web?: TCommonStyles.RulesetWeb // web specific rules
  }

  export type Style<T extends TCommonStyles.RulesetNativeIds = 'Text'> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    StyleLow<T>


  /******************************************
      SHEET
  *******************************************/

  export type Sheet<R extends Shape = Shape> = SheetCommon<R> & SheetNative<R> & SheetWeb<R>
  export type PartialSheet<R extends Shape = Shape> = Partial<SheetCommon<R> & SheetNative<R> & SheetWeb<R>>

  export type SheetCommon<R extends Shape> = { [P in keyof getCommon<R>]: Partial<Ruleset<getCommon<R>[P], R>> }
  export type SheetNative<R extends Shape> = { [P in keyof getNative<R>]: { $native?: TCommonStyles.RulesetNative<getNative<R>[P]> } }
  export type SheetWeb<R extends Shape> = { [P in getWeb<R>]: { $web?: TCommonStyles.RulesetWeb } }

  /******************************************
    SHAPE
  *******************************************/

  // Shape for generic default, e.g. "interface X<R extends Shape = Shape> {} " 
  export interface Shape {
    //**** sheet constrains
    common?: EmptyInterface // rulesets (and their native type), which are used in both web and native component code. Rule are compatible with web and native.
    native?: EmptyInterface // rulesets, which are used only in native code
    web?: string // ruleset names, which are used only in web code (its type is always React.CSSProperties)
    //******************** style constrain
    style?: TCommonStyles.RulesetNativeIds // for web, style has always React.CSSProperties type
    //**** component property constrains
    props?: EmptyInterface // common (web and native) props, excluding events
    propsNative?: EmptyInterface // native only props 
    propsWeb?: React.HTMLAttributes<Element>// web only props
    events?: TEventsAll | null // common events
  }

  // ancestor for Shape inheritance
  export interface ShapeAncestor<TWeb extends string = null, TEvents extends string = null> {
    common: EmptyInterface
    native: EmptyInterface
    web: TWeb
    style: string
    events: TEvents
    props: EmptyInterface
    propsNative: ReactN.ViewProperties
    propsWeb: React.DOMAttributes<Element>
  }

  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getEvents<R extends Shape = Shape> = R['events']

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }

  export interface EmptyInterface { }


  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** Cross platform component types

  export interface PropsLow<R extends Shape = Shape> {
    style?: Style<getStyle<R>>
    $web?: Partial<getPropsWeb<R>> //web specific props
    $native?: Partial<getPropsNative<R>> //native specific props
    classes?: PartialSheet<R> // cross platform sheet
    className?: RulesetInner<getStyle<R>, R>
  }
  export type Props<R extends Shape = Shape> =
    PartialOverwrite<getProps<R>, PropsLow<R> & TEventsX<R>>

  export type TEventsX<R extends Shape = Shape> = PartialRecord<getEvents<R>, MouseEventEx<R>>
  export type ComponentTypeX<R extends Shape> = React.ComponentType<Props<R>>
  export type SFCX<R extends Shape = Shape> = React.SFC<Props<R>>

  //******************** Platform specific 

  export type omitPropNames = 'style' | 'classes' | 'className' | '$system'

  export type CodeSystem<R extends Shape = Shape> = TEventsX<R>


  // *** web
  export type CodePropsWeb<R extends Shape = Shape> =
    OmitPartial<getProps<R> & getPropsWeb<R>, omitPropNames> &
    OnPressAllWeb &
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
    OmitPartial<getProps<R> & getPropsNative<R>, omitPropNames> &
    Types.OnPressAllNative &
    {
      //style: TCommonStyles.RulesetNative<getStyle<R>>
      className: TCommonStyles.RulesetNative<getStyle<R>>
      children?: React.ReactNode
      $system?: $SystemLow<R>
    }
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  // *** web or native
  type $SystemLow<R extends Shape = Shape> =
    TEventsX<R>
    & {
      // $ignore?: boolean
      // $constant?: boolean
      $developer_flag?: boolean
      $developer_RenderCounter?: number,
    }


  export type CodeProps<R extends Shape = Shape> =
    OmitPartial<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), omitPropNames> &
    Types.OnPressAllNative &
    Types.OnPressAllWeb &
    {
      $system?: $SystemLow<R>
      children?: React.ReactNode
      style?: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<getStyle<R>>
      className?: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<getStyle<R>>
    }

  export type PartialCodeProps<R extends Shape = Shape> = Partial<CodeProps<Shape>>


  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape = Shape> = React.ComponentType<CodeProps<R>>

  /******************************************
    EVENTS
  *******************************************/
  export type TEventOnPress = 'onPress'
  export type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  export type TEventsXNames = 'onPress' | 'onLongPress'
  //export type TEvents = TEventsAll

  export interface MouseEventPar<R extends Types.Shape = Types.Shape> extends React.MouseEvent<Element> { current?: CodeProps<R> }
  export type MouseEventEx<R extends Types.Shape = Types.Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  export interface OnPressX<R extends Types.Shape = Types.Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  export interface OnPressAllX<R extends Types.Shape = Types.Shape> extends OnPressX<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }

  export interface NativeEventPar<R extends Types.Shape = Types.Shape> extends ReactN.GestureResponderEvent { current?: CodeProps<R> }
  export interface OnPressAllNative { onPress?: () => void; onPressIn?: () => void; onPressOut?: () => void; onLongPress?: () => void }

} 