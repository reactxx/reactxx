import React from 'react'
import warning from 'warning'

import { TCommon } from '../typings/common'

const globalThemeContext: TCommon.ThemeContext = { theme: null, $cache: {} }
const themeContext = React.createContext<TCommon.ThemeContext>(null)
const namedThemes: { [themeName: string]: TCommon.ThemeBase } = {}

export const registerTheme = <T extends {} = never>(name: string, theme: T) => {
  warning(!namedThemes[name], `Theme ${name} already registered`)
  namedThemes[name] = theme
}

export const theme = (input: () => { withTheme: boolean }, output: (outputPar: TCommon.ThemeContext) => void, next: () => React.ReactNode) => {
  const render = (renderPar: TCommon.ThemeContext) => {
    output(renderPar)
    return next()
  }
  const res = () => {
    if (input().withTheme) return <ThemeConsumer>{render}</ThemeConsumer>
    output(globalThemeContext)
    return next()
  }
  return res
}

export class ThemeProvider extends React.Component<TCommon.ThemeProviderProps> {

  render() {
    return typeof theme === 'function' ? <themeContext.Consumer>{this.PROVIDER}</themeContext.Consumer> : this.PROVIDER(null)
  }

  PROVIDER = (parentContext: TCommon.ThemeContext) => {
    const { children, theme } = this.props
    const actTheme = typeof theme === 'function' ? theme(parentContext && parentContext.theme) : (typeof theme === 'string' ? namedThemes[theme] : theme)
    warning(actTheme, 'ThemeProvider: missing theme')
    //if (typeof theme === 'string') actTheme.themeName = theme
    if (!this.themeContext || actTheme !== this.themeContext.theme)
      this.themeContext = { theme: actTheme, $cache: {} }
    return <themeContext.Provider value={this.themeContext}>{children}</themeContext.Provider>
  }

  themeContext: TCommon.ThemeContext
}

export const ThemeConsumer = themeContext.Consumer

export const ThemeProviderUntyped = ThemeProvider as React.ComponentClass<{ theme: any }>
