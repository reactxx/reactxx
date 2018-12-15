import React from 'react';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-styles';
import { TEngine, TComponents } from 'reactxx-typings';


const themeContext = React.createContext<TComponents.ThemeContext<any>>(null)

export const useTheme = <T extends any>() => {
  const ctx = React.useContext<TComponents.ThemeContext<T>>(themeContext)
  return ctx || defaultTheme<T>()
}

const defaultTheme = <T extends any>(setState: any = setThemeError) => {
  const { _styles, getDefaultTheme } = platform
  if (!_styles.defaultTheme && getDefaultTheme)
    _styles.defaultTheme = getDefaultTheme()
  return [_styles.defaultTheme, setState] as TComponents.ThemeContext<T>
}
const setThemeError = theme => { throw 'Cannot set default theme' }

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export const ThemeProvider = <T extends any>(props: ThemeProviderProps<T>) => {
  const { children, theme: themeInit } = props
  let [theme, setTheme] = React.useState<T>(themeInit)
  if (!theme) [theme, setTheme] = defaultTheme<T>(setTheme)
  return <themeContext.Provider value={[theme, setTheme]}>{children}</themeContext.Provider>
}

type ThemeProviderProps<T> = { theme: T; children?: React.ReactNode }

export const sheetFromThemeCache = (
  componentId: number, sheetOrCreators: TEngine.SheetOrCreator[],
  theme,
  path: string
) => {
  const cache = !theme ? platform._styles.$cache : (theme.$cache || (theme.$cache = {}))

  let value: TEngine.Sheet = cache[componentId]
  if (value) return value

  if (!sheetOrCreators || sheetOrCreators.length === 0) value = {}
  else {
    const sheets:TEngine.Sheet[] = []
    sheetOrCreators.forEach((sheet, idx) => {
      if (!sheet) return
      sheets.push(atomizeSheet(sheet, theme, path + (idx===0 ? '.sheet' : '.sheetOverride')))
    })
    value = mergeSheets(sheets)
  }

  cache[componentId] = value

  return value
}
