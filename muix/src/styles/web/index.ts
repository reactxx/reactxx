import ReactN from 'react-native'
import React from 'react'

export { default as createTypography } from 'material-ui/styles/createTypography' 

import muiThemeProvider from 'material-ui/styles/MuiThemeProvider'
export const MuiThemeProvider = muiThemeProvider as any as React.ComponentType<Muix.IMuiThemeProps>

import shadowsStrings from 'material-ui/styles/shadows'
export const shadows = shadowsStrings.map(s => ({ boxShadow: s } as Muix.ViewStyleCommon))

import { toPlatformSheetX, toPlatformRuleSetX } from '../common/index'

export const toPlatformRuleSet = (style: Muix.TRulesetX) => toPlatformRuleSetX(style, false) as React.CSSProperties
export const toPlatformSheet = <R extends Muix.Shape>(rules: Muix.PartialSheetX<R>) => toPlatformSheetX(rules, false) as Muix.SheetWeb<R>

export { sheetCreator, default as createMuiTheme } from '../common/index'

export { classNames, withStyles as withStylesOld, withStylesX, AppContainer } from './withStyles'

export { rulesetsToClassNames, rulesetToClassNames } from './fela'

export { default as withStyles } from '../common/withStyles'