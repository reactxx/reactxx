import { TEngine } from 'reactxx-typings';
import { deepMerge, deepMerges } from './deep-merge'
import { isAtomized } from './atomize-low';
import { wrapRuleset } from './atomize';

// export const mergeStyles = (sources: TTyped.StyleOrAtomized | TTyped.StyleOrAtomized[]) => {
//     if (!sources)
//         return null
//     if (window.isWeb) {
//         let res = null
//         let canModify = false
//         const processStyle = (st: TTyped.Style) => {
//             push(st)
//             // if (st.$web)
//             //     push(st.$web as TSheeter.Style)
//         }
//         const push = (st: TTyped.Style) => {
//             if (!res) // first
//                 res = st
//             else if (!canModify) { // second
//                 res = { ...res, ...st }
//                 canModify = true
//             } else // third and more
//                 Object.assign(res, st)
//         }
//         const src = sources as TTyped.Style | TTyped.Style[] | TTyped.Style[]
//         if (Array.isArray(src))
//             src.forEach(ss => {
//                 if (!ss) return
//                 if (Array.isArray(ss))
//                     ss.forEach(s => {
//                         if (!s) return
//                         processStyle(s)
//                     })
//                 else
//                     processStyle(ss)
//             })
//         else
//             processStyle(src)

//         if (res && (res.$web || res.$native)) {
//             if (!canModify)
//                 res = { ...res }
//             delete res.$web
//             delete res.$native
//         }

//         return res as TTyped.Style
//     } else {
//         return mergeRulesets(sources as TEngine.Queryables[])
//     }
// }

// immutable
export const mergeRulesets = (sources: TEngine.Queryables[]) => {
    if (!sources || sources.length === 0) return null
    let res: TEngine.Queryables = null
    let first = true
    for (const src of sources) {
        if (!src) continue
        if (!isAtomized(src))
            throw 'All rulesets must be atomized first for mergeRulesets'
        res = first ? src : [...res, ...src]
        first = false
    }
    return wrapRuleset(res)
}

// immutable
export const mergeSheets = (sources: TEngine.Sheet[]) => {
    if (!sources || sources.length === 0) return null
    const ruleLists: Record<string, Array<any>> = {}
    for (const src of sources) {
        if (!src) continue
        for (const p in src) {
            const value = src[p]
            if (!value) continue
            const arr = ruleLists[p] || (ruleLists[p] = [])
            arr.push(value)
        }
    }
    const res = {}
    for (const p in ruleLists)
        res[p] = mergeRulesets(ruleLists[p])
    return res as TEngine.Sheet
}

export const mergeDeep = (sources: {}[]) => {
    if (!sources || sources.length === 0) return null
    let count = 0
    let res = null
    for (const src of sources) {
        if (!src) continue
        switch (count) {
            case 0: res = src; count++; break
            case 1: res = deepMerges({}, [res, src]); count++; break
            default: res = deepMerge(res, src); count++; break
        }
    }
    return res
}

