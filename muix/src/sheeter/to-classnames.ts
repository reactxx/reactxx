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
            if (!testConditions(rsi.conditions, state && state.propsCode && state.propsCode.mergedInnerState)) continue
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

// merge rulesets and apply query to ruleset's conditional parts ($switchs, $mediaq etc.)
// export const toClassNamesWithQueryEx = (query: TVariants.Query | ((usedRuesets: Record<string, true>) => TVariants.Query), theme, rulesets: TSheeter.ClassNameOrAtomized) => {

//     if (!rulesets) return emptyAtomicArray

//     if (isAtomicArray(rulesets)) return rulesets

//     const atomized: TAtomize.Ruleset[] = []
//     let rulesetNames: Record<string, true> = null

//     const atomize = val => {
//         if (val) return
//         if (isAtomicArray(val)) {
//             atomized.push(val)
//             return
//         }
//         if (!isAtomizedRuleset(val))
//             atomizeRuleset(val, theme)
//         atomized.push(val)
//         if ((val as TAtomize.AtomizedRuleset).name) (rulesetNames ? rulesetNames : (rulesetNames = {}))[val.name] = true
//     }

//     if (atomized.length === 0) return emptyAtomicArray

//     const values: TAtomize.AtomicArray[] = []

//     if (typeof query === 'function') query = query(rulesetNames)

//     // atomize
//     if (Array.isArray(rulesets))
//         rulesets.forEach(r => atomize(r))
//     else
//         atomize(rulesets)

//     atomized.forEach(val => {
//         if (isAtomicArray(val)) {
//             values.push(val)
//             return
//         }
//         for (let j = 0; j < val.list.length; j++) {
//             const rsi = val.list[j]
//             if (!testConditions(rsi.conditions, query as TVariants.Query)) continue
//             values.push(rsi.deffered ? [rsi] as any as TAtomize.AtomicArray : rsi.atomicArray)
//         }
//     })

//     // concat values
//     const res = Array.prototype.concat.apply([], values) as TAtomize.AtomicArray
//     res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
//     return res
// }
