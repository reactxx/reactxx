export { TCommonStyles } from './common-styles'
export { TEngine } from './atomize'
export { TSheeter } from './sheeter'
export { TComponents } from './components'
export { TUseSheeter } from './use-sheeter'
export * from './typed'

export type TNativeRuleValue = number | string | /*for native animation*/{}

import { TSheeter, TEngine, TCommonStyles } from './index'
import React from 'react'

export namespace TVariants {

    type ToAtomicRuleset<T> = (
        list: TEngine.Variants,
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

    interface VariantPart<T extends TCommonStyles.RulesetIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> { }

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
        innerPar?: any
        test?: (outerPar) => boolean
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
    }
    export interface Platform extends Options, Globals {
        toPlatformAtomizeRuleset?: ToPlatformAtomizeRuleset
        dataTrace?: (classNames: TEngine.AtomicArrayLow, flags?: TraceFlags) => any,
        applyLastwinsStrategy?: ApplyLastwinsStrategy
        finalizeClassName?: (values: TEngine.AtomicArrayLow) => string | Record<string, any>
        createElement?: (type, props?, ...children) => any
    }
    export interface Globals { }
    export type ToPlatformAtomizeRuleset = (ruleset: {}, tracePath?: string) => TEngine.Variant
    export type ApplyLastwinsStrategy = (values: TEngine.Variants | TEngine.AtomicWebs | TEngine.AtomicNatives) => TEngine.AtomicArrayLow

}
