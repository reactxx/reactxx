import warning from 'warning';

import { TEngine, TTyped, TSheeter, TComponents, TCommonStyles } from 'reactxx-typings'
import { createWithTheme } from './create-with-theme'
import { adjustAtomizedLow, isDeferred } from './atomize-low'

// muttable
export const atomizeSheet = (sheet: TEngine.SheetOrCreator, theme?, path: string = 'sheet') => {
    if (!sheet) return null
    const sh: TEngine.Sheet = createWithTheme(sheet, theme)
    for (const p in sh) {
        const at = atomizeRuleset(sh[p], theme, (path ? path + '.' : '') + p)
        if (at) sh[p] = at
        else delete sh[p]
    }
    return sh
}

// muttable
export const atomizeRuleset = (
    ruleset: TEngine.RulesetOrCreator, theme?, path: string = ''
) => {
    if (!ruleset) return null

    const rs = createWithTheme(ruleset, theme)

    if (!rs) return null

    const list = wrapRuleset([])
    adjustAtomizedLow(rs, list, path, [], [])

    return list.length === 0 ? null : list
}

export const wrapRuleset = ruleset => {
    (ruleset as TEngine.Queryables).$r$ = true
    if (window.__TRACE__)
        ruleset['toJSON'] = toJSON.bind(ruleset)
    return ruleset as TEngine.Queryables
}
function toJSON () {
    return (this as TEngine.Queryables).map(v => isDeferred(v) ? 'DEFFERED' : [...v])
}

// muttable (at least for native)
export const atomizeStyle = (style: TSheeter.StyleOrCreator, theme?, path: string = '.') => {
    if (!style) return null
    if (window.isWeb)
        return createWithTheme(style, theme) as TSheeter.StyleOrAtomizedWeb
    else
        return atomizeRuleset(style as TEngine.Rulesets, theme, path)
}

export function isReactXXComponent(obj): obj is TComponents.ComponentType {
    return (obj as TComponents.ComponentType).$c$
}