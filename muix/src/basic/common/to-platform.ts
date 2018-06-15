import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { renderAddIn } from './withStyles'
import { TAddIn } from '../typings/add-in';

export const hasPlatformEvents = (cpx: Types.CodeProps) => window.isWeb ? cpx.onClick || cpx.onMouseUp || cpx.onMouseDown : cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress

export const immutableMerge = (target, ...sources) => {
  // apply non object properties (objectProps[p]===false), accumulate object properties (objectProps[p]===[...])
  const objectProps: { [propName: string]: Array<{}> | false } = {}
  for (const p in target) if (!isObject(target[p])) objectProps[p] = false // for checking target x sources merge-ability
  let hasObjectProp = false
  let res = target
  sources.forEach(s => {
    if (!s) return
    if (res === target) res = { ...target }
    for (const p in s) {
      const val = s[p]
      if (val === undefined) { delete res[p]; continue }
      const isObj = isObject(val)
      const value = objectProps[p] || (objectProps[p] = isObj ? [] : false)
      warning((value === false) !== isObj, 'value.isObj === isObj')
      if (isObj) { // object prop, wait for merge
        (value as Array<{}>).push(val)
        hasObjectProp = true
      } else
        res[p] = val // non object prop, last win
    }
  })
  if (!hasObjectProp) return res

  // apply object properties
  for (const p in objectProps) {
    const objs = objectProps[p]
    if (objs === false) continue
    const targetVal = res[p]
    res[p] = !targetVal && objs.length === 1 ? objs[0] : immutableMerge(targetVal || {}, ...objs)
  }
  return res
}


//export const deepModifyTest = () => {
//  const a = 1, b = 2, c = 3, d = 4
//  let res = immutableMerge({}, {}, {})
//  res = immutableMerge({ a, b }, { a: 11, c }, { b: 22 })
//  res = immutableMerge({ x: { a, b, z: { c } }, d },
//    { x: { a: 11, b: 22, c, z: { c: 33 } }, z: { c }, d: 44 },
//    { x: { b: 222, z: { c: 333 } }, y: { d }, d: 444 })
//  res = immutableMerge({ x: { a, b, z: { c } }, d },
//    { x: { a: undefined, c, z: undefined } },
//    { y: { b: 222 }, d: undefined })
//  debugger
//}

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
export const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //HACK: typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop
export const isObjectLiteral = item => isObject(item) && item.constructor !== item

export function mergeRulesets<T extends TCommonStyles.RulesetNativeIds = 'View'>(...rulesets/*all used rulesets*/): TCommonStyles.RulesetNative<T>
export function mergeRulesets<T extends 'Web'>(...rulesets): TCommonStyles.RulesetWeb
export function mergeRulesets<T extends {}>(...rulesets): T
export function mergeRulesets(...rulesets) {
  let count = 0
  let res
  rulesets.forEach(ruleset => {
    if (!ruleset) return
    switch (count) {
      case 0: res = ruleset; break
      case 1: res = deepMerges({}, res, ruleset); break
      default: deepMerges(res, ruleset); break
    }
    count++
  })
  return res
}

//export interface StaticSheet {
//  codeClasses: Types.Sheet
//  addIns?
//  isConstant?: boolean
//}

//export const toPlatformRuleSetInPlace = (style: Types.RulesetX, ignoreAddIn?: boolean) => {
//  if (!isObject(style)) return { style, addIn: null }
//  // $before, $after
//  if (style.$before || style.$after) {
//    const $before = style.$before; const $after = style.$after
//    delete style.$before; delete style.$after
//    style = $before ? deepMerges($before, style, $after) : deepMerge(style, $after)
//  }
//  // $web, $native, $<addIn>
//  let addIn, $web, $native
//  for (const p in style) {
//    switch (p) {
//      case '$web': $web = style[p]; break
//      case '$native': $native = style[p]; break
//      default:
//        if (ignoreAddIn || p.charAt(0) !== '$') continue
//        if (!addIn) addIn = {}
//        const { toPlatformRulesetHooks } = renderAddIn
//        const done = toPlatformRulesetHooks && toPlatformRulesetHooks.find(hook => {
//          const val = hook(p, style[p])
//          if (val.done) addIn[p] = val.value
//          return val.done
//        })
//        warning(done, `Cannot find hook for ${p} addIn prop`)
//    }
//    delete style[p]
//  }
//  if ($web && window.isWeb) deepMerge(style, $web)
//  else if ($native && !window.isWeb) deepMerge(style, $native)
//  return { style, addIn }
//}

//export const toPlatformSheetInPlace = (codeClasses: Types.PartialSheetX, ignoreAddIn?: boolean) => {
//  if (!isObject(codeClasses)) return { codeClasses } as StaticSheet
//  let addIns
//  for (const p in codeClasses) {
//    if (p.charAt(0) === '$') {
//      if (ignoreAddIn) continue
//      if (!addIns) addIns = {}
//      const { toPlatformSheetHooks } = renderAddIn
//      const done = toPlatformSheetHooks && toPlatformSheetHooks.find(hook => {
//        const val = hook(p, codeClasses[p])
//        if (val.done) addIns[p] = val.value
//        return val.done
//      })
//      delete codeClasses[p]
//      warning(done, `Cannot find hook for ${p} addIn prop`)
//      continue
//    }
//    const ruleset = toPlatformRuleSetInPlace(codeClasses[p])
//    codeClasses[p] = ruleset.style as any
//    if (ruleset.addIn) {
//      if (!addIns) addIns = {}
//      addIns[p] = ruleset.addIn
//    }
//  }
//  return { codeClasses, addIns } as StaticSheet
//}

export const toPlatformRulesets = (sources: Types.RulesetX[]) => {
  if (!sources || sources.length == 0) return null
  const rulesets = []
  sources.forEach(source => pushRulesetParts(source, rulesets, () => ({})))
  return mergeRulesetsParts(rulesets)
}

type TSheetAddIn = Array<{}>
type TRulesetAddIn = { [name: string]: Array<{}> } // name is e.g. '$mediaq'
type TAddIn = TSheetAddIn | TRulesetAddIn
type TAddIns = { [name: string]: TAddIn} // name is e.g. '$animations' or 'root'

export interface MergeSheetsResult {
  sheet: Types.Sheet
  addIns: TAddIns
}

export const mergeSheets = (cache: MergeSheetsResult /*platform format of sheet and addIns*/, sources: Types.PartialSheetX[] /*X format*/) => {
  if (!sources || sources.length == 0) return cache
  const toMergesParts: { [name: string]: Types.RulesetX[] } = {}
  let mergeNeeded = false
  let addIns: TAddIns = null
  sources.forEach(src => {
    for (const p in src) {

      // initialize addIns item or for sheet or for ruleset
      const createAddIn = <T extends TAddIn = TRulesetAddIn>(isSheet?: boolean) => {
        if (!addIns) addIns = {}
        const addIn = addIns[p]
        if (addIn) return addIn as T
        const cacheAddIn = cache && cache.addIns && cache.addIns[p] 
        if (!cacheAddIn || isSheet) return (addIns[p] = isSheet ? (cacheAddIn ? [...cacheAddIn as TSheetAddIn] : []) : {}) as T // no addIns initialization from cache or Sheet addIn
        /* ruleset addIn example:
        const addIns = {
          root: {
            $media: [
              { '0-480': { m: 1 }, '480-': { m: 2 } }
            ]
          }
        }*/
        // two level deep copy of cached addIns:
        const res = addIns[p] = { ...cacheAddIn as TRulesetAddIn } // first level: sheet's ruleset, e.g. 'root':{}
        for (const pp in res) res[pp] = [...res[pp]] // second level: array of ruleset prop, e.g. 'mediaq':[]
        return res as T
      }

      // put sheet's system prop to addIns (e.g. $animations or sheet.$mediaq)
      if (p.charAt(0) === '$') { createAddIn<TSheetAddIn>(true).push(src[p]); continue }

      // linearize cross platform ruleset (and put ruleset's system prop to addIns, e.g. ruleset.$mediaq)
      mergeNeeded = true
      const rulesets = toMergesParts[p] || (toMergesParts[p] = [])
      pushRulesetParts(src[p], rulesets, createAddIn)
    }
  })

  // convert addIns to platform format
  if (addIns) renderAddIn.finishAddIns.forEach(finish => finish(addIns))

  if (!mergeNeeded) return { sheet: cache.sheet, addIns } as MergeSheetsResult

  const sheet: Types.Sheet = cache ? { ...cache.sheet } : {}
  for (const p in toMergesParts) {
    const targetp = sheet[p]; const toMergesp = toMergesParts[p]
    const toMerge = targetp && toMergesp.length > 0 ? [targetp, ...toMergesp] : targetp ? [targetp] : toMergesp.length > 0 ? toMergesp : null
    if (!toMerge) continue
    sheet[p] = mergeRulesetsParts(toMerge)
  }
  return { sheet, addIns } as MergeSheetsResult
}

// shallow merge with removing system props (name starts with '$')
const mergeRulesetsParts = (parts: Array<{}>) => {
  if (parts.length === 0) return null
  if (parts.length === 1) {
    // optimalization for just single part
    const p0 = parts[0]
    const sysProps = Object.keys(p0).filter(p => p.charAt(0) === '$')
    if (sysProps.length === 0) return p0 // no sys prop => return part
    // remove sys props from part
    const res = Object.assign(p0)
    sysProps.forEach(p => delete res[p])
    return res
  }
  const res = {}
  parts.forEach(part => {
    for (const p in part) {
      if (p.charAt(0) === '$') continue
      const partp = part[p], resp = res[p], isObjectPartp = isObject(partp), isObjectResp = isObject(resp)
      res[p] = isObjectPartp ? mergeRulesetsParts(isObjectResp ? [resp, partp] : [partp]/* merge non-object with object:  */) : partp
    }
  })
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

//export const immutableToPlatformRuleSet = (style: Types.RulesetX, ignoreAddIn?: boolean) => {
//  warning(isObject(style), 'isObject(style)')

//  // $before, $after
//  if (style.$before || style.$after) {
//    const $before = style.$before; const $after = style.$after
//    delete style.$before; delete style.$after
//    style = $before ? deepMerges($before, style, $after) : deepMerge(style, $after)
//  }
//  // $web, $native, $<addIn>
//  let addIn, $web, $native
//  for (const p in style) {
//    switch (p) {
//      case '$web': $web = style[p]; break
//      case '$native': $native = style[p]; break
//      default:
//        if (ignoreAddIn || p.charAt(0) !== '$') continue
//        if (!addIn) addIn = {}
//        const { toPlatformRulesetHooks } = renderAddIn
//        const done = toPlatformRulesetHooks && toPlatformRulesetHooks.find(hook => {
//          const val = hook(p, style[p])
//          if (val.done) addIn[p] = val.value
//          return val.done
//        })
//        warning(done, `Cannot find hook for ${p} addIn prop`)
//    }
//    delete style[p]
//  }
//  if ($web && window.isWeb) deepMerge(style, $web)
//  else if ($native && !window.isWeb) deepMerge(style, $native)
//  return { style, addIn }
//}
