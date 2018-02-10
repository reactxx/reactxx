import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

//create platform specific sheet from cross platform one
export const sheetCreator = <R extends Prim5s.Shape>(sheetXCreator: Prim5s.FromThemeCreator<R, Prim5s.SheetX<R>>) => (theme => toPlatformSheet(sheetXCreator(theme) as Prim5s.PartialSheetX<R>)) as Prim5s.SheetCreator<R>

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: Prim5s.RulesetX) => {
  if (!style) return null
  const isNative = !window.isWeb
  if (!style.$web && !style.$native && !style.$cascading && !style.$childCascading) return style //optimalization
  const { $web, $native, $cascading, $childCascading, ...rest } = style
  const res = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheet($cascading), $childOverrides: toPlatformSheets(null, $childCascading) }
  if (!res.$overrides) delete res.$overrides; if (!res.$childOverrides) delete res.$childOverrides //remove NULL or UNDEFINED
  return res as Prim5s.Ruleset 
}

export const applyTheme = <T>(theme: Prim5s.Theme, valueOrCreator: Prim5s.FromThemeValueOrCreator<Prim5s.Shape, T>) => typeof valueOrCreator === 'function' ? valueOrCreator(theme) : valueOrCreator

//create platform specific sheet from cross platform one
export const toPlatformSheet = (sheet: Prim5s.PartialSheetX<Prim5s.Shape>) => {
  if (typeof sheet !== 'object') return sheet
  const res: Prim5s.Sheet = { }
  for (const p in sheet) {
    if (p === '$animations') {
      const animSrc = sheet[p]
      const animDest = res[p] = {}
      for (const pp in animSrc) animDest[pp] = toPlatformSheet(animSrc[pp])
    } else
      res[p] = toPlatformRuleSet(sheet[p])
  }
  return res
}

//create platform specific sheets from cross platform one
const toPlatformSheets = (theme, sheets: Prim5s.FromThemeValueOrCreator<Prim5s.Shape, Prim5s.SheetsX>) => {
  if (!sheets) return null
  const result: Prim5s.Sheets = {}
  for (const p in applyTheme(theme, sheets)) result[p] = toPlatformSheet(sheets[p])
  return result
}

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiCascadingContextTypes = { childCascading: PropTypes.any }

export const init = (_themeProps: Prim5s.ThemerProps) => themerProps = _themeProps

let themerProps: Prim5s.ThemerProps & { defaultTheme?: Prim5s.Theme}
export const createTheme: Prim5s.ThemeCreator = options => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.creator(options)
}
export const getDefaultTheme = () => {
  warning(!!themerProps, 'Missing AppContainer component')
  themerProps.defaultTheme || (themerProps.defaultTheme = createTheme(themerProps.defaultOptions))
}

