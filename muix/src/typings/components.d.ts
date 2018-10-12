import React from 'react'
import ReactN from 'react-native'

import { TSheeter, TAtomize, TVariants, TWithStyles } from './index'

declare namespace TComponents {

  type Shape = TSheeter.Shape

  /******************************************
     COMPONENT TYPING
  *******************************************/
  export type WithStyles<R extends Shape = Shape> = (sheet: TSheeter.SheetX<R>, defaultProps?: Props<R>) => ComponentType<R>

  //export type StylesXCreator<R extends Shape = Shape> = (theme: TSheeter.getTheme<R>) => TSheeter.StylesX<R>

  //******************** Cross platform component props
  export interface CommonProperties<R extends Shape = Shape> extends PropsLow<R> {
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
  export interface ReactsCommonProperties<R extends TSheeter.Shape = TSheeter.Shape> extends PropsLow<R> {
    classNameX?: TAtomize.AtomicArray // TSheeter.ClassNameOrAtomized<R>
    styleX?: TSheeter.StyleOrAtomized<R>
    //classes?: TSheeter.PartialSheet<R> // cross platform sheet
  }

  export interface PropsLow<R extends Shape> {
    $web?: Partial<TSheeter.getPropsWeb<R> & TSheeter.getProps<R>> //web specific props
    $native?: Partial<TSheeter.getPropsNative<R> & TSheeter.getProps<R>> //native specific props
  }
  export type Props<R extends Shape = Shape> = PartialOverwrite<TSheeter.getProps<R>,
    CommonProperties<R> &
    TVariants.PropsPart<R> &
    TEventsX<R>>

  export type TEventsX<R extends Shape = Shape> = PartialRecord<TSheeter.getEvents<R>, MouseEventEx<R>>
  export type ComponentType<R extends Shape = Shape> = React.ComponentType<Props<R>> & {
    // 
    classes: TSheeter.PartialSheet<R>
    classNamex: TSheeter.ClassNameOrAtomized<R>
  }
  export type ComponentClass<R extends Shape = Shape> = React.ComponentClass<Props<R>>

  export type InnerState<R extends Shape = Shape> =
    TVariants.Query<R> &
    TSheeter.getInnerState<R>

  //******************** Cross platform component code props

  export type PropsCode<R extends Shape = Shape> = PartialOverwrite<
    TSheeter.getProps<R>, CommonPropertiesCode<R> &
    TVariants.PropsCodePart<R> &
    EventsNative &
    EventsWeb>

  export interface CommonPropertiesCode<R extends TSheeter.Shape = TSheeter.Shape> extends PropsLow<R> {
    classNameX?: TAtomize.Ruleset
    styleX?: TSheeter.StyleItem
    children?: React.ReactNode
    classes?: TAtomize.Sheet<R>
    toClassNames?: (rulesets: TSheeter.RulesetOrAtomized) => TAtomize.AtomicArray
    theme?: TSheeter.getTheme<R>
    setInnerState?: (setState: (prevState: TSheeter.getInnerState<R>, props: PropsCode<R>) => TSheeter.getInnerState<R>) => void
  }

  export type CommonPropertiesCodeKeys = keyof PropsCode

  export type SFCCode<R extends Shape = Shape> = React.SFC<PropsCode<R>> & FillSheetQueryProp<R>
  export type ComponentTypeCode<R extends Shape = Shape> = React.ComponentType<PropsCode<R>> & FillSheetQueryProp<R>
  export type FillSheetQuery<R extends Shape> = (props: PropsCode<R>, pipeState?: PipeState<R>) => void
  export interface FillSheetQueryProp<R extends Shape> {
    fillSheetQuery?: FillSheetQuery<R>
  }
  export interface PipeState<R extends Shape> {
    sheetQuery?: TVariants.Query
    data?: TSheeter.getInnerState<R>
  }


  /******************************************
    EVENTS
  *******************************************/
  export type TEventOnPress = 'onPress'
  export type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  export type TEventsXNames = 'onPress' | 'onLongPress'
  //export type TEvents = TEventsAll

  export interface MouseEventPar<R extends Shape = Shape> extends React.MouseEvent<Element> { current?: PropsCode<R> }
  export type MouseEventEx<R extends Shape = Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  export interface EventsPress<R extends Shape = Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  export interface Events<R extends Shape = Shape> extends EventsPress<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

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