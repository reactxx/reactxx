export { TCommonStyles } from './common-styles'
export { TEngine } from './engine'
export { TComponents } from './components'
export { TUseSheeter } from './use-sheeter'
export * from './typed'

import { TTyped, TEngine, TCommonStyles } from './index'
import React from 'react'

export namespace TVariants {

    //*********************************************************
    //  SHEETER EXTENSION
    //*********************************************************

    interface PropsCodePart<R extends TTyped.Shape = TTyped.Shape> { }

    interface ShapePart { }

    //*********************************************************
    //  PLATFORM
    //*********************************************************
    export interface Platform  {
        toPlatformAtomizeRuleset?: ToPlatformAtomizeRuleset
        dataTrace?: (classNames: TEngine.AtomicArrayLow, flags?: TraceFlags) => any,
        applyLastwinsStrategy?: ApplyLastwinsStrategy
        finalizeClassName?: (values: TEngine.AtomicArrayLow) => string | Record<string, any>
        createElement?: (type, props?, ...children) => any
        getDefaultTheme?: () => any
    }
    export type ToPlatformAtomizeRuleset = (ruleset: {}, tracePath?: string) => TEngine.Queryable
    export type ApplyLastwinsStrategy = (values: TEngine.QueryableItems | TEngine.AtomicWebs | TEngine.AtomicNatives) => TEngine.AtomicArrayLow

}
