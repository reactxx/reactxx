import { TSheeter, TCommonStyles } from 'reactxx-typings'

export namespace TAnimation {
    export type getAnimations<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['transitions']

    export type Transition<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
        TransitionLow<T, R> & RulesetCommon<T>

    export interface TransitionLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
        $groupName?: getAnimations<R>
        $duration?: number
        $easing?: string
        $native?: RulesetNative<T>
        $web?: RulesetWeb
    }

    //export type Value<T> = T | true | [T, string] | [string]

    export type TransitionRuleset<T> = {
        [P in keyof T]?: string | true //Value<T[P]>
    }

    export type RulesetCommon<T extends TCommonStyles.RulesetNativeIds> =
        TransitionRuleset<TCommonStyles.RulesetCommon<T>>

    export type RulesetNative<T extends TCommonStyles.RulesetNativeIds> =
        TransitionRuleset<TCommonStyles.RulesetNative<T>>

    export type RulesetWeb =
        TransitionRuleset<React.CSSProperties>
}