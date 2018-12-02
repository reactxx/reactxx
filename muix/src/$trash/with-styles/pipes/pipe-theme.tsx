import React from 'react';
import { atomizeSheet, platform, mergeSheets } from 'reactxx-sheeter';
import { TAtomize, TWithStyles } from 'reactxx-typings';
import warning from 'warning';

export const themePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  const render = theme => {
    pipelineState.theme = theme || platform._withStyles.namedThemes[defaultThemeName]
    return next()
  }
  return () => pipelineState.options.withTheme
    ? <themeContext.Consumer>{render}</themeContext.Consumer>
    : next()
}

export const registerTheme = (name: string, theme) => {
  if (!name) name = defaultThemeName
  const {_withStyles: {namedThemes}} = platform
  warning(!namedThemes[name], `Theme ${name} already registered`)
  namedThemes[name] = theme
}

const themeContext = React.createContext<{}>(null)

// https://github.com/Microsoft/TypeScript/issues/3960#issuecomment-144529141
export class ThemeProviderGeneric<R extends TTyped.Shape> extends React.Component<ThemeProviderProps<R>> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme = registeredThemeName ? platform._withStyles.namedThemes[registeredThemeName] : theme
    warning(actTheme, 'ThemeProvider: missing theme')
    return <themeContext.Provider value={actTheme}>{children}</themeContext.Provider>
  }
} 
(ThemeProviderGeneric as TAtomize.IsReactXXComponent).$c$ = true
export interface ThemeProviderProps<R extends TTyped.Shape> {
  registeredThemeName?: string
  theme?: TSheeter.getTheme<R>
}


export const defaultThemeName = '*default-theme*'

export const sheetFromThemeCache = (
  componentId: number, sheetOrCreator: TTyped.SheetOrCreator, 
  theme, defaultClasses: TTyped.PartialSheetOrCreator,
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
