import React from 'react'
import ReactN from 'react-native'
import range from 'lodash/range'

import { toPlatformSheetX, toPlatformRuleSetX } from '../common/index'

import getShadows from 'muix-shadows'

export { default as createTypography } from '../native/createTypography'

export const toPlatformRuleSet = <T extends Mui.CSSPropertiesNative>(style: Mui.RulesetX<T>) => toPlatformRuleSetX(style, true) as T
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheetX<R>) => toPlatformSheetX(rules, true) as Mui.SheetNative<R>

const round = (value: number) => Math.round(value * 1e5) / 1e5
const shadow = (deep: number) => ({
  elevation: round(elev = elev + 0.25),
  shadowOpacity: 0.24, //round(0.0015 * deep + 0.18),
  shadowRadius: round(0.54 * deep),
  shadowOffset: {
    height: 0.6 * deep,
  },
} as ReactN.ViewStyle)


let elev = 0.25

export const shadows: ReactN.ViewStyle[] = getShadows()

export { sheetCreator, default as createMuiTheme } from '../common/index'

export { classNames, withStyles, AppContainer } from './withStyles'

export { default as MuiThemeProvider } from './MuiThemeProvider'