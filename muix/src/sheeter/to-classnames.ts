import { TWithStyles, TSheeter, TAtomize, TVariants } from 'reactxx-typings'
import { atomizeRuleset, isAtomizedRuleset, isAtomicArray } from './atomize'
import { testConditions } from './variants'

export const toClassNamesWithQuery = (state: TWithStyles.PipelineState, rulesets: TSheeter.ClassNameOrAtomized) => {
    if (!rulesets) return signAtomicArray([] as any, state)

    if (isAtomicArray(rulesets))
        return rulesets.state === state ? rulesets : signAtomicArray(/*flat copy*/[...rulesets] as any, state)

    const values: TAtomize.Atomic[][] = []

    const push = (val: TAtomize.AtomizedRuleset) => {
        if (!val) return
        if (isAtomicArray(val)) {
            values.push(val)
            return
        }
        if (!isAtomizedRuleset(val))
            val = atomizeRuleset(val, state && state.theme) as TAtomize.AtomizedRuleset
        if (!val) return

        for (let j = 0; j < val.list.length; j++) {
            const rsi = val.list[j]
            if (!testConditions(rsi.conditions, state)) continue
            values.push(rsi.deffered ? [rsi as TAtomize.Deffered] : rsi.atomicArray)
        }

    }

    if (Array.isArray(rulesets))
        rulesets.forEach(r => push(r as TAtomize.AtomizedRuleset))
    else
        push(rulesets as TAtomize.AtomizedRuleset)

    // concat values
    const res = Array.prototype.concat.apply([], values) as TAtomize.AtomicArray
    return signAtomicArray(res, state)
}

export const deleteSystemProps = props => propsToDelete.forEach(p => delete props[p])


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: string[] = [ //TComponents.CommonPropertiesCodeKeys[] = [
    'sheetQuery', 'classes', 'toClassNames', 'styleX', 'classNameX', 'theme'
]

const signAtomicArray = (res: TAtomize.AtomicArray, state: TWithStyles.PipelineState) => {
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
    res.state = state
    return res
}
