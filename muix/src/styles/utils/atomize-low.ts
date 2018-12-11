import { wrapPseudoPrefixes } from './wrap-pseudo-prefixes'
import { TEngine } from 'reactxx-typings'

// platform dependent 
import { platform } from 'reactxx-styles'

//*******************************************************
//        adjustAtomizedLow

// linearize and atomize "ruleset"
// result is added to 'atomizedVariants'
export const adjustAtomizedLow = (
    ruleset: TEngine.Rulesets,
    atomizedVariants: TEngine.QueryableItems, path: string,
    pseudoPrefixes: string[], conditions: TEngine.Conditions
) => {
    processTree(ruleset, atomizedVariants, path, pseudoPrefixes, conditions)
}

export function isToAtomizeArray(obj): obj is TEngine.Ruleset[] { return obj && !(obj as TEngine.Queryables).$r$ && Array.isArray(obj) }
export function isAtomized(obj): obj is TEngine.Queryables { return !obj || (obj as TEngine.Queryables).$r$ }
export function isDeferred(obj): obj is TEngine.Deferred { return obj && (obj as TEngine.Deferred).$d$ }
export function isTemporary(obj): obj is TEngine.TempProc { return obj && (obj as TEngine.TempProc).$t$ }
export function isToAtomize(obj): obj is TEngine.ToAtomize { return obj && !(obj as TEngine.Queryables).$r$ && !(obj as TEngine.Deferred).$d$ && !(obj as TEngine.TempProc).$t$ }

//*******************************************************
//        makeTemporary
export const makeTemporary = (proc: TEngine.TempProc) => {
    proc.$t$ = true
    return proc as any
}

//*******************************************************
//        processTree
export const processTree = (
    value: TEngine.Rulesets, atomizedVariants: TEngine.QueryableItems,
    path: string, pseudoPrefixes: string[], conditions: TEngine.Conditions
) => {

    const indexToPath = (idx: number) => items.length <= 1 ? '' : `[${idx}]`

    const items = isToAtomizeArray(value) ? value : [value]
    items.forEach((it, idx) => {
        if (!it) return
        if (isTemporary(it)) {
            it(atomizedVariants, path + indexToPath(idx), pseudoPrefixes, conditions)
        } else if (isDeferred(it)) {
            atomizedVariants.push(it)
        } else if (isAtomized(it)) {
            if (pseudoPrefixes && pseudoPrefixes.length > 0)
                throw 'Web pseudo properties cannot contain already atomized value'
            for (const itt of it) {
                if (isDeferred(itt))
                    throw 'isDeferred(itt)'
                if (!conditions || conditions.length === 0) //... and no conditions => done
                    pushToAtomizedVariants(atomizedVariants, itt, null)
                else { // ... and conditions => merge conditions
                    const ittCopy = Array.isArray(itt) ? [...itt] : { ...itt }
                    pushToAtomizedVariants(atomizedVariants, ittCopy,
                        itt.conditions ? [...conditions, ...itt.conditions] : conditions)
                }
            }
        } else { // it: toAtomize
            // if (window.__TRACE__)
            //     it = deepClone(it)
            processPseudosAndAtomize(
                it,
                atomizedVariants, path + indexToPath(idx),
                pseudoPrefixes, conditions
            )
        }
    })
}

//*********************************************************
//  PRIVATE
//*********************************************************

//*******************************************************
//        processAllInnerVariants

// recursivelly process web pseudos (:hover, :active) and its queryable parts

const processPseudosAndAtomize = (
    ruleset: TEngine.ToAtomize,
    atomizedVariants: TEngine.QueryableItems, path: string, pseudoPrefixes: string[], conditions: TEngine.Conditions,
) => {

    const inner: TEngine.QueryableItems = []

    const toAtomizePure = {}
    let empty = true
    // process and remove conditional parts of self and web pseudo (e.g. :hover etc.)
    // push them to 'inner'
    for (const p in ruleset) {
        if (p.charAt(0) === '$') continue
        const value = ruleset[p] as TEngine.Rulesets
        if (typeof value === 'object' || isTemporary(value)) { // temporary, deffered, toAtomize, atomized
            processTree(value, inner, `${path}/${p}`, [...pseudoPrefixes, p], conditions)
        } else {
            empty = false
            toAtomizePure[p] = value
        }
    }

    // atomize pure ruleset tree with pseudo (and without temporary, deffer's etc.),
    // then push to result
    if (!empty)
        atomizePure(atomizedVariants, wrapPseudoPrefixes(toAtomizePure, pseudoPrefixes), conditions, path)

    // push 'inner' to result AFTER toAtomizePure
    if (inner.length > 0)
        Array.prototype.push.apply(atomizedVariants, inner)

}

// *********** utils

const pushToAtomizedVariants = (
    atomizedVariants: TEngine.QueryableItems,
    variant: TEngine.Queryable, conditions: TEngine.Conditions
) => {
    if (!variant) return
    if (conditions && conditions.length > 0) variant.conditions = conditions
    atomizedVariants.push(variant)
}

const atomizePure = (
    atomizedVariants: TEngine.QueryableItems, pureRuleset: TEngine.ToAtomize,
    conditions: TEngine.Conditions, path: string
) => {
    if (!pureRuleset) return
    if (isDeferred(pureRuleset)) {
        throw 'something wrong'
        atomizedVariants.push(pureRuleset)
        return
    }
    // platform specific atomize: e.g. for WEB convert ruleset to list of atomized CSS classes
    const variant = platform.toPlatformAtomizeRuleset(pureRuleset, path)
    pushToAtomizedVariants(atomizedVariants, variant, conditions)
}

export function deepClone(obj) {
    if (
        obj === undefined || obj === null || typeof obj === 'string' || typeof obj === 'undefined' ||
        typeof obj === 'function' || typeof obj === 'number' || typeof obj === 'boolean'
    ) return obj

    if (Array.isArray(obj)) {
        const res = obj.map(o => deepClone(o))
        if (obj['$r$']) res['$r$'] = true
        return res
    }

    if (typeof obj === 'object') {
        const res = {}
        for (const p in obj) res[p] = deepClone(obj[p])
        return res
    }

    throw 'something wrong'
}