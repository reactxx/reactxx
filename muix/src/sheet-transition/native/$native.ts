
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
        name: '$transitionGroup',
        toAtomicRuleset: toAtomicRulesetGroup,
        testAtomicRuleset
    })

}

export const transition_finalizePropsCode1 = (state: TWithStyles.InstanceState) => {
    const st: CodeComponentHandler = state[TTransition.DefferedType.handlerFieldName] || (state[TTransition.DefferedType.handlerFieldName] = new CodeComponentHandler())
    st.finalizePropsCode(state)
}

export const transition_toPlatformClassName: TAtomize.ToPlatformClassName = (array, props) => {

    // *** first phase
    const firstRes = applyLastWinStrategy(array, ApplyLastWinStrategyMode.first)
    if (firstRes.style) return firstRes.style // no transition group => return merged styles

    // *** second phase
    const { state } = array
    // component data
    const animated: CodeComponentHandler = state[TTransition.DefferedType.handlerFieldName]

    if (firstRes.transition) { // simple transition
        const secondRes = applyLastWinStrategy(array, ApplyLastWinStrategyMode.secondTransition, firstRes.transition.usedProps)
        animated.setTransition(
            firstRes.transition,
            firstRes.transitionPropValues,
            secondRes.style as TTransition.TValues,
            props)
    } else { // transitionGroup
        const group: TTransition.DefferedNativeGroup = null // merge firstRes.transitionGroups
        const secondRes = applyLastWinStrategy(array, ApplyLastWinStrategyMode.secondTransitionGroup, group.props)
        props.style = secondRes.style
    }
}

//*********************************************************
//  PRIVATE
//*********************************************************
interface HocData { }

// converts VariantPart.$transition to TTransition.DefferedNative
const toAtomicRuleset: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {

}

// converts VariantPart.$transition to TTransition.DefferedNativeGroup
const toAtomicRulesetGroup: TVariants.ToAtomicRuleset<TTransition.Transition> = (list, ruleset, path, pseudoPrefixes, conditions) => {
}


const testAtomicRuleset = (cond, query) => { throw '' }

//*********************************************************
//  PRIVATE
//*********************************************************
interface ApplyLastWinStrategyResult {
    style: TAtomize.NativeStyle
    transition?: TTransition.DefferedNative
    transitionGroups?: TTransition.DefferedNativeGroup[]
    transitionPropValues?: TTransition.TValues
}

const enum ApplyLastWinStrategyMode {
    first,
    secondTransition,
    secondTransitionGroup
}

const applyLastWinStrategy = (
    values: TAtomize.AtomicArray,
    mode: ApplyLastWinStrategyMode,
    secondIn_usedProps?: {},
) => {
    const res: ApplyLastWinStrategyResult = { style: {} }
    const enum TStatus {
        firstUnknown,
        firstGroup,
        second,
    }
    let status: TStatus = mode === ApplyLastWinStrategyMode.first ? TStatus.firstUnknown : TStatus.second

    for (let k = values.length - 1; k >= 0; k--) {
        const value = values[k] as TAtomize.AtomicNative
        switch (status) {
            case TStatus.firstUnknown:
                if (isDefferedGroup(value)) {
                    // evidence of all transition groups
                    delete res.style
                    status = TStatus.firstGroup
                    res.transitionGroups = [value]
                } else if (isDeffered(value)) {
                    // return first transition
                    delete res.style
                    res.transition = value
                    return res
                } else {
                    // chance for not animeted values during first attempt
                    if (typeof res.style[value.propId] !== 'undefined') continue
                    res.style[value.propId] = value.value
                }
            case TStatus.firstGroup:
                if (!isDefferedGroup(value))
                    break
                res.transitionGroups.push(value)
                break
            case TStatus.second:
                if (!secondIn_usedProps[value.propId]) {
                    // not animeted values during second attempt
                    if (typeof res.style[value.propId] !== 'undefined') continue
                    res.style[value.propId] = value.value
                } else {
                    switch (mode) {
                        case ApplyLastWinStrategyMode.secondTransition:
                            // returns used values (in order to animate them)
                            if (!res.transitionPropValues) res.transitionPropValues = {}
                            if (typeof res.transitionPropValues[value.propId] !== 'undefined') break
                            res.transitionPropValues[value.propId] = value.value as TTransition.TValue
                            break
                        case ApplyLastWinStrategyMode.first:
                            throw 'something wrong'
                        case ApplyLastWinStrategyMode.secondTransitionGroup:
                            //values to animate are part of the transition definition
                            break
                    }
                }
                break
        }
    }
    return res
}

function isDeffered(obj): obj is TTransition.DefferedNative {
    return (obj as TTransition.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.groupNative
}

function isDefferedGroup(obj): obj is TTransition.DefferedNativeGroup {
    return (obj as TTransition.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.native
}
