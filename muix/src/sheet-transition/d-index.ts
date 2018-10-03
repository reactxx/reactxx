import { TSheeter, TCommonStyles, TVariants, TAtomize } from 'reactxx-typings'
import ReactN from 'react-native';

declare module 'reactxx-typings' {
    namespace TVariants {

        interface ShapePart {
            transitionGroups: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            $transition?: TTransition.Transition<T, R>
            $transitionGroup?: TTransition.Group<T, R>
        }

        // interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
        //     transitionGroups?: TTransition.PropsCode<R>
        // }


    }
}

export namespace TTransition {

    //*********************************************************
    // DEFFERED (created during atomize, processed just before putting style to React native STYLE prop)
    // *********************************************************
    export interface DefferedGroupWeb extends DefferedGroup {
        [TAtomize.TypedInterfaceTypes.prop]: DefferedType.groupWeb
        props: Record<string, boolean> // used props => ignored in applyLastWinStrategy
    }
    export interface DefferedNativeGroup extends DefferedGroup {
        [TAtomize.TypedInterfaceTypes.prop]: DefferedType.groupWeb
        props: GroupProps
    }
    export interface DefferedNative extends Deffered {
        [TAtomize.TypedInterfaceTypes.prop]: DefferedType.native
        usedProps: Record<string,true>
    }

    export const enum DefferedType {
        groupWeb = 't$wg',
        groupNative = 't$ng',
        native = 't$n',
        // other contst
        handlerFieldName = '$transition',
        platformCompId = '$transition'
    }

    export interface Deffered extends TVariants.Deffered {
        $duration?: number
        $easing?: string
    }
    export interface DefferedGroup extends Deffered {
        $name: string
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
    // INPUT (transition classNameX and classes typing)
    //*********************************************************

    export type getTransitionGroups<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['transitionGroups']

    export interface Transition<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $duration: number
        $props: (keyof TCommonStyles.RulesetCommon<T>)[]
        $easing?: string
        $propsWeb?: (keyof TCommonStyles.RulesetWeb)[]
        $propsNative?: (keyof TCommonStyles.RulesetNative<T>)[]
    }

    export type Group<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        GroupLow<T, R> &
        (getTransitionGroups<R> extends never ? TSheeter.FakeInterface : RulesetCommon<T>)

    export interface GroupLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $name: getTransitionGroups<R>
        $open?: boolean
        $native?: RulesetNative<T>
        $web?: RulesetWeb
    }

    export type GroupValue = [number, number, string?] | [string, string, string?]

    export type RulesetRecord<T> = PartialRecord<keyof T, GroupValue>

    export type RulesetCommon<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetCommon<T>>

    export type RulesetNative<T extends TCommonStyles.RulesetNativeIds> =
        RulesetRecord<TCommonStyles.RulesetNative<T>>

    export type RulesetWeb =
        RulesetRecord<React.CSSProperties>

}