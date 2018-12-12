export { useWidths, setActWidth } from './$widths/store'

export { default as $web } from './$web'
export { default as $native } from './$native'
export { default as $hot } from './$hot'
export { $if, $ifelse } from './$if'
export { default as $width } from './$widths/$width'

import { TEngine, TTyped, $W, O } from 'reactxx-typings'
import { atomizeRuleset } from '../utils/atomize'
import { toClassNamesWithQuery } from '../utils/to-classnames'

import $web from './$web'
import $native from './$native'
import $hot from './$hot'
import { $if, $ifelse } from './$if'
import $width from './$widths/$width'

export const WEB:
    (...r: TTyped.Ruleset<$W>[]) => O =
    $web

export const NATIVE:
    <R extends TTyped.NativeIds>(...r: TTyped.Ruleset<TTyped.TNative<R>>[]) => O =
    $native

export const STYLE:
    <R extends TTyped.RulesetIds>(...pars: TTyped.Ruleset<R>[]) => R = (...pars) =>
        pars as any

export const COMPILE:
    <R extends TTyped.RulesetIds>(...r: TTyped.Ruleset<R>[]) => R =
    (...pars: any[]) => atomizeRuleset(pars, null, '$atomize') as any

export const WIDTH:
    <R extends TTyped.RulesetIds>(interval: TEngine.WidthInterval, ...r: TTyped.Ruleset<R>[]) => R =
    $width

export const THEMED:
    <S extends TTyped.Shape, R extends any>(p: (t: TTyped.getTheme<S>) => R) => R =
    p => p as any

export const IF:
    <S extends TTyped.Shape, R extends TTyped.RulesetIds>(cond: boolean | ((p: TTyped.PropsCode<S>) => boolean), ...r: TTyped.Ruleset<R>[]) => R =
    $if

export const IFELSE:
    <S extends TTyped.Shape, R extends TTyped.RulesetIds>(cond: boolean | ((p: TTyped.PropsCode<S>) => boolean), ifPart: TTyped.Rulesets<R>, elsePart: TTyped.Rulesets<R>) => R =
    $ifelse

export const HOT:
    <S extends TTyped.Shape, R extends TTyped.RulesetIds>(cond: (p: TTyped.PropsCode<S>) => TTyped.Ruleset<R> | TTyped.Ruleset<R>[]) => R =
    $hot

export const QUERY:
    <S extends TTyped.Shape, R extends TTyped.RulesetIds>(query: TTyped.PropsCode<S>, ...rules: TTyped.RulesetSimple<R>[]) => R =
    toClassNamesWithQuery as any
