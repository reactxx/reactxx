import { TAtomize } from 'reactxx-core/d-index';
import { isAtomicArray } from './atomize'

// target is not modified
export const mergeRuleset = (target: TAtomize.TRuleset, source: TAtomize.TRuleset) => {
    if (!target) return source
    if (!source) return target
    const targeta = isArray(target), sourcea = isArray(source)
    return (!targeta && !sourcea ? [target, source] : !targeta ? [target, ...source] : !sourcea ? [...target, source] : [...target, ...source]) as TAtomize.TRuleset
}

export const mergeRulesets = (sources: TAtomize.TRuleset[]) => {
    if (!sources || sources.length === 0) return null
    let res: TAtomize.TRuleset
    let first = true
    sources.forEach(src => {
        if (!src) return
        if (first) {
            res = src; first = false
        } else
            res = mergeRuleset(res, src)
    })
    return res
}

// inPlace===true => target modified
export const mergeSheet = (target: TAtomize.Sheet, source: TAtomize.Sheet, inPlace?: boolean) => {
    if (!source) return target
    if (!target) return source
    if (!inPlace) target = { ...target }
    for (const p in source)
        target[p] = mergeRuleset(target[p], source[p])
    return target
}

// target is not modified
export const mergeSheets = (target: TAtomize.Sheet, sources: TAtomize.Sheet[]) => {
    if (!sources || sources.length === 0) return target
    let first = true
    let res = target
    sources.forEach(src => {
        if (!src) return
        if (first) {
            res = mergeSheet(res, src); first = false
        } else
            res = mergeSheet(res, src, true)
    })
    return res
}

const isArray = item => item && Array.isArray(item) && !isAtomicArray(item)