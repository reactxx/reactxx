import React from 'react';
import warning from 'warning';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-sheeter';
import { TAtomize, TSheeter } from 'reactxx-typings';

const themeContext = React.createContext(null)

export const useTheme = <T extends any>() => (React.useContext(themeContext) || []) as [T, (newTheme:T) => void]

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export const ThemeProvider = <T extends any>(props: ThemeProviderProps<T>) => {
  const { children, theme: themeInit } = props
  const [theme, setTheme] = React.useState(themeInit)
  warning(theme, 'ThemeProvider: missing theme')
  return <themeContext.Provider value={[theme, setTheme]}>{children}</themeContext.Provider>
}
ThemeProvider.$c$ = true
type ThemeProviderProps<T> = { theme: T; children?: React.ReactNode }

//const x = <ThemeProvider<any> theme={null} />

// export const registerTheme = (name: string, theme) => {
//   if (!name) name = defaultThemeName
//   const { _withStyles: { namedThemes } } = platform
//   warning(theme, 'registerTheme: missing theme')
//   warning(!namedThemes[name], `Theme ${name} already registered`)
//   namedThemes[name] = theme
// }

// export interface ThemeProviderProps<R extends TSheeter.Shape = TSheeter.Shape> {
//   registeredThemeName?: string
//   theme?: TSheeter.getTheme<R>
// }

export const defaultThemeName = '*default-theme*'

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
    mergeSheets([value, _defaultClasses])
  }

  cache[componentId] = value

  return value
}
