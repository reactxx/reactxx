import React from 'react';
import { atomizeSheet, globalOptions, mergeSheet } from 'reactxx-sheeter';
import { TAtomize, TSheeter, TTheme, TWithStyles } from 'reactxx-typings';
import warning from 'warning';

export const themePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  const render = (theme: TTheme.Theme) => {
    pipelineState.theme = theme
    return next()
  }
  return () => pipelineState.withTheme
    ? <themeContext.Consumer>{render}</themeContext.Consumer>
    : next()
}

export const registerTheme = (name: string, theme: TTheme.Theme) => {
  warning(!globalOptions.namedThemes[name], `Theme ${name} already registered`)
  //if (!theme.$cache) theme.$cache = {}
  globalOptions.namedThemes[name] = theme
}

const themeContext = React.createContext<TTheme.Theme>(null)

export class ThemeProvider extends React.Component<TTheme.ThemeProviderProps> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme = registeredThemeName ? globalOptions.namedThemes[registeredThemeName] : theme
    warning(actTheme, 'ThemeProvider: missing theme')
    return <themeContext.Provider value={actTheme}>{children}</themeContext.Provider>
  }

}

export const defaultThemeName = '*default-theme*'

export const sheetFromThemeCache = (
  componentId: number, sheetOrCreator: TSheeter.SheetOrCreator, theme: TTheme.Theme, defaultClasses: TSheeter.PartialSheetOrCreator
) => {
  const cache = !theme ? $cache : (theme.$cache || (theme.$cache = {}))

  let value: TAtomize.Sheet = cache[componentId]
  if (value) return value

  value = atomizeSheet(sheetOrCreator, theme)
  if (defaultClasses) {
    const _defaultClasses = atomizeSheet(defaultClasses, theme)
    mergeSheet(value, _defaultClasses, true)
  }

  cache[componentId] = value

  return value
}

// global 'sheet + defaultProps.classes' cache
const $cache: { [componentId: number]: TSheeter.Sheet } = {}