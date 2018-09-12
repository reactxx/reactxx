import React from 'react';
import warning from 'warning';
import { TTheme, TWithStyles } from '../index-d';
import { globalOptions, initGlobalOptions } from './global-options'

export const initThemePipe = (options: TWithStyles.GlobalOptions = null) => initGlobalOptions({
  getDefaultTheme: () => ({}),
  namedThemes: {
    [defaultThemeName]: { $cache: {} }
  },
  ...options
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

export const createWithTheme = <T extends {}>(
  sheetOrCreator: T | ((theme: TTheme.Theme) => T),
  theme: TTheme.Theme,
  componentIdForSheet?: number
) => {
  if (typeof sheetOrCreator === 'function') {
    theme = adjustTheme(theme)
    const isSheet = typeof componentIdForSheet === 'number'
    // already in cache:
    if (isSheet) {
      const value = theme.$cache && theme.$cache[componentIdForSheet]
      if (value) return { theme, value }
    }
    // call sheet creator with theme:
    const value = sheetOrCreator(adjustTheme(theme))
    // put to cache:
    if (isSheet) {
      if (!theme.$cache) theme.$cache = {}
      theme.$cache[componentIdForSheet] = value
    }
    // return theme and sheet
    return { theme, value }
  } else
    // return theme and sheet
    return { theme, value: sheetOrCreator }
}

const reactContext = React.createContext<TTheme.Theme>(null)

export class ThemeProvider extends React.Component<TTheme.ThemeProviderProps> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme = registeredThemeName ? globalOptions.namedThemes[registeredThemeName] : theme
    warning(actTheme, 'ThemeProvider: missing theme')
    return actTheme ? <reactContext.Provider value={actTheme}>{children}</reactContext.Provider> : children
  }

}