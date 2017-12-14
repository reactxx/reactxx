import React from 'react'
import ReactN from 'react-native'
import range from 'lodash/range'

import { toPlatformSheetX, toRuleX } from 'muix-styles/common/index'

import createTypographyNative from 'muix-styles/native/createTypography'

export const toRule = <T extends Mui.RuleSetNative>(style: Mui.RuleSetX<T>) => toRuleX(style, true) as T
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheetX<R>) => toPlatformSheetX(rules, true) as Mui.SheetNative<R>
export const createTypography = createTypographyNative

const round = (value: number) => Math.round(value * 1e5) / 1e5
const shadow = (deep: number) => {
  if (deep == undefined) return null
  return {
    elevation: round(elev = elev + 0.25),
    shadowOpacity: 0.24, //round(0.0015 * deep + 0.18),
    shadowRadius: round(0.54 * deep),
    shadowOffset: {
      height: 0.6 * deep,
    },
  } as ReactN.ViewStyle
}

let elev = 0.25

export const shadows: Mui.ThemeShadows = [
  //{ elevation: 1, shadowOpacity: 0, shadowOffset: { width: 0, height: 1 }, shadowColor: 'rgba(0, 0, 0, 0.2)', shadowRadius: 3 },
  {},
  ...range(1, 25).map(idx => shadow(idx))
]



