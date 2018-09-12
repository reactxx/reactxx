import React from 'react';
import warning from 'warning';
import { TCommon } from '../typings/common';

let globalThemeContext: TCommon.ThemeContext // = { theme: null, $cache: [] }
const themeContext = React.createContext<TCommon.ThemeContext>(null)
const namedThemes: { [themeName: string]: TCommon.ThemeBase } = {}

export const registerTheme = <T extends {} = never>(name: string, theme: T) => {
  warning(!namedThemes[name], `Theme ${name} already registered`)
  namedThemes[name] = theme
}

export const themePipe = (getDefaultTheme: () => TCommon.ThemeBase, input: () => { withTheme: boolean }, output: (outputPar: TCommon.ThemeContext) => void, next: () => React.ReactNode) => {
  const getThemeContext = () => globalThemeContext || (globalThemeContext = { theme: getDefaultTheme ? getDefaultTheme() : null, $cache: [] })
  const render = (renderPar: TCommon.ThemeContext) => {
    output(renderPar || getThemeContext())
    return next()
  }
  const res = () => {
    if (input().withTheme) return <ThemeConsumer>{render}</ThemeConsumer>
    output(getThemeContext())
    return next()
  }
  return res
}

export class ThemeProvider extends React.Component<TCommon.ThemeProviderProps> {

  render() {
    return typeof themePipe === 'function' ? <themeContext.Consumer>{this.PROVIDER}</themeContext.Consumer> : this.PROVIDER(null)
  }

  PROVIDER = (parentContext: TCommon.ThemeContext) => {
    const { children, theme } = this.props
    const actTheme = typeof theme === 'function' ? theme(parentContext && parentContext.theme) : (typeof theme === 'string' ? namedThemes[theme] : theme)
    warning(actTheme, 'ThemeProvider: missing theme')
    if (!this.themeContext || actTheme !== this.themeContext.theme)
      this.themeContext = { theme: actTheme, $cache: [] }
    return <themeContext.Provider value={this.themeContext}>{children}</themeContext.Provider>
  }

  themeContext: TCommon.ThemeContext
}

export const ThemeConsumer = themeContext.Consumer

export const ThemeProviderUntyped = ThemeProvider as React.ComponentClass<{ theme: any }>
