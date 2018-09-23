import warning from 'warning'
import { TSheeter, TAtomize, TVariants, TComponents } from '../d-index'
import { atomizeRuleset, isAtomizedRuleset, isAtomicArray } from './atomize'
import { testConditions } from './variants'

export function toClassNamesForBind(...rulesets: TSheeter.RulesetOrAtomized[]) {
    return toClassNamesWithQuery(this.sheetQuery, this.theme, rulesets)
}

export const toClassNames = (...rulesets: TSheeter.RulesetOrAtomized[]) => toClassNamesWithQuery({}, null, rulesets)
export const toClassNamesWithTheme = (theme, ...rulesets: TSheeter.RulesetOrAtomized[]) => toClassNamesWithQuery({}, theme, rulesets)

export const deleteSystemProps = props => propsToDelete.forEach(p => delete props[p])


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: TComponents.CommonPropertiesCodeKeys[] = ['sheetQuery', 'classes', 'toClassNames']

const emptyAtomicArray = [] as TAtomize.AtomicArray
emptyAtomicArray[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.atomicArray

// merge rulesets and apply query to ruleset's conditional parts ($whenUed, $mediaq etc.)
const toClassNamesWithQuery = (query: TVariants.Query, theme, rulesets: TSheeter.RulesetOrAtomized[]) => {
    if (!rulesets || rulesets.length === 0) return emptyAtomicArray
    if (isAtomicArray(rulesets)) return rulesets

    // atomize
    rulesets.forEach(r => atomizeRuleset(r, theme))

    // process conditions
    const values: TAtomize.AtomicArray[] = []

    const processConditions = val => {
        if (!val) return
        if (isAtomicArray(val)) {
            values.push(val)
            return
        }
        warning(isAtomizedRuleset(val), 'Something wrong here')
        for (let j = 0; j < val.list.length; j++) {
            const rsi = val.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.atomicArray)
        }
    }

    for (let i = 0; i < rulesets.length; i++) {
        const val = rulesets[i] as TAtomize.AtomizedRuleset
        if (Array.isArray(val))
            val.forEach(v => processConditions(v))
        else
            processConditions(val)
    }

    // concat values
    const res = [].concat.apply([], values) as TAtomize.AtomicArray
    res[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.atomicArray
    return res
}
