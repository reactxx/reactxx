import React from 'react'
import ReactN from 'react-native'

import { TSheeter, TTyped, TAtomize, TVariants, TWithStyles } from './index'

declare namespace TComponents {

  
  /******************************************
     COMPONENT TYPING
  *******************************************/
  export type WithStyles<R extends TSheeter.Shape = TSheeter.Shape> = (sheet: TSheeter.SheetX<R>, defaultProps?: Props<R>) => ComponentType<R>

  //export type StylesXCreator<R extends Shape = Shape> = (theme: TSheeter.getTheme<R>) => TSheeter.StylesX<R>

  //******************** Cross platform component props
  export interface CommonProperties<R extends TSheeter.Shape = TSheeter.Shape> extends PropsLow<R> {
    classNameX?: TSheeter.ClassNameOrCreator<R>
    styleX?: TSheeter.StyleOrCreator<R>
    classes?: TSheeter.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TSheeter.getTheme<R>) => Props<R>
  }

  /* cross platform styling props 
  the same props has: 
  - react web HTML elements (e.g. <div classNameX={....}), 
  - react native build in components (e.g. <Text styleX={...})
  - custom components (e.g. <IconButton classNameX={...})
  */
  export interface ReactsCommonProperties<R extends TSheeter.Shape = TSheeter.Shape> {
    classNameX?: TAtomize.AtomizedRuleset // TSheeter.ClassNameOrAtomized<R>
    styleX?: TSheeter.StyleItem
    trace?: string
  }

  export interface ReactsCommonPropertiesWeb {
    className?: string
    styleX?: TSheeter.Style
    style?: React.CSSProperties
    $native?
  }

  export interface ReactsCommonPropertiesNative<R extends TSheeter.Shape = TSheeter.Shape> extends ReactsCommonProperties<R> {
    styleX?: TAtomize.AtomizedRuleset
    style?: TAtomize.AtomicNativeLow
    $web?
  }

  export interface PropsLow<R extends TSheeter.Shape> {
    $web?: Partial<TSheeter.getPropsWeb<R> & TSheeter.getProps<R>> //web specific props
    $native?: Partial<TSheeter.getPropsNative<R> & TSheeter.getProps<R>> //native specific props
  }
  export type Props<R extends TSheeter.Shape = TSheeter.Shape> = PartialOverwrite<TSheeter.getProps<R>,
    CommonProperties<R> &
    TVariants.PropsPart<R> &
    TEventsX<R>>

  export type TEventsX<R extends TSheeter.Shape = TSheeter.Shape> = PartialRecord<TSheeter.getEvents<R>, MouseEventEx<R>>
  export type ComponentType<R extends TSheeter.Shape = TSheeter.Shape> = React.ComponentType<Props<R>> & TAtomize.IsReactXXComponent & {
    classes: TSheeter.PartialSheet<R>
    classNamex: TSheeter.ClassNameOrCreator<R>
  }
  export type ComponentClass<R extends TSheeter.Shape = TSheeter.Shape> = React.ComponentClass<Props<R>> & TSheeter.getStaticProps<R> & TProvider<R>
  export interface TProvider<R extends TSheeter.Shape = TSheeter.Shape> { Provider: React.ComponentClass<TComponents.Props<R>> }

  //******************** Cross platform component code props

  export type PropsCode<R extends TSheeter.Shape = TSheeter.Shape> = PartialOverwrite<TSheeter.getProps<R>,
    CommonPropertiesCode<R> &
    TVariants.PropsCodePart<R> &
    TVariants.PropsPart<R> &
    EventsNative &
    EventsWeb>

  export interface CommonPropertiesCode<R extends TSheeter.Shape = TSheeter.Shape> { //extends PropsLow<R> {
    // classNameX?: TAtomize.Ruleset
    // styleX?: TSheeter.StyleItem
    // classes?: TAtomize.Sheet<R>
    //toClassNames?: (rulesets: TSheeter.RulesetOrAtomized) => TAtomize.Ruleset
    //theme?: TSheeter.getTheme<R>
    //sheetQuery?: TVariants.Query<R> // merged pipe's pipeState.query
  }

  export type CommonPropertiesCodeKeys = keyof PropsCode

  export type SFC<R extends TSheeter.Shape = TSheeter.Shape> = React.SFC<Props<R>>

  export type SFCCode<R extends TSheeter.Shape = TSheeter.Shape> = React.SFC<PropsCode<R>> //& ModifyInnerStateProp<R>
  export type ComponentTypeCode<R extends TSheeter.Shape = TSheeter.Shape> = React.ComponentType<PropsCode<R>> //& ModifyInnerStateProp<R>
  // export type ModifyInnerStateProc<R extends Shape> = (props: PropsCode<R>, pipeState?: TVariants.Query<R>) => void
  // export interface ModifyInnerStateProp<R extends Shape> {
  //   setSheetQuery?: ModifyInnerStateProc<R>
  // }

  /******************************************
    EVENTS
  *******************************************/
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