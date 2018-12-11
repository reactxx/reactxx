import React from 'react';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-sheeter';
import { TEngine, TComponents } from 'reactxx-typings';


const themeContext = React.createContext<TComponents.ThemeContext<any>>(null)

export const useTheme = <T extends any>() => {
  const ctx = React.useContext<TComponents.ThemeContext<T>>(themeContext)
  return ctx || defaultTheme<T>()
}

const defaultTheme = <T extends any>(setState: any = setThemeError) => {
  const { _useSheeter, getDefaultTheme } = platform
  if (!_useSheeter.defaultTheme && getDefaultTheme)
    _useSheeter.defaultTheme = getDefaultTheme()
  return [_useSheeter.defaultTheme, setState] as TComponents.ThemeContext<T>
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
  const cache = !theme ? platform._useSheeter.$cache : (theme.$cache || (theme.$cache = {}))

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
