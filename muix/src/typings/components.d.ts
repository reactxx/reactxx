import React from 'react';
import { TEngine, TTyped, TExtensions } from './index';


declare namespace TComponents {

  //******************** Cross platform component props
  export type Props<R extends TTyped.Shape = TTyped.Shape> =
    PropsLow<R> &
    TTyped.getProps<R> &
    TEventsX<R>

  export interface PropsLow<R extends TTyped.Shape> {
    $web?: Partial<TTyped.getPropsWeb<R> & TTyped.getProps<R>> //web specific props
    $native?: Partial<TTyped.getPropsNative<R> & TTyped.getProps<R>> //native specific props
    classNameX?: TTyped.RulesetOrCreator<R>
    styleX?: TTyped.StyleOrCreator<R>
    classes?: TTyped.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TTyped.getTheme<R>) => Props<R>
  }

  /* cross platform styling props 
  the same props has: 
  - react web HTML elements (e.g. <div classNameX={....}), 
  - react native build in components (e.g. <Text styleX={...})
  - custom components (e.g. <IconButton classNameX={...})
  */
  export interface ReactsCommonProperties<R extends TTyped.Shape = TTyped.Shape> {
    classNameX?: TEngine.Queryables
    styleX?: TTyped.RulesetIds
    trace?: string
  }

  export type ComponentType<R extends TTyped.Shape = TTyped.Shape> =
    React.ComponentType<Props<R>> &
    TEngine.IsReactXXComponent

  export type SFC<R extends TTyped.Shape = TTyped.Shape> = React.SFC<Props<R>> & TEngine.IsReactXXComponent

  /******************************************
    EVENTS
  *******************************************/
  export type TEventsX<R extends TTyped.Shape = TTyped.Shape> = PartialRecord<TTyped.getEvents<R>, MouseEventEx<R>>

  export type TEventOnPress = 'onPress'
  export type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  export type TEventsXNames = 'onPress' | 'onLongPress'
  //export type TEvents = TEventsAll

  export interface MouseEventPar<R extends TTyped.Shape = TTyped.Shape> extends React.MouseEvent<Element> { current?: TTyped.PropsCode<R> }
  export type MouseEventEx<R extends TTyped.Shape = TTyped.Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  export interface EventsPress<R extends TTyped.Shape = TTyped.Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  export interface Events<R extends TTyped.Shape = TTyped.Shape> extends EventsPress<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

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