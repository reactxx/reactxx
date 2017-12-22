import ReactN from 'react-native'
import React from 'react'

export { default as createTypography } from 'material-ui/styles/createTypography' 

import muiThemeProvider from 'material-ui/styles/MuiThemeProvider'
export const MuiThemeProvider = muiThemeProvider as any as React.ComponentType<Mui.IMuiThemeProps>

import shadowsStrings from 'material-ui/styles/shadows'
export const shadows = shadowsStrings.map(s => ({ boxShadow: s } as Mui.ViewStyleCommon))

import { toPlatformSheetX, toPlatformRuleSetX } from '../common/index'

export const toPlatformRuleSet = (style: Mui.TRulesetX) => toPlatformRuleSetX(style, false) as React.CSSProperties
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheetX<R>) => toPlatformSheetX(rules, false) as Mui.SheetWeb<R>

export { sheetCreator, default as createMuiTheme } from '../common/index'

export { classNames, withStyles, withStylesX, AppContainer } from './withStyles'

export { ruleToClassNames } from './inline-styles'