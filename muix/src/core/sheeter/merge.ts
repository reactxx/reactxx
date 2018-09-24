import { TAtomize } from '../d-index';
import { isAtomicArray, isAtomizedRuleset } from './atomize'

export const mergeStyles = <T extends 'web' | 'native'>(sources: TAtomize.Style[]) => {
    let all: TAll<T>
    if (window.isWeb) {
        let res: any = {};
        (sources as TAtomize.StyleWeb[]).forEach(s =>  s && Object.assign(res, s));
        delete res.$web
        delete res.$native
        delete res[TAtomize.TypedInterfaceProp]
        all = res as TAll<T>
    } else
        all = mergeRulesets(sources as TAtomize.StyleNative[]) as TAll<T>

    return all
}
type TAll<T extends 'web' | 'native'> = T extends 'web' ? React.CSSProperties : TAtomize.Ruleset

export const mergeRuleset = (target: TAtomize.Ruleset, source: TAtomize.Ruleset) => {
    if (!target) return source
    if (!source) return target
    const targeta = isAtomicArray(target), sourcea = isAtomicArray(source)
    const res =
        targeta && sourcea ?
            [...target, ...source] :
            {
                name: target['name'] || source['name'] || 'unknown',
                list: [
                    ...targeta ? target : (target as TAtomize.AtomizedRuleset).list,
                    ...sourcea ? source : (source as TAtomize.AtomizedRuleset).list
                ],

            }
    res[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.atomizedRuleset
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

export const mergeSheets = (target: TAtomize.Sheet, sources: TAtomize.Sheet[]) => {
    if (!sources || sources.length === 0) return target
    let inPlace = false
    let res = target
    sources.forEach(src => {
        if (!src) return
        res = mergeSheet(res, src, inPlace)
        inPlace = true
    })
    return res
}

export const mergeCodeProps = (sources: {}[]) => {
    let res = null
    if (!sources || sources.length === 0) return res
    let first = true
    sources.forEach(src => {
        if (!src) return
        res = first ? src : { ...res, ...src }
        first = false
    })
    return res
}

const isRulesetArray = obj => Array.isArray(obj) && !isAtomicArray(obj)