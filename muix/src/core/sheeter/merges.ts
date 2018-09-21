import warning from 'warning'
import { TSheeter, TAtomize, TVariants, TComponents } from 'reactxx-core/d-index'
import { atomizeRuleset, isAtomizedRuleset, isAtomicArray } from 'reactxx-core/sheeter/atomize'
import { testConditions } from 'reactxx-core/sheeter/variants'

export const mergeSheets = (sheet: TAtomize.Sheet, classes: TAtomize.Sheet, inPlace?: boolean) => {
    if (!classes) return sheet
    if (!inPlace) sheet = { ...sheet }
    for (const p in classes) {
        const c = classes[p], ca = Array.isArray(c), s = sheet[p], sa = Array.isArray(s)
        warning(c && p, 'Something wrong here')
        sheet[p] = !sa && !ca ? [s, c] : !sa ? [s, ...c] : !ca ? [...s, c] : [...s, ...c]
    }
}

export function mergeRulesetsForBind(...rulesets: TSheeter.ClassNameItem[]) {
    return classNamesWithQuery(this.sheetQuery, this.theme, ...rulesets)
}

export const mergeRulesets = (...rulesets: TSheeter.ClassNameItem[]) => classNamesWithQuery({}, null, ...rulesets)
export const mergeRulesetsWithTheme = (theme, ...rulesets: TSheeter.ClassNameItem[]) => classNamesWithQuery({}, theme, ...rulesets)

export const deleteSystemProps = props => propsToDelete.forEach(p => delete props[p])


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: TComponents.CommonPropertiesCodeKeys[] = ['sheetQuery', 'classes', 'mergeRulesets']

const emptyAtomicArray = [] as TAtomize.AtomicArray
emptyAtomicArray[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.atomicArray

// merge rulesets and apply query to ruleset's conditional parts ($whenUed, $mediaq etc.)
const classNamesWithQuery = (query: TVariants.Query, theme, ...rulesets: TSheeter.ClassNameItem[]) => {
    if (!rulesets || rulesets.length === 0) return emptyAtomicArray
    if (isAtomicArray(rulesets)) return rulesets

    rulesets = atomizeRuleset(rulesets, theme)

    // prepare whenFlag query par
    if (query)
        query = { ...query, whenFlag: query.whenFlag ? { ...query.whenFlag } : {} }
    else
        query = { whenFlag: {} }
    rulesets.forEach((r: TSheeter.Ruleset & { name?: string }) => {
        if (!r || !r.name) return
        query.whenFlag[r.name] = true
    })

    const values: TAtomize.AtomicArray[] = []
    for (let i = 0; i < rulesets.length; i++) {
        const val = rulesets[i] as TAtomize.AtomizedRuleset
        if (!val) continue
        if (isAtomicArray(val)) {
            values.push(val)
            continue
        }
        warning(isAtomizedRuleset(val), 'Something wrong here')
        for (let j = 0; j < val.list.length; j++) {
            const rsi = val.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.atomicArray)
        }

    }
    const res = [].concat.apply([], values) as TAtomize.AtomicArray
    res[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.atomicArray
    return res
}
