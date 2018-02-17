import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'
import { applyTheme } from './index'

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiOverridesContextTypes = { childOverrides: PropTypes.any }

export const createTheme: ReactXX.ThemeCreator = options => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.creator(options)
}
export const getDefaultTheme = () => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.defaultTheme || (themerProps.defaultTheme = createTheme(themerProps.defaultOptions))
}

export class ThemeProvider extends React.PureComponent<ReactXX.ThemeProviderProps> {

  constructor(props, context: Muix.MuiThemeContextValue) {
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

  static childContextTypes = MuiThemeContextTypes
  static contextTypes = MuiThemeContextTypes
}

export const AppContainer: React.SFC<ReactXX.AppContainerProps> = props => {
  themerProps = props.themerProps
  return <ThemeProvider theme={getDefaultTheme()}>{props.children}</ThemeProvider>
}
let themerProps: ReactXX.ThemerProps & { defaultTheme?: ReactXX.Theme }
