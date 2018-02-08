import React from 'react'
import ReactN from 'react-native'
import range from 'lodash/range'
import { AppContainerProps } from '../common/index'

import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

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
import { default as MuiThemeProvider } from '../common/MuiThemeProvider'
export { default as MuiThemeProvider } from '../common/MuiThemeProvider'
export const MuiThemeProviderInner: React.ComponentType<Muix.IMuiThemeProps> = null

let elev = 0.25

export const shadows: ReactN.ViewStyle[] = getShadows()

export { sheetCreator, clearSystemProps, default as createMuiTheme, AppContainerProps, classesToPlatformSheet, getDefaultTheme, MuiThemeContextTypes } from '../common/index'
import { default as createMuiTheme } from '../common/index'

export { default as withStyles } from '../common/withStyles'
export * from '../common/withStyles'

export class AppContainer extends React.PureComponent<AppContainerProps> {
  state = { isReady: false }
  render() {
    //console.log('AppContainer COUNT: ', React.Children.count(this.props.children))
    if (this.state.isReady) return <MuiThemeProvider theme={createMuiTheme(this.props.themeOptions)}>{React.Children.only(this.props.children)}</MuiThemeProvider>
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  }
}