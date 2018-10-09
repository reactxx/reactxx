
import { TWithStyles, TVariants, TAtomize, TCommonStyles } from 'reactxx-typings'
import { registerVariantHandler } from 'reactxx-sheeter'

import { CodeComponentHandler } from './transition-to-animated'
import { TTransition } from '../d-index'


export const transition_registerVariantHandler = () => {
    registerVariantHandler({
        name: '$transition',
        toAtomicRuleset,
        testAtomicRuleset
    })
    registerVariantHandler({
        name: '$transitionOpened',
        toAtomicRuleset: null,
        testAtomicRuleset
    })
    registerVariantHandler({
        name: '$transitionGroup',
        toAtomicRuleset: toAtomicRulesetGroup,
        testAtomicRuleset
    })

}

export const transition_finalizePropsCode: TWithStyles.FinishPropsCode = state => {
    const st: CodeComponentHandler = state[TTransition.DefferedType.handlerFieldName] ||
        (state[TTransition.DefferedType.handlerFieldName] = new CodeComponentHandler())
    st.finalizePropsCode(state)
}

export const transition_processDeffereds: TWithStyles.ProcessDeffereds = (values, defferedIdxs, state) => {
}

//*********************************************************
//  PRIVATE
//*********************************************************
// converts VariantPart.$transition to TTransition.DefferedNative
const toAtomicRuleset: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {

}

// converts VariantPart.$transition to TTransition.DefferedNativeGroup
const toAtomicRulesetGroup: TVariants.ToAtomicRuleset<TTransition.Group> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}


const testAtomicRuleset = (cond, query) => { throw '' }

function isDeffered(obj): obj is TTransition.DefferedNative {
    return (obj as TTransition.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.groupNative
}

function isDefferedGroup(obj): obj is TTransition.DefferedGroupNative {
    return (obj as TTransition.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.native
}
