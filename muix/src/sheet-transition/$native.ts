export * from './d-index'

import { TSheeter, TVariants, TAtomize, TCommonStyles } from 'reactxx-typings'
import { registerVariantHandler } from 'reactxx-sheeter'

import { TTransition } from './d-index'


// platform dependent export
export * from './$web'

export const transition_finishPropsCode3 = (atomics: TAtomize.AtomicArray) => {}

export const initVariant$transition = () => registerVariantHandler({
    name: '$transition',
    toAtomicRuleset,
    testAtomicRuleset
})

//*********************************************************
//  PRIVATE
//*********************************************************
//export const 

const toAtomicRuleset: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testAtomicRuleset = (cond, query) => { throw '' }