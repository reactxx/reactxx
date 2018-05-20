import React from 'react'
import ReactN from 'react-native'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

export interface CacheItem {
  sheet: Types.Sheet
  addIns?
  isConstant?: boolean
}
export type Cache = { [name: string]: { [variantId: string]: CacheItem } }

export const platformSheetFromCache = (name: string, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, propsPatch: TAddIn.CodeProps[], finalProps: Types.PropsX, themeContext: TCommon.ThemeContext) => {

  const { $cache, theme } = themeContext

  if (typeof createSheetX !== 'function')
    return fromCache($cache, name, '#static#', () => toPlatformSheetInPlace(createSheetX))

  if (!options || !options.getVariant)
    return fromCache($cache, name, '#novariant#', () => toPlatformSheetInPlace(createSheetX(theme, null)))

  const propsWithPatch = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
  const variant = options.getVariant(propsWithPatch, theme)
  const variantCacheId = options.variantToString && options.variantToString(variant)

  if (variantCacheId)
    return fromCache($cache, name, variantCacheId, () => toPlatformSheetInPlace(createSheetX(theme, variant)))

  return toPlatformSheetInPlace(createSheetX(theme, variant)) //getVariant!=null && variantToString==null => NO CACHING

}

const fromCache = ($cache: Cache, name: string, variantCacheId: string, getter: () => CacheItem) => {
  let compCache = $cache[name]
  if (!compCache) $cache[name] = compCache = {}
  let cacheItem = compCache[variantCacheId]
  if (!cacheItem) {
    compCache[variantCacheId] = cacheItem = getter();
    cacheItem.isConstant = true
  }
  return cacheItem
}

const toPlatformRuleSetInPlace = (style: Types.RulesetX) => {
  if (!isObject(style)) return { style, addIn: null }
  let addIn, $web, $native
  for (const p in style) {
    if (p === '$web') $web = style[p]
    else if (p === '$native') $native = style[p]
    else if (p.charAt(0) === '$') { if (!addIn) addIn = {}; addIn[p] = style[p] }
    else continue
    delete style[p]
  }
  if ($web && window.isWeb) mergeRulesetInPlace(style, $web)
  else if ($native && !window.isWeb) mergeRulesetInPlace(style, $native)
  return { style, addIn }
}

const toPlatformSheetInPlace = (sheetX: Types.PartialSheetX) => {
  if (!isObject(sheetX)) return { sheet: sheetX } as CacheItem
  let addIns
  for (const p in sheetX) {
    if (p.charAt(0) === '$') {
      if (!addIns) addIns = {}
      addIns[p] = sheetX[p]
      continue
    }
    const ruleset = toPlatformRuleSetInPlace(sheetX[p])
    sheetX[p] = ruleset.style as any
    if (ruleset.addIn) {
      if (!addIns) addIns = {}
      addIns[p] = ruleset.addIn
    }
  }
  return { sheet: sheetX, addIns } as CacheItem
}

const mergeRulesetInPlace = (target, source) => Object.assign(target, source)
const isObject = item => item && typeof item === 'object'