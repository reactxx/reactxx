import { isObject } from '../utils/deep-merge'
import { TAtomize, TSheeter } from '../d-index'
import { createWithTheme } from '../utils/create-with-theme'
import { atomizeRulesetLow } from './atomize-low'

export const atomizeSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetOrCreator<R>, theme) => {
    if (!sheet) return null
    const sh = createWithTheme(sheet, theme)
    for (const p in sh) sh[p] = atomizeRuleset(sh[p], theme, p)
    return sh as any as TAtomize.Sheet<R>
}

export const atomizeRuleset = (ruleset: TSheeter.ClassNameOrCreator, theme, rulesetName?: string) => {
    if (!ruleset) return null
    const rs = createWithTheme(ruleset, theme)
    if (isAtomizedRuleset(rs) || isAtomicArray(rs)) return rs
    if (Array.isArray(rs)) return rs.map(r => atomizeRuleset(r, theme))
    return atomizeRulesetLow(rs as TSheeter.Ruleset, rulesetName)
}

export function isRuleset(obj: Object): obj is TSheeter.Ruleset {
    return isObject(obj) && typeof obj[TAtomize.TypedInterfaceProp] === 'undefined'
}

export function isAtomizedRuleset(obj: Object): obj is TAtomize.AtomizedRuleset {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomizedRuleset
}
export function isAtomicArray(obj): obj is TAtomize.AtomicArray {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomicArray
}
export function isAtomizedSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TAtomize.Sheet<R> {
    for (const p in sheet)
        return isAtomizedRuleset(sheet[p])
    return true
}

