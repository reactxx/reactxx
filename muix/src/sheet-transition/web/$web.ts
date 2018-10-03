import { renderer } from 'reactxx-fela'
import { TWithStyles, TVariants, TAtomize } from 'reactxx-typings'
import { isDeffered, atomizeRuleset, registerVariantHandler, wrapPseudoPrefixes } from 'reactxx-sheeter'

import { TTransition } from '../d-index'
//import { parsePropDef } from './parse-prop-def'

// platform dependent export
export * from 'reactxx-sheet-transition/web/$web'

export const transition_finalizePropsCode1 = (state: TWithStyles.InstanceState) => {
    
}

export const transition_toPlatformClassName: TAtomize.ToPlatformClassName = (array, props) => {
    const { state } = array
    const deffered = []
    const res = applyLastWinStrategy(array, deffered)
    if (deffered.length===0) return res
    //if (!state.pipeStates) state.pipeStates = []
    return applyLastWinStrategy(array, null)
}

export const transition_registerVariantHandler = () => {
    registerVariantHandler({
        name: '$transition',
        toAtomicRuleset,
        testAtomicRuleset
    })
    registerVariantHandler({
        name: '$transitionGroup',
        toAtomicRuleset: toAtomicRulesetGroup,
        testAtomicRuleset
    })

}

//*********************************************************
//  PRIVATE
//*********************************************************
const applyLastWinStrategy = (values: TAtomize.AtomicArray, outDeffered: TVariants.Deffered[] ) => {
    const res: TAtomize.AtomicWeb[] = []
    const usedPropIds: { [propId: string]: boolean } = {}
    let getRefferedPhase = false
    for (let k = values.length - 1; k >= 0; k--) {
      const value = values[k]
      if (isDeffered(value)) {
        if (!outDeffered) continue // preskakuj, jsem v druhe fazi
        outDeffered.push(value)
        getRefferedPhase = true
        continue
      } else if (getRefferedPhase)
        continue
      const propId = renderer.propIdCache[value]
      if (!propId || usedPropIds[propId]) continue
      res.push(value)
      usedPropIds[propId] = true
    }
    return getRefferedPhase ? null : res.join(' ')
  }
  

const toAtomicRulesetGroup: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}

const toAtomicRuleset: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
    const cssInJS = transitionToFela(ruleset)
    if (!cssInJS) return
    const withPseudo = wrapPseudoPrefixes(cssInJS, pseudoPrefixes)
    list.push({ deffered: true, atomicArray: atomizeRuleset(withPseudo, `${path}/$transition`), conditions } as TAtomize.Variant)
}

const testAtomicRuleset = (cond, query) => { throw '' }

const transitionToFela = (src: TTransition.Transition) => {
    const { $duration, $easing, $propsWeb, $props } = src
    const trans = $propsWeb && $props ? [...$props, ...$propsWeb] : $props ? $props : $propsWeb
    if (!trans || trans.length === 0) return null
    const res: React.CSSProperties = {
        transitionDuration: `${$duration}ms`,
        transition: trans.join(', '),
    }
    if ($easing) res.transitionTimingFunction = $easing
    return res
}
