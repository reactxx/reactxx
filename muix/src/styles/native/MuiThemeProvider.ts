import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

export const MuiThemeContextTypes = { theme: PropTypes.any }

class MuiThemeProvider extends React.Component<Muix.IMuiThemeProps> {
  constructor(props, context: Muix.TMuiThemeContextValue) {
    super(props, context)
    this.localTheme = this.mergeOuterLocalTheme(context.theme)
  }

  localTheme: Muix.ThemeNew

  getChildContext(): Muix.TMuiThemeContextValue {
    return { theme: this.localTheme }
  }

  mergeOuterLocalTheme(outerTheme: Muix.ThemeNew) {
    const { props: { theme } } = this
    if (typeof theme === 'function') return theme(outerTheme)
    if (!outerTheme) return theme
    return { ...outerTheme, ...theme };
  }

  render() { return React.Children.only(this.props.children) }

  static childContextTypes = MuiThemeContextTypes
  static contextTypes = MuiThemeContextTypes
}

export default pure<Muix.IMuiThemeProps>(MuiThemeProvider)