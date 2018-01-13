import React from 'react'
import { createMuiTheme, AppContainerProps, MuiThemeProvider } from 'muix-styles'
//import  from '../common/index'
import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

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
