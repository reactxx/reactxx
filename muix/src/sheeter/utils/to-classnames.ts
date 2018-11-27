import warning from 'warning'
import { TUseSheeter, TSheeter, TEngine, TVariants } from 'reactxx-typings'
import { atomizeRuleset, wrapRuleset } from './atomize'
import { isToAtomize, isToAtomizeArray, isDeferred, isTemporary } from './atomize-low'

export type Item = TEngine.ToAtomize | TEngine.AtomizedRuleset | TEngine.TempProc

export const toClassNamesWithQuery = <T extends {} = any>(props: T, ...items: Item[]) => {

    let values: TEngine.Variants = []

    const testConditions = (v: TEngine.Variant, state) => {
        if (!v.conditions || v.conditions.length === 0) return true
        return v.conditions.every(c => c.test(state))
    }

    const filterList = (list: TEngine.Variants) => {
        list.forEach(v => {
            if (!v) return
            if (isDeferred(v)) {
                const res = v.evalProc(props)
                filterList(res)
            } else if (testConditions(v, props))
                values.push(v)
        })
    }

    const process = (val: Item) => {
        if (!val) return

        if (isDeferred(val)) {
            const res = val.evalProc(props)
            filterList(res)
            return
        }

        if (isTemporary(val)) {
            const list: TEngine.Variants = []
            val(list, '', [], [])
            filterList(list)
            return
        }

        const ruleset = isToAtomize(val) ? (() => {
            warning (typeof val !== 'function', 'Only ruleset expected in toClassNamesWithQuery (but rulesetCreator found)')
            return atomizeRuleset(val)
        })() : val
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
    'sheetQuery', 'classes', 'toClassNames', 'styleX', 'classNameX', 'theme', '$widths'
]

// const signAtomicArray = (res: TAtomize.AtomicArray, state: TWithStyles.PipelineState) => {
//     res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
//     res.state = state
//     return res
// }
