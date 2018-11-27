import React from 'react'
import ReactN from 'react-native'

import { TSheeter, TTyped, TEngine, TVariants, TUseSheeter } from './index'

declare namespace TComponents {

  //******************** Cross platform component props
  export type Props<R extends TSheeter.Shape = TSheeter.Shape> =
    CommonProperties<R> &
    TVariants.getProps<R> &
    TEventsX<R>

  export interface CommonProperties<R extends TSheeter.Shape = TSheeter.Shape> {
    $web?: Partial<TSheeter.getPropsWeb<R> & TVariants.getProps<R>> //web specific props
    $native?: Partial<TSheeter.getPropsNative<R> & TVariants.getProps<R>> //native specific props
    classNameX?: TTyped.RulesetOrCreator<R>
    styleX?: TSheeter.StyleOrCreator<R>
    classes?: TTyped.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TVariants.getTheme<R>) => Props<R>
  }

  /* cross platform styling props 
  the same props has: 
  - react web HTML elements (e.g. <div classNameX={....}), 
  - react native build in components (e.g. <Text styleX={...})
  - custom components (e.g. <IconButton classNameX={...})
  */
  export interface ReactsCommonProperties<R extends TSheeter.Shape = TSheeter.Shape> {
    classNameX?: TEngine.Queryables
    styleX?: TSheeter.StyleItem
    trace?: string
  }

  export type ComponentType<R extends TSheeter.Shape = TSheeter.Shape> =
    React.ComponentType<Props<R>> &
    TEngine.IsReactXXComponent

  export type SFC<R extends TSheeter.Shape = TSheeter.Shape> = React.SFC<Props<R>>

  //******************** Cross platform component code props

  export type PropsCode<R extends TSheeter.Shape = TSheeter.Shape> = //PartialOverwrite<TVariants.getProps<R>,
    TVariants.getProps<R> &
    TVariants.PropsCodePart<R> &
    EventsNative &
    EventsWeb

  /******************************************
    EVENTS
  *******************************************/
  export type TEventsX<R extends TSheeter.Shape = TSheeter.Shape> = PartialRecord<TSheeter.getEvents<R>, MouseEventEx<R>>

  export type TEventOnPress = 'onPress'
  export type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  export type TEventsXNames = 'onPress' | 'onLongPress'
  //export type TEvents = TEventsAll

  export interface MouseEventPar<R extends TSheeter.Shape = TSheeter.Shape> extends React.MouseEvent<Element> { current?: PropsCode<R> }
  export type MouseEventEx<R extends TSheeter.Shape = TSheeter.Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  export interface EventsPress<R extends TSheeter.Shape = TSheeter.Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  export interface Events<R extends TSheeter.Shape = TSheeter.Shape> extends EventsPress<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

  export interface EventsWeb {
    onClick?: React.MouseEventHandler<Element>
    onMouseDown?: React.MouseEventHandler<Element>
    onMouseUp?: React.MouseEventHandler<Element>
  }

  //export interface NativeEventPar<R extends Shape = Shape> extends ReactN.GestureResponderEvent { current?: PropsCode<R> }
  export interface EventsNative {
    onPress?: () => void; onPressIn?: () => void
    onPressOut?: () => void; onLongPress?: () => void
  }

} 