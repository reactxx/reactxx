import warning from 'warning';

import { isObject } from '../utils/deep-merge'
import { TAtomize, TSheeter } from '../d-index'
import { createWithTheme } from '../utils/create-with-theme'
import { atomizeRulesetLow, atomizeStyleWeb } from './atomize-low'

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
    return atomizeRulesetLow(rs, rulesetName)
}

export const atomizeStyle = (style: TSheeter.StyleOrCreator, theme) => {
    if (!style) return null
    if (window.isWeb) {
        const st = createWithTheme(style, theme) as TSheeter.StyleOrAtomizedWeb
        if (isAtomizedStyleWeb(st)) return st
        return atomizeStyleWeb(st)
    } else
        return atomizeRuleset(style as TSheeter.ClassNameOrCreator, theme)
}

// export function isRuleset(obj: Object): obj is TSheeter.Ruleset {
//     return isObject(obj) && typeof obj[TAtomize.TypedInterfaceProp] === 'undefined'
// }

export function isAtomizedRuleset(obj: Object): obj is TAtomize.AtomizedRuleset {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomizedRuleset
}
export function isAtomizedStyleWeb(obj: Object): obj is TAtomize.StyleWeb {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomizedStyleWeb
}

export function isAtomicArray(obj): obj is TAtomize.AtomicArray {
    return obj && obj[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.atomicArray
}
export function isAtomizedSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TAtomize.Sheet<R> {
    for (const p in sheet)
        return isAtomizedRuleset(sheet[p])
    return true
}

// export function isRulesetWebArray(obj): obj is TSheeter.RulesetWeb[] {
//     return Array.isArray(obj) && !isAtomicArray(obj)
// }

