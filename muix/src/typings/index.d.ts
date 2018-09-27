export { TCommonStyles } from './common-styles'
export { TAtomize } from './atomize'
export { TSheeter } from './sheeter'
export { TComponents } from './components'
export { TTheme } from './themer'
export { TWithStyles } from './with-styles'

export type TValue = number | string

import { TSheeter, TAtomize, TCommonStyles } from './index'

export namespace TVariants {

    type ToVariantProc<T> = (
        list: TAtomize.Variants,
        ruleset: T,
        path: string,
        pseudoPrefixes: string[],
        conditions: Conditions,
        rulesetToQueue?: VariantPart
    ) => void

    type AtomizeRulesetInner= (
        list: TAtomize.Variants,
        ruleset: VariantPart,
        path: string,
        pseudoPrefixes: string[],
        conditions: Conditions,
        rulesetToQueue?: VariantPart
    ) => void

    //*********************************************************
    //  SHEETER EXTENSION
    //*********************************************************

    interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> { }

    interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> { }
    interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> { }
    interface ShapePart { }

    interface PipeState {}


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

}