import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

export interface AppContainerProps {
  themeOptions?: Muix.ThemeOptions
}

//export const classesToPlatformSheet = <R extends Prim5s.Shape>(theme: Prim5s.getTheme<R>, classes: Prim5s.ThemeValueOrCreator<R, Prim5s.PartialSheetX<R>>) => 
//  toPlatformSheet(applyTheme(theme, classes)) as Prim5s.Sheet<Prim5s.Shape>

//create platform specific sheet from cross platform sheet creator
export const sheetCreator = <R extends Prim5s.Shape>(sheetXCreator: Prim5s.ThemeCreator<R, Prim5s.SheetX<R>>) => (theme => toPlatformSheet(sheetXCreator(theme) as Prim5s.PartialSheetX<R>)) as Prim5s.SheetCreator<R>

//create platform specific ruleset from cross platform ruleset
export const toPlatformRuleSet = (style: Prim5s.TRulesetX) => {
  if (!style) return null
  const isNative = !window.isWeb
  if (!style.$web && !style.$native && !style.$overrides && !style.$childOverrides) return style //optimalization
  const { $web, $native, $overrides, $childOverrides, ...rest } = style
  const res = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheet($overrides), $childOverrides: toPlatformSheets(null, $childOverrides) }
  if (!res.$overrides) delete res.$overrides; if (!res.$childOverrides) delete res.$childOverrides //remove NULL or UNDEFINED
  return res as Prim5s.Ruleset 
}

export const createAnimations = (props) => null

export const clearSystemProps = obj => {
  if (!obj) return obj
  delete obj.$overrides; delete obj.$childOverrides; delete obj.$name; delete obj.$web; delete obj.$native 
  return obj
}

export const applyTheme = <R extends Prim5s.Shape, T>(theme: Prim5s.getTheme<R>, valueOrCreator: Prim5s.ThemeValueOrCreator<R, T>) => typeof valueOrCreator === 'function' ? valueOrCreator(theme) : valueOrCreator

//create platform specific sheet from cross platform sheet
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

//create platform specific Overrides from cross platform Overrides
const toPlatformSheets = (theme, sheets: Muix.ThemeValueOrCreator<Muix.OverridesX>) => {
  if (!sheets) return null
  const result: Muix.Overrides = {}
  for (const p in applyTheme(theme, sheets)) result[p] = toPlatformSheet(sheets[p])
  return result
}

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiOverridesContextTypes = { childOverrides: PropTypes.any }

export const initPrimities = (createTheme: (par) => any) => _createTheme = createTheme

let _createTheme: (par) => any = null
export const createTheme = (par?) => {
  warning(!!_createTheme, 'Missing initPrimities call')
  return _createTheme(par)
}
let defaultTheme
export const getDefaultTheme = () => defaultTheme || (defaultTheme = createTheme())

