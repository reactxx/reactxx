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

export type $W = '$W'; export type $T = '$T'; export type $V = '$V';
export type $I = '$I'; export type V = 'V'; export type T = 'T'; export type I = 'I';
export type O = ''

declare namespace TTyped {

  //******************************************************
  //* RULESET ID ARITMETICS
  //******************************************************

  export type CommonIds = V | T | I | O
  export type NativeIds = $V | $T | $I
  export type RulesetIds = $W | NativeIds | CommonIds
  export type PlatformIds = $W | NativeIds

  type WebStyle = React.CSSProperties & { [P in CSS.Pseudos]?: Ruleset<$W> | Ruleset<$W>[] }

  export type TNativeProps = ReactN.TextProperties | ReactN.ViewProperties | ReactN.TextInputProperties | ReactN.ImageProperties
    | {} //TODO

  export type TNativePropsToStyle<TT extends TNativeProps> =
    TT extends ReactN.ViewProperties ? V :
    TT extends ReactN.ImageProperties ? I :
    TT extends ReactN.TextProperties ? T :
    TT extends ReactN.TextInputProperties ? T :
    V

  export type TNativeIdToProps<TT extends CommonIds> =
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
    never

  type TNative<R extends RulesetIds> =
    R extends T ? $T :
    R extends V ? $V :
    R extends I ? $I :
    R

  export type TAllowed<R extends RulesetIds> =
    R extends V ? V | O :
    R extends T ? T | V | O :
    R extends $T ? $T | $V | T | V | O :
    R extends $V ? $V | V | O :
    R extends $I ? $I | I | O :
    R extends $W ? $W | T | V | O :
    R extends I ? I | O :
    R | O

  export type TPlatformAllowed<R extends PlatformIds> =
    TAllowed<R> | $W | (TAllowed<R> | $W)[]

  export type Ruleset<R extends RulesetIds = RulesetIds> = RulesetType<R> | TAllowed<R>
  export type Rulesets<R extends RulesetIds = RulesetIds> = Ruleset<R> | Ruleset<R>[]

  export interface TypedEngine<S extends Shape> {
    THEMED: <R extends any>(p: (t: getTheme<S>) => R) => R

    WEB: (...r: Ruleset<$W>[]) => O
    NATIVE: <R extends NativeIds = $V>(...r: Ruleset<TNative<R>>[]) => O
    //ROOT: (...pars: Ruleset<getRootStyle<S>>[]) => getRootStyle<S>

    IF: <R extends RulesetIds>(cond: boolean | ((p: PropsCode<S>) => boolean), ...r: Ruleset<R>[]) => R
    IFELSE: <R extends RulesetIds>(cond: boolean | ((p: PropsCode<S>) => boolean), ifPart: Rulesets<R>, elsePart: Rulesets<R>) => R
    WIDTH: <R extends RulesetIds>(interval: TEngine.WidthInterval, ...r: Ruleset<R>[]) => R
    HOT: <R extends RulesetIds>(cond: (p: PropsCode<S>) => Ruleset<R> | Ruleset<R>[]) => R
    STYLE: <R extends RulesetIds>(...pars: Ruleset<R>[]) => R
    ATOMIZE: <R extends RulesetIds>(...r: Ruleset<R>[]) => R

    //ATOMIZE: <R extends RulesetIds = V>(r: RulesetOrCreator<S, R>, theme?: getTheme<S>, path?: string) => R
    $mergeRulesets: <R extends RulesetIds>(r: Ruleset<R>[]) => R
    $toClassNames: <R extends RulesetIds>(query: PropsCode<S>, ...rules: RulesetSimple<R>[]) => R

    //$atomizeSheet: (sheet: PartialSheet<S>, theme?: getTheme<S>, path?: string) => PartialSheet<S>
    //$mergeSheets: (sources: PartialSheet<S>[]) => PartialSheet<S>
  }
  //******************************************************
  //* SHEET AND CREATORS
  //******************************************************

  type ValueOrCreator<T, Theme> = T | ((theme: Theme) => T)

  // export type SheetSimple<R extends Shape> = {
  //   [P in keyof getSheet<R>]: getSheet<R>[P]
  // }

  export type SheetSimple<R extends Shape> = getSheet<R>

  export type ClassNameSimple<R extends Shape> = getRootStyle<R>
  export type RulesetSimple<Id extends RulesetIds = RulesetIds> = TAllowed<Id>

  export type Sheet<R extends Shape = Shape> = getSheet<R> extends never ? never : {
    [P in keyof getSheet<R>]: Rulesets<getSheet<R>[P]>
  }
  export type PartialSheet<R extends Shape = Shape> = getSheet<R> extends never ? never : {
    [P in keyof getSheet<R>]?: Rulesets<getSheet<R>[P]>
  }

  export type SheetOrCreator<R extends Shape = Shape> =
    ValueOrCreator<Sheet<R>, getTheme<R>>
  export type PartialSheetOrCreator<R extends Shape = Shape> =
    ValueOrCreator<PartialSheet<R>, getTheme<R>>

  export type RulesetOrCreator<R extends Shape = Shape, Id extends RulesetIds = getRootStyle<R>> =
    ValueOrCreator<Rulesets<Id>, getTheme<R>> | TAllowed<getRootStyle<R>>

  //******************************************************
  //* SHAPE
  //******************************************************

  // component shape
  export interface Shape extends TExtensions.Shape {
    sheet?: Record<string, RulesetIds>
    props?: EmptyInterface // common (web and native) props, excluding events
    sheetQuery?: EmptyInterface
    theme?: EmptyInterface

    rootStyle?: CommonIds
    rootWebProps?: EmptyInterface
    rootNativeProps?: EmptyInterface
    rootProps?: EmptyInterface
  }

  // ancestor for Shape inheritance
  export interface ShapeAncestor extends Shape {
  }

  export type getSheetQuery<R extends Shape> = R['sheetQuery']
  export type getProps<R extends Shape> = R['props']

  export type getSheet<R extends Shape> =
    string extends keyof R['sheet'] ? never : R['sheet']

  export type getTheme<R extends Shape = Shape> =
    string extends keyof R['theme'] ? any : R['theme']

  export type getRootWebProps<R extends Shape> =
    keyof R['rootWebProps'] extends never ? never : R['rootWebProps']
  export type getRootNativeProps<R extends Shape> =
    keyof R['rootNativeProps'] extends never ? never : R['rootNativeProps']
  export type getRootProps<R extends Shape> =
    keyof R['rootProps'] extends never ? never : R['rootProps']

  export type getRootStyle<R extends Shape> =
    unknown extends getSheet<R>['root'] ? never : getSheet<R>['root']

  export type PropsCode<R extends TTyped.Shape = TTyped.Shape> =
    getProps<R> &
    getSheetQuery<R> &
    PropsCodeLow<R>

  export interface PropsCodeLow<R extends TTyped.Shape> extends TEngine.WidthsQuery, RootProps<R> {
    children?: React.ReactNode
  }
  export interface RootProps<R extends TTyped.Shape> {
    $rootWebProps?: getRootWebProps<R>
    $rootNativeProps?: getRootNativeProps<R>
    $rootProps?: getRootProps<R>
  }

  export interface EmptyInterface { }

  /******************************************
    STYLE
  *******************************************/

  export type Style<R extends RulesetIds = CommonIds> =
    RulesetType<R, true> &
    {
      $web?: RulesetType<$W, true>
      $native?: RulesetType<TNative<R>>
    }
  export type StyleSimple<R extends Shape = Shape> = getRootStyle<R>

  export type StyleOrCreator<R extends Shape = Shape> =
    ValueOrCreator<Style<getRootStyle<R>>, getTheme<R>> | TAllowed<getRootStyle<R>>

  //******************************************************
  //* PLATFORM PROPS
  //******************************************************

  interface StylePropsPlatform {
    'data-trace'?: string
  }

  export interface StylePropsWeb extends StylePropsPlatform {
    className?: string
    style?: React.CSSProperties
  }

  // export interface StyleProps<TT extends CommonIds> extends StylePropsPlatform {
  //   classNames?: TAllowed<TT>
  //   styles?: TAllowed<TT>
  // }

  export interface StylePropsNative<TT extends RulesetIds> extends StylePropsPlatform {
    style?: NativeRuleset<TT>
  }

  type PropsOverride<T, S> = T & { style?: S }

  interface Static<P> extends NativeMethodsMixin, React.ClassicComponentClass<P> { }

  export type ViewStyle = StyleProp<ViewStyle_> | TTyped.TAllowed<$V>
  export type TextStyle = StyleProp<TextStyle_> | TTyped.TAllowed<$T>
  export type ImageStyle = StyleProp<ImageStyle_> | TTyped.TAllowed<$I>

  export type ViewProperties = PropsOverride<ViewProperties_, ViewStyle>
  export type TextProperties = PropsOverride<TextProperties_, TextStyle>
  export type ScrollViewProperties = PropsOverride<ScrollViewProperties_, ViewStyle> & { contentContainerStyle?: ViewStyle }
  export type ImageProperties = PropsOverride<ImageProperties_, ImageStyle>

  export type ViewStatic = Static<ViewProperties>
  export type ScrollViewStatic = Static<ScrollViewProperties>
  export type TextStatic = Static<TextProperties>
  export type ImageStatic = Static<ImageProperties>

  export type NativeRuleset<TT extends RulesetIds> =
    TT extends T ? TextStyle :
    TT extends V ? ViewStyle :
    TT extends I ? ImageStyle :
    TT extends $T ? TextStyle :
    TT extends $V ? ViewStyle :
    TT extends $I ? ImageStyle :
    O

  export type StyleProps = (propsCode: PropsCode, rulesets: TTyped.Ruleset[], classNames?: RulesetIds, style?: RulesetIds) => StylePropsWeb | StylePropsNative<RulesetIds>

}

