// Framework for creating components in both react and react-native.
import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

//create platform specific sheet from cross platform one
export const sheetCreator = <R extends ReactXX.Shape>(sheetXCreator: ReactXX.FromThemeValueOrCreator<R, ReactXX.SheetX<R>>) => {
  if (typeof sheetXCreator === 'function') return (theme => toPlatformSheet(applyTheme(theme, sheetXCreator))) as ReactXX.SheetCreator<R>
  return toPlatformSheet(sheetXCreator) as ReactXX.Sheet<R>
}

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: ReactXX.RulesetX) => {
  if (!style) return null
  const isNative = !window.isWeb
  if (!style.$web && !style.$native && !style.$overrides /*&& !style.$childOverrides*/) return style //optimalization
  const { $web, $native, $overrides, /*$childOverrides,*/ ...rest } = style
  const res = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheet($overrides)/*, $childOverrides: toPlatformSheets(null, $childOverrides)*/ }
  if (!res.$overrides) delete res.$overrides //remove NULL or UNDEFINED if (!res.$childOverrides) delete res.$childOverrides 
  return res as ReactXX.Ruleset 
}

export const applyTheme = <T>(theme: ReactXX.Theme | (() => ReactXX.Theme), valueOrCreator: ReactXX.FromThemeValueOrCreator<ReactXX.Shape, T>) =>
  typeof valueOrCreator === 'function' ? valueOrCreator(typeof theme === 'function' ? theme() : theme) : valueOrCreator

//create platform specific sheet from cross platform one
export const toPlatformSheet = (sheet: ReactXX.PartialSheetX<ReactXX.Shape>) => {
  if (typeof sheet !== 'object') return sheet
  const res: ReactXX.Sheet = { }
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
const toPlatformSheets = (theme:ReactXX.Theme, sheets: ReactXX.FromThemeValueOrCreator<ReactXX.Shape, ReactXX.SheetsX>) => {
  if (!sheets) return null
  const result: ReactXX.Sheets = {}
  for (const p in applyTheme(theme, sheets)) result[p] = toPlatformSheet(sheets[p])
  return result
}

//simple deep merge
export const deepMerge = (target, source, skipSystem = false) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      if (skipSystem && key[0] === '$') continue //skip $override, $childOverride and $name props
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
