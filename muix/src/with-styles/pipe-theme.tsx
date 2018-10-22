import React from 'react';
import { atomizeSheet, globalOptions, mergeSheet } from 'reactxx-sheeter';
import { TAtomize, TSheeter, TTheme, TWithStyles } from 'reactxx-typings';
import warning from 'warning';

export const themePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  const render = (theme: TTheme.Theme) => {
    pipelineState.theme = theme || globalOptions.namedThemes[defaultThemeName]
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

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export class ThemeProviderGeneric<R extends TSheeter.Shape> extends React.Component<TTheme.ThemeProviderProps<TSheeter.getTheme<R>>> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme = registeredThemeName ? globalOptions.namedThemes[registeredThemeName] : theme
    warning(actTheme, 'ThemeProvider: missing theme')
    return <themeContext.Provider value={actTheme as TTheme.Theme}>{children}</themeContext.Provider>
  }
}
ThemeProviderGeneric[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.reactxxComponent

export const defaultThemeName = '*default-theme*'

export const sheetFromThemeCache = (
  componentId: number, sheetOrCreator: TSheeter.SheetOrCreator, 
  theme: TTheme.Theme, defaultClasses: TSheeter.PartialSheetOrCreator
) => {
  const cache = !theme ? $cache : (theme.$cache || (theme.$cache = {}))

  let value: TAtomize.Sheet = cache[componentId]
  if (value) return value

  value = atomizeSheet(sheetOrCreator, theme, 'sheet')
  if (defaultClasses) {
    const _defaultClasses = atomizeSheet(defaultClasses, theme, 'option.classes')
    mergeSheet(value, _defaultClasses, true)
  }

  cache[componentId] = value

  return value
}

// global 'sheet + defaultProps.classes' cache
let $cache: { [componentId: number]: TSheeter.Sheet } = {}

export const resetTheme = () => {
  $cache = {}
  globalOptions.namedThemes = {}
}