import ReactN from 'react-native'
import React from 'react'

import CreateTypographyWeb from 'material-ui/styles/createTypography' 
import shadowsStrings from 'material-ui/styles/shadows'

import { toPlatformSheetX, toRuleX } from 'muix-styles/common/platform'

export const createTypography = CreateTypographyWeb
export const shadows = shadowsStrings.map(s => ({ boxShadow: s } as Mui.ViewStyleCommon))

export const toRule = (style: Mui.TRuleSetX) => toRuleX(style, false) as React.CSSProperties
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheetX<R>) => toPlatformSheetX(rules, false) as Mui.SheetWeb<R>

