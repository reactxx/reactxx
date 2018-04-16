import React from 'react'
import ReactN from 'react-native'
import * as Cfg from 'typescript-config'

import { TBasic, isType } from '../typings/basic'

export const toPlatformEvents = ($web: TBasic.OnPressAllWeb, $native: TBasic.OnPressAllNative, propsX: TBasic.OnPressAllX, cp: TBasic.CodeProps) => {
  const { onPress, onLongPress, onPressIn, onPressOut } = propsX
  if (isType<TBasic.CodePropsWeb>(cp)) {
    const cl = $web && $web.onClick || onPress; if (cl) cp.onClick = cl
    const cl2 = $web && $web.onMouseDown || onPressIn; if (cl2) cp.onMouseDown = cl2
    const cl3 = $web && $web.onMouseUp || onPressOut; if (cl3) cp.onMouseUp = cl3
  } else if (isType<TBasic.CodePropsNative>(cp)) {
    const cl = $native && $native.onPress || onPress; if (cl) cp.onPress = cl
    const cl1 = $native && $native.onLongPress || onLongPress; if (cl1) cp.onLongPress = cl1
    const cl2 = $native && $native.onPressIn || onPressIn; if (cl2) cp.onPressIn = cl2
    const cl3 = $native && $native.onPressOut || onPressOut; if (cl3) cp.onPressOut = cl3
  }
}

export const deepMerges = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}

export interface RulesetX extends TBasic.RulesetX { $overrides?; $name?; $mediaq?; $props? }

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: RulesetX) => {
  if (!style) return null
  const isNative = !window.isWeb
  if (!style.$mediaq && !style.$web && !style.$native && !style.$overrides && !style.$props) return style as TBasic.Ruleset//optimalization
  const { $web, $native, $overrides, $mediaq, $props: $propsX, ...rest } = style
  let $props: any = $propsX
  if ($propsX && ($propsX.$native && isNative || $propsX.$web && !isNative)) {
    const { $native: $propsNative, $web: $propsWeb, ...restProps } = $propsX
    $props = { ...restProps, ...(isNative ? $propsNative : $propsWeb) }
  }
  const res:any = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheet($overrides), $mediaq: toPlatformSheet($mediaq as any), $props }
  if (!res.$overrides) delete res.$overrides; if (!res.$props) delete res.$props //remove NULL or UNDEFINED
  return res as TBasic.Ruleset
}

//create platform specific sheet from cross platform one
export const toPlatformSheet = <R extends TBasic.Shape>(sheet: TBasic.SheetX<R> | TBasic.PartialSheetX<R>) => {
  if (typeof sheet !== 'object') return sheet
  const res = {}
  for (const p in sheet) {
    const sheet$p = sheet[p]
    if (p === '$animations') { // sheets
      const animDest = res[p] = {} as any
      for (const pp in sheet$p) animDest[pp] = toPlatformSheet(sheet$p[pp] as any)
    } else if (p === '$mediaq') { // media breakpoints
      res[p] = sheet$p
    } else // ruleset
      res[p] = toPlatformRuleSet(sheet$p)
  }
  return res as TBasic.Sheet<R>
}

//simple deep merge
export const deepMerge = (target, source, skipSystem = false) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      if (skipSystem && key[0] === '$' && key !== '$mediaq') continue //skip $override, $childOverride and $name props
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
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //HACK: typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop
