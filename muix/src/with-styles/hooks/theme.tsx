import React, { useContext } from 'react';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-sheeter';
import { TAtomize, TSheeter } from 'reactxx-typings';
import warning from 'warning';
//import { ThemeProviderProps } from 'react-fela';

const themeContext = React.createContext<{}>(null)

export const useTheme = () => useContext(themeContext)

export const registerTheme = (name: string, theme) => {
  if (!name) name = defaultThemeName
  const { _withStyles: { namedThemes } } = platform
  warning(theme, 'registerTheme: missing theme')
  warning(!namedThemes[name], `Theme ${name} already registered`)
  namedThemes[name] = theme
}

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export const ThemeProviderGeneric: React.SFC<ThemeProviderProps> & TAtomize.IsReactXXComponent = props => {
  const { children, theme, registeredThemeName } = props
  const actTheme = registeredThemeName ? platform._withStyles.namedThemes[registeredThemeName] : theme
  warning(actTheme, 'ThemeProvider: missing theme')
  return <themeContext.Provider value={actTheme}>{children}</themeContext.Provider>
}
ThemeProviderGeneric.$c$ = true

export interface ThemeProviderProps<R extends TSheeter.Shape = TSheeter.Shape> {
  registeredThemeName?: string
  theme?: TSheeter.getTheme<R>
}

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
