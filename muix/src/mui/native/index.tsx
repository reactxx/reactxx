import React from 'react'
import ReactN from 'react-native'

import { AppContainer as ReactXXAppContainer } from 'reactxx' //, MuiThemeProvider } from 'muix-styles'
import { createMuiTheme } from '../common/createMuiTheme'

import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

export * from '../common/createMuiTheme'

export class AppContainer extends React.PureComponent {
  state = { isReady: false }
  render() {
    console.log('AppContainer')
    if (this.state.isReady) return <ReactXXAppContainer themerProps={{ creator: createMuiTheme }}>{this.props.children}</ReactXXAppContainer>
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  }
}

