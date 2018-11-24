import React from 'react';
import warning from 'warning';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-sheeter';
import { TAtomize, TSheeter } from 'reactxx-typings';

const themeContext = React.createContext<ThemeContext<any>>(null)

export type ThemeContext<T extends any> = [T, (newTheme: T) => void]

export const useTheme = <T extends any>() => {
  const ctx = React.useContext<ThemeContext<T>>(themeContext)
  if (ctx) return ctx
  const {_withStyles, getDefaultTheme } = platform
  if (!_withStyles.defaultTheme && getDefaultTheme)
    _withStyles.defaultTheme = getDefaultTheme()
  return ctx || [_withStyles.defaultTheme, setThemeError] as ThemeContext<T>
}
const setThemeError = theme => { throw 'Cannot set default theme' }

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export const ThemeProvider = <T extends any>(props: ThemeProviderProps<T>) => {
  const { children, theme: themeInit } = props
  const state = React.useState<T>(themeInit)
  warning(state[0], 'ThemeProvider: missing theme')
  return <themeContext.Provider value={state}>{children}</themeContext.Provider>
}
ThemeProvider.$c$ = true
type ThemeProviderProps<T> = { theme: T; children?: React.ReactNode }

export const sheetFromThemeCache = (
  componentId: number, sheetOrCreator: TSheeter.SheetOrCreator,
  theme, defaultClasses: TSheeter.PartialSheetOrCreator,
  path: string
) => {
  const cache = !theme ? platform._withStyles.$cache : (theme.$cache || (theme.$cache = {}))

  let value: TAtomize.Sheet = cache[componentId]
  if (value) return value

  value = atomizeSheet(sheetOrCreator, theme, path + '.sheet')
  if (defaultClasses) {
    const _defaultClasses = atomizeSheet(defaultClasses, theme, path + '.option.classes')
    value = mergeSheets([value, _defaultClasses])
  }

  cache[componentId] = value

  return value
}
