import React from 'react'
import ReactN from 'react-native'
import { toPlatformSheetLow, toRuleLow } from 'muix-styles/common/toPlatform'

export const toRule = <T extends Mui.RuleSetNative>(style: Mui.RuleSetX<T>) => toRuleLow(style, true) as T
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheetX<R>) => toPlatformSheetLow(rules, true) as Mui.SheetNative<R>

import createTypographyNative from 'muix-styles/native/createTypography'
import shadowsNative from 'muix-styles/native/shadows'

export const createTypography = createTypographyNative
export const shadows = shadowsNative //.map(n => ({ native: n } as Mui.RuleSetX<ReactN.TextStyle>))

