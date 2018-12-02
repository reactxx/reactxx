import React from 'react';
import warning from 'warning';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-sheeter';
import { TEngine } from 'reactxx-typings';
import { TUseSheeter } from '../typings/use-sheeter'


const themeContext = React.createContext<TUseSheeter.ThemeContext<any>>(null)

export const useTheme = <T extends any>() => {
  const ctx = React.useContext<TUseSheeter.ThemeContext<T>>(themeContext)
  return ctx || defaultTheme<T>()
}

const defaultTheme = <T extends any>(setState: any = setThemeError) => {
  const { _withStyles, getDefaultTheme } = platform
  if (!_withStyles.defaultTheme && getDefaultTheme)
    _withStyles.defaultTheme = getDefaultTheme()
  return [_withStyles.defaultTheme, setState] as TUseSheeter.ThemeContext<T>
}
const setThemeError = theme => { throw 'Cannot set default theme' }

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export const ThemeProvider = <T extends any>(props: ThemeProviderProps<T>) => {
  const { children, theme: themeInit } = props
  let [theme, setTheme] = React.useState<T>(themeInit)
  if (!theme) [theme, setTheme] = defaultTheme<T>(setTheme)
  return <themeContext.Provider value={[theme, setTheme] }>{children}</themeContext.Provider>
}
ThemeProvider.$c$ = true
type ThemeProviderProps<T> = { theme: T; children?: React.ReactNode }

export const sheetFromThemeCache = (
  componentId: number, sheetOrCreator: TEngine.SheetOrCreator,
  theme, defaultClasses: TEngine.SheetOrCreator,
  path: string
) => {
  const cache = !theme ? platform._withStyles.$cache : (theme.$cache || (theme.$cache = {}))

  let value: TEngine.Sheet = cache[componentId]
  if (value) return value

  value = atomizeSheet(sheetOrCreator, theme, path + '.sheet')
  if (defaultClasses) {
    const _defaultClasses = atomizeSheet(defaultClasses, theme, path + '.option.classes')
    value = mergeSheets([value, _defaultClasses])
  }

  cache[componentId] = value

  return value
}
