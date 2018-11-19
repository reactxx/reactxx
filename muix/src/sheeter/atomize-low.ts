import warning from 'warning'
import { wrapPseudoPrefixes } from './utils/wrap-pseudo-prefixes'
import { TCommonStyles, TSheeter, TVariants, TAtomize } from 'reactxx-typings'

// platform dependent 
import { platform } from 'reactxx-sheeter'

//*******************************************************
//        adjustAtomizedLow

// linearize and atomize "ruleset" and its $web, $native and variants ($if, $widths,...)
// result is added to 'atomizedVariants'
export const adjustAtomizedLow = (
    ruleset: TAtomize.Source,
    atomizedVariants: TAtomize.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions
) => {
    processTree(isToAtomizeArray(ruleset) ? ruleset : [ruleset], atomizedVariants, path, pseudoPrefixes, conditions)
}

export function isToAtomizeArray(obj): obj is TAtomize.Item[] { return obj && !(obj as TAtomize.Ruleset).$r$ && Array.isArray(obj) }
export function isAtomized(obj): obj is TAtomize.Ruleset { return !obj || (obj as TAtomize.Ruleset).$r$ }
export function isDeferred(obj): obj is TAtomize.Deferred { return obj && (obj as TAtomize.Deferred).$d$ }
export function isTemporary(obj): obj is TAtomize.TempProc { return obj && (obj as TAtomize.TempProc).$t$ }

//*******************************************************
//        makeTemporary
export const makeTemporary = <T extends TCommonStyles.RulesetNativeIds>(proc: TAtomize.TempProc) => {
    proc.$t$ = true
    return proc as any as TCommonStyles.RulesetType<T>
}

//*******************************************************
//        processTree
export const processTree = (items: TAtomize.Item[], atomizedVariants: TAtomize.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions) => {
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
    ruleset: TAtomize.ToAtomize,
    atomizedVariants: TAtomize.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions,
) => {

    const inner: TAtomize.Variants = []

    // process variant's in pseudo rules (in :hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TAtomize.ToAtomize
        if (!value || p.charAt(0) === '$' || (typeof value !== 'object' && !isTemporary(value))) continue
        processTree(isToAtomizeArray(value) ? value : [value], inner, `${path}/${p}`, [...pseudoPrefixes, p], conditions)
        delete ruleset[p] 
    }
    atomizeNonVariant(atomizedVariants, wrapPseudoPrefixes(ruleset, pseudoPrefixes), conditions, path)
    if (inner.length>0)
        Array.prototype.push.apply(atomizedVariants, inner)

}

// *********** utils

const pushToAtomizedVariants = (atomizedVariants: TAtomize.Variants, variant: TAtomize.Variant, conditions: TVariants.Conditions) => {
    if (!variant) return
    if (conditions && conditions.length > 0) variant.conditions = conditions
    atomizedVariants.push(variant)
}

const atomizeNonVariant = (
    atomizedVariants: TAtomize.Variants, sourceRuleset: TSheeter.Ruleset,
    conditions: TVariants.Conditions, path: string
) => {
    if (!sourceRuleset) return
    // platform specific atomize: e.g. for WEB convert ruleset to list of atomized CSS classes
    const variant = platform.toPlatformAtomizeRuleset(sourceRuleset, path)
    pushToAtomizedVariants(atomizedVariants, variant, conditions)
}

