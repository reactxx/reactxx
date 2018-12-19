import warning from 'warning'

import { TEngine } from 'reactxx-typings'

import { adjustAtomizedLow, isDeferred, deepClone } from './atomize-low'
import { createWithTheme } from './create-with-theme'
import { isStyledComponentTemp } from '../hooks/use-styled-components'

// mutable
export const atomizeSheet = (sheet: TEngine.SheetOrCreator, theme?, path: string = 'sheet') => {
    if (!sheet) return null
    if (window.__TRACE__)
        sheet = deepClone(sheet)
    const sh: TEngine.Sheet = createWithTheme(sheet, theme)
    for (const p in sh) {
        const value = sh[p]
        const subPath = (path ? path + '.' : '') + p
        if (isStyledComponentTemp(value)) {
            warning(p.charAt(0)===p.charAt(0).toUpperCase(), 'Component definition name must start with uppercase letter')
            sh[p] = value(sh, p, subPath)
        } else {
            const at = atomizeRuleset(sh[p], theme, subPath)
            if (at) sh[p] = at
            else delete sh[p]
        }
    }
    return sh
}

// mutable
export const atomizeRuleset = (
    ruleset: TEngine.RulesetOrCreator, theme?, path: string = ''
) => {
    if (!ruleset) return null

    const rs = createWithTheme(ruleset, theme)

    if (!rs) return null

    const list = wrapQueryables([])
    adjustAtomizedLow(rs, list, path, [], [])

    return list.length === 0 ? null : list
}

export const wrapAtomicLow = (atomicLow: TEngine.AtomicLow) => {
    const res = [
        atomicLow
    ] as TEngine.Queryables
    res.$r$ = true
    return res
    // (queryables as TEngine.Queryables).$r$ = true
    // if (window.__TRACE__)
    //     queryables['toJSON'] = toJSON.bind(queryables)
    // return queryables as TEngine.Queryables
}


export const wrapQueryables = (queryables: TEngine.QueryableItems) => {
    (queryables as TEngine.Queryables).$r$ = true
    if (window.__TRACE__)
        queryables['toJSON'] = toJSON.bind(queryables)
    return queryables as TEngine.Queryables
}
function toJSON() {
    return (this as TEngine.Queryables).map(v => {
        if (isDeferred(v)) return 'DEFFERED'
        return v
    })
}

// mutable
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
