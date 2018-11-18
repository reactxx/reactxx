import warning from 'warning'
import { wrapPseudoPrefixes } from './utils/wrap-pseudo-prefixes'
import { TCommonStyles, TSheeter, TVariants, TAtomize } from 'reactxx-typings'

// platform dependent 
import { platform } from 'reactxx-sheeter'

// linearize and atomize "ruleset" and its $web, $native and variants ($if, $widths,...)
// result is added to 'atomizedVariants'
export const adjustAtomizedLow = (
    ruleset: TAtomize.Source,
    ...ctx: TAtomize.TempCtx
) => {
    processTree(isToAtomizeArray(ruleset) ? ruleset : [ruleset], ...ctx)
}

export function isToAtomizeArray(obj): obj is TAtomize.Item[] { return obj && !(obj as TAtomize.Ruleset).$r$ && Array.isArray(obj) }
//export function isToAtomize(obj): obj is TAtomize.ToAtomize { return obj && !(obj as TAtomize.Ruleset).$r$ && !Array.isArray(obj) }
export function isAtomized(obj): obj is TAtomize.Ruleset { return !obj || (obj as TAtomize.Ruleset).$r$ }
export function isDeferred(obj): obj is TAtomize.Deferred { return obj && (obj as TAtomize.Deferred).$d$ }
export function isTemporary(obj): obj is TAtomize.Temporary { return obj && (obj as TAtomize.Temporary).$t$ }

//*********************************************************
//  PRIVATE
//*********************************************************
export const makeTemporary = <T extends TCommonStyles.RulesetNativeIds>(args, process: TAtomize.TempProcess) => {
    return {
        $t$: true,
        process,
        args,
    } as TAtomize.Temporary as any as TCommonStyles.RulesetType<T>
}


export const processTree = (items: TAtomize.Item[], ...ctx: TAtomize.TempCtx) => {
    const [atomizedVariants, path, pseudoPrefixes, conditions] = ctx
    items.forEach(it => {
        if (!it) return
        if (isTemporary(it)) {
            it.process(it.args, ...ctx)
        } else if (isDeferred(it)) {
            atomizedVariants.push(it)
        } else if (isAtomized(it)) {
            warning(!pseudoPrefixes || pseudoPrefixes.length === 0, 'Incorrect behavior') // cannot happend, just check
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
                atomizedVariants, `${path}`,
                pseudoPrefixes, conditions
            )
       }
    })
}

// type Part = [string, TAtomize.Item]

//*******************************************************
//        linearize$web$nativeParts

// linearize$web$nativeParts make following conversion, e.g.:
//    [{$web: [{}, ...]}, $native: [{}, {}, ...], {}, ...] => [[<path, {}>]]
// where 
//    {} is ruleset, eg. {color: 'red', ':hover': {margin: 10}}
// const linearize$web$nativeParts = (ruleset: TAtomize.Source) => {

//     const parts: Part[] = []

//     const addParts = (item: Part) => {
//         const [subPath, r] = item
//         if (!r) return
//         parts.push([subPath, r])
//         if (!isToAtomize(r)) return
//         const { $web, $native } = r
//         if (window.isWeb && $web) {
//             if (isToAtomizeArray($web))
//                 $web.forEach((r, idx) => parts.push([`${subPath}/$web[${idx}]`, r]))
//             else
//                 parts.push([subPath + '/$web', $web])
//         } else if (!window.isWeb && $native) {
//             if (isToAtomizeArray($native))
//                 $native.forEach((r, idx) => parts.push([`${subPath}/$native[${idx}]`, r]))
//             else
//                 parts.push([subPath + '/$native', $native])
//         }
//         if ($web) delete r.$web
//         if ($native) delete r.$native
//     }

//     if (isToAtomizeArray(ruleset))
//         ruleset.forEach((r, idx) => addParts([`[${idx}]`, r]))
//     else
//         addParts(['', ruleset]) // atomicArray or atomicRuleset

//     return parts
// }

//*******************************************************
//        linearizeAndAtomizeVariants

// const linearizeAndAtomizeVariants = (
//     parts: Part[],
//     atomizedVariants: TAtomize.Variants, path: string, pseudoPrefixes: string[], conditions: TVariants.Conditions,
// ) => {
//     parts.forEach(part => {
//         const [subPath, ruleset] = part
//         if (isAtomized(ruleset)) { // already atomized ...
//             warning(!pseudoPrefixes || pseudoPrefixes.length === 0, 'Incorrect behavior') // cannot happend, just check
//             ruleset.forEach(it => {
//                 if (!conditions || conditions.length === 0) //... and no conditions => done
//                     pushToAtomizedVariants(atomizedVariants, it, null)
//                 else { // ... conditions => merge conditions
//                     pushToAtomizedVariants(atomizedVariants, [...it],
//                         it.conditions ? [...conditions, ...it.conditions] : conditions)
//                 }
//             })
//         } else // recursion: process variants ($if, $ifelse, $width) in rulesets and in web pseudos (:hover, :active)
//             processAllInnerVariantsAndAtomize(
//                 atomizedVariants, ruleset,
//                 `${path}${subPath}`,
//                 pseudoPrefixes, conditions
//             )

//     })
// }

//*******************************************************
//        processAllInnerVariants

// recursivelly process variants ($if, $ifelse, $width) in rulesets and in web pseudos (:hover, :active) 
// than atomize result

const processAllInnerVariantsAndAtomize = (
    ruleset: TAtomize.ToAtomize,
    ...ctx: TAtomize.TempCtx
) => {

    //const variantList: TAtomize.Variants = []

    // process variant part of ruleset: $widths, $switch etc.
    //atomizeVariants(variantList, ruleset as any, path, pseudoPrefixes, conditions)
    const [atomizedVariants, path, pseudoPrefixes, conditions, isInPseudo] = ctx

    if (!isInPseudo)
        atomizeNonVariant(atomizedVariants, wrapPseudoPrefixes(ruleset, pseudoPrefixes), conditions, path)

    // process variant's in pseudo rules (in :hover etc.)
    for (const p in ruleset) {
        const value = ruleset[p] as TAtomize.ToAtomize
        if (!value || p.charAt(0) === '$' || typeof value !== 'object') continue
        if (isAtomized(value))
            throw 'Web pseudo properties cannot contain already atomized value'
        else if (isToAtomizeArray(value))
            throw 'Web pseudo properties cannot contain array of rulesets'
        else
            processAllInnerVariantsAndAtomize(value, atomizedVariants, `${path}/${p}`, [...pseudoPrefixes, p], conditions, true)
    }

    // atomize ruleset (including web pseudos) and push it in "atomizedVariants" first (=> lower PRIO)

    // push atomized variants to "atomizedVariants"  (=> higher PRIO)
    // if (variantList.length > 0)
    //     Array.prototype.push.apply(atomizedVariants, variantList)
}

// *********** simple utils

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

