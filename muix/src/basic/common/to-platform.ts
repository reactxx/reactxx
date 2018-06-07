import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { renderAddIn } from './withStyles'

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

export interface StaticSheet {
  codeClasses: Types.Sheet
  addIns?
  isConstant?: boolean
}

export const toPlatformRuleSetInPlace = (style: Types.RulesetX) => {
  if (!isObject(style)) return { style, addIn: null }
  if (style.$before || style.$after) {
    const $before = style.$before; const $after = style.$after
    delete style.$before; delete style.$after
    style = $before ? deepMerges($before, style, $after) : deepMerge(style, $after)
  }
  let addIn, $web, $native
  for (const p in style) {
    switch (p) {
      case '$web': $web = style[p]; break
      case '$native': $native = style[p]; break
      default:
        if (p.charAt(0) !== '$') continue
        if (!addIn) addIn = {}
        const { toPlatformRulesetHooks } = renderAddIn
        if (!toPlatformRulesetHooks) break
        toPlatformRulesetHooks.find(hook => {
          const val = hook(p, style[p])
          if (val.done) addIn[p] = val.value
          return val.done
        })
    }
    delete style[p]
  }
  if ($web && window.isWeb) deepMerge(style, $web)
  else if ($native && !window.isWeb) deepMerge(style, $native)
  return { style, addIn }
}

export const toPlatformSheetInPlace = (codeClasses: Types.PartialSheetX) => {
  if (!isObject(codeClasses)) return { codeClasses } as StaticSheet
  let addIns
  for (const p in codeClasses) {
    if (p.charAt(0) === '$') {
      if (!addIns) addIns = {}
      const { toPlatformSheetHooks } = renderAddIn
      if (!toPlatformSheetHooks) continue
      toPlatformSheetHooks.find(hook => {
        const val = hook(p, codeClasses[p])
        if (val.done) addIns[p] = val.value
        return val.done
      })
      delete codeClasses[p]
      continue
    }
    const ruleset = toPlatformRuleSetInPlace(codeClasses[p])
    codeClasses[p] = ruleset.style as any
    if (ruleset.addIn) {
      if (!addIns) addIns = {}
      addIns[p] = ruleset.addIn
    }
  }
  return { codeClasses, addIns } as StaticSheet
}