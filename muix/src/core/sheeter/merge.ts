import { TAtomize, TSheeter } from '../d-index';
import { isAtomicArray } from './atomize'

export const mergeStyles = (sources: TSheeter.StyleOrAtomized[]) => {
    if (window.isWeb) {
        let res = null
        let canModifyRes = false;
        (sources as TSheeter.StyleOrAtomizedWeb[]).forEach((s:TSheeter.Style[])  =>  {
            if (!s) return
            if (canModifyRes) {
                if (Array.isArray(s)) res = [...res, ...s]
                else res.push(s)
            } else if (!res) 
                res = s
            else {
                const sa = Array.isArray(s), resa = Array.isArray(res)
                res = !resa && !sa ? [res, s] : !resa ? [res, ...s] : !sa ? [...res, s] : [...res, ...s]
                canModifyRes = true
            }
        });
        // res[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.atomizedStyleWeb

        return res as TSheeter.StyleOrAtomizedWeb
    } else
        return mergeRulesets(sources as TAtomize.Ruleset[])
}

export const mergeStylesForWebTag = (sources: TSheeter.StyleOrAtomizedWeb) => {
    let res = null
    let canModify = false
    const processStyle = (st: TSheeter.Style) => {
        if (!st) return
        push (st)
        if (st.$web) push(st.$web as TSheeter.Style)
    }
    const push = (st: TSheeter.Style) => {
        if (canModify) Object.assign(res, st)
        else if (!res) res = st
        else {
            res = {...res, ...st}
            canModify = true
        }
    }
    if (Array.isArray(sources)) sources.forEach(s => processStyle(s))
    else processStyle(sources)

    if (!canModify && (res.$web || res.$native)) res = {...res}
    delete res.$web
    delete res.$native

    return res as React.CSSProperties
}

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