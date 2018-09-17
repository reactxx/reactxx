import React from 'react'
import ReactN from 'react-native'

import { TSheeter, TCompiler, TVariants } from '../d-index'

export namespace TComponents {

  type Shape = TSheeter.Shape

  /******************************************
     COMPONENT TYPING
  *******************************************/
  export type WithStyles<R extends Shape = Shape> = (sheet: TSheeter.SheetX<R>, defaultProps?: Props<R>) => ComponentType<R>

  // export type StyleX<R extends Shape = Shape> = TSheeter.Style<TSheeter.getStyle<R>>
  // export type StylesX<R extends Shape = Shape> = StyleX<R> | StyleX<R>[]
  export type StylesXCreator<R extends Shape = Shape> = (theme: TSheeter.getTheme<R>) => TSheeter.StylesX<R>

  // export type ClassNameItem = TSheeter.Ruleset | TCompiler.Ruleset | TCompiler.Values
  // export type ClassName = ClassNameItem | ClassNameItem[]
  //export type ClassNameCreator<R extends Shape = Shape> = (theme: TSheeter.getTheme<R>) => TSheeter.ClassName

  // export type SheetX<R extends Shape = Shape> = TSheeter.Sheet<R> | TCompiler.Sheet<R>

  //******************** Cross platform component props
  export interface CommonPropertiesWithTheme<R extends Shape = Shape> extends PropsLow<R> {
    classNameX?: TSheeter.ClassNameOrCreator<R>
    styleX?: TSheeter.StylesXOrCreator<R>
    classes?: TSheeter.PartialSheetOrCreator<R> // cross platform sheet
  }

  /* cross platform styling attributes 
 the same props has: 
 - react web HTML elements (e.g. <div classNameX={....}), 
 - react native build in components (e.g. <Text styleX={...})
 - custom components (e.g. <IconButton classNameX={...})
 */
  export interface CommonProperties<R extends TSheeter.Shape = TSheeter.Shape> extends PropsLow<R> {
    classNameX?: TSheeter.ClassName
    styleX?: TSheeter.StylesX<R>
    classes?: TSheeter.PartialSheet<R> // cross platform sheet
  }

  export interface PropsLow<R extends Shape> { //extends CommonPropertiesWithTheme<R> {
    $web?: Partial<TSheeter.getPropsWeb<R>> //web specific props
    $native?: Partial<TSheeter.getPropsNative<R>> //native specific props
  }
  export type Props<R extends Shape = Shape> = PartialOverwrite<TSheeter.getProps<R>,
    CommonPropertiesWithTheme<R> & TEventsX<R>>

  export type TEventsX<R extends Shape = Shape> = PartialRecord<TSheeter.getEvents<R>, MouseEventEx<R>>
  export type ComponentType<R extends Shape = Shape> = React.ComponentType<Props<R>>
  export type ComponentClass<R extends Shape = Shape> = React.ComponentClass<Props<R>>
  export type SFC<R extends Shape = Shape> = React.SFC<Props<R>>

  //******************** Cross platform component code props

  export type PropsCode<R extends Shape = Shape> = PartialOverwrite<
    TSheeter.getProps<R>, CommonPropertiesCode<R> & TEventsX<R>>

  export interface CommonPropertiesCode<R extends TSheeter.Shape = TSheeter.Shape> {
    classNameX?: TSheeter.ClassNameItem
    styleX?: TSheeter.StyleX<R>
    children?: React.ReactNode
    sheetQuery?: TVariants.Query<R>
    classes?: TCompiler.Sheet<R>
    classNames?: (...rulesets: TSheeter.ClassNameItem[]) => TCompiler.AtomicClasses
    theme?: TSheeter.getTheme<R>
  }

  export type CommonPropertiesCodeKeys = keyof CommonPropertiesCode

  export type SFCCode<R extends Shape = Shape> = React.SFC<PropsCode<R>>

  /******************************************
    EVENTS
  *******************************************/
  export type TEventOnPress = 'onPress'
  export type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  export type TEventsXNames = 'onPress' | 'onLongPress'
  //export type TEvents = TEventsAll

  export interface MouseEventPar<R extends Shape = Shape> extends React.MouseEvent<Element> { current?: PropsCode<R> }
  export type MouseEventEx<R extends Shape = Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  export interface OnPressX<R extends Shape = Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  export interface OnPressAllX<R extends Shape = Shape> extends OnPressX<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }

  export interface NativeEventPar<R extends Shape = Shape> extends ReactN.GestureResponderEvent { current?: PropsCode<R> }
  export interface OnPressAllNative { onPress?: () => void; onPressIn?: () => void; onPressOut?: () => void; onLongPress?: () => void }

} 