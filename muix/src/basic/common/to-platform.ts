import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles } from '../typings/common-styles'
import { TCommon } from '../typings/common'
import { Types } from '../typings/types'
import { renderAddIn } from './withStyles'
import { TAddIn } from '../typings/add-in';
import { instanceOf } from 'prop-types';


//****************************
// PLATFORM SHEET
//****************************

export const getPlatformSheet = (par: GetPlatformSheetPar) => {
  const { id, createSheetX, defaultClasses, sheetXPatch, variant, variantCacheId, themeContext: { $cache } } = par
  const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null
  if (cacheId) {
    // from theme cache (use defaultClasses only)
    const cache = fromCache($cache, id, cacheId, () => toPlatform({ ...par, sheetXPatch: defaultClasses ? [defaultClasses] : null }))
    //const cache = fromCache($cache, id, cacheId, () => toPlatform({ ...par }))
    return toPlatformSheets(cache, sheetXPatch)
  } else {
    const patch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
    return toPlatform({ ...par, sheetXPatch: patch })
  }
}

const fromCache = ($cache: Cache, id: number, variantCacheId: string, getter: () => TCommon.SheetFragments) => {
  let compCache = $cache[id]
  if (!compCache) $cache[id] = compCache = {}
  return compCache[variantCacheId] || (compCache[variantCacheId] = mergeCacheParts(getter()))
}

const toPlatform = ({ createSheetX, themeContext: { theme }, sheetXPatch, variant }: GetPlatformSheetPar) => {
  let sheet: Types.PartialSheetX
  if (typeof createSheetX === 'function') {
    try { sheet = createSheetX(theme, variant) }
    catch {
      debugger
      warning(theme, 'Missing <ThemeProvider theme={}>')
      return null
    }
  } else
    sheet = createSheetX
  return toPlatformSheets(null, [sheet, ...sheetXPatch || []])
}

type Cache = { [variantId: string]: TCommon.SheetFragments }[]

interface GetPlatformSheetPar {
  id: number; createSheetX: Types.SheetCreatorX; themeContext: TCommon.ThemeContext; sheetXPatch: Types.PartialSheetX[];
  defaultClasses?: Types.PartialSheetX; variant; variantCacheId: string;
}

export const hasPlatformEvents = (cpx: Types.CodeProps) => window.isWeb ? cpx.onClick || cpx.onMouseUp || cpx.onMouseDown : cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress

//****************************
// DEEP MERGE
//****************************

export const deepMerges = (target, ...sources) => {
  sources.forEach(source => deepMerge(target, source))
  return target
}

//simple deep merge
export const deepMerge = (target, source) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      const sourceVal = source[key]
      if (sourceVal === undefined) { delete target[key]; continue }
      target[key] = isObjectLiteral(sourceVal) ? deepMerge(target[key] || {}, sourceVal) : sourceVal
    }
  else {
    debugger
    throw 'deepMerge: cannot merge object and non object'
  }
  return target
}
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && !item.$$typeof /*React component prop*/ && item.constructor !== item && typeof item['_interpolation'] != 'function' //HACK: typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop
const isObjectLiteral = item => isObject(item) && item.constructor !== item

export const immutableMerge = (target, sources: {}[]) => {
  // apply non object properties (objectProps[p]===false), accumulate object properties (objectProps[p]===[...])
  const objectProps: { [propName: string]: Array<{}> } = {}
  let res = target
  sources.forEach(s => {
    if (!s) return
    if (res === target) res = { ...target }
    for (const p in s) {
      const val = s[p]
      const isObj = isObject(val)
      if (isObj) { // object prop, wait for merge
        const objProps = objectProps[p] || (objectProps[p] = [])
        objProps.push(val)
      } else { // non object prop, last win
        delete objectProps[p]
        res[p] = val
      }
    }
  })

  // apply object properties
  for (const p in objectProps) {
    const objs = objectProps[p]
    const targetVal = res[p]
    res[p] = !targetVal && objs.length === 1 ? objs[0] : immutableMerge(targetVal || {}, objs)
  }
  return res
}

//****************************
// TO PLATFORM RULESETS
//****************************
export const toPlatformRulesets = (sources: Types.RulesetX[]) => {
  if (!sources || sources.length == 0) return null
  const rulesets = []
  sources.forEach(source => pushRulesetParts(source, rulesets, () => ({})))
  return mergeRulesetsParts(rulesets)
}

//****************************
// TO PLATFORM SHEETS
//****************************

export const toPlatformSheets = (cache: TCommon.SheetFragments /*platform format of sheet and addIns*/, sources: Types.PartialSheetX[] /*X format*/) => {
  if (!sources || sources.length == 0) return cache
  const sheetData: TCommon.SheetFragments = {}
  if (cache && cache.codeClasses) {
    sheetData.codeClasses = {}
    for (const p in cache.codeClasses)
      sheetData.codeClasses[p] = { name: p, __fragments: [...cache.codeClasses[p].__fragments] }
  } 
  sources.forEach(src => {
    for (const p in src) {

      // initialize addIns item or for sheet or for ruleset
      const createAddIn = <T extends {}[] | {}>(isSheet?: boolean) => {
        if (!sheetData.addInClasses) sheetData.addInClasses = {}
        const addIn = sheetData.addInClasses[p]
        if (addIn) return addIn as T

        const cacheAddIn = cache && cache.addInClasses && cache.addInClasses[p]

        // no cache:
        if (!cacheAddIn) return (sheetData.addInClasses[p] = isSheet ? [] : {}) as T

        //*** init adIns from cache:

        // sheet - init array from cache
        if (isSheet) return (sheetData.addInClasses[p] = [cacheAddIn]) as T

        // ruleset - two level deep copy of cached addIns:
        /* example:
        const addIns = {
          root: {
            $media: [
              { '0-480': { m: 1 }, '480-': { m: 2 } }
            ]
          }
        }*/
        const res = sheetData.addInClasses[p] = { ...cacheAddIn } // first level: sheet's ruleset, e.g. 'root':{}
        for (const pp in res) res[pp] = [...res[pp]] // second level: array of ruleset prop, e.g. 'mediaq':[]
        return res as T
      }

      // put sheet's addIns-prop to addIns (e.g. <sheet>.$animations)
      if (p.charAt(0) === '$') { createAddIn<{}[]>(true).push(src[p]); continue }

      // convert cross platform ruleset to RulesetFragments and put ruleset's system prop to addIns (e.g. ruleset.$mediaq)
      if (!sheetData.codeClasses) sheetData.codeClasses = {}
      const cachedRulesets = cache && cache.codeClasses && cache.codeClasses[p] && cache.codeClasses[p].__fragments
      const rulesets = sheetData.codeClasses[p] || (sheetData.codeClasses[p] = { name: p, __fragments: cachedRulesets ? [...cachedRulesets] : [] })
      pushRulesetParts(src[p], rulesets.__fragments, createAddIn)
    }
  })

  // convert addIns to platform format
  if (sheetData.addInClasses) renderAddIn.finishAddInClasses.forEach(finish => finish(sheetData.addInClasses))
  else sheetData.addInClasses = cache && cache.addInClasses

  return sheetData

}

export const mergeCacheParts = (cache: TCommon.SheetFragments) => {
  for (const p in cache.codeClasses) {
    const data = cache.codeClasses[p]
    if (!data.__fragments) continue
    data.__fragments = [mergeRulesetsParts(data.__fragments)]
  }
  return cache
}

// shallow merge with removing system props (name starts with '$')
export const mergeRulesetsParts = (parts: TCommon.RulesetFragmentsParts) => {
  if (!parts || parts.length === 0) return null

  // optimalization for just single part
  if (parts.length === 1) {
    let parts0 = parts[0] as TCommon.RulesetFragments
    if (!parts0) return null
    if (parts0.__fragments) {
      if (parts0.__fragments.length === 1) { // single part is single item array
        parts0 = parts0.__fragments[0] as TCommon.RulesetFragments
        if (!parts0) return null
      } else
        return mergePartArray(parts0.__fragments) // single part is array
    }
    // just single part or single item array
    const sysProps = Object.keys(parts0).filter(p => p.charAt(0) === '$') //system prop names
    if (sysProps.length === 0) return parts0 // no sys prop => return part
    // remove sys props from part
    const res = Object.assign(parts0)
    sysProps.forEach(p => delete res[p])
    return res
  }

  return mergePartArray(parts)
}

const mergePart = (part: TCommon.RulesetFragmentsPart, res: {}) => {
  if (!part) return
  if ((part as TCommon.RulesetFragments).__fragments) {
    mergePartArray((part as TCommon.RulesetFragments).__fragments, res)
    return
  }
  for (const p in part) {
    if (p.charAt(0) === '$') continue
    const partp = part[p], resp = res[p], isObjectPartp = isObject(partp), isObjectResp = isObject(resp)
    res[p] = isObjectPartp ? mergeRulesetsParts(isObjectResp ? [resp, partp] : [partp]/* merge non-object with object:  */) : partp
  }
}

const mergePartArray = (parts: TCommon.RulesetFragmentsParts, res?: {}) => {
  if (!res) res = {}
  parts.forEach(part => mergePart(part, res))
  return res
}


const partProps = { $before: true, $after: true, $native: true, $web: true }

const pushRulesetPart = (ruleset, arr: Array<any>, createAddIn: () => { [name: string]: Array<{}> }) => {
  if (!ruleset) return
  arr.push(ruleset)
  for (const p in ruleset) {
    if (p.charAt(0) != '$' || partProps[p]) continue
    // addIn prop in ruleset, e.g. $mediaq
    const addIns = createAddIn()
    const addIn = addIns[p] || (addIns[p] = [])
    addIn.push(ruleset[p])
  }
}

const pushRulesetParts = (ruleset: Types.RulesetX, arr: Array<any>, getAddIns: () => {}) => {
  const { $before, $after, $native, $web } = ruleset
  pushRulesetPart($before, arr, getAddIns)
  pushRulesetPart($before && (window.isWeb ? $before.$web : $before.$native), arr, getAddIns)
  pushRulesetPart(ruleset, arr, getAddIns)
  pushRulesetPart(window.isWeb ? $web : $native, arr, getAddIns)
  pushRulesetPart($after, arr, getAddIns)
  pushRulesetPart($after && (window.isWeb ? $after.$web : $after.$native), arr, getAddIns)
}
