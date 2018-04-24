import React from 'react'
import ReactN from 'react-native'


import { TBasic } from '../typings/basic'

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: TBasic.RulesetX) => {
  if (!style) return style
  const isNative = !window.isWeb
  if (!style.$mediaq && !style.$web && !style.$native && !style.$overrides && !style.$props) return style
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
