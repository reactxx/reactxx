export * from './d-index'

// platform dependent export
export * from './$web'

import { TSheeter, TVariants, TCommonStyles } from 'reactxx-typings'
import { registerVariant } from 'reactxx-sheeter'

import { TTransition } from './d-index'

export const initVariant$transition = () => registerVariant({
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

const toVariantProc: TVariants.ToVariantProc<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testCondition = (cond, query) => {
    return true
}
