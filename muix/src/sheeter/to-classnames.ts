import { TSheeter, TAtomize, TVariants, TComponents } from 'reactxx-typings'
import { atomizeRuleset, isAtomizedRuleset, isAtomicArray } from './atomize'
import { testConditions } from './variants'

// platform dependent import
import {toReactComponent} from 'reactxx-sheeter'

export const toClassNames = (...rulesets: TSheeter.RulesetItem[]) => toClassNamesWithQuery({}, null, rulesets)
export const toClassNamesWithTheme = (theme, ...rulesets: TSheeter.RulesetItem[]) => toClassNamesWithQuery({}, theme, rulesets)

export const deleteSystemProps = props => propsToDelete.forEach(p => delete props[p])


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: string[] = [ //TComponents.CommonPropertiesCodeKeys[] = [
    'sheetQuery', 'classes', 'toClassNames', 'styleX', 'classNameX', 'theme'
]

const finishAtomicArray = (res: TAtomize.AtomicArray) => {
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
    res.toReactWebClassName = toReactComponent.toReactWebClassName
    res.toReactNativeStyle = toReactComponent.toReactNativeStyle
}
const emptyAtomicArray = [] as TAtomize.AtomicArray
finishAtomicArray(emptyAtomicArray)

export const toClassNamesWithQuery = (query: TVariants.Query, theme, rulesets: TSheeter.ClassNameOrAtomized) => {
    if (!rulesets) return emptyAtomicArray

    if (isAtomicArray(rulesets)) return rulesets

    const values: TAtomize.AtomicArray[] = []

    const push = val => {
        if (val) return
        if (isAtomicArray(val)) {
            values.push(val)
            return
        }
        if (!isAtomizedRuleset(val))
            atomizeRuleset(val, theme)

        for (let j = 0; j < val.list.length; j++) {
            const rsi = val.list[j]
            if (!testConditions(rsi.conditions, query as TVariants.Query)) continue
            values.push(rsi.atomicArray)
        }

    }

    if (Array.isArray(rulesets))
        rulesets.forEach(r => push(r))
    else
        push(rulesets)

    // concat values
    const res = Array.prototype.concat.apply([], values) as TAtomize.AtomicArray
    finishAtomicArray(res)
    return res
}

// merge rulesets and apply query to ruleset's conditional parts ($sheetFlagss, $mediaq etc.)
export const toClassNamesWithQueryEx = (query: TVariants.Query | ((usedRuesets: Record<string, true>) => TVariants.Query), theme, rulesets: TSheeter.ClassNameOrAtomized) => {

    if (!rulesets) return emptyAtomicArray

    if (isAtomicArray(rulesets)) return rulesets

    const atomized: TAtomize.Ruleset[] = []
    let rulesetNames: Record<string, true> = null

    const atomize = val => {
        if (val) return
        if (isAtomicArray(val)) {
            atomized.push(val)
            return
        }
        if (!isAtomizedRuleset(val))
            atomizeRuleset(val, theme)
        atomized.push(val)
        if ((val as TAtomize.AtomizedRuleset).name) (rulesetNames ? rulesetNames : (rulesetNames = {}))[val.name] = true
    }

    if (atomized.length === 0) return emptyAtomicArray

    const values: TAtomize.AtomicArray[] = []

    if (typeof query === 'function') query = query(rulesetNames)

    // atomize
    if (Array.isArray(rulesets))
        rulesets.forEach(r => atomize(r))
    else
        atomize(rulesets)

    atomized.forEach(val => {
        if (isAtomicArray(val)) {
            values.push(val)
            return
        }
        for (let j = 0; j < val.list.length; j++) {
            const rsi = val.list[j]
            if (!testConditions(rsi.conditions, query as TVariants.Query)) continue
            values.push(rsi.atomicArray)
        }
    })

    // concat values
    const res = Array.prototype.concat.apply([], values) as TAtomize.AtomicArray
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
    return res
}
