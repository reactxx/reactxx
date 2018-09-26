import warning from 'warning'
import { TSheeter, TAtomize, TVariants, TComponents } from 'reactxx-typings'
import { atomizeRuleset, isAtomizedRuleset, isAtomicArray } from './atomize'
import { testConditions } from 'reactxx-core/sheeter/variants'

export function toClassNamesForBind(...rulesets: TSheeter.RulesetItem[]) {
    return toClassNamesWithQuery(this.sheetQuery, this.theme, rulesets)
}

export const toClassNames = (...rulesets: TSheeter.RulesetItem[]) => toClassNamesWithQuery({}, null, rulesets)
export const toClassNamesWithTheme = (theme, ...rulesets: TSheeter.RulesetItem[]) => toClassNamesWithQuery({}, theme, rulesets)

export const deleteSystemProps = props => propsToDelete.forEach(p => delete props[p])


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: TComponents.CommonPropertiesCodeKeys[] = [
    'sheetQuery', 'classes', 'toClassNames', 'styleX', 'classNameX', 'theme'
]

const emptyAtomicArray = [] as TAtomize.AtomicArray
emptyAtomicArray[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray

// merge rulesets and apply query to ruleset's conditional parts ($whenFlags, $mediaq etc.)
export const toClassNamesWithQuery = (query: TVariants.Query, theme, rulesets: TSheeter.ClassNameOrAtomized) => {

    if (!rulesets) return emptyAtomicArray

    if (isAtomicArray(rulesets)) return rulesets

    const values: TAtomize.AtomicArray[] = []

    const processConditions = val => {
        if (!val) return
        if (isAtomicArray(val)) {
            values.push(val)
            return
        }

        if (!isAtomizedRuleset(val))
            atomizeRuleset(val, theme)

        for (let j = 0; j < val.list.length; j++) {
            const rsi = val.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.atomicArray)
        }
    }

    // atomize
    if (Array.isArray(rulesets))
        rulesets.forEach(r => processConditions(r))
    else
        processConditions(rulesets)

    // concat values
    const res = [].concat.apply([], values) as TAtomize.AtomicArray
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
    return res
}
