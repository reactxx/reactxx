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

  //******************************************************
  //** RULESET ID ARITMETICS
  //******************************************************

  export type CommonIds = V | T | I
  export type RulesetIds = $W | $T | $V | $I | CommonIds

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


  type TNative<R extends RulesetIds> =
    R extends T ? $T :
    R extends V ? $V :
    R extends I ? $I :
    R

  export type TAllowed<R extends RulesetIds> =
    R extends T ? T | V :
    R extends $T ? $T | $V | T | V :
    R extends $V ? $V | V :
    R extends $I ? $I | I :
    R

  export type TPlatformAllowed<R extends RulesetIds> =
    R extends $W ? $W | V | T | I :
    R extends T ? T | V | $W | $T | $V :
    R extends V ? V | $W | $V :
    R | $W

  export type TComponentAllowed<R extends T | V | I> =
    R extends T ? T | V | $W : R | $W


  export type Ruleset<R extends RulesetIds = RulesetIds> = RulesetType<R> | TAllowed<R>
  export type Rulesets<R extends RulesetIds = RulesetIds> = Ruleset<R> | Ruleset<R>[]


  export interface TypedEngine<S extends TVariants.ShapePart> {
    $themed: <R extends any>(p: (t: TVariants.getTheme<S>) => R) => R
    $rules: <R extends RulesetIds>(...pars: Ruleset<R>[]) => R

    $web: <R extends RulesetIds>(...r: Ruleset<$W>[]) => R
    $native: <R extends RulesetIds>(...r: Ruleset<TNative<R>>[]) => R

    $if: <R extends RulesetIds>(cond: (p: TVariants.SheetPar<S>) => boolean, ...r: Ruleset<R>[]) => R
    $ifelse: <R extends RulesetIds>(cond: (p: TVariants.SheetPar<S>) => boolean, ifPart: Rulesets<R>, elsePart: Rulesets<R>) => R
    $sif: <R extends RulesetIds>(cond: boolean, ...r: Ruleset<R>[]) => R
    $sifelse: <R extends RulesetIds>(cond: boolean, ifPart: Rulesets<R>, elsePart: Rulesets<R>) => R
    $width: <R extends RulesetIds>(interval: number | [number, number], ...r: Ruleset<R>[]) => R
    $hot: <R extends RulesetIds>(cond: (p: TVariants.SheetPar<S>) => Ruleset<R> | Ruleset<R>[]) => R

    $atomizeRuleset: <R extends RulesetIds>(r: RulesetOrCreator<S, R>, theme?: TVariants.getTheme<S>, path?: string) => R
    $atomize: <R extends RulesetIds>(...r: Ruleset<R>[]) => R
    $mergeRulesets: <R extends RulesetIds>(r: Ruleset<R>[]) => R
    $toClassNames: <R extends RulesetIds>(query: TVariants.SheetPar<S>, ...rules: RulesetSimple<R>[]) => R

    $atomizeSheet: (sheet: PartialSheet<S>, theme?: TVariants.getTheme<S>, path?: string) => PartialSheet<S>
    $mergeSheets: (sources: PartialSheet<S>[]) => PartialSheet<S>
  }

  //******************************************************
  //** RULESET ID ARITMETICS
  //******************************************************

  type ValueOrCreator<T, Theme> = T | ((theme: Theme) => T)

  export type SheetSimple<R extends TVariants.ShapePart> = {
    [P in keyof TVariants.getSheet<R>]: TVariants.getSheet<R>[P]
  }
  export type ClassNameSimple<R extends TVariants.ShapePart> = TAllowed<TVariants.getClassName<R>>
  export type RulesetSimple<Id extends RulesetIds = RulesetIds> = TAllowed<Id>

  export type Sheet<R extends TVariants.ShapePart = TVariants.ShapePart> = {
    [P in keyof TVariants.getSheet<R>]: Rulesets<TVariants.getSheet<R>[P]>
  }
  export type PartialSheet<R extends TVariants.ShapePart = TVariants.ShapePart> = {
    [P in keyof TVariants.getSheet<R>]?: Rulesets<TVariants.getSheet<R>[P]>
  }

  export type SheetOrCreator<R extends TVariants.ShapePart = TVariants.ShapePart> =
    ValueOrCreator<Sheet<R>, TVariants.getTheme<R>>
  export type PartialSheetOrCreator<R extends TVariants.ShapePart = TVariants.ShapePart> =
    ValueOrCreator<PartialSheet<R>, TVariants.getTheme<R>>

  export type RulesetOrCreator<R extends TVariants.ShapePart = TVariants.ShapePart, Id extends RulesetIds = TVariants.getClassName<R>> =
    ValueOrCreator<Rulesets<Id>, TVariants.getTheme<R>>

}