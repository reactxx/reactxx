import React from 'react';
import warning from 'warning';
import { TTheme, TAtomize, TSheeter, TWithStyles } from '../d-index';
import { globalOptions } from './global-state'
import { atomizeRuleset, atomizeSheet } from '../sheeter/atomize';
import { mergeSheet } from 'reactxx-core/sheeter/merge';
import { createWithTheme } from '../utils/create-with-theme';

export const applyTheme = (pipeId: number, theme: TTheme.Theme, state: TWithStyles.InstanceState) => {
  warning(pipeId > 0, 'pipe-first.pipeId must be greater that zero')

  const { props: { classes, classNameX, styleX, ...propsRest }, defaultProps } = state

  state.pipeStates = []
  state.sheetQuery = {}
  state.theme = theme

  if (defaultProps) {
    const { classNameX: defaultClassNameX, styleX: defaultStyleX, ...defaultPropsRest } = defaultProps
    // defaultProps.classes is merged with cached sheet in createSheetWithTheme
    state.pipeStates[0] = {
      codeProps: defaultPropsRest,
      classNameX: atomizeRuleset(defaultClassNameX, theme),
      styleX: createWithTheme(defaultStyleX, theme),
    }
  }

  state.pipeStates[pipeId] = {
    codeProps: propsRest,
    classes: atomizeSheet(classes, theme),
    classNameX: atomizeRuleset(classNameX, theme),
    styleX: createWithTheme(styleX, theme),
  }

  state.sheet = createSheetWithTheme(state)
}

export const registerTheme = (name: string, theme: TTheme.Theme) => {
  warning(!globalOptions.namedThemes[name], `Theme ${name} already registered`)
  if (!theme.$cache) theme.$cache = {}
  globalOptions.namedThemes[name] = theme
}

const themeContext = React.createContext<TTheme.Theme>(null)

export const ThemeContextConsumer = themeContext.Consumer

export class ThemeProvider extends React.Component<TTheme.ThemeProviderProps> {

  render() {
    const { children, theme, registeredThemeName } = this.props
    const actTheme = registeredThemeName ? globalOptions.namedThemes[registeredThemeName] : theme
    warning(actTheme, 'ThemeProvider: missing theme')
    return <themeContext.Provider value={actTheme}>{children}</themeContext.Provider>
  }

}

export const defaultThemeName = '*default-theme*'

//*********************************************************
//  PRIVATE
//*********************************************************

const createSheetWithTheme = (state: TWithStyles.InstanceState) => {
  const { componentId, defaultProps, sheetOrCreator } = state
  const theme = state.theme as TTheme.Theme

  let value: TAtomize.Sheet = theme.$cache && theme.$cache[componentId]
  if (value) return value

  value = atomizeSheet(sheetOrCreator, theme)
  if (defaultProps && defaultProps.classes) {
    const defaultClasses = atomizeSheet(defaultProps.classes, theme)
    mergeSheet(value, defaultClasses, true)
  }

  if (!theme.$cache) theme.$cache = {}
  theme.$cache[componentId] = value

  return value

}
