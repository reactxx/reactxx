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
    className?: TTyped.RulesetOrCreator<R>
    style?: TTyped.StyleOrCreator<R>
    classes?: TTyped.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TTyped.getTheme<R>) => Props<R>
  }

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

  //*************************************** */  
  // CONFIGS
  //*************************************** */  

  export interface ComponentConfigLow {
    // withCascaing?: boolean
    //------
    componentId?: number // unique component id. Generated in useSheeter
  }

  // component type options
  export interface AuthorConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    defaultProps?: Partial<TComponents.Props<R>> // classes, css and styles are  ignored
    defaultSheet?: TTyped.SheetOrCreator<R>
  }

  export interface UserConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    overrideProps?: TComponents.Props<R> // classes, css and styles are ignored
    overrideSheet?: TTyped.SheetOrCreator<R>
    myAuthorConfigId?: number // ComponentConfig.id
  }
  export interface Config<R extends TTyped.Shape = TTyped.Shape> extends AuthorConfig<R> {
    overrideProps?: TComponents.Props<R>
    overrideSheet?: TTyped.SheetOrCreator<R>
    displayName?: string
  }


  export type ThemeContext<T extends any> = [T, (newTheme: T) => void]

  export type ComponentCreator<R extends TTyped.Shape = TTyped.Shape> = (
    userDisplayName?: string, userConfig?: TComponents.UserConfig<R>
  ) => React.SFC<TComponents.Props<R>>

  export type GetComponent<R extends TTyped.Shape> = (
    authorConfig: TComponents.AuthorConfig<R>,
    displayName: string,
    userConfig: TComponents.UserConfig<R>,
    par?
  ) => TComponents.SFC<R>

} 