import { TCommonStyles, TSheeter } from 'reactxx-typings'
import ReactN from 'react-native';
import CSS from 'csstype';

export type $W = '$W'; export type $T = '$T'; export type $V = '$V';
export type $I = '$I'; export type V = 'V'; export type T = 'T'; export type I = 'I';

declare module 'reactxx-typings' {

  namespace TVariants {

    interface ShapePart {
      sheet: Record<string, TTyped.RulesetIds>
      className: TTyped.CommonIds
    }
    interface PropsPart { 
      query: TSheeter.EmptyInterface
    }

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


  export interface Utils<P extends {}, Theme extends {}> {
    $themed: <R extends any>(p: (t: Theme) => R) => R
    $rules: <R extends RulesetIds>(...pars: Ruleset<R>[]) => TAllowed<R>

    $web: <R extends RulesetIds>(...r: Ruleset<$W>[]) => R
    $native: <R extends CommonIds>(...r: Ruleset<TNative<R>>[]) => R

    $if: <R extends RulesetIds>(cond: (p: P) => boolean, ...r: Ruleset<R>[]) => TAllowed<R>
    $ifelse: <R extends RulesetIds>(cond: (p: P) => boolean, ifPart: Ruleset<R>[], elsePart: Ruleset<R>[]) => TAllowed<R>
    $width: <R extends RulesetIds>(interval: number | [number, number], ...r: Ruleset<R>[]) => TAllowed<R>
    $hot: <R extends RulesetIds>(cond: (p: P) => Ruleset<R> | Ruleset<R>[]) => TAllowed<R>

    $atomizeSheet: (sheet: Sheet, theme?: Theme, path?: string) => Sheet
    $mergeSheets: (sources: Sheet[]) => Sheet
    $atomizeRuleset: <R extends RulesetIds>(r: RulesetOrCreator<R, Theme>, theme?: Theme, path?: string) => TAllowed<R>
    $mergeRulesets: <R extends RulesetIds>(r: Ruleset<R>[]) => TAllowed<R>
    $toClassNames: <R extends RulesetIds>(query: P, ...rules: Ruleset<R>[]) => TAllowed<R>
  }

  type ValueOrCreator<T, Theme> = T | ((theme:Theme) => T)

  export type Sheet = Record<string, RulesetIds>

  export type SheetOrCreator<Theme = any> = ValueOrCreator<Sheet, Theme>
  export type RulesetOrCreator<R extends RulesetIds, Theme> = ValueOrCreator<Ruleset<R>[], Theme>

}