import { TWithStyles, TSheeter, TAtomize, TVariants } from 'reactxx-typings'
import { atomizeRuleset, wrapRuleset } from './atomize'
import { isToAtomize, isToAtomizeArray, isDeferred, isTemporary } from './atomize-low'

export interface QueryState {
    theme?
}
export type Item = TAtomize.ToAtomize | TAtomize.Ruleset | TAtomize.TempProc

export const toClassNamesWithQuery = <T extends QueryState = any>(state: T, ...items: Item[]) => {

    let values: TAtomize.Variants = []

    const testConditions = (v: TAtomize.Variant, state: TWithStyles.PipelineState) => {
        if (!v.conditions || v.conditions.length === 0) return true
        return v.conditions.every(c => c.test(state))
    }

    const filterList = (list: TAtomize.Variants) => {
        list.forEach(v => {
            if (!v) return
            if (isDeferred(v)) {
                const res = v.evalProc(state)
                filterList(res)
                //res.forEach(r => process(r))
            } else if (testConditions(v, state))
                values.push(v)
        })
    }

    const process = (val: Item) => {
        if (!val) return

        if (isDeferred(val)) {
            const res = val.evalProc(state)
            filterList(res)
            //res.forEach(r => process(r))
            return
        }

        if (isTemporary(val)) {
            const list: TAtomize.Variants = []
            val(list, '', [], [])
            filterList(list)
            return
        }

        const ruleset = isToAtomize(val) ? atomizeRuleset(val, state && state.theme) : val
        if (!ruleset || ruleset.length === 0) return

        filterList(ruleset)

    }

    items.forEach(r => process(r))

    return values.length === 0 ? null : wrapRuleset(values)
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
