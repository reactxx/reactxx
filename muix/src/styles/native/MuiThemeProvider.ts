import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

export const MuiThemeContextTypes = { theme: PropTypes.any }

class MuiThemeProvider extends React.Component<Mui.IMuiThemeProps> {
  constructor(props, context: Mui.TMuiThemeContextValue) {
    super(props, context)
    this.localTheme = this.mergeOuterLocalTheme(context.theme)
  }

  localTheme: Mui.nw_xxx.ThemeNew

  getChildContext(): Mui.TMuiThemeContextValue {
    return { theme: this.localTheme }
  }

  mergeOuterLocalTheme(outerTheme: Mui.nw_xxx.ThemeNew) {
    const { props: { theme } } = this
    if (typeof theme === 'function') return theme(outerTheme)
    if (!outerTheme) return theme
    return { ...outerTheme, ...theme };
  }

  render() { return React.Children.only(this.props.children) }

  static childContextTypes = MuiThemeContextTypes
  static contextTypes = MuiThemeContextTypes
}

export default pure<Mui.IMuiThemeProps>(MuiThemeProvider)