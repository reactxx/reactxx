export { TCommonStyles } from './common-styles'
export { TAtomize } from './atomize'
export { TSheeter } from './sheeter'
export { TComponents } from './components'
export { TWithStyles } from './with-styles'

export type TNativeRuleValue = number | string | /*for native animation*/{}

import { TSheeter, TAtomize, TCommonStyles } from './index'
import React from 'react'
import { TWithStyles } from './with-styles';

export namespace TVariants {

    type Ruleset<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
        TSheeter.RulesetLow<T, R> &
        VariantPart<T, R>


    type ToAtomicRuleset<T> = (
        list: TAtomize.Variants,
        ruleset: T,
        path: string,
        pseudoPrefixes: string[],
        conditions: Conditions,
        rulesetToQueue?: VariantPart
    ) => void

    // type AtomizeRulesetInner = (
    //     list: TAtomize.Variants,
    //     ruleset: VariantPart,
    //     path: string,
    //     pseudoPrefixes: string[],
    //     conditions: Conditions,
    //     rulesetToQueue?: VariantPart
    // ) => void

    //*********************************************************
    //  SHEETER EXTENSION
    //*********************************************************

    interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> { }

    interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> { }

    interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> { }

    interface ShapePart { }

    interface PipeState { }

    interface ComponentOptions { }

    //*********************************************************
    //  CONDITIONS
    //*********************************************************

    type Conditions = Condition[]

    interface Condition {
        type: string
    }
    //*********************************************************
    //  QUERY
    //*********************************************************

    interface Query<R extends TSheeter.Shape = TSheeter.Shape> { }

    //*********************************************************
    //  PLATFORM
    //*********************************************************
    export interface Options {
        getDefaultTheme?: () => any
        getPipes?: TWithStyles.GetPipes
    }
    export interface Platform extends Options, Globals {
        toPlatformAtomizeRuleset?: ToPlatformAtomizeRuleset
        dumpAtomized?: (classNames: TAtomize.Variants | TAtomize.AtomicArrayLow) => any,
        applyLastwinsStrategy?: ApplyLastwinsStrategy
        finalizeClassName?: (values: TAtomize.AtomicArrayLow) => string | Record<string, any>
        createElement?: (type, props?, ...children) => any
    }
    export interface Globals { }
    export type ToPlatformAtomizeRuleset = (ruleset: {}, tracePath?: string) => TAtomize.Variant
    export type ApplyLastwinsStrategy = (values: TAtomize.Variants | TAtomize.AtomicWebs | TAtomize.AtomicNatives) => TAtomize.AtomicArrayLow

}
