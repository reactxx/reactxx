import React from 'react';
import warning from 'warning';
import { TTheme, TWithStyles } from '../index-d';
import { globalOptions, initGlobalOptions } from '../with-style/global-options'
import { TSheeter } from '../sheeter/sheeter-d';
import { TComponents } from '../sheeter/components-d';

export const initThemePipe = (options?: TWithStyles.GlobalOptions) => initGlobalOptions({
  getDefaultTheme: () => ({}),
  namedThemes: {
    [defaultThemeName]: { $cache: {} }
  },
  ...options || null
})

export const themePipe: TWithStyles.Pipe = (context, next) => {
  const render = (renderPar: TTheme.Theme) => {
    context.theme = renderPar
    return next()
  }
  const res = () => {
    if (!context.withTheme) return next()
    return <reactContext.Consumer>{render}</reactContext.Consumer>
  }
  return res
}

const defaultThemeName = '*default-theme*'

export const registerTheme = (name: string, theme: TTheme.Theme) => {
  warning(!globalOptions.namedThemes[name], `Theme ${name} already registered`)
  if (!theme.$cache) theme.$cache = {}
  globalOptions.namedThemes[name] = theme
}

export const adjustTheme = (theme?: TTheme.Theme) => {
  if (theme)
    return theme
  theme = globalOptions.namedThemes[defaultThemeName]
  if (theme)
    return theme
  return globalOptions.namedThemes[defaultThemeName] =
    globalOptions.getDefaultTheme ? globalOptions.getDefaultTheme() : {}
}

export const createWithTheme = <T extends {}>(creator: T | ((theme: TTheme.Theme) => T), theme: TTheme.Theme, componentIdForSheet?: number) => {
  if (typeof creator === 'function') {
    theme = adjustTheme(theme)
    // already in cache:
    if (componentIdForSheet) {
      const value = theme.$cache && theme.$cache[componentIdForSheet]
      if (value) return { theme, value }
    }
    const value = creator(adjustTheme(theme))
    // put to cache:
    if (typeof componentIdForSheet === 'number') {
      if (!theme.$cache) theme.$cache = {}
      theme.$cache[componentIdForSheet] = value
    }
    // return functional creator result
    return { theme, value }
  } else
    // return value creator result
    return { theme, value: creator }
}

const reactContext = React.createContext<TTheme.Theme>(null)

export class ThemeProvider<T extends TTheme.Theme = TTheme.Theme> extends React.Component<TTheme.ThemeProviderProps<T>> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme =
      registeredThemeName ? globalOptions.namedThemes[registeredThemeName] :
        this.theme ? this.theme : (this.theme = theme)
    warning(actTheme, 'ThemeProvider: missing theme')
    return actTheme ? <reactContext.Provider value={actTheme}>{children}</reactContext.Provider> : children
  }

  theme: TTheme.Theme
}

export const ThemeProviderUntyped = ThemeProvider as React.ComponentClass<TTheme.ThemeProviderProps>

//const t = <ThemeProviderUntyped>{theme => <div />}</ThemeProviderUntyped>