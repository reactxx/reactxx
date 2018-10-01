export * from './d-index'

import { TSheeter, TVariants, TAtomize, TCommonStyles } from 'reactxx-typings'
import { registerVariantHandler } from 'reactxx-sheeter'

import { TTransition } from './d-index'


// platform dependent export
export * from './$web'

export const initVariant$transition = () => registerVariantHandler({
    name: '$transition',
    toAtomicRuleset,
    testAtomicRuleset
})

export const transition_toPlatformClassName:TAtomize.ToPlatformClassName = array => {
    return null
}

//*********************************************************
//  PRIVATE
//*********************************************************
//export const 

const toAtomicRuleset: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const testAtomicRuleset = (cond, query) => { throw '' }