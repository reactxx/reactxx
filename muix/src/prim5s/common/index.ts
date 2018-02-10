import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

//create platform specific sheet from cross platform one
export const sheetCreator = <R extends Prim5s.Shape>(sheetXCreator: Prim5s.FromThemeValueOrCreator<R, Prim5s.SheetX<R>>) => (theme => toPlatformSheet(applyTheme(theme, sheetXCreator) as Prim5s.PartialSheetX<R>)) as Prim5s.SheetCreator<R>

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
const toPlatformSheets = (theme:Prim5s.Theme, sheets: Prim5s.FromThemeValueOrCreator<Prim5s.Shape, Prim5s.SheetsX>) => {
  if (!sheets) return null
  const result: Prim5s.Sheets = {}
  for (const p in applyTheme(theme, sheets)) result[p] = toPlatformSheet(sheets[p])
  return result
}

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiCascadingContextTypes = { childCascading: PropTypes.any }

//simple deep merge
export const deepMerge = (target, source, skipSystem = false) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      if (skipSystem && key[0] === '$') continue //skip $override, $cascading and $name props
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {}
        deepMerge(target[key], source[key], skipSystem)
      } else
        target[key] = source[key]
    }
  else
    throw 'deepMerge: cannot merge object and non object'
  return target
}
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop
