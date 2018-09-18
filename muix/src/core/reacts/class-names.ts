import { TSheeter, TCompiler, TVariants, TComponents } from '../d-index'
import { toAtomizedRuleset, isAtomizedRuleset, isAtomicArray } from '../sheeter/to-atomized'
import { testConditions } from '../sheeter/variants'


export const deleteUnusedProps = props => propsToDelete.forEach(p => delete props[p])

export function classNamesForBind(...rulesets: TSheeter.ClassNameItem[]) {
    return classNamesWithQuery(this.sheetQuery, this.theme, ...rulesets)
}

export const classNames = (...rulesets: TSheeter.ClassNameItem[]) => classNamesWithQuery({}, null, ...rulesets)
export const classNamesWithTheme = (theme, ...rulesets: TSheeter.ClassNameItem[]) => classNamesWithQuery({}, theme, ...rulesets)

/******************************************
  PRIVATE
*******************************************/

const propsToDelete: TComponents.CommonPropertiesCodeKeys[] = ['sheetQuery', 'classes', 'classNames']

// merge rulesets and apply query to ruleset's conditional parts ($whenUed, $mediaq etc.)
const classNamesWithQuery = (query: TVariants.Query, theme, ...rulesets: TSheeter.ClassNameItem[]) => {
    if (!rulesets || rulesets.length === 0) return [] as TCompiler.AtomicArray
    if (isAtomicArray(rulesets)) return rulesets
    // when used query par
    if (query)
      query = {...query, whenFlag: query.whenFlag ? {...query.whenFlag} : {}}
    else 
      query = {}

    rulesets.forEach((r: TSheeter.Ruleset & {name?:string}) => {
        if (!r || !r.name) return
        query.whenFlag[r.name] = true
    })
    const values: TCompiler.AtomicArray[] = []
    for (let i = 0; i < rulesets.length; i++) {
        const val = rulesets[i] as TSheeter.RulesetOrCreator
        if (!val) continue
        if (isAtomicArray(val)) {
            values.push(val)
            continue
        }
        const rs = isAtomizedRuleset(val) ? val : toAtomizedRuleset(typeof val === 'function' ? val(theme) : val) // adjust compiled
        for (let j = 0; j < rs.list.length; j++) {
            const rsi = rs.list[j]
            if (!testConditions(rsi.conditions, query)) continue
            values.push(rsi.atomicArray)
        }

    }
    const res = [].concat.apply([], values) as TCompiler.AtomicArray
    res[TCompiler.TypedInterfaceProp] = TCompiler.TypedInterfaceTypes.atomicArray
    return res
}


