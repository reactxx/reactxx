import React from 'react'
import { MuiThemeContextTypes } from './index'
import { MuiThemeProviderInner, deepMerge } from 'muix-styles'

class MuiThemeProvider extends React.PureComponent<Muix.IMuiThemeProps> {

  constructor(props, context: Muix.MuiThemeContextValue) {
    super(props, context)
    this.localTheme = this.mergeOuterLocalTheme(context.theme)
  }

  localTheme: Muix.Theme

  getChildContext(): Muix.MuiThemeContextValue {
    return { theme: this.localTheme }
  }

  mergeOuterLocalTheme(outerTheme: Muix.Theme) {
    const { props: { theme } } = this
    if (typeof theme === 'function') return theme(outerTheme)
    if (outerTheme && theme.overrides) deepMerge(theme.overrides, outerTheme.overrides)
    return theme
  }

  render() {
    const child = React.Children.only(this.props.children)
    return MuiThemeProviderInner ? <MuiThemeProviderInner theme={this.localTheme}>{child} </MuiThemeProviderInner> : child
  }

  static childContextTypes = MuiThemeContextTypes
  static contextTypes = MuiThemeContextTypes
}

export default MuiThemeProvider