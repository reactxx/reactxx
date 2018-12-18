import React from 'react';
import ReactN from 'react-native';
import CSS from 'csstype';

import {
  NativeMethodsMixin, StyleProp,
  ViewStyle as ViewStyle_, TextStyle as TextStyle_, ImageStyle as ImageStyle_,
  ViewProperties as ViewProperties_, TextProperties as TextProperties_, ImageProperties as ImageProperties_,
  ScrollViewProperties as ScrollViewProperties_
} from 'react-native'


import { TCommonStyles } from './common-styles'
import { TEngine } from './engine'
import { TExtensions } from './index'
import { TComponents } from './components'

export type $W = '$W'; export type $T = '$T'; export type $V = '$V';
export type $I = '$I'; export type V = 'V'; export type T = 'T'; export type I = 'I';
export type O = ''

declare namespace TTyped {

  //******************************************************
  //* RULESET ID ARITMETICS
  //******************************************************

  type CommonIds = V | T | I | O
  type NativeIds = $V | $T | $I
  type RulesetIds = $W | NativeIds | CommonIds | TComponents.SFC
  type PlatformIds = $W | NativeIds

  type WebStyle = React.CSSProperties & { [P in CSS.Pseudos]?: Ruleset<$W> | Ruleset<$W>[] }

  type TNativeProps = ReactN.TextProperties | ReactN.ViewProperties | ReactN.TextInputProperties | ReactN.ImageProperties
    | {} //TODO

  // type TNativePropsToStyle<TT extends TNativeProps> =
  //   TT extends ReactN.ViewProperties ? V :
  //   TT extends ReactN.ImageProperties ? I :
  //   TT extends ReactN.TextProperties ? T :
  //   TT extends ReactN.TextInputProperties ? T :
  //   V

  type TNativeIdToProps<TT extends CommonIds> =
    TT extends V ? ReactN.ViewProperties :
    TT extends I ? ReactN.ImageProperties :
    TT extends T ? ReactN.TextProperties :
    never

  type RulesetType<R extends RulesetIds, ForStyle extends boolean = false> =
    R extends V ? TCommonStyles.ViewStyle :
    R extends T ? TCommonStyles.TextStyle :
    R extends I ? TCommonStyles.ImageStyle :
    R extends $W ? (ForStyle extends false ? WebStyle : React.CSSProperties) :
    R extends $T ? ReactN.TextStyle :
    R extends $V ? ReactN.ViewStyle :
    R extends $I ? ReactN.ImageStyle :
    TComponents.SFC

  type TNative<R extends RulesetIds> =
    R extends T ? $T :
    R extends V ? $V :
    R extends I ? $I :
    R

  type TAllowed<R extends RulesetIds> =
    R extends V ? V | O :
    R extends T ? T | V | O :
    R extends $T ? $T | $V | T | V | O :
    R extends $V ? $V | V | O :
    R extends $I ? $I | I | O :
    R extends $W ? $W | T | V | O :
    R extends I ? I | O :
    R | O

  type TPlatformAllowed<R extends PlatformIds> =
    TAllowed<R> | $W | (TAllowed<R> | $W)[]

  type Ruleset<R extends RulesetIds = RulesetIds> = RulesetType<R> | TAllowed<R>
  type Rulesets<R extends RulesetIds = RulesetIds> = Ruleset<R> | Ruleset<R>[]

  interface TypedEngine<S extends Shape> {
    WEB: (...r: Ruleset<$W>[]) => O
    NATIVE: <R extends NativeIds = $V>(...r: Ruleset<TNative<R>>[]) => O

    STYLE: <R extends RulesetIds>(...pars: Ruleset<R>[]) => R
    COMPILE: <R extends RulesetIds>(...r: Ruleset<R>[]) => R
    WIDTH: <R extends RulesetIds>(interval: TEngine.WidthInterval, ...r: Ruleset<R>[]) => R

    // SHAPE is needed:

    THEMED: <R extends any>(p: (t: getTheme<S>) => R) => R

    IF: <R extends RulesetIds>(cond: boolean | ((p: PropsCode<S>) => boolean), ...r: Ruleset<R>[]) => R
    IFELSE: <R extends RulesetIds>(cond: boolean | ((p: PropsCode<S>) => boolean), ifPart: Rulesets<R>, elsePart: Rulesets<R>) => R
    HOT: <R extends RulesetIds>(cond: (p: PropsCode<S>) => Ruleset<R> | Ruleset<R>[]) => R

    QUERY: <R extends RulesetIds>(query: PropsCode<S>, ...rules: RulesetSimple<R>[]) => R

    COMPONENT: <S extends Shape>(
      Comp: TComponents.SFC<S>,
      sheet: TTyped.PartialSheet<S>,
      defaultProps?: TComponents.Props<S>
    ) => TComponents.SFC<S>

  }
  //******************************************************
  //* SHEET AND CREATORS
  //******************************************************

  type ValueOrCreator<T, Theme> = T | ((theme: Theme) => T)

  // type SheetSimple<R extends Shape> = {
  //   [P in keyof getSheet<R>]: getSheet<R>[P]
  // }

  type SheetSimple<R extends Shape> = getSheet<R>

  type ClassNameSimple<R extends Shape> = getRootStyle<R>
  type RulesetSimple<Id extends RulesetIds = RulesetIds> = TAllowed<Id>

  type Sheet<R extends Shape = Shape> = getSheet<R> extends never ? never : {
    [P in keyof getSheet<R>]: Rulesets<getSheet<R>[P]>
  }
  type PartialSheet<R extends Shape = Shape> = getSheet<R> extends never ? never : {
    [P in keyof getSheet<R>]?: Rulesets<getSheet<R>[P]>
  }

  type SheetOrCreator<R extends Shape = Shape> =
    ValueOrCreator<Sheet<R>, getTheme<R>>
  type PartialSheetOrCreator<R extends Shape = Shape> =
    ValueOrCreator<PartialSheet<R>, getTheme<R>>

  type RulesetOrCreator<R extends Shape = Shape, Id extends RulesetIds = getRootStyle<R>> =
    ValueOrCreator<Rulesets<Id>, getTheme<R>> | TAllowed<getRootStyle<R>>

  //******************************************************
  //* SHAPE
  //******************************************************

  // component shape
  interface Shape extends TExtensions.Shape {
    sheet?: Record<string, RulesetIds | TComponents.SFC>
    props?: EmptyInterface // common (web and native) props, excluding events
    sheetQuery?: EmptyInterface
    theme?: EmptyInterface

    rootStyle?: CommonIds
    rootWebProps?: EmptyInterface
    rootNativeProps?: EmptyInterface
    rootProps?: EmptyInterface
  }

  // ancestor for Shape inheritance
  interface ShapeAncestor extends Shape {
  }

  type getSheetQuery<R extends Shape> = R['sheetQuery']
  type getProps<R extends Shape> = R['props']

  type getSheet<R extends Shape> =
    string extends keyof R['sheet'] ? never : R['sheet']

  type getTheme<R extends Shape = Shape> =
    string extends keyof R['theme'] ? any : R['theme']

  type getRootWebProps<R extends Shape> =
    keyof R['rootWebProps'] extends never ? never : R['rootWebProps']
  type getRootNativeProps<R extends Shape> =
    keyof R['rootNativeProps'] extends never ? never : R['rootNativeProps']
  type getRootProps<R extends Shape> =
    keyof R['rootProps'] extends never ? never : R['rootProps']

  type getRootStyle<R extends Shape> =
    unknown extends getSheet<R>['root'] ? never : getSheet<R>['root']

  type PropsCode<R extends TTyped.Shape = TTyped.Shape> =
    getProps<R> &
    getSheetQuery<R> &
    PropsCodeLow<R>

  interface PropsCodeLow<R extends TTyped.Shape> extends TEngine.WidthsQuery, RootProps<R> {
    children?: React.ReactNode
  }
  interface RootProps<R extends TTyped.Shape> {
    $rootWebProps?: getRootWebProps<R>
    $rootNativeProps?: getRootNativeProps<R>
    $rootProps?: getRootProps<R>
  }

  interface EmptyInterface { }

  /******************************************
    STYLE
  *******************************************/

  type Style<R extends RulesetIds = CommonIds> =
    RulesetType<R, true> &
    {
      $web?: RulesetType<$W, true>
      $native?: RulesetType<TNative<R>>
    }
  type StyleSimple<R extends Shape = Shape> = getRootStyle<R>

  type StyleOrCreator<R extends Shape = Shape> = //Style<getRootStyle<R>>
    ValueOrCreator<Style<getRootStyle<R>>, getTheme<R>> | TAllowed<getRootStyle<R>>

  //******************************************************
  //* PLATFORM PROPS
  //******************************************************

  interface StylePropsPlatform {
    'data-trace'?: string
  }

  interface StylePropsWeb extends StylePropsPlatform {
    className?: string
    style?: React.CSSProperties
  }

  interface StylePropsNative<TT extends RulesetIds> extends StylePropsPlatform {
    style?: NativeRuleset<TT>
  }

  type PropsOverride<T, S> = T & { style?: S }

  interface Static<P> extends NativeMethodsMixin, React.ClassicComponentClass<P> { }

  type ViewStyle = StyleProp<ViewStyle_> | TTyped.TAllowed<$V>
  type TextStyle = StyleProp<TextStyle_> | TTyped.TAllowed<$T>
  type ImageStyle = StyleProp<ImageStyle_> | TTyped.TAllowed<$I>

  type ViewProperties = PropsOverride<ViewProperties_, ViewStyle>
  type TextProperties = PropsOverride<TextProperties_, TextStyle>
  type ScrollViewProperties = PropsOverride<ScrollViewProperties_, ViewStyle> & { contentContainerStyle?: ViewStyle }
  type ImageProperties = PropsOverride<ImageProperties_, ImageStyle>

  type ViewStatic = Static<ViewProperties>
  type ScrollViewStatic = Static<ScrollViewProperties>
  type TextStatic = Static<TextProperties>
  type ImageStatic = Static<ImageProperties>

  type NativeRuleset<TT extends RulesetIds> =
    TT extends T ? TextStyle :
    TT extends V ? ViewStyle :
    TT extends I ? ImageStyle :
    TT extends $T ? TextStyle :
    TT extends $V ? ViewStyle :
    TT extends $I ? ImageStyle :
    O

  type StyleProps = (
    propsCode: PropsCode, rulesets: TTyped.Ruleset[], classNames?: RulesetIds, style?: RulesetIds
  ) => StylePropsWeb | StylePropsNative<RulesetIds>

}
