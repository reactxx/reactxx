import React from 'react'
import RN from 'react-native'

export const toRuleLow = (style: Mui.TRuleSetX, isNative: boolean) => {
  if (!style) return null
  const { web, native, ...rest } = style
  return { ...rest, ...(isNative ? native : web) } as Mui.TRuleSet
}

/* INPUT
const sheet = {
  common: {
    root: {
      color: 'red',
      web: { color: 'blue' },
      native: { color: 'yellow' }
    }
  },
  native: {
    root: { color: 'green' }
  },
  web: {
    root: { }
  }
}
//OUTPUT for WEB
const web = {
  root: {color: 'blue'}
}
//OUTPUT for NATIVE
const native = {
  root: { color: 'green' }
}
*/
export const toPlatformSheetLow = (rules: Mui.PartialSheet<Mui.Shape>, isNative: boolean) => {
  if (!rules) return null
  const res = { ...(isNative ? rules.native : rules.web) }
  for (const p in rules.common) {
    const common = toRuleLow(rules.common[p], isNative)
    res[p] = !!res[p] ? { ...common, ...res[p] } : common
  }
  return res as Mui.PlatformSheet<Mui.Shape>
}

export const toPlatformTypographyOptionsLow = (options: Mui.TypographyOptions, isNative: boolean) => {
  if (!options) return null
  //const { fontStyle: fontStyleInit, sheet: sheetInit } = options
  //const sheet = sheetInit ? toPlatformSheetLow(sheetInit, isNative) : sheetInit
  //if (fontStyleInit) {
  //  const { web, native, ...rest } = fontStyleInit
  //  return { ...rest, ...(isNative ? native : web), ...sheet } as Mui.PlatformTypographyOptions
  //}
  //return { ...sheet } as Mui.PlatformTypographyOptions
  return {}
}