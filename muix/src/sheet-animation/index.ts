export * from './d-index'

// platform dependent export
export * from './$web'

import { TSheeter, TVariants, TCommonStyles } from 'reactxx-typings'
import { registerVariant } from 'reactxx-sheeter'

import { TAnimation } from './d-index'

export const initVariant$animation = () => registerVariant({
    name: '$animation',
    toVariantProc,
    testCondition
})

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
            $transition?: TAnimation.Transition
        }

    }
}

const toVariantProc: TVariants.ToVariantProc<TAnimation.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testCondition = (cond, query) => {
    return true
}
