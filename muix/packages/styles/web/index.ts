import ReactN from 'react-native'
import React from 'react'

import createTypographyMui from 'material-ui/styles/createTypography' 

import muiThemeProvider from 'material-ui/styles/MuiThemeProvider'
export const MuiThemeProviderInner = muiThemeProvider as any as React.ComponentType<Muix.IMuiThemeProps>

import shadowsStrings from 'material-ui/styles/shadows'
export const shadows = shadowsStrings.map(s => ({ boxShadow: s } as ReactXX.ViewRulesetCommonX))

import { toPlatformSheetX, toPlatformRuleSetX } from '../common/index'

export const toPlatformRuleSet = (style: ReactXX.RulesetX) => toPlatformRuleSetX(style, false) as React.CSSProperties
export const toPlatformSheet = <R extends ReactXX.Shape>(rules: ReactXX.PartialSheetX<R>) => toPlatformSheetX(rules, false) as ReactXX.SheetWeb<R>

export { clearSystemProps, sheetCreator, default as createMuiTheme, AppContainerProps, classesToPlatformSheet, getDefaultTheme, MuiThemeContextTypes } from '../common/index'

export { muiCompatible, AppContainer } from './withStyles'

export * from '../../reactxx/web/fela'

export { default as withStyles } from '../common/withStyles'
export * from '../common/withStyles'
export { default as MuiThemeProvider } from '../common/MuiThemeProvider'

export { default as createTypography } from '../common/createTypography'

//export const createTypography = (palette: Muix.Palette, optionOrCreator: Muix.TypographyOptionsOrCreator) => {
//  const res = createTypographyMui(palette, optionOrCreator)
//  return Object.assign(res, {
//    fontWeightLightNew: { fontWeight: res.fontWeightLight, fontFamily: res.fontFamily },
//    fontWeightRegularNew: { fontWeight: res.fontWeightRegular, fontFamily: res.fontFamily },
//    fontWeightMediumNew: { fontWeight: res.fontWeightMedium, fontFamily: res.fontFamily }
//  })
//}