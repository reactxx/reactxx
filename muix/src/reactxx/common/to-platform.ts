import React from 'react'
import ReactN from 'react-native'

import { TCommonStyles } from 'reactxx-basic'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

//create platform specific ruleset from cross platform one
export const toPlatformRuleSet = (style: Types.RulesetX) => {
  if (!style) return style
  const isNative = !window.isWeb
  if (!style.$mediaq && !style.$web && !style.$native /*&& !style.$overrides*/ && !style.$props) return style
  const { $web, $native, /*$overrides,*/ $mediaq, $props: $propsX, ...rest } = style
  let $props: any = $propsX
  if ($propsX && ($propsX.$native && isNative || $propsX.$web && !isNative)) {
    const { $native: $propsNative, $web: $propsWeb, ...restProps } = $propsX
    $props = { ...restProps, ...(isNative ? $propsNative : $propsWeb) }
  }
  const res:any = { ...rest, ...(isNative ? $native : $web), /*$overrides: toPlatformSheet($overrides),*/ $mediaq: toPlatformSheet($mediaq as any), $props }
  //if (!res.$overrides) delete res.$overrides;  //remove NULL or UNDEFINED
  if (!res.$props) delete res.$props //remove NULL or UNDEFINED
  return res as TCommonStyles.Ruleset
}

//create platform specific sheet from cross platform one
export const toPlatformSheet = <R extends Types.Shape>(sheet: Types.SheetX<R> | Types.PartialSheetX<R>) => {
  if (typeof sheet !== 'object') return sheet
  const res = {}
  for (const p in sheet) {
    const sheet$p = sheet[p]
    if (p === '$animations') { // animation sheets
      const animDest = res[p] = {} as any
      for (const pp in sheet$p) animDest[pp] = toPlatformSheet(sheet$p[pp] as any)
    } else if (p === '$mediaq') { // media breakpoints
      res[p] = sheet$p
    } else // ruleset
      res[p] = toPlatformRuleSet(sheet$p)
  }
  return res as Types.Sheet<R>
}
