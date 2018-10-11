
import { TWithStyles, TVariants, TAtomize, TCommonStyles } from 'reactxx-typings'
import { registerVariantHandler, isAtomicArray } from 'reactxx-sheeter'

import { CodeComponentHandler } from './transition-to-animated'
import { TTransition } from '../d-index'
import { TNTransition } from './d-native'


export const transition_registerVariantHandler = () => {
    registerVariantHandler({
        name: '$transition',
        toAtomicRuleset,
        testAtomicRuleset
    })
    registerVariantHandler({
        name: '$transitionOpened',
        toAtomicRuleset: toAtomicRulesetOpened,
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
    const res: TNTransition.AtomizedTransition = {
        [TAtomize.TypedInterfaceTypes.prop]: TTransition.DefferedType.native,
        deferred: true,
        atomicArray: undefined,
        interpolate: {},
        hashes: {
            opened: '',
            closed: '',
            common: ''
        }
    }
}

let addValue
// converts VariantPart.$transition to TTransition.DefferedNativeGroup
const toAtomicRulesetGroup: TVariants.ToAtomicRuleset<TTransition.Group> = (list, ruleset, path, pseudoPrefixes, conditions) => {
    for (const groupName in ruleset) {
        const grpRes: TNTransition.AtomizedGroup = {
            [TAtomize.TypedInterfaceTypes.prop]: TTransition.DefferedType.groupNative,
            deferred: true,
            groupName,
            interpolate: {},
            hashes: {},
            path
        }
        list.push(grpRes)

        const grp = ruleset[groupName] as TTransition.GroupItem
        const { $web, $native, ...$props } = grp
        const transition = $web && $props ? { ...$props, ...$native } : $props ? $props : $native

        for (const prop in transition) {
            const value: TTransition.GroupValue<string | number | TTransition.TransformProp> = transition[prop]
            if (isTransformProp(value, prop))
                for (const p in value)
                    addValue(grpRes.interpolate.transform = {}, p, value[p], value.$interval)
            else
                addValue(grpRes, prop, value, value[2])
        }
    }
}

function isTransformProp(obj, p): obj is TTransition.TransformProp {
    return p === 'transform'
}

const toAtomicRulesetOpened: TVariants.ToAtomicRuleset<boolean> = (list, ruleset, path, pseudoPrefixes, conditions) => {
    const res: TNTransition.AtomizedTransitionOpened = {
        [TAtomize.TypedInterfaceTypes.prop]: TTransition.DefferedType.nativeOpened,
        deferred: true,
        opened: ruleset,
        atomicArray: undefined,
    }
}

const testAtomicRuleset = (cond, query) => { throw '' }

function isDeffered(obj): obj is TNTransition.Atomized {
    return (obj as TAtomize.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.native
}

function isDefferedOpened(obj): obj is TNTransition.AtomizedTransitionOpened {
    return (obj as TAtomize.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.nativeOpened
}

function isDefferedGroup(obj): obj is TNTransition.AtomizedGroup {
    return (obj as TAtomize.Deffered).deffered && obj[TAtomize.TypedInterfaceTypes.prop] === TTransition.DefferedType.groupNative
}
