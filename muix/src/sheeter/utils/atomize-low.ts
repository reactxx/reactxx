import { wrapPseudoPrefixes } from './wrap-pseudo-prefixes'
import { TTyped, TEngine } from 'reactxx-typings'

// platform dependent 
import { platform } from 'reactxx-sheeter'

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
    value: TEngine.Ruleset | TEngine.Ruleset[], atomizedVariants: TEngine.QueryableItems,
    path: string, pseudoPrefixes: string[], conditions: TEngine.Conditions
) => {
    const items = isToAtomizeArray(value) ? value : [value]
    const indexToPath = (idx: number) => items.length <= 1 ? '' : `[${idx}]`
    items.forEach((it, idx) => {
        if (!it) return
        if (isTemporary(it)) {
            it(atomizedVariants, path + indexToPath(idx), pseudoPrefixes, conditions)
        } else if (isDeferred(it)) {
            atomizedVariants.push(it)
        } else if (isAtomized(it)) {
            if (pseudoPrefixes && pseudoPrefixes.length > 0)
                throw 'Web pseudo properties cannot contain already atomized value'
            it.forEach(it => {
                if (!conditions || conditions.length === 0) //... and no conditions => done
                    pushToAtomizedVariants(atomizedVariants, it, null)
                else { // ... and conditions => merge conditions
                    pushToAtomizedVariants(atomizedVariants, [...it],
                        it.conditions ? [...conditions, ...it.conditions] : conditions)
                }
            })
        } else { // it: toAtomize
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

    // process and remove conditional parts of self and web pseudo (e.g. :hover etc.)
    // push them to 'inner'
    for (const p in ruleset) {
        const value = ruleset[p] as TEngine.ToAtomize
        if (!value || p.charAt(0) === '$' || (typeof value !== 'object' && !isTemporary(value))) continue
        processTree(value, inner, `${path}/${p}`, [...pseudoPrefixes, p], conditions)
        delete ruleset[p]
    }

    // atomize pure ruleset tree with pseudo (and without all conditions, deffer's etc.),
    // then push to result
    atomizeNonVariant(atomizedVariants, wrapPseudoPrefixes(ruleset, pseudoPrefixes), conditions, path)

    // push 'inner' to result
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

const atomizeNonVariant = (
    atomizedVariants: TEngine.QueryableItems, sourceRuleset: TEngine.Rulesets,
    conditions: TEngine.Conditions, path: string
) => {
    if (!sourceRuleset) return
    if (isDeferred(sourceRuleset)) {
        atomizedVariants.push(sourceRuleset)
        return
    }
    // platform specific atomize: e.g. for WEB convert ruleset to list of atomized CSS classes
    const variant = platform.toPlatformAtomizeRuleset(sourceRuleset, path)
    pushToAtomizedVariants(atomizedVariants, variant, conditions)
}

