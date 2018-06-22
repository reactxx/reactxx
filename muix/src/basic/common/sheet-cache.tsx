import React from 'react'
import ReactN from 'react-native'

import { TCommon } from '../typings/common'
import { Types } from '../typings/types'
import { toPlatformSheets, MergeSheetsResult } from './to-platform'

export const getPlatformSheet = (par: GetPlatformSheetPar) => {
  const { id, createSheetX, defaultClasses, sheetXPatch, variant, variantCacheId, themeContext: { $cache } } = par
  const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null
  if (cacheId) {
    // from theme cache (use defaultClasses only)
    const cache = fromCache($cache, id, cacheId, () => toPlatform({ ...par, sheetXPatch: defaultClasses ? [defaultClasses] : null }))
    // 
    return toPlatformSheets(cache, sheetXPatch)
  } else {
    const patch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
    return toPlatform({ ...par, sheetXPatch: patch })
  }
}

const fromCache = ($cache: Cache, id: number, variantCacheId: string, getter: () => MergeSheetsResult) => {
  let compCache = $cache[id]
  if (!compCache) $cache[id] = compCache = {}
  let res = compCache[variantCacheId]
  if (res) return res
  res = getter()
  //TODO: merge
  compCache[variantCacheId] = res
  return res
}

const toPlatform = ({ createSheetX, themeContext: { theme }, sheetXPatch, variant }: GetPlatformSheetPar) => {
  const sheet = typeof createSheetX === 'function' ? createSheetX(theme, variant) : createSheetX
  return toPlatformSheets(null, [sheet, ...sheetXPatch || []])
}

type Cache = { [variantId: string]: MergeSheetsResult }[]

interface GetPlatformSheetPar {
  id: number; createSheetX: Types.SheetCreatorX; themeContext: TCommon.ThemeContext; sheetXPatch: Types.PartialSheetX[];
  defaultClasses?: Types.PartialSheetX; variant; variantCacheId: string;
}

//let a, b, c, d

//const root /*Types.RulesetX*/ = {
//  $media: {
//    '0-480': {
//      $before: {
//        $web: { a, b },
//        c
//      },
//      $web: { a, b },
//      c
//    }
//  },
//  $before: {
//    $media: {
//      '-480': { m: 1 },
//      '480-': { m: 2 },
//    },
//    $web: { a, b },
//    c
//  },
//  a, b,
//  $after: {
//    $media: {
//      '0-480': { $after: 1 },
//    },
//    $native: { c, d },
//    a
//  },
//  c, d,
//  $web: {
//    $media: {
//      '0-480': { $web: 1 },
//    },
//    c, d
//  },
//  $native: { a, b }
//}

//const addIns = {
//  root: {
//    $media: [ // array of sheets
//      // $before
//      {
//        '0-480': { m: 1 },
//        '480-': { m: 2 },
//      },
//      // root
//      {
//        '0-480': {
//          $before: {
//            $web: { a, b },
//            c
//          },
//          $web: { a, b },
//          c
//        }
//      },
//      // $web
//      {
//        '0-480': { $web: 1 },
//      },
//      // $after
//      {
//        '0-480': { $after: 1 },
//      }
//    ]
//  }
//}

//const platformAddIns = {
//  root: {
//    $media: {
//      '0-480': {
//        m: 1,
//      },
//    }
//  }
//}

//const platformRoot /*Types.Ruleset*/ = [
//  // $before
//  {
//    $media: {
//      '-480': { m: 1 },
//      '480-': { m: 2 },
//    },
//    $web: { a, b },
//    c
//  },
//  // $before.$web
//  { a, b },
//  // root
//  { a, b, c, d, /*ostatni*/ },
//  // $web
//  {
//    $media: {
//      '0-480': { $web: 1 },
//    },
//    c, d
//  },
//  // $after
//  {
//    $media: {
//      '0-480': { $after: 1 },
//    },
//    $native: { c, d },
//    a
//  }
//]