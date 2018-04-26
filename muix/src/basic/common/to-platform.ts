import React from 'react'
import ReactN from 'react-native'

import { Types } from '../typings/ruleset'

export const toPlatformEvents = ($web: Types.OnPressAllWeb, $native: Types.OnPressAllNative, propsX: Types.OnPressAllX, cp: Types.OnPressAllNative | Types.OnPressAllWeb) => {
  const { onPress, onLongPress, onPressIn, onPressOut } = propsX
  if (isType<Types.OnPressAllWeb>(cp)) {
    const cl = $web && $web.onClick || onPress; if (cl) cp.onClick = cl
    const cl2 = $web && $web.onMouseDown || onPressIn; if (cl2) cp.onMouseDown = cl2
    const cl3 = $web && $web.onMouseUp || onPressOut; if (cl3) cp.onMouseUp = cl3
  } else if (isType<Types.OnPressAllNative>(cp)) {
    const cl = $native && $native.onPress || onPress; if (cl) cp.onPress = cl
    const cl1 = $native && $native.onLongPress || onLongPress; if (cl1) cp.onLongPress = cl1
    const cl2 = $native && $native.onPressIn || onPressIn; if (cl2) cp.onPressIn = cl2
    const cl3 = $native && $native.onPressOut || onPressOut; if (cl3) cp.onPressOut = cl3
  }
}

export const deepMergesSys = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}

export const deepMerges = (target, ...sources) => {
  return deepMerges(false, target, ...sources)
}

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: Types.RulesetX) => {
  if (!style) return null
  if (!style.$web && !style.$native) return style as Types.Ruleset // optimalization: already platform specific
  const { $web, $native, ...rest } = style
  return { ...rest, ...(window.isWeb ? $web : $native) } as Types.Ruleset
}

//simple deep merge
export const deepMerge = (target, source, skipSystem = false) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      if (key==='$preserve') continue
      if (skipSystem && key[0] === '$' && key !== '$mediaq') continue //skip $override, $childOverride and $name props
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {}
        deepMerge(target[key], source[key], skipSystem)
      } else
        target[key] = source[key]
    }
  else {
    debugger
    throw 'deepMerge: cannot merge object and non object'
  }
  return target
}
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //HACK: typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop

export function isType<TWeb>(arg): arg is TWeb { return window.isWeb }