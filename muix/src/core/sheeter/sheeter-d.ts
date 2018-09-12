import React, { Children } from 'react'
import ReactN from 'react-native'
import CSS from 'csstype';

import { TCommonStyles, TCompiler, TRulesetConditions } from '../index-d'

export namespace TSheeter {

  /******************************************
    RULESET
  *******************************************/

  export type RulesetCreator<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    (theme: getTheme<R>) => Ruleset<T, R>
  export type RulesetOrCreator<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    Ruleset<T, R> | RulesetCreator<T, R>

  //*************** Cross platform ruleset for web and native
  export type Ruleset<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    RulesetLow<T, R>

  export type RulesetNative<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetNative<T> & // native rules which are compatible with web
    RulesetLow<T, R>

  export type RulesetWeb<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    RulesetWebLow<T, R> & // native rules which are compatible with web
    RulesetLow<T, R>

  export type RulesetWebLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    React.CSSProperties & { [P in CSS.Pseudos]?: React.CSSProperties & RulesetWeb<T, R> }

  export interface RulesetLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> extends
    TRulesetConditions.ConditionalPart<T, R> {
    $native?: RulesetNative<T, R>// native specific rules
    $web?: RulesetWeb<T, R> // web specific rules
    $before?: Ruleset<T, R>
    $after?: Ruleset<T, R>
  }

  /******************************************
    STYLE
  *******************************************/

  export type Style<T extends TCommonStyles.RulesetNativeIds = 'Text'> =
    TCommonStyles.RulesetCommon<T> & StyleLow<T>

  export interface StyleLow<T extends TCommonStyles.RulesetNativeIds = 'Text'> extends
    StyleInnerLow<T> {
    $before?: StyleInner<T>
    $after?: StyleInner<T>
  }

  export type StyleInner<T extends TCommonStyles.RulesetNativeIds = 'Text'> =
    TCommonStyles.RulesetCommon<T> & StyleInnerLow<T>

  export interface StyleInnerLow<T extends TCommonStyles.RulesetNativeIds = 'Text'> {
    $native?: TCommonStyles.RulesetNative<T>
    $web?: TCommonStyles.RulesetWeb
  }

  /******************************************
      SHEET
  *******************************************/

  export type Sheet<R extends Shape = Shape> = SheetCommon<R> & SheetNative<R> & SheetWeb<R>
  export type SheetCreator<R extends Shape = Shape> = (theme: getTheme<R>) => Sheet<R>
  export type SheetOrCreator<R extends Shape = Shape> = SheetCreator<R> | Sheet<R>
  export type PartialSheet<R extends Shape = Shape> = Partial<SheetCommon<R> & SheetNative<R> & SheetWeb<R>>
  export type PartialSheetCreator<R extends Shape = Shape> = (theme: getTheme<R>) => PartialSheet<R>
  export type PartialSheetOrCreator<R extends Shape = Shape> = PartialSheet<R> | PartialSheetCreator<R>

  //export type PartialSheet<R extends Shape = Shape> = SheetCommon<R> & SheetNative<R> & SheetWeb<R>

  export type SheetCommon<R extends Shape> = keyof getCommon<R> extends never ? {} :
    { [P in keyof getCommon<R>]: Ruleset<getCommon<R>[P], R> }
  export type SheetNative<R extends Shape> = keyof getNative<R> extends never ? {} :
    { [P in keyof getNative<R>]: {
      $native?: TCommonStyles.RulesetNative<getNative<R>[P]> & TRulesetConditions.ConditionalPart<getNative<R>[P], R>
    } }
  export type SheetWeb<R extends Shape> = getWeb<R> extends never ? {} :
    { [P in getWeb<R>]: {
      $web?: RulesetWeb<'Text', R> & TRulesetConditions.ConditionalPart<'Text', R>
    } }


  /******************************************
    SHAPE
  *******************************************/

  // Shape for generic default, e.g. "interface X<R extends Shape = Shape> {} " 
  export interface Shape {
    //**** sheet constrains
    common: EmptyInterface // rulesets (and their native type), which are used in both web and native component code. Rule are compatible with web and native.
    native: EmptyInterface // rulesets, which are used only in native code
    web: EmptyInterface // ruleset names, which are used only in web code (its type is always React.CSSProperties)
    sheetFlags: EmptyInterface
    //******************** style constrain
    style: TCommonStyles.RulesetNativeIds // for web, style has always React.CSSProperties type
    //**** component property constrains
    props: EmptyInterface // common (web and native) props, excluding events
    propsNative: EmptyInterface // native only props 
    propsWeb: React.HTMLAttributes<Element>// web only props
    events: EmptyInterface // common events
    theme: EmptyInterface
  }

  // ancestor for Shape inheritance
  export interface ShapeAncestor {
    common: EmptyInterface
    native: EmptyInterface
    web: EmptyInterface
    sheetFlags: EmptyInterface
    style: unknown
    props: EmptyInterface
    propsNative: ReactN.ViewProperties
    propsWeb: React.DOMAttributes<Element>
    events: EmptyInterface //ShapeWeb<TEventsAll>
    theme: EmptyInterface
  }

  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = keyof R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getEvents<R extends Shape = Shape> = keyof R['events']
  export type getFlags<R extends Shape = Shape> = keyof R['sheetFlags']
  export type getTheme<R extends Shape = Shape> = R['theme']

  export type RulesetNamesAll<R extends Shape> = keyof getCommon<R> | keyof getNative<R> | getWeb<R>

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }

  export type ShapeWeb<P extends string> = { [p in P]: true }
  export type ShapeFlags<P extends string> = { [p in P]: true }

  export interface EmptyInterface { }

  export type StyleX<R extends Shape = Shape> = Style<TSheeter.getStyle<R>>
  export type StylesX<R extends Shape = Shape> = StyleX<R> | StyleX<R>[]
  export type StylesXOrCreator<R extends Shape = Shape> = StylesX<R> | ((theme: getTheme<R>) => StylesX<R>)

  export type ClassNameItem = TSheeter.Ruleset | TSheeter.RulesetCreator | TCompiler.Ruleset | TCompiler.Values
  export type ClassName = ClassNameItem | ClassNameItem[]
  export type ClassNameOrCreator<R extends Shape = Shape> = ClassName | ((theme: getTheme<R>) => ClassName)
  
  export type SheetX<R extends Shape = Shape> = Sheet<R> | TCompiler.Sheet<R>


  /******************************************
     COMPONENT TYPING
  *******************************************/
  //   export type WithStyles<R extends Shape = Shape> = (sheet: SheetX<R>, defaultProps?: Props<R>) => ComponentTypeX<R>

  //   export type StyleX<R extends Shape = Shape> = Style<TSheeter.getStyle<R>>
  //   export type StylesX<R extends Shape = Shape> = StyleX<R> | StyleX<R>[]
  //   export type StylesXCreator<R extends Shape = Shape> = (theme: getTheme<R>) => StylesX<R>

  //   export type ClassNameItem = TSheeter.Ruleset | TCompiler.Ruleset | TCompiler.Values
  //   export type ClassName = ClassNameItem | ClassNameItem[]
  //   export type ClassNameCreator<R extends Shape = Shape> = (theme: getTheme<R>) => ClassName

  //   export type SheetX<R extends Shape = Shape> = Sheet<R> | TCompiler.Sheet<R>

  //   //******************** Cross platform component props
  //   export interface CommonPropertiesWithTheme<R extends TSheeter.Shape = TSheeter.Shape> extends PropsLow<R> {
  //     classNameX?: ClassName | ClassNameCreator<R>
  //     styleX?: StylesX<R> | StylesXCreator<R>
  //     classes?: PartialSheet<R> // cross platform sheet
  //     theme?: getTheme<R>
  //   }

  //   /* cross platform styling attributes 
  //  the same props has: 
  //  - react web HTML elements (e.g. <div classNameX={....}), 
  //  - react native build in components (e.g. <Text styleX={...})
  //  - custom components (e.g. <IconButton classNameX={...})
  //  */
  //   export interface CommonProperties<R extends TSheeter.Shape = TSheeter.Shape> extends PropsLow<R> {
  //     classNameX?: ClassName
  //     styleX?: StylesX<R>
  //     classes?: PartialSheet<R> // cross platform sheet
  //   }

  //   export interface PropsLow<R extends Shape> { //extends CommonPropertiesWithTheme<R> {
  //     $web?: Partial<getPropsWeb<R>> //web specific props
  //     $native?: Partial<getPropsNative<R>> //native specific props
  //   }
  //   export type Props<R extends Shape = Shape> = PartialOverwrite<getProps<R>, CommonPropertiesWithTheme<R> & TEventsX<R>>

  //   export type TEventsX<R extends Shape = Shape> = PartialRecord<getEvents<R>, MouseEventEx<R>>
  //   export type ComponentTypeX<R extends Shape> = React.ComponentType<Props<R>>
  //   export type SFC<R extends Shape = Shape> = React.SFC<Props<R>>

  //   //******************** Cross platform component code props

  //   export type PropsCode<R extends Shape = Shape> = PartialOverwrite<
  //     getProps<R>, CommonPropertiesCode<R> & TEventsX<R>>

  //   export interface CommonPropertiesCode<R extends TSheeter.Shape = TSheeter.Shape> {
  //     classNameX?: ClassNameItem
  //     styleX?: StyleX<R>
  //     children?: React.ReactNode
  //     sheetQuery?: TRulesetConditions.Query<R>;
  //     classes?: TCompiler.Sheet<R>
  //     classNames?: (...rulesets: TSheeter.ClassNameItem[]) => TCompiler.Values
  //   }

  //   export type CommonPropertiesCodeKeys = keyof CommonPropertiesCode

  //   export type SFCCode<R extends Shape = Shape> = React.SFC<PropsCode<R>>

  /******************************************
    EVENTS
  *******************************************/
  // export type TEventOnPress = 'onPress'
  // export type TEventsAll = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
  // export type TEventsXNames = 'onPress' | 'onLongPress'
  // //export type TEvents = TEventsAll

  // export interface MouseEventPar<R extends Shape = Shape> extends React.MouseEvent<Element> { current?: PropsCode<R> }
  // export type MouseEventEx<R extends Shape = Shape> = React.EventHandler<MouseEventPar<R>>// (ev?: MouseEventPar<R>) => void

  // export interface OnPressX<R extends Shape = Shape> { onPress?: MouseEventEx<R>; onLongPress?: MouseEventEx<R> }
  // export interface OnPressAllX<R extends Shape = Shape> extends OnPressX<R> { onPressIn?: MouseEventEx<R>; onPressOut?: MouseEventEx<R> }

  // export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }

  // export interface NativeEventPar<R extends Shape = Shape> extends ReactN.GestureResponderEvent { current?: PropsCode<R> }
  // export interface OnPressAllNative { onPress?: () => void; onPressIn?: () => void; onPressOut?: () => void; onLongPress?: () => void }

} 