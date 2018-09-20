import React from 'react';
import warning from 'warning';
import { TAtomize, TComponents, TSheeter, TWithStyles } from '../d-index';
import { globalOptions } from './global-state'
import { adjustRulesetCompiled, adjustSheetCompiled } from '../sheeter/atomize';
import { createWithTheme } from '../utils/createWithTheme';

export namespace TTheme {
  export interface Theme {
    $cache?: { [componentId: number]: TSheeter.Sheet }
  }

  export interface ThemeProviderProps<T extends {} = Theme> {
    registeredThemeName?: string
    theme?: T
  }

}

export const firstPipe: TWithStyles.Pipe = (pipeId, state, next) => {
  const render = (theme: TTheme.Theme) => {
    applyTheme(pipeId, theme || globalOptions.namedThemes[defaultThemeName], state)
    return next()
  }
  return () => {
    // UNDO
    delete state.sheet
    // init
    state.sheetQuery = {}
    state.pipeStates = []
    state.pipeStates[pipeId] = { codeProps: { ...state.props } as TComponents.PropsCode }
    if (!state.withTheme) {
      // no theme
      applyTheme(pipeId, null, state)
      return next()
    } else
      // theme => listen to theme change
      return <themeContext.Consumer>{render}</themeContext.Consumer>
  }
}

const applyTheme = (pipeId: number, theme: TTheme.Theme, state: TWithStyles.InstanceState) => {
  state.theme = theme
  const { props: { classes, classNameX, styleX }, pipeStates } = state
  const data = pipeStates[pipeId]
  data.classes = adjustSheetCompiled(classes, theme)
  data.classNameX = adjustRulesetCompiled(classNameX, theme)
  data.styleX = createWithTheme(styleX, theme)
  state.sheet = createSheetWithTheme(state)
}

const mergeSheets = (sheet: TAtomize.Sheet, classes: TAtomize.Sheet, inPlace?: boolean) => {
  if (!classes) return sheet
  if (!inPlace) sheet = { ...sheet }
  for (const p in classes) {
    const c = classes[p], ca = Array.isArray(c), s = sheet[p], sa = Array.isArray(s)
    warning(c && p, 'Something wrong here')
    sheet[p] = !sa && !ca ? [s, c] : !sa ? [s, ...c] : !ca ? [...s, c] : [...s, ...c]
  }
}

const createSheetWithTheme = (state: TWithStyles.InstanceState) => {
  const { componentId, defaultProps, sheetOrCreator } = state
  const theme = state.theme as TTheme.Theme

  let value: TAtomize.Sheet = theme.$cache && theme.$cache[componentId]
  if (value) return value

  value = adjustSheetCompiled(sheetOrCreator, theme)
  if (defaultProps && defaultProps.classes) {
    const defaultClasses = adjustSheetCompiled(defaultProps.classes, theme)
    mergeSheets(value, defaultClasses, true)
  }

  if (!theme.$cache) theme.$cache = {}
  theme.$cache[componentId] = value

  return value

}


export const defaultThemeName = '*default-theme*'

const themeContext = React.createContext<TTheme.Theme>(null)

export const registerTheme = (name: string, theme: TTheme.Theme) => {
  warning(!globalOptions.namedThemes[name], `Theme ${name} already registered`)
  if (!theme.$cache) theme.$cache = {}
  globalOptions.namedThemes[name] = theme
}

export class ThemeProvider extends React.Component<TTheme.ThemeProviderProps> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme = registeredThemeName ? globalOptions.namedThemes[registeredThemeName] : theme
    warning(actTheme, 'ThemeProvider: missing theme')
    return <themeContext.Provider value={actTheme}>{children}</themeContext.Provider>
  }

}