import { TSheeter, TVariants, TCommonStyles } from 'reactxx-typings'
import { registerVariant } from 'reactxx-sheeter'

export const initVariant$animation = () => {
    registerVariant({
        name: '$animation',
        toVariantProc: toVariantAnimationProc,
        testCondition
    })
    registerVariant({
        name: '$animations',
        toVariantProc: toVariantAnimationsProc,
        testCondition
    })
}

export type getAnimations<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['transitions']

export interface AnimPropsCode {
}

export interface TransitionLow { 
    $duration?: number
    $easing?: string
}

export type Transition = TransitionLow

// $animations: opacity: 1 or opacity: [1, '300'] or opacity: [1, '-50'] or opacity: [1, '100,200'] or opacity: [1, '30-80'] or opacity: [1, '50-']
//   '-50' je v procentech vzhledem k $animations konstante nebo k komponent specific konstante nebo ke globalni konstante
//   '100, 200' je 100ms delay, 200ms trvani
// $animation:
//   '-50' je vzhledem k komponent specific konstante nebo ke globalni konstante

//*********************************************************
//  PRIVATE
//*********************************************************
const enum Consts {
    name = '$animation'
}

declare module 'reactxx-typings' {
    namespace TVariants {

        interface ShapePart {
            transitions?: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            $transitions?: Transitions<T, R>
            $transition?: Transition
        }
        type Transitions<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            getAnimations<R> extends never ? never :
            PartialRecord<getAnimations<R>, Transition>

        // interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
        //     [Consts.name]?: AnimationQuery
        // }

        // interface AnimationCondition extends Condition {
        //     type: Consts.name
        //     opened: boolean
        // }

        // type AnimationQuery = 'opened' | 'closed'

    }
}

const toVariantAnimationProc: TVariants.ToVariantProc<TVariants.Transitions> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}
const toVariantAnimationsProc: TVariants.ToVariantProc<Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testCondition = (cond, query) => {
    return true
}
