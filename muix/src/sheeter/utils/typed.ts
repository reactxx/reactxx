import { TSheeter, TComponents, TCommonStyles, TAtomize } from 'reactxx-typings'

import $web from '../conditions/$web'
import $native from '../conditions/$native'
import $hot from '../conditions/$hot'
import $if from '../conditions/$if'
import $ifelse from '../conditions/$ifelse'
import $width from '../conditions/$widths/$width'

export const T_Sheet = <R extends TSheeter.Shape>(par: TTyped.TSheetProc<R>) => {
    const res = theme => {
        const res = par({ theme, T_Rules: res => res }) as any as Record<string, TTyped.TRulesetProcArg<R, any>>
        for (const p in res) {
            const value = res[p]
            if (typeof value !== 'function') continue
            res[p] = value(untyped, value) as any
        }
    }
    return res as TSheeter.SheetCreator<R>
}
export const T_Rules = <R extends TSheeter.Shape, T extends TCommonStyles.RulesetIds>(par: TTyped.TRulesetProcArg<R, T>) => {
    return par(untyped as any, null)
}

const untyped = {
    web: $web,
    wweb: $web,

    native: $native,
    nnative: $native,

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

} as TTyped.TRulesetPar<TSheeter.Shape, any>

export namespace TTyped {

    type TWebPar = TCommonStyles.RulesetType<'$Web'> | '$Web' | TAtomize.Ruleset
    type TWebPars = TWebPar[]

    export type TCommonPar<T extends TCommonStyles.RulesetIds> = CommonOnly<T> extends never ? '?' :
        TCommonStyles.RulesetType<CommonOnly<T>> | CommonOnly<T> | TAtomize.Ruleset
    export type TCommonPars<T extends TCommonStyles.RulesetIds> = TCommonPar<T>[]

    type TNativePar<T extends TCommonStyles.RulesetIds> = ToNative<T> extends never ? '?' : TCommonStyles.RulesetTypeNative<ToNative<T>> | ToNative<T> | TAtomize.Ruleset
    type TNativePars<T extends TCommonStyles.RulesetIds> = TNativePar<T>[]


    type TCondPar<R extends TSheeter.Shape> = TComponents.Props<R>
    type TCond<R extends TSheeter.Shape> = (p: TCondPar<R>) => boolean

    type ToNative<T extends TCommonStyles.RulesetIds> =
        T extends 'View' ? '$NativeView' :
        T extends 'Text' ? '$NativeText' :
        T extends 'Image' ? '$NativeImage' :
        T extends '$NativeView' ? '$NativeView' :
        T extends '$NativeText' ? '$NativeText' :
        T extends '$NativeImage' ? '$NativeImage' :
        never
    export type CommonOnly<T extends TCommonStyles.RulesetIds> =
        T extends 'View' ? 'View' :
        T extends 'Text' ? 'Text' :
        T extends 'Image' ? 'Image' :
        never
    type ToNativeResult<T extends TCommonStyles.RulesetIds> = ToNative<T> extends never ? '?' : ToNative<T>
    type ToCommonResult<T extends TCommonStyles.RulesetIds> = CommonOnly<T> extends never ? '?' : CommonOnly<T>

    export interface TRulesetPar<R extends TSheeter.Shape, T extends TCommonStyles.RulesetIds> {
        web: (...r: TWebPars) => T,
        wweb: (...r: TWebPars) => '$Web',

        native: (...r: TNativePars<T>) => T,
        nnative: (...r: TNativePars<T>) => ToNative<T>,

        hot: (arg: (p: TCondPar<R>) => TCommonPar<T> | TCommonPars<T>) => T,
        whot: (arg: (p: TCondPar<R>) => TWebPar | TWebPars) => '$Web'
        nhot: (arg: (p: TCondPar<R>) => TNativePar<T> | TNativePars<T>[]) => ToNativeResult<T>,

        if: (c: TCond<R>, ...r: TCommonPars<T>) => ToCommonResult<T>,
        wif: (c: TCond<R>, ...r: TWebPars) => '$Web',
        nif: (c: TCond<R>, ...r: TNativePars<T>) => ToNativeResult<T>,

        ifelse: (c: TCond<R>, ok: TCommonPars<T>, wrong: TCommonPars<T>) => ToCommonResult<T>,
        wifelse: (c: TCond<R>, ok: TWebPars, wrong: TWebPars) => '$Web',
        nifelse: (c: TCond<R>, ok: TNativePars<T>, wrong: TNativePars<T>) => ToNativeResult<T>,

        width: (c: number | [number, number], ...r: TCommonPars<T>) => ToCommonResult<T>,
        wwidth: (c: number | [number, number], ...r: TWebPars) => '$Web',
        nwidth: (c: number | [number, number], ...r: TNativePars<T>) => ToNativeResult<T>,
    }

    export type TRulesetProcRes<T extends TCommonStyles.RulesetIds> = TCommonStyles.RulesetType<T> | T | TAtomize.Ruleset
    export type TRulesetProcRess<T extends TCommonStyles.RulesetIds> = TRulesetProcRes<T>[]

    export type TRulesetProcArg<R extends TSheeter.Shape, T extends TCommonStyles.RulesetIds> =
        (p: TRulesetPar<R, T>, res) => TRulesetProcRess<T> | TRulesetProcRes<T>

    export type TRulesProc<R extends TSheeter.Shape> =
        <T extends keyof TSheeter.getRulesets<R>>(arg: TRulesetProcArg<R, TSheeter.getRuleset<R, T>>) => any

    interface TSheetPar<R extends TSheeter.Shape> {
        theme: TSheeter.getTheme<R>
        T_Rules: TRulesProc<R>
    }

    export type TSheetProc<R extends TSheeter.Shape> =
        (par: TSheetPar<R>) => TSheeter.Sheet<R>
}