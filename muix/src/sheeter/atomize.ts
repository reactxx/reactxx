import warning from 'warning'; 

import { TAtomize, TSheeter, TComponents, TCommonStyles } from 'reactxx-typings'
import { createWithTheme } from './utils/create-with-theme'
import { adjustAtomized } from './atomize-low'

export const atomizeSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetOrCreator<R>, theme?, path: string = 'sheet') => {
    if (!sheet) return null
    const sh: TSheeter.Sheet = createWithTheme(sheet, theme, window.__TRACE__)
    for (const p in sh) {
        const at = atomizeRuleset(sh[p], theme, (path ? path + '.' : '') + p)
        if (at) sh[p] = at
        else delete sh[p]
    }
    return sh as any as TAtomize.Sheet<R>
}

export const atomizeRuleset = <T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape>(
    ruleset: TSheeter.RulesetOrAtomizedCreator<T, R>, theme?, path: string = '.'
) => {
    if (!ruleset) return null

    const rs = createWithTheme(ruleset, theme) as TAtomize.Source

    if (!rs) return null

    //const name = rulesetName || rs['name'] || '.'

    const list: TAtomize.Ruleset = [] as any
    list.type = 'q'
    adjustAtomized(list, rs, path, [], [])

    return list.length === 0 ? null : list
}

export const atomizeStyle = (style: TSheeter.StyleOrCreator, theme?, path: string = '.') => {
    if (!style) return null
    if (window.isWeb)
        return createWithTheme(style, theme) as TSheeter.StyleOrAtomizedWeb
    else
        return atomizeRuleset(style as TSheeter.RulesetOrAtomized, theme, path)
}

// export function isAtomizedRuleset(obj: Object): obj is TAtomize.AtomizedRuleset {
//     return obj && obj['~'] === TAtomize.TypedInterfaceTypes.atomizedRuleset
// }

// export function isAtomicArray(obj): obj is TAtomize.AtomicArray {
//     return obj && obj[TAtomize.TypedInterfaceTypes.prop] === TAtomize.TypedInterfaceTypes.atomicArray
// }
// export function isAtomizedSheet<R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX): sheet is TAtomize.Sheet<R> {
//     for (const p in sheet)
//         return isAtomizedRuleset(sheet[p])
//     return true
// }

export function isReactXXComponent(obj): obj is TComponents.ComponentType {
    return obj[TAtomize.TypedInterfaceTypes.prop] === TAtomize.TypedInterfaceTypes.reactxxComponent
}

