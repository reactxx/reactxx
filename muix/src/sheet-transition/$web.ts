export * from './d-index'

import { TSheeter, TVariants, TAtomize, TCommonStyles } from 'reactxx-typings'
import { toAtomicArray, registerVariantHandler, wrapPseudoPrefixes } from 'reactxx-sheeter'

import { TTransition } from './d-index'
import { parsePropDef } from './parse-prop-def'


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

const toAtomicRuleset: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
    const cssInJS = transitionToFela(ruleset)
    if (!cssInJS) return
    const withPseudo = wrapPseudoPrefixes(cssInJS, pseudoPrefixes)
    list.push({ atomicArray: toAtomicArray(withPseudo, `${path}/$transition`), conditions })
}

const testAtomicRuleset = (cond, query) => { throw '' }

const transitionToFela = (src: TTransition.Transition) => {
    const {$duration, $easing, $propsWeb, $props} = src
    const trans = $propsWeb && $props ? [...$props, ...$propsWeb] : $props ? $props : $propsWeb
    if (!trans|| trans.length===0) return null
    const res: React.CSSProperties = {
        transitionDuration: `${$duration}ms`,
        transition: trans.join(', '),
    }
    if ($easing) res.transitionTimingFunction = $easing
    return res
}
