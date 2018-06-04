import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'

//export const toPlatformEvents = ($web: Types.OnPressAllWeb, $native: Types.OnPressAllNative, propsX: Types.OnPressAllX, codeProps: Types.OnPressAllNative | Types.OnPressAllWeb, codeSystemProps: Types.OnPressAllX) => {
//  const { onPress, onLongPress, onPressIn, onPressOut } = propsX
//  codeSystemProps.onPress = onPress; codeSystemProps.onLongPress = onLongPress; codeSystemProps.onPressIn = onPressIn; codeSystemProps.onPressOut = onPressOut;
//  if (isType<Types.OnPressAllWeb>(codeProps)) {
//    const cl = $web && $web.onClick || onPress; if (cl) codeProps.onClick = cl
//    const cl2 = $web && $web.onMouseDown || onPressIn; if (cl2) codeProps.onMouseDown = cl2 
//    const cl3 = $web && $web.onMouseUp || onPressOut; if (cl3) codeProps.onMouseUp = cl3
//  } else if (isType<Types.OnPressAllNative>(codeProps)) {
//    const cl = $native && $native.onPress || onPress; if (cl) codeProps.onPress = cl
//    const cl1 = $native && $native.onLongPress || onLongPress; if (cl1) codeProps.onLongPress = cl1
//    const cl2 = $native && $native.onPressIn || onPressIn; if (cl2) codeProps.onPressIn = cl2
//    const cl3 = $native && $native.onPressOut || onPressOut; if (cl3) codeProps.onPressOut = cl3
//  }
//}

export const hasPlatformEvents = (cpx: Types.CodeProps) => window.isWeb ? cpx.onClick || cpx.onMouseUp || cpx.onMouseDown : cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress

//export const toPlatformSheet = (sheet: Types.SheetX | Types.PartialSheetX) => {
//  if (typeof sheet !== 'object') return sheet
//  const res = {}
//  for (const p in sheet) res[p] = toPlatformRuleSet(sheet[p])
//  return res as Types.Sheet
//}

////create platform specific ruleset from cross platform one
//export const toPlatformRuleSet = (style: Types.RulesetX) => {
//  if (!style) return null
//  if (!style.$web && !style.$native) return style // optimalization: already platform specific
//  const { $web, $native, ...rest } = style
//  return { ...rest, ...(window.isWeb ? $web : $native) } as TCommonStyles.Ruleset
//}

//export const deepModify = (target, ...sources) => {
//  if (!sources.find(s => !!s)) return target
//  target = { ...target }
//  const modifiers = deepMerges({}, ...sources)
//  for (const p in modifiers) {
//    const modifiersP = modifiers[p]; const targetP = target[p]
//    target[p] = targetP && isObjectLiteral(modifiersP) ? deepMerges({}, targetP, modifiersP) : modifiersP
//  }
//  return target
//}

export const immutableMerge = (target, ...sources) => {
  // group sources properties by name
  const values: { [propName: string]: {}[] | true } = {}
  for (const p in target) if (!isObject(target[p])) values[p] = true 
    
  let hasObject = false
  let res = target
  sources.forEach(s => {
    if (!s) return
    if (res === target) res = { ...target }
    for (const p in s) {
      const val = s[p]
      if (val === undefined) { delete res[p]; continue }
      const isObj = isObject(val)
      const value = values[p] || (values[p] = isObj ? [] : true)
      warning((value === true) !== isObj, 'value.isObj === isObj')
      if (isObj) {
        (value as {}[]).push(val)
        hasObject = true
      } else
        res[p] = val
    }
  })
  if (!hasObject) return res

  // apply object properties
  for (const p in values) {
    const val = values[p]
    if (val===true) continue
    const targetVal = res[p]
    res[p] = !targetVal && val.length === 1 ? val[0] : immutableMerge(targetVal || {}, ...val)
  }
  return res
}


export const deepModifyTest = () => {
  const a = 1, b = 2, c = 3, d = 4
  let res = immutableMerge({}, {}, {})
  res = immutableMerge({ a, b }, { a:11, c }, { b: 22 })
  res = immutableMerge({ x: { a, b, z: { c } }, d },
    { x: { a: 11, b: 22, c, z: { c: 33 } }, z: { c }, d: 44 },
    { x: { b: 222, z: { c: 333 } }, y: { d }, d: 444 })
  res = immutableMerge({ x: { a, b, z: { c } }, d },
    { x: { a: undefined, c, z: undefined } },
    { y: { b: 222 }, d: undefined })
  debugger
}

export const deepMerges = (target, ...sources) => {
  sources.forEach(source => deepMerge(target, source))
  return target
}

//simple deep merge
export const deepMerge = (target, source) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      const targetVal = target[key]; const sourceVal = source[key]
      if (sourceVal === undefined) { delete target[key]; continue }
      target[key] = isObjectLiteral(sourceVal) ? deepMerge(targetVal || {}, sourceVal) : sourceVal
      //if (isObjectLiteral(source[key])) {
      //  target[key] = deepMerge(target[key] || {}, source[key])
      //} else
      //  target[key] = source[key]
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

export function isType<TWeb>(arg): arg is TWeb { return window.isWeb }