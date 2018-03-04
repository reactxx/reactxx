import React from 'react'
import warning from 'warning'

import { createContext, ModifierType } from 'reactxx-appstate'

import { toPlatformSheet } from './index'
import { themePars } from './withStyles'

export { ConsumerType } from 'reactxx-appstate'

const { Provider, Modifier, Consumer } = createContext<ReactXX.ThemeStatesX>(() => ({ theme: { themePars } as any, overrides: {} }))

export const ThemeProvider = Provider
export const AppContainer = Provider
export const ThemeModifier = Modifier as ModifierType<ReactXX.ThemeStatesX, ReactXX.ThemeStatesX>
export const ThemeConsumer = Consumer

export const addOverrides = <T extends {}>(Component: React.ComponentType<T>, overrides: ReactXX.OverridesX) => {
  return ((props: T) => <ThemeModifier modify={state => ({ ...state, overrides: { ...state.overrides, ...expandOverrides(state.theme, overrides) } })}>
    <Component {...props}/>
  </ThemeModifier>) as React.ComponentType<T>
}
  
//Get platform component sheet (from creator and theme)
export const toPlatformFromSheetCreator = <R extends ReactXX.Shape>(componentName: string, theme: ReactXX.Theme, createSheetX: ReactXX.CreateSheetX<R>) => {
  //try to get platform specific component sheet from cache (from theme.themePars.componentName.$cache)
  let themePar = theme.themePars[componentName]
  if (!themePar) themePar = theme.themePars[componentName] = {}
  let res = themePar['$cache'] as ReactXX.Sheet<R>
  if (res) return res
  //create sheet
  res = toPlatformSheet(typeof createSheetX === 'function' ? createSheetX(theme, themePar) : createSheetX)
  themePar['$cache'] = res
  return res
}

//Get "component override" from actual "theme app state"
export const modifierSelector = (componentName: string) => (themeStates: ReactXX.ThemeStatesX) => {
  const { theme, overrides } = themeStates
  const res: ReactXX.ThemeStateX = { theme }
  const override = overrides && overrides[componentName]; if (!override) return res
  res.override = typeof override != 'function' ? override : override(theme, theme.themePars[componentName])
  return res
}

export const expandOverrides = (theme: ReactXX.Theme, overrides: ReactXX.OverridesX) => {
  if (!overrides) return null
  const res = {}
  for (const componentName in overrides) {
    const override = overrides[componentName]; if (!override) return res
    res[componentName] = typeof override != 'function' ? override : override(theme, theme.themePars[componentName])
  }
  return res
}
