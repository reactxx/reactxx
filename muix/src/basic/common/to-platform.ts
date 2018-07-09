import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'


import * as Sheeter from 'reactxx-sheeter'

import { TCommonStyles } from '../typings/common-styles'
import { TCommon } from '../typings/common'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in';
import { instanceOf } from 'prop-types';


//****************************
// GET PLATFORM SHEET
//****************************

export const getPlatformSheet = (par: GetPlatformSheetPar) => {
  const { componentId, expandCreator, createSheetX, defaultClasses, sheetXPatch, cacheId, $cache } = par
  // final sheet is merged from sheet, defaultClasses, component.provider cascading props and component props (classes, className and (for native only) style)
  // sheet and defaultClasses could be cached
  if (cacheId) {
    // from theme cache (sheet and defaultClasses included in cache)
    const cache = fromCache($cache, componentId, cacheId, () => Sheeter.mergeSheets(expandCreator(createSheetX), defaultClasses ? [defaultClasses] : null, true))
    return Sheeter.mergeSheetsAndFinish(cache, sheetXPatch, par.finishAddInClasses, false)
  } else {
    // without cache ( including sheet and defaultClasses)
    const patch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
    return Sheeter.mergeSheetsAndFinish(expandCreator(createSheetX), patch, par.finishAddInClasses, true)
  }
}

const fromCache = ($cache: Cache, componentId: number, cacheId: string, getter: () => Sheeter.SheetWithAddIns) => {
  let compCache = $cache[componentId]
  if (!compCache) $cache[componentId] = compCache = {}
  return compCache[cacheId] || (compCache[cacheId] = getter())
}

type Cache = { [variantId: string]: Sheeter.SheetWithAddIns }[]

interface GetPlatformSheetPar {
  componentId: number
  createSheetX: Types.SheetCreatorX
  expandCreator: (creator: Types.SheetCreatorX) => Sheeter.SheetWithAddIns
  $cache: Cache
  sheetXPatch: Sheeter.SheetWithAddIns[]
  defaultClasses?: Sheeter.SheetWithAddIns
  cacheId: string
  finishAddInClasses: Sheeter.FinishAddIns
}

export const hasPlatformEvents = (cpx: Types.CodeProps) => window.isWeb ? cpx.onClick || cpx.onMouseUp || cpx.onMouseDown : cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress

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

export const toPlatformSheets = (cache: TCommon.SheetFragments /*platform format of sheet and addIns*/, sources: Types.PartialSheetX[] /*X format*/, finishAddInClasses?: ((addInClasses: {}) => void)[]) => {
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
  if (sheetData.addInClasses && finishAddInClasses) finishAddInClasses.forEach(finish => finish(sheetData.addInClasses))
  else sheetData.addInClasses = cache && cache.addInClasses

  return sheetData

}

//****************************
// MERGE RULESET PARTS
//****************************
// shallow merge with removing system props (name starts with '$')
export const mergeRulesetsParts = (parts: TCommon.RulesetFragmentsParts) => {
  if (!parts || parts.length === 0) return null

  const simple = parts.length === 1 && mergeSimple(parts[0] as TCommon.RulesetFragments)
  if (simple) return simple.value as TCommonStyles.Ruleset

  const res: TCommonStyles.Ruleset = {}
  mergePartArray(parts, res)
  return res
}

const mergePartArray = (parts: TCommon.RulesetFragmentsParts, res: {}) => {
  if (!parts) return
  parts.forEach(part => mergePart(part, res))
}

const mergePart = (part: TCommon.RulesetFragmentsPart, res: {}) => {
  if (!part) return
  // Array
  const arr: {}[] = (part as TCommon.RulesetFragments).__fragments || (Array.isArray(part) && part)
  if (arr) {
    mergePartArray(arr, res)
    return
  }
  // Ruleset as object
  for (const p in part) {
    if (p.charAt(0) === '$') continue // ignore system props
    const partp = part[p], resp = res[p], isObjectPartp = isObject(partp), isObjectResp = isObject(resp)
    if (isObjectPartp && isObjectResp) res[p] = deepMerges({}, resp, partp)
    else res[p] = partp
  }
}

const mergeSimple = (part: TCommon.RulesetFragments) => {
  const fragments = part && part.__fragments
  if (!fragments || fragments.length > 1) return null
  if (fragments.length === 0) return { value: null }
  const part0 = fragments[0]
  const sysProps = Object.keys(part0).filter(p => p.charAt(0) === '$') //system prop names
  if (sysProps.length === 0) return { value: part0 } // no sys prop => return part
  const res = Object.assign(part0)
  sysProps.forEach(p => delete res[p])
  return { value: res }
}


//****************************
// PUSH RULESET PARTS
//****************************

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

// Object.getPrototypeOf(obj) === Object.prototype,/ https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
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

export const immutableMerge2 = (sources: {}[], isSheet?: boolean) => {
  if (!sources) return sources
  let count = 0, isToMerge = false, dest = null
  const objectsToMerge: { [propName: string]: Array<{}> } = {}
  sources.forEach(src => {
    if (!src) return
    count++
    switch (count) {
      case 1: dest = src; break // first
      case 2: dest = { ...dest } // !!! does not break, continue with merge
      default: // merge dest with src
        for (const p in src) {
          const destp = dest[p], srcp = src[p]
          if (!destp) { dest[p] = srcp; continue } // set first scalar or object
          const isDestpObj = isObject(destp), isSrcpObj = isObject(srcp)
          warning(isSrcpObj === isDestpObj, 'Cannot merge object with non-object')
          if (!isSrcpObj) { dest[p] = srcp; continue } // override scalar
          // src is second or more object
          isToMerge = true
          let canModifyp = objectsToMerge[p]
          if (!canModifyp) canModifyp = objectsToMerge[p] = [dest[p]] // second => put first 
          canModifyp.push(srcp) // push second or more
        }
    }
  })
  if (isToMerge)
    for (const p in objectsToMerge) dest[p] = immutableMerge2(objectsToMerge[p])
  return dest
}

