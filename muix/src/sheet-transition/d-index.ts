import { TSheeter, TCommonStyles } from 'reactxx-typings'
import ReactN from 'react-native';

declare module 'reactxx-typings' {
    namespace TVariants {

        interface ShapePart {
            transitionGroups: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            $transition?: TTransition.Transition<T, R>
            $transitionGroup?: TTransition.TransitionGroup<T, R>
        }

        interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> {
            transitionGroups: TTransition.Props<R>
        }

        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            transitionGroups?: TTransition.PropsCode<R>
        }


    }
}

export namespace TTransition {

    export type getTransitionGroups<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['transitionGroups']

    export type Props<R extends TSheeter.Shape = TSheeter.Shape> =
        getTransitionGroups<R> extends never ? never :
        Record<getTransitionGroups<R>, PropsGroup>
    export type PropsCode<R extends TSheeter.Shape = TSheeter.Shape> =
        Record<getTransitionGroups<R>, PropsCodeGroup>

    export interface PropsGroup {
        duration: number
        easing?: string
        openDefault?: boolean
    }
    export interface PropsCodeGroup {
        opened: boolean

    }

    export interface Transition<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $duration: number
        $props: (keyof TCommonStyles.RulesetCommon<T>)[]
        $easing?: string
        $propsWeb?: (keyof TCommonStyles.RulesetWeb)[]
        $propsNative?: (keyof TCommonStyles.RulesetNative<T>)[]
    }

    export type TransitionGroup<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        TransitionGroupLow<T, R> &
        (getTransitionGroups<R> extends never ? TSheeter.FakeInterface : RulesetCommon<T>)


    export interface TransitionGroupLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $name: getTransitionGroups<R>
        $open?: boolean
        $native?: RulesetNative<T>
        $web?: RulesetWeb
    }

    export type TransitionGroupValue = [number, number, string?] | [string, string, string?]

    export type RulesetRecord<T> = PartialRecord<keyof T, TransitionGroupValue>

    export type RulesetCommon<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetCommon<T>>
        //RulesetRecord<TCommonStyles.ViewStyle>
        

    export type RulesetNative<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetNative<T>>

    export type RulesetWeb =
        RulesetRecord<React.CSSProperties>

}