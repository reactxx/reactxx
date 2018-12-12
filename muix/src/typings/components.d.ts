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

declare namespace TComponents {

  //******************** Cross platform component props
  type Props<R extends TTyped.Shape = TTyped.Shape> =
    TTyped.getProps<R> &
    PropsLow<R> &
    TEventsX<R>

  interface PropsLow<R extends TTyped.Shape> extends TTyped.RootProps<R> {
    className?: TTyped.RulesetOrCreator<R>
    style?: TTyped.StyleOrCreator<R>
    classes?: TTyped.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TTyped.getTheme<R>) => Props<R>
  }

  type SFC<R extends TTyped.Shape = TTyped.Shape> = React.SFC<Props<R>> //& TEngine.IsReactXXComponent

  /******************************************
    EVENTS
  *******************************************/
  type TEventsX<R extends TTyped.Shape = TTyped.Shape> = PartialRecord<TExtensions.getEvents<R>, MouseEventEx<R>>

  type TEventOnPress = 'onPress'
  type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  type TEventsXNames = 'onPress' | 'onLongPress'
  //type TEvents = TEventsAll

  interface MouseEventPar<R extends TTyped.Shape = TTyped.Shape> extends React.MouseEvent<Element> { current?: TTyped.PropsCode<R> }
  type MouseEventEx<R extends TTyped.Shape = TTyped.Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  interface EventsPress<R extends TTyped.Shape = TTyped.Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  interface Events<R extends TTyped.Shape = TTyped.Shape> extends EventsPress<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

  interface EventsWeb {
    onClick?: React.MouseEventHandler<Element>
    onMouseDown?: React.MouseEventHandler<Element>
    onMouseUp?: React.MouseEventHandler<Element>
  }

  //interface NativeEventPar<R extends Shape = Shape> extends ReactN.GestureResponderEvent { current?: PropsCode<R> }
  interface EventsNative {
    onPress?: () => void; onPressIn?: () => void
    onPressOut?: () => void; onLongPress?: () => void
  }

  //*************************************** */  
  // CONFIGS
  //*************************************** */  

  interface ComponentConfigLow {
    // withCascaing?: boolean
  }

  // component type options
  interface AuthorConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    defaultProps?: Partial<TComponents.Props<R>> // classes, css and styles are  ignored
    defaultSheet?: TTyped.SheetOrCreator<R>
  }

  interface UserConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    overrideProps?: TComponents.Props<R> // classes, css and styles are ignored
    overrideSheet?: TTyped.SheetOrCreator<R>
  }
  interface Config<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    componentId?: number // unique component id. Generated in useSheeter
    defaultProps?: Partial<TComponents.Props<R>> // classes, css and styles are  ignored
    defaultSheet?: TTyped.SheetOrCreator<R>
    overrideProps?: TComponents.Props<R>
    overrideSheet?: TTyped.SheetOrCreator<R>
    displayName?: string
  }

  type ThemeContext<T extends any> = [T, (newTheme: T) => void]

  type ComponentCreator<R extends TTyped.Shape = TTyped.Shape> = (
    userDisplayName?: string, userConfig?: TComponents.UserConfig<R>
  ) => React.SFC<TComponents.Props<R>>

  type GetComponent<R extends TTyped.Shape> = (
    useStyles: UseStyles<R>,
    par?
  ) => TComponents.SFC<R>

  type UseStyles<R extends TTyped.Shape = TTyped.Shape> = (
    props: TComponents.Props<R>
  ) => UseStylesResult<R>

  interface UseStylesResult<R extends TTyped.Shape> {
    propsCode: TTyped.PropsCode<R>
    classes: TTyped.getSheet<R>
    className: TTyped.getRootStyle<R>
    style: TTyped.getRootStyle<R>
    getWidthMap: (mapBreakpoints?: number[]) => boolean[]
    getNativeStyleProps: <R extends TTyped.RulesetIds>(...rulesets: TTyped.TAllowed<R>[]) => TTyped.StylePropsNative<R>
    getRootNativeStyleProps: <R extends TTyped.RulesetIds = "">(...rulesets: TTyped.TAllowed<R>[]) => TTyped.StylePropsNative<R>
    getWebStyleProps: (...rulesets: TTyped.RulesetIds[]) => TTyped.StylePropsWeb
    getRootWebStyleProps: (...rulesets: TTyped.RulesetIds[]) => TTyped.StylePropsWeb
  }

} 