import { TSheeter, TCommonStyles } from 'reactxx-typings'
import ReactN from 'react-native';

declare module 'reactxx-typings' {
    namespace TVariants {

        interface ShapePart {
            transitions?: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds, R extends TSheeter.Shape> {
            $transition?: TTransition.Transition<T, R>
        }

    }
}

export namespace TTransition {
    export type getTransitions<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['transitions']

    export type Transition<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        TTransition.getTransitions<R> extends never ? never :
        TTransition.TransitionLow<T, R> & TTransition.RulesetCommon<T>

    export interface TransitionLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $groupName?: getTransitions<R>
        $duration?: number
        $easing?: string
        $native?: RulesetNative<T>
        $web?: RulesetWeb
    }

    //export type Value<T> = T | true | [T, string] | [string]

    export type RulesetRecord<T> = PartialRecord<keyof T, string>

    export type RulesetCommon<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetCommon<T>>

    export type RulesetNative<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetNative<T>>

    export type RulesetWeb =
        RulesetRecord<React.CSSProperties>
}