import { TSheeter, TComponents, TCommonStyles, TAtomize } from 'reactxx-typings'

import { default as $web } from '../conditions/$web'
import { default as $native } from '../conditions/$native'
import { default as $hot } from '../conditions/$hot'
import { default as $if } from '../conditions/$if'
import { default as $ifelse } from '../conditions/$ifelse'
import { default as $width } from '../conditions/$widths/$width'

const untyped = {
    web: $web,
    native: $native,

    hot: $hot,
    whot: $hot,
    nhot: $hot,

    if: $if,
    wif: $if,
    nif: $if,

    ifelse: $ifelse,
    nifelse: $ifelse,
    wifelse: $ifelse,

    width: $width,
    nwidth: $width,
    wwidth: $width,

} as TRulesetProcPar<TSheeter.Shape, any>

type TWebPar = TCommonStyles.RulesetType<'$Web'> | '$Web'
type TWebPars = TWebPar[]

type TCommonPar<T extends TCommonStyles.RulesetIds> = TCommonStyles.RulesetType<T> | T
type TCommonPars<T extends TCommonStyles.RulesetIds> = TCommonPar<T>[]

type TNativePar<T extends TCommonStyles.RulesetIds> = TCommonStyles.RulesetTypeNative<T> | T
type TNativePars<T extends TCommonStyles.RulesetIds> = TNativePar<T>[]

type TCond<R extends TSheeter.Shape> = (p: TComponents.Props<R>) => boolean
type THot<R extends TSheeter.Shape, T extends keyof TSheeter.getRulesets<R>> =
    (p: TComponents.Props<R>) => boolean

export type RulesetType<T extends TCommonStyles.RulesetIds> =
    T extends 'View' ? '$NativeView' :
    T extends 'Text' ? '$NativeText' :
    T extends 'Image' ? '$NativeImage' :
    never


interface TRulesetProcPar<R extends TSheeter.Shape, T extends keyof TSheeter.getRulesets<R>> {
    web: (...r: TWebPars) => TSheeter.getRuleset<R, T>,
    wweb: (...r: TWebPars) => '$Web',

    native: (...r: TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>) => TSheeter.getRuleset<R, T>,
    nnative: (...r: TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>) => RulesetType<TSheeter.getRuleset<R, T>>,

    hot: (arg: (p: TComponents.Props<R>) => TCommonPar<TSheeter.getRuleset<R, T>> | TCommonPars<TSheeter.getRuleset<R, T>>) => TSheeter.getRuleset<R, T>,
    whot: (arg: (p: TComponents.Props<R>) => TWebPar | TWebPars) => '$Web'
    nhot: (arg: (p: TComponents.Props<R>) => TNativePar<RulesetType<TSheeter.getRuleset<R, T>>> | TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>[]) => RulesetType<TSheeter.getRuleset<R, T>>,

    wif: (c: TCond<R>, ...r: TWebPars) => '$Web',
    nif: (c: TCond<R>, ...r: TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>) => RulesetType<TSheeter.getRuleset<R, T>>,
    if: (c: TCond<R>, ...r: TCommonPars<TSheeter.getRuleset<R, T>>) => TSheeter.getRuleset<R, T>,

    wifelse: (c: TCond<R>, ok: TWebPars, wrong: TWebPars) => '$Web',
    nifelse: (c: TCond<R>, ok: TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>, wrong: TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>) => RulesetType<TSheeter.getRuleset<R, T>>,
    ifelse: (c: TCond<R>, ok: TCommonPars<TSheeter.getRuleset<R, T>>, wrong: TCommonPars<TSheeter.getRuleset<R, T>>) => TSheeter.getRuleset<R, T>,

    wwidth: (c: number | [number, number], ...r: TWebPars) => '$Web',
    nwidth: (c: number | [number, number], ...r: TNativePars<RulesetType<TSheeter.getRuleset<R, T>>>) => RulesetType<TSheeter.getRuleset<R, T>>,
    width: (c: number | [number, number], ...r: TCommonPars<TSheeter.getRuleset<R, T>>) => TSheeter.getRuleset<R, T>,
}

type TRulesetProcArg<R extends TSheeter.Shape, T extends keyof TSheeter.getRulesets<R>> =
    (p: TRulesetProcPar<R, T>, res) => TCommonPars<TSheeter.getRuleset<R, T>>

type TRulesProc<R extends TSheeter.Shape> =
    <T extends keyof TSheeter.getRulesets<R>>(arg: TRulesetProcArg<R, T>) => any

type TSheetPar<R extends TSheeter.Shape> =
    (theme: TSheeter.getTheme<R>, TRules?: TRulesProc<R>) => TSheeter.Sheet<R>

export const TSheet = <R extends TSheeter.Shape>(
    par: TSheetPar<R>
) => theme => {
    const rp: TRulesProc<R> = res => res
    const res = par(theme, rp) as any as Record<string, TRulesetProcArg<R, any>>
    for (const p in res) {
        const value = res[p]
        if (typeof value !== 'function') continue
        res[p] = value[p](untyped, value)
    }
}