import warning from 'warning'; 

import { TAtomize, TSheeter, TComponents, TCommonStyles } from 'reactxx-typings'
import { createWithTheme } from './utils/create-with-theme'
import { adjustAtomized } from './atomize-low'

export const atomizeSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.PartialSheetOrCreator<R>, theme?, path: string = 'sheet') => {
    if (!sheet) return null
    const sh: TSheeter.Sheet = createWithTheme(sheet, theme)
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

    const list: TAtomize.Ruleset = [] as any
    list.$r$ = true
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

export function isReactXXComponent(obj): obj is TComponents.ComponentType {
    return (obj as TComponents.ComponentType).$c$
}

