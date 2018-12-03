import { TEngine } from 'reactxx-typings';
import { adjustAtomizedLow, isDeferred } from './atomize-low';
import { createWithTheme } from './create-with-theme';



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
function toJSON() {
    return (this as TEngine.Queryables).map(v => {
        if (isDeferred(v)) return 'DEFFERED'
        return v
    })
}

// muttable (at least for native)
export const atomizeStyle = (style: TEngine.Style, theme?) => {
    if (!style) return null

    style = createWithTheme(style, theme)

    const { $web, $native } = style

    if ($web || $native) style = { ...style }

    if (window.isWeb && $web)
        Object.assign(style, $web)
    else if (!window.isWeb && $native)
        Object.assign(style, $native)

    delete style.$web
    delete style.$native
    
    return style
}

