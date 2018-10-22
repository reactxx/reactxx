import { TComponents, TAtomize, TSheeter } from 'reactxx-typings';
import { isAtomicArray } from './atomize'
import { deepMerge, deepMerges } from './utils/deep-merge'

export const mergeStyles = (sources: TSheeter.StyleOrAtomized | TSheeter.StyleOrAtomized[]) => {
    if (!sources)
        return null
    if (window.isWeb) {
        let res = null
        let canModify = false
        const processStyle = (st: TSheeter.Style) => {
            push(st)
            if (st.$web)
                push(st.$web as TSheeter.Style)
        }
        const push = (st: TSheeter.Style) => {
            if (!res) // first
                res = st
            else if (!canModify) { // second
                res = { ...res, ...st }
                canModify = true
            } else // third and more
                Object.assign(res, st)
        }
        const src = sources as TSheeter.Style | TSheeter.Style[] | TSheeter.Style[]
        if (Array.isArray(src))
            src.forEach(ss => {
                if (!ss) return
                if (Array.isArray(ss))
                    ss.forEach(s => {
                        if (!s) return
                        processStyle(s)
                    })
                else
                    processStyle(ss)
            })
        else
            processStyle(src)

        if (res && (res.$web || res.$native)) {
            if (!canModify)
                res = { ...res }
            delete res.$web
            delete res.$native
        }

        return res as TSheeter.Style
    } else {
        return mergeRulesets(sources as TAtomize.Ruleset[])
    }
}

const mergeRuleset = (target: TAtomize.Ruleset, source: TAtomize.Ruleset) => {
    if (!target) return source
    if (!source) return target
    const targeta = isAtomicArray(target), sourcea = isAtomicArray(source)
    const res =
        targeta && sourcea ?
            [...target, ...source] : // return plain value arrays
            { // return AtomizedRuleset
                name: target['name'] || source['name'] || 'unknown',
                list: [
                    ...targeta ? target : (target as TAtomize.AtomizedRuleset).list,
                    ...sourcea ? source : (source as TAtomize.AtomizedRuleset).list
                ],

            }
    res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomizedRuleset
    return res as TAtomize.Ruleset
}

export const mergeRulesets = (sources: TAtomize.Ruleset[]) => {
    if (!sources || sources.length === 0) return null
    let res: TAtomize.Ruleset = null
    let first = true
    sources.forEach(src => {
        if (!src) return
        res = first ? src : mergeRuleset(res, src)
        first = false
    })
    return res
}

// inPlace===true => target is modified
export const mergeSheet = (target: TAtomize.Sheet, source: TAtomize.Sheet, inPlace?: boolean) => {
    if (!source) return target
    if (!target) return source
    if (!inPlace) target = { ...target }
    for (const p in source)
        target[p] = mergeRuleset(target[p], source[p])
    return target
}

export const mergeSheets = (sources: TAtomize.Sheet[]) => {
    if (!sources || sources.length === 0) return null
    let count = 0
    let res = null
    sources.forEach(src => {
        if (!src) return
        switch (count) {
            case 0: res = src; count++; break
            case 1: res = mergeSheet(res, src, false); count++; break
            default: res = mergeSheet(res, src, true); count++; break
        }
    })
    return res
}

export const mergeCodeProps = (sources: (TComponents.PropsCode | TComponents.PropsCode[])[]) => {
    if (!sources || sources.length === 0) return undefined
    let res: TComponents.PropsCode = null
    let canModifyRes = false
    const merge = src => {
        if (!src) return
        if (!res)
            res = src
        else if (canModifyRes)
            Object.assign(res, src)
        else {
            res = { ...res, ...src }
            canModifyRes = true
        }
    }
    const push = src => {
        if (!src) return
        merge(src)
        if (window.isWeb) {
            if (src.$web) merge(src.$web)
        } else {
            if (src.$native) merge(src.$native)
        }
    }
    sources.forEach(src => {
        if (!src) return
        if (Array.isArray(src)) src.forEach(s => push(s))
        else push(src)
    })
    return res
}

export const mergeDeep = (sources: {}[]) => {
    if (!sources || sources.length === 0) return null
    let count = 0
    let res = null
    sources.forEach(src => {
        if (!src) return
        switch (count) {
            case 0: res = src; count++; break
            case 1: res = deepMerges({}, [res, src]); count++; break
            default: res = deepMerge(res, src); count++; break
        }
    })
    return res
}
