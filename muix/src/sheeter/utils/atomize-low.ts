import warning from 'warning'
import { wrapPseudoPrefixes } from './wrap-pseudo-prefixes'
import { TCommonStyles, TTyped, TSheeter, TVariants, TEngine } from 'reactxx-typings'

// platform dependent 
import { platform } from 'reactxx-sheeter'

//*******************************************************
//        adjustAtomizedLow

// linearize and atomize "ruleset" and its $web, $native and variants ($if, $widths,...)
// result is added to 'atomizedVariants'
export const adjustAtomizedLow = (
    ruleset: TEngine.Ruleset,
    atomizedVariants: TEngine.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions
) => {
    processTree(ruleset, atomizedVariants, path, pseudoPrefixes, conditions)
}

export function isToAtomizeArray(obj): obj is TEngine.RulesetItem[] { return obj && !(obj as TEngine.AtomizedRuleset).$r$ && Array.isArray(obj) }
export function isAtomized(obj): obj is TEngine.AtomizedRuleset { return !obj || (obj as TEngine.AtomizedRuleset).$r$ }
export function isDeferred(obj): obj is TEngine.Deferred { return obj && (obj as TEngine.Deferred).$d$ }
export function isTemporary(obj): obj is TEngine.TempProc { return obj && (obj as TEngine.TempProc).$t$ }
export function isToAtomize(obj): obj is TEngine.ToAtomize { return obj && !(obj as TEngine.AtomizedRuleset).$r$ && !(obj as TEngine.Deferred).$d$ && !(obj as TEngine.TempProc).$t$}

//*******************************************************
//        makeTemporary
export const makeTemporary = (proc: TEngine.TempProc) => {
    proc.$t$ = true
    return proc as any
}

//*******************************************************
//        processTree
export const processTree = (value: TEngine.RulesetItem | TEngine.RulesetItem[], atomizedVariants: TEngine.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions) => {
    const items = isToAtomizeArray(value) ? value : [value]
    const indexToPath = (idx:number) => items.length<=1 ? '' : `[${idx}]`
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
        } else {
            processAllInnerVariantsAndAtomize(
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

// recursivelly process variants in rulesets and in web pseudos (:hover, :active) 
// than atomize result

const processAllInnerVariantsAndAtomize = (
    ruleset: TEngine.ToAtomize,
    atomizedVariants: TEngine.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions,
) => {

    const inner: TEngine.Variants = []

    // process variant's in pseudo rules (in :hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TEngine.ToAtomize
        if (!value || p.charAt(0) === '$' || (typeof value !== 'object' && !isTemporary(value))) continue
        processTree(value, inner, `${path}/${p}`, [...pseudoPrefixes, p], conditions)
        delete ruleset[p] 
    }
    atomizeNonVariant(atomizedVariants, wrapPseudoPrefixes(ruleset, pseudoPrefixes), conditions, path)
    if (inner.length>0)
        Array.prototype.push.apply(atomizedVariants, inner)

}

// *********** utils

const pushToAtomizedVariants = (atomizedVariants: TEngine.Variants, variant: TEngine.Variant, conditions: TVariants.Conditions) => {
    if (!variant) return
    if (conditions && conditions.length > 0) variant.conditions = conditions
    atomizedVariants.push(variant)
}

const atomizeNonVariant = (
    atomizedVariants: TEngine.Variants, sourceRuleset: TEngine.Ruleset,
    conditions: TVariants.Conditions, path: string
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

