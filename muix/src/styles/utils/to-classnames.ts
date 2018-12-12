import warning from 'warning'
import { TComponents, TEngine, TTyped } from 'reactxx-typings'
import { atomizeRuleset, wrapRuleset } from './atomize'
import { isToAtomize, isDeferred, isTemporary } from './atomize-low'

export const toClassNamesWithQuery = (props, ...items: TEngine.Ruleset[]) => {

    let values: TEngine.QueryableItems = []

    const testConditions = (v: TEngine.Queryable, state) =>
        !v.conditions || v.conditions.length === 0 || v.conditions.every(c => c.test(state))

    const filterList = (list: TEngine.QueryableItems) => {
        for (const v of list) {
            if (!v) continue
            if (isDeferred(v)) {
                const res = v.evalProc(props)
                filterList(res)
            } else if (testConditions(v, props))
                values.push(v)
        }
    }

    const process = (val: TEngine.Ruleset) => {
        if (!val) return

        if (isDeferred(val)) { // toClassNamesWithQuery(null, $hot())
            const res = val.evalProc(props)
            filterList(res)
            return
        }

        if (isTemporary(val)) {
            const list: TEngine.QueryableItems = []
            val(list, '', [], [])
            filterList(list)
            return
        }

        const ruleset = isToAtomize(val) ? (() => {
            warning(typeof val !== 'function', 'Only ruleset expected in toClassNamesWithQuery (but rulesetCreator found)')
            return atomizeRuleset(val)
        })() : val

        if (!ruleset || ruleset.length === 0) return

        filterList(ruleset)

    }

    for (const r of items) process(r)
    //items.forEach(r => process(r))

    return values.length === 0 ? null : wrapRuleset(values) as TEngine.WithConflicts
}

// export const deleteSystemProps = (props: TComponents.ReactsCommonProperties & TTyped.PropsCode) => {
//     // for (const p in props)
//     //     if (p.charAt(0) === '$') delete props[p]
//     delete props.classNames
//     delete props.styles
//     //delete props['data-trace']
//     if (!props['data-trace']) delete props['data-trace']
//     // propsToDelete.forEach(p => delete props[p])
//     // if (props.style) delete props.style.toJSON
// }


/******************************************
  PRIVATE
*******************************************/

const propsToDelete: string[] = [
    'sheetQuery', 'classes', 'toClassNames', 'styleX', 'classNameX', 'theme', '$widths'
]

