import React from 'react'
import ReactN from 'react-native'
import range from 'lodash/range'

import { toPlatformSheetX, toPlatformRuleSetX } from '../common/index'

import getShadows from 'muix-shadows'

export { default as createTypography } from '../common/createTypography'

export const toPlatformRuleSet = <T extends Prim5s.RulesetNative>(style: Prim5s.RulesetX<T>) => toPlatformRuleSetX(style, true) as T
export const toPlatformSheet = <R extends Muix.Shape>(rules: Prim5s.PartialSheetX<R>) => toPlatformSheetX(rules, true) as Prim5s.SheetNative<R>

//const round = (value: number) => Math.round(value * 1e5) / 1e5
//const shadow = (deep: number) => ({
//  elevation: round(elev = elev + 0.25),
//  shadowOpacity: 0.24, //round(0.0015 * deep + 0.18),
//  shadowRadius: round(0.54 * deep),
//  shadowOffset: {
//    height: 0.6 * deep,
//  },
//} as ReactN.ViewStyle)
export { default as MuiThemeProvider } from '../common/MuiThemeProvider'
export const MuiThemeProviderInner: React.ComponentType<Muix.IMuiThemeProps> = null

let elev = 0.25

export const shadows: ReactN.ViewStyle[] = getShadows()

export { sheetCreator, clearSystemProps, default as createMuiTheme, AppContainerProps, classesToPlatformSheet, getDefaultTheme, MuiThemeContextTypes } from '../common/index'

export { AppContainer } from './withStyles'

export { default as withStyles } from '../common/withStyles'
export * from '../common/withStyles'

