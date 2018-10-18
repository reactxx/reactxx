import { TVariants, TWithStyles, TAtomize } from 'reactxx-typings'
import { TTransition } from '../d-index'
import ReactN from 'react-native'

//*********************************************************
// STATE
//*********************************************************

export interface PipelineState extends TWithStyles.PipelineState {
    transition: TransitionStates
}

export type TransitionStates = { [P in TTransition.getTransitionGroups]: TransitionState }

export interface TransitionState {
    value: ReactN.Animated.Value
    opened: boolean
    animationHashes: Record<string, string>
    animationHashe: string
    animationActualValue: number
}

//*********************************************************
// DEFFERED
//*********************************************************

export namespace TNTransition {

    export interface Atomized extends TAtomize.Deffered {
        interpolate: {
            transform?: Interpolations
        } & Interpolations
        hashes: {
            common?: string // duration, easing
            opened?: string
            closed?: string
        }
        path?: string
    }

    export interface AtomizedGroup extends Atomized {
        [TAtomize.TypedInterfaceTypes.prop]: TTransition.DefferedType.groupNative,
        groupName: string
        deferred: true
    }

    export interface AtomizedTransition extends Atomized {
        [TAtomize.TypedInterfaceTypes.prop]: TTransition.DefferedType.native,
        deferred: true
    }

    export interface AtomizedTransitionOpened extends TAtomize.Deffered {
        [TAtomize.TypedInterfaceTypes.prop]: TTransition.DefferedType.nativeOpened,
        deferred: true
        opened: boolean
    }

    export type Interpolations = PartialRecord<string, Interpolation>
    export interface Interpolation {
        inputRange: number[]
        outputRange: number[] | string[]
    }

}