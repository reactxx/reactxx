import React from 'react'
import ReactN from 'react-native'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { TRenderState } from './withStyles'
import { deepMerges, deepMerge, toPlatformSheetInPlace, StaticSheet } from './to-platform'

type Cache = { [variantId: string]: StaticSheet }[]

const enum GetPlatformSheetLowMode { patch, cache, noCache }

interface GetPlatformSheetPar {
  id: number; createSheetX: Types.SheetCreatorX; themeContext: TCommon.ThemeContext; sheetXPatch: Types.PartialSheetX[];
  defaultClasses?: Types.PartialSheetX; variant; variantCacheId: string; 
}

// call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
export const getPlatformSheet = (par: GetPlatformSheetPar) => {
  let { sheetXPatch, defaultClasses, createSheetX } = par
  sheetXPatch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
  return sheetXPatch ? getPlatformSheetLow({ ...par, sheetXPatch }, GetPlatformSheetLowMode.patch) : getFromCache({ ...par, sheetXPatch })
}

const getPlatformSheetLow = ({ id, createSheetX, themeContext, sheetXPatch, variant, variantCacheId }: GetPlatformSheetPar, mode: GetPlatformSheetLowMode) => {
  const sheet = typeof createSheetX === 'function' ? createSheetX(themeContext.theme, variant) : createSheetX
  const isPatchValue = mode === GetPlatformSheetLowMode.patch && typeof createSheetX !== 'function'
  const merged = isPatchValue ? deepMerges({}, sheet, ...sheetXPatch) : sheetXPatch ? deepMerges(sheet, ...sheetXPatch) : sheet
  const res = toPlatformSheetInPlace(merged)
  res.isConstant = mode === GetPlatformSheetLowMode.cache
  return res
}

const getFromCache = (par: GetPlatformSheetPar) => {
  const { id, createSheetX, variant, variantCacheId, themeContext: { $cache, theme } } = par
  const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null
  return cacheId ? fromCache($cache, id, cacheId, () => getPlatformSheetLow(par, GetPlatformSheetLowMode.cache)) : getPlatformSheetLow(par, GetPlatformSheetLowMode.noCache)
}

const fromCache = ($cache: Cache, id: number, variantCacheId: string, getter: () => StaticSheet) => {
  let compCache = $cache[id]
  if (!compCache) $cache[id] = compCache = {}
  return compCache[variantCacheId] || (compCache[variantCacheId] = getter())
}

