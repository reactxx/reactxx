import React from 'react';
import warning from 'warning';
import { TTheme, TAtomize, TSheeter, TWithStyles } from 'reactxx-typings'
import { mergeSheet, globalOptions, atomizeRuleset, atomizeSheet, atomizeStyle } from 'reactxx-sheeter'

export const initPipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  return () => {
    applyTheme(pipeId, pipelineState)
    return next()
  }
}


export const applyTheme = (pipeId: number, pipelineState: TWithStyles.PipelineState) => {
  warning(pipeId > 0, 'pipe-first.pipeId must be greater that zero')

  const { props: { classes, classNameX, styleX, themedProps, ...propsRest }, theme, sheetOrCreator, defaultProps, componentId } = pipelineState

  if (defaultProps) {
    const { classNameX, styleX, themedProps, classes, ...defaultPropsRest } = defaultProps
    pipelineState.pipeStates[0] = {
      codeProps: [defaultPropsRest, themedProps ? themedProps(theme) : null],
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, classes),
      classNameX: atomizeRuleset(classNameX, theme),
      styleX: atomizeStyle(styleX, theme),
    }
  } else {
    pipelineState.pipeStates[0] = {
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, null),
    }
  }

  pipelineState.pipeStates[pipeId] = {
    codeProps: [propsRest, themedProps ? themedProps(theme) : null],
    classes: atomizeSheet(classes, theme),
    classNameX: atomizeRuleset(classNameX, theme),
    styleX: atomizeStyle(styleX, theme),
  }

  //pipelineState.sheet = sheetFromThemeCache(pipelineState, defaultClasses)
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

const sheetFromThemeCache = (
  componentId: number, sheetOrCreator: TSheeter.SheetOrCreator, theme: TTheme.Theme, defaultClasses: TSheeter.PartialSheetOrCreator
) => {
  const cache = theme ? theme.$cache ? theme.$cache : (theme.$cache = {}) : $cache

  let value: TAtomize.Sheet = cache[componentId]
  if (value) return value

  value = atomizeSheet(sheetOrCreator, theme)
  if (defaultClasses) {
    const _defaultClasses = atomizeSheet(defaultClasses, theme)
    mergeSheet(value, _defaultClasses, true)
  }

  cache[componentId] = value

  return value

}

const $cache: { [componentId: number]: TSheeter.Sheet } = {}
