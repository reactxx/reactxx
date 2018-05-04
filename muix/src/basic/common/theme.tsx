import React from 'react'

import { TCommon } from '../typings/common'

const themeContext = React.createContext<TCommon.ThemeContext>({ theme: null, $cache: {} })

export const theme = (input: () => boolean, output: (outputPar: TCommon.ThemeContext) => void, next: () => React.ReactNode) => {
  const render = (renderPar: TCommon.ThemeContext) => {
    output(renderPar)
    return next()
  }
  const res = () => {
    if (input()) return <ThemeConsumer>{render}</ThemeConsumer>
    output(null)
    return next()
  }
  return res
}

export class ThemeProvider extends React.Component<{ theme: TCommon.ThemeCreator }> {

  render() {
    return <themeContext.Consumer>{this.PROVIDER}</themeContext.Consumer>
  }

  PROVIDER = (parentContext: TCommon.ThemeContext) => {
    const { children, theme } = this.props
    const actTheme = typeof theme === 'function' ? theme(parentContext && parentContext.theme) : theme
    if (!this.consumerContext || actTheme !== this.consumerContext.theme)
      this.consumerContext = { theme: actTheme, $cache: {} }
    return <themeContext.Provider value={ this.consumerContext }>{ children }</themeContext.Provider>
  }

  consumerContext: TCommon.ThemeContext
}

export const ThemeConsumer = themeContext.Consumer

export const ThemeProviderUntyped = ThemeProvider as React.ComponentClass<{ theme: any }>

