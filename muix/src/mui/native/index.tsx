import React from 'react'
import ReactN from 'react-native'

import { TTheme, ThemeProvider, Themer } from 'reactxx'
import { ModifierType } from 'reactxx-stateman'
import { createMuiTheme } from '../common/createMuiTheme'

import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

export * from '../common/createMuiTheme'

//export const ThemeModifierX: ModifierType<TTheme.ThemeState, TTheme.ThemeState> = props => <Themer.Modifier {...props}>
//  {themeState => {
//  return props.children
//  //TODO THEME
//  //const { theme, overrides} = themeState
//  //theme.overrides = expandOverrides(themeState)
//  //return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
//}} />


export class AppContainer extends React.PureComponent {
  state = { isReady: false }
  render() {
    //console.log('AppContainer')
    //TODO THEME
    //if (this.state.isReady) return <ThemeProvider value={{ theme: createMuiTheme() }}>{this.props.children}</ThemeProvider>
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  }
}

