import React from 'react'
import ReactN from 'react-native'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { TRenderState } from './withStyles'
import { deepMerges, deepMerge, mergeSheets, MergeSheetsResult } from './to-platform'

//type Cache2 = { [variantId: string]: StaticSheet }[]
type Cache = { [variantId: string]: MergeSheetsResult }[]

//const enum GetPlatformSheetLowMode { patch, cache, noCache }

interface GetPlatformSheetPar {
  id: number; createSheetX: Types.SheetCreatorX; themeContext: TCommon.ThemeContext; sheetXPatch: Types.PartialSheetX[];
  defaultClasses?: Types.PartialSheetX; variant; variantCacheId: string;
}

export const getPlatformSheet = (par: GetPlatformSheetPar) => {
  const { id, createSheetX, defaultClasses, sheetXPatch, variant, variantCacheId, themeContext: { $cache } } = par
  const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null
  if (cacheId) {
    // from theme cache (use defaultClasses only)
    const cache = fromCache($cache, id, cacheId, () => toPlatform({ ...par, sheetXPatch: defaultClasses ? [defaultClasses] : null }))
    // 
    return mergeSheets(cache, sheetXPatch)
  } else {
    const patch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
    return toPlatform({ ...par, sheetXPatch: patch })
  }
}

const fromCache = ($cache: Cache, id: number, variantCacheId: string, getter: () => MergeSheetsResult) => {
  let compCache = $cache[id]
  if (!compCache) $cache[id] = compCache = {}
  return compCache[variantCacheId] || (compCache[variantCacheId] = getter())
}

const toPlatform = ({ createSheetX, themeContext: { theme }, sheetXPatch, variant }: GetPlatformSheetPar) => {
  const sheet = typeof createSheetX === 'function' ? createSheetX(theme, variant) : createSheetX
  return mergeSheets(null, [sheet, ...sheetXPatch || []])
}

//// call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
//export const getPlatformSheet2 = (par: GetPlatformSheetPar) => {
//  let { sheetXPatch, defaultClasses, createSheetX } = par
//  sheetXPatch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
//  return sheetXPatch ? getPlatformSheetLow({ ...par, sheetXPatch }, GetPlatformSheetLowMode.patch) : getFromCache({ ...par, sheetXPatch })
//}

//const getPlatformSheetLow = ({ id, createSheetX, themeContext, sheetXPatch, variant, variantCacheId }: GetPlatformSheetPar, mode: GetPlatformSheetLowMode) => {
//  const sheet = typeof createSheetX === 'function' ? createSheetX(themeContext.theme, variant) : createSheetX
//  const isPatchValue = mode === GetPlatformSheetLowMode.patch && typeof createSheetX !== 'function'
//  const merged = isPatchValue ? deepMerges({}, sheet, ...sheetXPatch) : sheetXPatch ? deepMerges(sheet, ...sheetXPatch) : sheet
//  const res = toPlatformSheetInPlace(merged)
//  res.isConstant = mode === GetPlatformSheetLowMode.cache
//  return res
//}

//const getFromCache = (par: GetPlatformSheetPar) => {
//  const { id, createSheetX, variant, variantCacheId, themeContext: { $cache, theme } } = par
//  const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null
//  return cacheId ? fromCache2($cache, id, cacheId, () => getPlatformSheetLow(par, GetPlatformSheetLowMode.cache)) : getPlatformSheetLow(par, GetPlatformSheetLowMode.noCache)
//}

//const fromCache2 = ($cache: Cache2, id: number, variantCacheId: string, getter: () => StaticSheet) => {
//  let compCache = $cache[id]
//  if (!compCache) $cache[id] = compCache = {}
//  return compCache[variantCacheId] || (compCache[variantCacheId] = getter())
//}

let a, b, c, d

const root /*Types.RulesetX*/ = {
  $media: {
    '0-480': {
      $before: {
        $web: { a, b },
        c
      },
      $web: { a, b },
      c
    }
  },
  $before: {
    $media: {
      '-480': { m: 1 },
      '480-': { m: 2 },
    },
    $web: { a, b },
    c
  },
  a, b,
  $after: {
    $media: {
      '0-480': { $after: 1 },
    },
    $native: { c, d },
    a
  },
  c, d,
  $web: {
    $media: {
      '0-480': { $web: 1 },
    },
    c, d
  },
  $native: { a, b }
}

const addIns = {
  root: {
    $media: [ // array of sheets
      // $before
      {
        '0-480': { m: 1 },
        '480-': { m: 2 },
      },
      // root
      {
        '0-480': {
          $before: {
            $web: { a, b },
            c
          },
          $web: { a, b },
          c
        }
      },
      // $web
      {
        '0-480': { $web: 1 },
      },
      // $after
      {
        '0-480': { $after: 1 },
      }
    ]
  }
}

const platformAddIns = {
  root: {
    $media: {
      '0-480': {
        m: 1,
      },
    }
  }
}

const platformRoot /*Types.Ruleset*/ = [
  // $before
  {
    $media: {
      '-480': { m: 1 },
      '480-': { m: 2 },
    },
    $web: { a, b },
    c
  },
  // $before.$web
  { a, b },
  // root
  { a, b, c, d, /*ostatni*/ },
  // $web
  {
    $media: {
      '0-480': { $web: 1 },
    },
    c, d
  },
  // $after
  {
    $media: {
      '0-480': { $after: 1 },
    },
    $native: { c, d },
    a
  }
]