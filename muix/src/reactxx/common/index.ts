// Framework for creating components in both react and react-native.
import React from 'react'
import ReactN from 'react-native'
import PropTypes from 'prop-types'
import warning from 'warning'

import { SheetsT } from 'reactxx-typings'

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: SheetsT.RulesetX) => {
  if (!style) return null
  const isNative = !window.isWeb
  if (!style.$mediaq && !style.$web && !style.$native && !style.$overrides && !style.$props) return style as SheetsT.Ruleset//optimalization
  const { $web, $native, $overrides, $mediaq, $props: $propsX, ...rest } = style
  let $props:any = $propsX
  if ($propsX && ($propsX.$native && isNative || $propsX.$web && !isNative)) {
    const { $native: $propsNative, $web: $propsWeb, ...restProps } = $propsX
    $props = { ...restProps, ...(isNative ? $propsNative : $propsWeb)}
  }
  const res = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheet($overrides), $mediaq: toPlatformSheet($mediaq as any), $props }
  if (!res.$overrides) delete res.$overrides; if (!res.$props) delete res.$props //remove NULL or UNDEFINED
  return res as SheetsT.Ruleset 
}

//create platform specific sheet from cross platform one
export const toPlatformSheet = <R extends SheetsT.Shape>(sheet: SheetsT.SheetX<R> | SheetsT.PartialSheetX<R>) => {
  if (typeof sheet !== 'object') return sheet
  const res = { }
  for (const p in sheet) {
    if (p === '$animations') {
      const animSrc = sheet[p]
      const animDest = res[p] = {} as any
      for (const pp in animSrc) animDest[pp] = toPlatformSheet(animSrc[pp] as any)
    } else
      res[p] = toPlatformRuleSet(sheet[p])
  }
  return res as SheetsT.Sheet<R>
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
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop
