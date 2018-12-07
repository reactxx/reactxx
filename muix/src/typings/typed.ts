import React from 'react';
import ReactN from 'react-native';
import CSS from 'csstype';

import { TCommonStyles, TEngine, TExtensions } from 'reactxx-typings'

export type $W = '$W'; export type $T = '$T'; export type $V = '$V';
export type $I = '$I'; export type V = 'V'; export type T = 'T'; export type I = 'I';
export type O = ''

export namespace TTyped {

  //******************************************************
  //* RULESET ID ARITMETICS
  //******************************************************

  export type CommonIds = V | T | I
  export type NativeIds = $V | $T | $I
  export type RulesetIds = $W | NativeIds | CommonIds | O
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
    TAllowed<R> | $W

  export type Ruleset<R extends RulesetIds = RulesetIds> = RulesetType<R> | TAllowed<R>
  export type Rulesets<R extends RulesetIds = RulesetIds> = Ruleset<R> | Ruleset<R>[]

  export interface TypedEngine<S extends Shape> {
    THEMED: <R extends any>(p: (t: getTheme<S>) => R) => R

    WEB: (...r: Ruleset<$W>[]) => O
    NATIVE: <R extends NativeIds = $V>(...r: Ruleset<TNative<R>>[]) => O
    ROOT: (...pars: Ruleset<getClassName<S>>[]) => getClassName<S>

    IF: <R extends RulesetIds>(cond: boolean | ((p: PropsCode<S>) => boolean), ...r: Ruleset<R>[]) => R
    IFELSE: <R extends RulesetIds = V>(cond: boolean | ((p: PropsCode<S>) => boolean), ifPart: Rulesets<R>, elsePart: Rulesets<R>) => R
    WIDTH: <R extends RulesetIds = V>(interval: TEngine.WidthInterval, ...r: Ruleset<R>[]) => R
    HOT: <R extends RulesetIds = V>(cond: (p: PropsCode<S>) => Ruleset<R> | Ruleset<R>[]) => R
    STYLE: <R extends RulesetIds>(...pars: Ruleset<R>[]) => R
    ATOMIZE: <R extends RulesetIds = V>(...r: Ruleset<R>[]) => R

    //ATOMIZE: <R extends RulesetIds = V>(r: RulesetOrCreator<S, R>, theme?: getTheme<S>, path?: string) => R
    $mergeRulesets: <R extends RulesetIds = V>(r: Ruleset<R>[]) => R
    $toClassNames: <R extends RulesetIds = V>(query: PropsCode<S>, ...rules: RulesetSimple<R>[]) => R

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

  export type ClassNameSimple<R extends Shape> = getClassName<R>
  export type RulesetSimple<Id extends RulesetIds = RulesetIds> = TAllowed<Id>

  export type Sheet<R extends Shape = Shape> = {
    [P in keyof getSheet<R>]: Rulesets<getSheet<R>[P]>
  }
  export type PartialSheet<R extends Shape = Shape> = {
    [P in keyof getSheet<R>]?: Rulesets<getSheet<R>[P]>
  }

  export type SheetOrCreator<R extends Shape = Shape> =
    ValueOrCreator<Sheet<R>, getTheme<R>>
  export type PartialSheetOrCreator<R extends Shape = Shape> =
    ValueOrCreator<PartialSheet<R>, getTheme<R>>

  export type RulesetOrCreator<R extends Shape = Shape, Id extends RulesetIds = getClassName<R>> =
    ValueOrCreator<Rulesets<Id>, getTheme<R>>

  //******************************************************
  //* SHAPE
  //******************************************************

  // component shape
  export interface Shape extends TExtensions.Shape {
    root?: {
      web: React.DOMAttributes<Element>
      native: TTyped.TNativeProps
    }
    sheet?: Record<string, RulesetIds>
    //className?: CommonIds
    theme?: EmptyInterface
    sheetQuery?: EmptyInterface
    props?: EmptyInterface // common (web and native) props, excluding events
  }

  // ancestor for Shape inheritance
  export interface ShapeAncestor extends TExtensions.Shape {
    root?: {
      web: React.HTMLAttributes<Element>
      native: TTyped.TNativeProps
    }
    sheet?: Record<string, RulesetIds>
    //className?: CommonIds
    props?: EmptyInterface // common (web and native) props, excluding events
    theme?: EmptyInterface
    sheetQuery?: EmptyInterface
  }

  export type getTheme<R extends Shape = Shape> = keyof R['theme'] extends never ? any : R['theme']
  export type getProps<R extends Shape> = R['props']
  //export type getClassName<R extends Shape> = R['className']
  export type getSheet<R extends Shape> = R['sheet']
  export type getSheetQuery<R extends Shape> = R['sheetQuery']

  type getRoot<R extends Shape> = R['root']
  export type getRootWeb<R extends Shape> = getRoot<R>['web']
  export type getRootNative<R extends Shape> = getRoot<R>['native']

  type getRootProps<R extends Shape> = { web: getRootWeb<R>; native: getRootNative<R> }
  export type getClassName<R extends Shape> = TTyped.TNativePropsToStyle<getRootNative<R>>


  export type PropsCode<R extends TTyped.Shape = TTyped.Shape> =
    PropsCodeLow<R> &
    getSheetQuery<R> &
    getProps<R>

  export interface PropsCodeLow<R extends TTyped.Shape> extends TEngine.WidthsQuery {
    //$sheetQuery?: getSheetQuery<R>
    children?: React.ReactNode
  }

  export interface EmptyInterface { }
  export interface FakeInterface { ['`']?: any }

  /******************************************
    STYLE
  *******************************************/

  export type Style<R extends RulesetIds = CommonIds> =
    RulesetType<R, true> &
    {
      $web?: RulesetType<$W, true>
      $native?: RulesetType<TNative<R>>
    }
  export type StyleSimple<R extends Shape = Shape> = getClassName<R>

  export type StyleOrCreator<R extends Shape = Shape> =
    ValueOrCreator<Style<getClassName<R>>, getTheme<R>>
}