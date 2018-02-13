import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'
import { applyTheme } from './index'

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiOverridesContextTypes = { childOverrides: PropTypes.any }

export const createTheme: Prim5s.ThemeCreator = options => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.creator(options)
}
export const getDefaultTheme = () => {
  warning(!!themerProps, 'Missing AppContainer component')
  return themerProps.defaultTheme || (themerProps.defaultTheme = createTheme(themerProps.defaultOptions))
}

export class ThemeProvider extends React.PureComponent<Prim5s.ThemeProviderProps> {

  constructor(props, context: Muix.MuiThemeContextValue) {
    super(props, context)
    this.localTheme = applyTheme(context.theme || getDefaultTheme(), props.theme)
  }

  localTheme: Prim5s.Theme

  getChildContext(): Prim5s.ThemeContextValue {
    return { theme: this.localTheme }
  }

  render() {
    //return React.Children.only(this.props.children)
    return this.props.children
  }

  static childContextTypes = MuiThemeContextTypes
  static contextTypes = MuiThemeContextTypes
}

export const AppContainer: React.SFC<Prim5s.AppContainerProps> = props => {
  themerProps = props.themerProps
  return <ThemeProvider theme={getDefaultTheme()}>{props.children}</ThemeProvider>
}
let themerProps: Prim5s.ThemerProps & { defaultTheme?: Prim5s.Theme }
