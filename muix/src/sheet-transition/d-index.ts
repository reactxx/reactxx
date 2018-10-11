import { TSheeter, TCommonStyles, TVariants, TAtomize } from 'reactxx-typings'
import ReactN from 'react-native';

declare module 'reactxx-typings' {
    namespace TVariants {

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
             $transitionGroups?: PartialRecord<TTransition.getTransitionGroups<R>, boolean>
        }
       interface ShapePart {
            transitionGroups: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            $transition?: TTransition.Transition<T, R>
            $transitionOpened?: boolean
            $transitionGroup?: TTransition.Group<T, R>
        }

        interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> {
            transitionGroups?: TTransition.PropsGroups<R>
        }


    }
}

export namespace TTransition {
    // work flow
    export interface Workflow {
        toAtomicRuleset: TVariants.ToAtomicRuleset<Transition>
        //abstract applyLastWinStrategy()
        //abstract afterRender()
    }

    export const enum DefferedType {
        groupWeb = 't$wg',
        groupNative = 't$ng',
        native = 't$n',
        nativeOpened = 't$o',
        // other contst
        handlerFieldName = '$transition',
        platformCompId = '$transition'
    }


    export type GroupProps = Record<string, GroupProp>
    export interface GroupProp {
        start: TValue
        end: TValue
        leftGap: number
        rightGap: number
        duration: number
    }
    export type TValue = number | string
    export type TValues = Record<string, TTransition.TValue>


    //*********************************************************
    // INPUT (transition classNameX, props and classes typing)
    //*********************************************************

    export type getTransitionGroups<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['transitionGroups']

    export type PropsGroups<R extends TSheeter.Shape = TSheeter.Shape> = Record<getTransitionGroups<R>, PropsGroup>
    export interface PropsGroup {
        duration: number
        easing?: string
        initOpened?: boolean
    }

    export type Transition<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        TransitionLow<T> &
        RulesetCommon<T>

    export interface TransitionLow<T extends TCommonStyles.RulesetNativeIds> extends Item<T> {
        $duration: number
        $initOpened?: boolean,
        $easing?: string
    }

    export type Group<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        (getTransitionGroups<R> extends never ? TSheeter.FakeInterface : {
            [P in getTransitionGroups<R>]?: GroupItem<T>
        })
    export type GroupItem<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        Item<T> &
        RulesetCommon<T>

    export interface Item<T extends TCommonStyles.RulesetNativeIds = 'Text'> {
        $native?: RulesetNative<T>
        $web?: RulesetWeb
    }

    export type GroupValue<T> = [T, T, string?]

    export type RulesetRecord<T> = { [P in keyof T]?: GroupValue<T[P]> }

    export type RulesetCommon<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetCommonLow<T>> &
        { transform?: TransformProp }

    export type RulesetNative<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetNative<T>>

    export type RulesetWeb =
        RulesetRecord<React.CSSProperties>

    export type TGroupValue<T> = [T, T]

    export type TRulesetRecord = { [P in keyof TCommonStyles.Transform]?: TGroupValue<TCommonStyles.Transform[P]> }

    export type TransformProp = TRulesetRecord & { $interval?: string }

}
