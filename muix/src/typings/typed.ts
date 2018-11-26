import { TCommonStyles, TSheeter, TVariants } from 'reactxx-typings'
import ReactN from 'react-native';
import CSS from 'csstype';

export type $W = '$W'; export type $T = '$T'; export type $V = '$V';
export type $I = '$I'; export type V = 'V'; export type T = 'T'; export type I = 'I';

declare module 'reactxx-typings' {

  namespace TVariants {

    interface ShapePart {
      sheet?: Record<string, TTyped.RulesetIds>
      className?: TTyped.CommonIds
      props?: TSheeter.EmptyInterface // common (web and native) props, excluding events
      theme?: TSheeter.EmptyInterface
      sheetQuery?: TSheeter.EmptyInterface
    }
    type getTheme<R extends ShapePart = ShapePart> = keyof R['theme'] extends never ? any : R['theme']
    type getProps<R extends ShapePart> = R['props']
    type getClassName<R extends ShapePart> = R['className']
    type getSheet<R extends ShapePart> = R['sheet']
    type getSheetQuery<R extends ShapePart> = R['sheetQuery']

    type SheetPar<R extends ShapePart> = getSheetQuery<R> & getProps<R>
  }
}

export namespace TTyped {

  export type CommonIds = V | T | I

  type WebStyle = React.CSSProperties & { [P in CSS.Pseudos]?: Ruleset<$W> | Ruleset<$W>[] }

  type RulesetType<R extends RulesetIds> =
    R extends V ? TCommonStyles.ViewStyle :
    R extends T ? TCommonStyles.TextStyle :
    R extends I ? TCommonStyles.ImageStyle :
    R extends $W ? WebStyle :
    R extends $T ? ReactN.TextStyle :
    R extends $V ? ReactN.ViewStyle :
    R extends $I ? ReactN.ImageStyle :
    never


  type TNative<R extends T | V | I> =
    R extends T ? $T :
    R extends V ? $V :
    R extends I ? $I :
    never

  // classNameX definition for Web, Native and Components

  export type RulesetIds = $W | $T | $V | $I | CommonIds

  export type TAllowed<R extends RulesetIds> =
    R extends T ? T | V :
    R extends $T ? $T | $V | T | V :
    R extends $V ? $V | V :
    R extends $I ? $I | I :
    R

  export type Ruleset<R extends RulesetIds = RulesetIds> = RulesetType<R> | TAllowed<R>

  export type TPlatformAllowed<R extends RulesetIds> =
    R extends $W ? $W | V | T | I :
    R extends T ? T | V | $W | $T | $V :
    R extends V ? V | $W | $V :
    R | $W

  export type TComponentAllowed<R extends T | V | I> =
    R extends T ? T | V | $W : R | $W


  export interface Utils<S extends TVariants.ShapePart> {
    $themed: <R extends any>(p: (t: TVariants.getTheme<S>) => R) => R
    $rules: <R extends RulesetIds>(...pars: Ruleset<R>[]) => TAllowed<R>

    $web: <R extends RulesetIds>(...r: Ruleset<$W>[]) => R
    $native: <R extends CommonIds>(...r: Ruleset<TNative<R>>[]) => R

    $if: <R extends RulesetIds>(cond: (p: TVariants.getSheetQuery<S>) => boolean, ...r: Ruleset<R>[]) => TAllowed<R>
    $ifelse: <R extends RulesetIds>(cond: (p: TVariants.getSheetQuery<S>) => boolean, ifPart: Ruleset<R>[], elsePart: Ruleset<R>[]) => TAllowed<R>
    $width: <R extends RulesetIds>(interval: number | [number, number], ...r: Ruleset<R>[]) => TAllowed<R>
    $hot: <R extends RulesetIds>(cond: (p: TVariants.getSheetQuery<S>) => Ruleset<R> | Ruleset<R>[]) => TAllowed<R>

    $atomizeSheet: (sheet: Sheet, theme?: TVariants.getTheme<S>, path?: string) => Sheet
    $mergeSheets: (sources: Sheet[]) => Sheet
    $atomizeRuleset: <R extends RulesetIds>(r: RulesetOrCreator<R, TVariants.getTheme<S>>, theme?: TVariants.getTheme<S>, path?: string) => TAllowed<R>
    $mergeRulesets: <R extends RulesetIds>(r: Ruleset<R>[]) => TAllowed<R>
    $toClassNames: <R extends RulesetIds>(query: TVariants.getSheetQuery<S>, ...rules: Ruleset<R>[]) => TAllowed<R>
  }

  type ValueOrCreator<T, Theme> = T | ((theme:Theme) => T)

  export type Sheet<R extends TVariants.ShapePart = TVariants.ShapePart> = {
    [P in keyof TVariants.getSheet<R>]: Ruleset<TVariants.getSheet<R>[P]>
  }
  export type PartialSheet<R extends TVariants.ShapePart = TVariants.ShapePart> = {
    [P in keyof TVariants.getSheet<R>]?: Ruleset<TVariants.getSheet<R>[P]>
  }

  export type SheetOrCreator<R extends TVariants.ShapePart = TVariants.ShapePart> = ValueOrCreator<Sheet<R>, TVariants.getTheme<R>>
  export type PartialSheetOrCreator<R extends TVariants.ShapePart = TVariants.ShapePart> = ValueOrCreator<PartialSheet<R>, TVariants.getTheme<R>>
  
  export type RulesetOrCreator<Id extends RulesetIds, R extends TVariants.ShapePart> = ValueOrCreator<Ruleset<Id>[], TVariants.getTheme<R>>

}