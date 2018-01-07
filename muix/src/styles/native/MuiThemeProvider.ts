import React from 'react'
import pure from 'recompose/pure'
import { MuiThemeContextTypes } from '../common/index'

class MuiThemeProvider extends React.Component<Muix.IMuiThemeProps> {
  constructor(props, context: Muix.MuiThemeContextValue) {
    super(props, context)
    this.localTheme = this.mergeOuterLocalTheme(context.theme)
  }

  localTheme: Muix.ThemeNew

  getChildContext(): Muix.MuiThemeContextValue {
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