import { TWithStyles, TSheeter, TAtomize, TVariants } from 'reactxx-typings'
import { atomizeRuleset, wrapRuleset } from './atomize'
import { isToAtomize, isToAtomizeArray } from './atomize-low'
import { testConditions } from './conditions'

export const toClassNamesWithQuery = (state: TWithStyles.PipelineState, ruleset: TSheeter.ClassNameOrAtomized) => {

    const rs = ruleset as (TAtomize.Ruleset | TAtomize.Ruleset[])

    //if (isQueried(rs)) return rs as TAtomize.Ruleset // already done, e.g. single Ruleset without conditions

    let values: TAtomize.Variants | TAtomize.Ruleset = null

    const push = (val: TAtomize.Variants) => {
        if (!val || val.length === 0) return
        if (!values) values = val
        else values = [...values, ...val]
    }

    const process = (val: TAtomize.Variants) => {
        if (!val || val.length === 0) return

        if (isToAtomize(val)) {
            val = atomizeRuleset(val as any, state && state.theme)
            if (!val || val.length === 0) return
        }

        push(val.filter(variant => variant && testConditions(variant.conditions, state)))
    }

    if (isToAtomizeArray(rs))
        rs.forEach(r => process(r))
    else
        process(rs);

    if (!values) return null;
    
    return wrapRuleset(values)
}

export const deleteSystemProps = props => {
    propsToDelete.forEach(p => delete props[p])
    if (props.style) delete props.style.toJSON
}


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: string[] = [ //TComponents.CommonPropertiesCodeKeys[] = [
    'sheetQuery', 'classes', 'toClassNames', 'styleX', 'classNameX', 'theme'
]

// const signAtomicArray = (res: TAtomize.AtomicArray, state: TWithStyles.PipelineState) => {
//     res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
//     res.state = state
//     return res
// }
