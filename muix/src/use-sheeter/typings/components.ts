import React from 'react';
import { TEngine, TTyped, TExtensions } from 'reactxx-typings';

declare module 'reactxx-typings' {

  namespace TExtensions {

    interface Shape {
      events?: TTyped.EmptyInterface // common events
    }

    type getEvents<R extends Shape = Shape> = keyof R['events']
  }
}

export namespace TComponents {

  //******************** Cross platform component props
  export type Props<R extends TTyped.Shape = TTyped.Shape> =
    TTyped.getProps<R> &
    PropsLow<R> &
    TEventsX<R>

  export interface PropsLow<R extends TTyped.Shape> extends TTyped.RootProps<R> {
    classNames?: TTyped.RulesetOrCreator<R>
    styles?: TTyped.StyleOrCreator<R>
    classes?: TTyped.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TTyped.getTheme<R>) => Props<R>
  }

  /* cross platform styling props 
  the same props has: 
  - react web HTML elements (e.g. <div css={....}), 
  - react native build in components (e.g. <Text styles={...})
  - custom components (e.g. <IconButton css={...})
  */
  // export interface ReactsCommonProperties<Id extends TTyped.PlatformIds = TTyped.PlatformIds> {
  //   classNames?: TTyped.TPlatformAllowed<Id>
  //   styles?: TTyped.TPlatformAllowed<Id>
  //   trace?: string
  // }

  // export type ComponentType<R extends TTyped.Shape = TTyped.Shape> =
  //   React.ComponentType<Props<R>>
    //  &
    // TEngine.IsReactXXComponent

  export type SFC<R extends TTyped.Shape = TTyped.Shape> = React.SFC<Props<R>> //& TEngine.IsReactXXComponent

  /******************************************
    EVENTS
  *******************************************/
  export type TEventsX<R extends TTyped.Shape = TTyped.Shape> = PartialRecord<TExtensions.getEvents<R>, MouseEventEx<R>>

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