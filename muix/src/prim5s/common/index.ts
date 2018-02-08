import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

//platform specific code
import { toPlatformRuleSet, toPlatformSheet } from 'muix-styles'

export interface AppContainerProps {
  themeOptions?: Muix.ThemeOptions
}

export const classesToPlatformSheet = <R extends Prim5s.Shape>(theme: Prim5s.getTheme<R>, classes: Prim5s.ThemeValueOrCreator<R, Prim5s.PartialSheetX<R>>) => {
  const sheetx = typeof classes === 'function' ? classes(theme) : classes
  return toPlatformSheet(sheetx) as Prim5s.Sheet<Prim5s.Shape>
}

//create platform specific sheet from cross platform sheet creator
export const sheetCreator = <R extends Prim5s.Shape>(sheetXCreator: Prim5s.ThemeCreator<R, Prim5s.SheetX<R>>) => (theme => toPlatformSheet(sheetXCreator(theme) as Prim5s.PartialSheetX<R>)) as Prim5s.SheetCreator<R>

//create platform specific ruleset from cross platform ruleset
export const toPlatformRuleSetX = (style: Prim5s.TRulesetX, isNative: boolean) => {
  if (!style) return null
  if (!style.$web && !style.$native && !style.$overrides && !style.$childOverrides) return style //optimalization
  const { $web, $native, $overrides, $childOverrides, ...rest } = style
  const res = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheetX($overrides, isNative), $childOverrides: getOverridesX(null, $childOverrides) }
  if (!res.$overrides) delete res.$overrides; if (!res.$childOverrides) delete res.$childOverrides //remove NULL or UNDEFINED
  return res as Prim5s.Ruleset
}

export const createAnimations = (props) => null

export const clearSystemProps = obj => {
  if (!obj) return obj
  delete obj.$overrides; delete obj.$childOverrides; delete obj.$name; delete obj.$web; delete obj.$native 
  return obj
}

//create platform specific sheet from cross platform sheet
export const toPlatformSheetX = (sheet: Prim5s.PartialSheetX<Prim5s.Shape>, isNative: boolean) => {
  if (typeof sheet !== 'object') return sheet
  const res: Prim5s.Sheet<Prim5s.Shape> = { }
  for (const p in sheet) {
    if (p === '$animations') {
      const animSrc = sheet[p]
      const animDest = res[p] = {}
      for (const pp in animSrc) animDest[pp] = toPlatformSheetX(animSrc[pp], isNative)
    } else
      res[p] = toPlatformRuleSetX(sheet[p], isNative)
  }
  return res
}

//create platform specific Overrides from cross platform Overrides
const getOverridesX = (theme, source: Muix.ThemeValueOrCreator<Muix.OverridesX>) => {
  if (!source) return null
  if (typeof source === 'function') source = source(theme)
  const result: Muix.Overrides = {}
  for (const p in source) result[p] = toPlatformSheet(source[p])
  return result
}

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiOverridesContextTypes = { childOverrides: PropTypes.any }

export const initPrim5s = (createTheme: (par) => any) => _createTheme = createTheme

let _createTheme: (par) => any = null
export const createTheme = (par?) => {
  warning(!!_createTheme, '')
  return _createTheme(par)
}
let defaultTheme
export const getDefaultTheme = () => defaultTheme || (defaultTheme = createTheme())

