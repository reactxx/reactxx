import React from 'react';
import warning from 'warning';
import { TComponents, TSheeter, TWithStyles } from '../d-index';
import { globalOptions, globalOptionsInit } from './global-options'
import { adjustRulesetCompiled, adjustSheetCompiled } from '../sheeter/to-linear-atomized';

export namespace TTheme {
  export interface Theme {
    $cache?: { [componentId: number]: TSheeter.Sheet }
  }

  export interface ThemeProviderProps<T extends {} = Theme> {
    registeredThemeName?: string
    theme?: T
  }

  export type GetDefaultTheme = () => Theme
}

export const themePipeInit = (options: TWithStyles.GlobalOptions = null) => {
  globalOptionsInit({
    namedThemes: {},
    ...options
  })
  if (globalOptions.getDefaultTheme)
    globalOptions.namedThemes[defaultThemeName] = globalOptions.getDefaultTheme()
}

export const firstPipe: TWithStyles.Pipe = (pipeId, context, next) => {
  const render = (themePar: TTheme.Theme) => {
    applyTheme(pipeId, themePar, context)
    return next()
  }
  const res = () => {
    // UNDO
    delete context.sheet
    // init
    context.sheetQuery = {}
    context.pipeData = []
    context.pipeData[pipeId] = { codeProps: { ...context.props } as TComponents.PropsCode }
    // no theme
    if (!context.withTheme) {
      applyTheme(pipeId, null, context)
      return next()
    }
    // theme => listen to theme change
    return <reactContext.Consumer>{render}</reactContext.Consumer>
  }
  return res
}

const applyTheme = (pipeId: number, theme: TTheme.Theme, context: TWithStyles.PipelineContext) => {
  context.theme = theme || globalOptions.namedThemes[defaultThemeName]
  const { props: {classes, classNameX, styleX}, pipeData } = context
  const data = pipeData[pipeId]
  data.classes = adjustSheetCompiled(createWithTheme(classes, context.theme))
  data.classNameX = adjustRulesetCompiled(createWithTheme(classNameX, context.theme))
  data.styleX = createWithTheme(styleX, context.theme)
  context.sheet = createSheetWithTheme(context.theme, context)
}

const createSheetWithTheme = (theme: TTheme.Theme, context: TWithStyles.PipelineContext) => {
  if (typeof context.sheetOrCreator === 'function') {
    warning(theme, 'Theme expected (ThemeProvider or getDefaultTheme missing)')
    let value = theme.$cache && theme.$cache[context.componentId]
    if (value) return value
    value = context.sheetOrCreator(theme)
    if (!theme.$cache) theme.$cache = {}
    theme.$cache[context.componentId] = value
    return value
  } else
    return context.sheetOrCreator
}


const createWithTheme = <T extends {}>(valueOrCreator: T | ((theme: TTheme.Theme) => T), theme: TTheme.Theme) => {
  if (typeof valueOrCreator === 'function') {
    warning(theme, 'Theme expected (ThemeProvider or getDefaultTheme missing)')
    // call creator with theme:
    const value = valueOrCreator(theme)
    // return value
    return value
  } else
    // return value
    return valueOrCreator
}

const defaultThemeName = '*default-theme*'

const reactContext = React.createContext<TTheme.Theme>(null)

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
    return actTheme ? <reactContext.Provider value={actTheme}>{children}</reactContext.Provider> : children
  }

}