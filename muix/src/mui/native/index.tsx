import React from 'react'
import ReactN from 'react-native'

import { ThemeProvider } from 'reactxx'
import { createMuiTheme } from '../common/createMuiTheme'

import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

export * from '../common/createMuiTheme'

export class AppContainer extends React.PureComponent {
  state = { isReady: false }
  render() {
    console.log('AppContainer')
    if (this.state.isReady) return <ThemeProvider value={{ theme: createMuiTheme(), overrides: {} }}>{this.props.children}</ThemeProvider>
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  }
}

