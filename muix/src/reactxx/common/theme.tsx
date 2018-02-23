import React from 'react'
import warning from 'warning'
import { applyTheme } from './index'

import PropTypes from 'prop-types'
import withContext from 'recompose/withContext'

export const ThemeContextTypes = { theme: PropTypes.any }
export const ThemeExContextTypes = { themeEx: PropTypes.any }

export const createTheme: ReactXX.ThemeCreator = options => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.creator(options)
}
export const getDefaultTheme = () => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.defaultTheme || (themerProps.defaultTheme = createTheme(themerProps.defaultOptions))
}

export const addOverrides = <T extends {}>(component: React.ComponentType<T>, getChildOverrides: (props: T) => ReactXX.Sheet) => {
  return withContext(ThemeExContextTypes, (props: T) => ({ childOverrides: getChildOverrides(props) }))(component) as React.ComponentType<T>
}

export class ThemeProvider extends React.PureComponent<ReactXX.ThemeProviderProps> {

  constructor(props, context: ReactXX.ThemeContextValue) {
    super(props, context)
    this.localTheme = applyTheme(context.theme || getDefaultTheme(), props.theme)
  }

  localTheme: ReactXX.Theme

  getChildContext(): ReactXX.ThemeContextValue {
    return { theme: this.localTheme }
  }

  render() {
    //return React.Children.only(this.props.children)
    return this.props.children
  }

  static childContextTypes = ThemeContextTypes
  static contextTypes = ThemeContextTypes
}

export const AppContainer: React.SFC<ReactXX.AppContainerProps> = props => {
  themerProps = props.themerProps
  return <ThemeProvider theme={getDefaultTheme()}>{props.children}</ThemeProvider>
}
let themerProps: ReactXX.ThemerProps & { defaultTheme?: ReactXX.Theme }
