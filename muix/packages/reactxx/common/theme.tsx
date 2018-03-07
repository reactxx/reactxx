import React from 'react'
import warning from 'warning'

import { createContext, ModifierType } from 'reactxx-appstate'

import { toPlatformSheet } from './index'
import { themePars } from './withStyles'

export { ConsumerType } from 'reactxx-appstate'

const { Provider, Modifier, Consumer } = createContext<ReactXX.ThemeState>(() => ({ theme: { type: 'ThemeX' } }))

export const ThemeProvider = Provider
export const AppContainer = Provider
export const ThemeModifier = Modifier as ModifierType<ReactXX.ThemeState, ReactXX.ThemeCompSelectedX>
export const ThemeConsumer = Consumer

//export const addOverrides = <T extends {}>(Component: React.ComponentType<T>, overrides: ReactXX.ThemeStateX2) => {
//  return ((props: T) => <ThemeModifier modify={state => ({ ...state, overrides: { ...state.overrides, ...expandOverrides(state.theme, overrides) } })}>
//    <Component {...props} />
//  </ThemeModifier>) as React.ComponentType<T>
//}

//Get platform component sheet (from creator and theme)
export const expandOverrides = (themeState: ReactXX.ThemeState) => {
  if (!themeState) return null
  const theme = themeState.theme
  const res = { theme }
  for (const componentName in themeState) {
    if (componentName == ReactXX.Consts.themeXPropName) continue
    const themeComp: ReactXX.ThemeCompX = themeState[componentName]; if (!themeComp) return res
    const { override, themePar } = themeComp
    //TODO THEME
    //res[componentName] = typeof override != 'function' ? override : override(theme, themePar)
  }
  return res
}

export const themeCompModifier = <Shape1 extends ReactXX.Shape, Shape2 extends ReactXX.Shape = never, Shape3 extends ReactXX.Shape = never>(name1: ReactXX.getNameType<Shape1>, comp1: ReactXX.ThemeCompCreatorX<Shape1>, name2?: ReactXX.getNameType<Shape2>, comp2?: ReactXX.ThemeCompCreatorX<Shape2>, name3?: ReactXX.getNameType<Shape3>, comp3?: ReactXX.ThemeCompCreatorX<Shape3>) => (themeState: ReactXX.ThemeState) => {
  const theme = themeState.theme
  const res: ReactXX.ThemeState = { ...themeState, [name1]: themeCompCreate(theme, comp1) }
  if (name2) res[name2 as string] = themeCompCreate(theme, comp2)
  if (name3) res[name3 as string] = themeCompCreate(theme, comp3)
  return res
}
export const themeParModifier = <Shape1 extends ReactXX.Shape, Shape2 extends ReactXX.Shape = never, Shape3 extends ReactXX.Shape = never>(name1: ReactXX.getNameType<Shape1>, comp1: ReactXX.ThemeParCreatorX<Shape1>, name2?: ReactXX.getNameType<Shape2>, comp2?: ReactXX.ThemeParCreatorX<Shape2>, name3?: ReactXX.getNameType<Shape3>, comp3?: ReactXX.ThemeParCreatorX<Shape3>) => (themeState: ReactXX.ThemeState) => {
  const theme = themeState.theme
  const res: ReactXX.ThemeState = { ...themeState, [name1]: { ...themeState[name1 as string], par: themeParCreate(theme, comp1) } }
  if (name2) res[name2 as string] = { ...themeState[name2 as string], par: themeParCreate(theme, comp2) }
  if (name3) res[name3 as string] = { ...themeState[name3 as string], par: themeParCreate(theme, comp3) }
  return res
}
export const themeOverrideModifier = <Shape1 extends ReactXX.Shape, Shape2 extends ReactXX.Shape = never, Shape3 extends ReactXX.Shape = never>(name1: ReactXX.getNameType<Shape1>, comp1: ReactXX.PartialSheetCreatorX<Shape1>, name2?: ReactXX.getNameType<Shape2>, comp2?: ReactXX.PartialSheetCreatorX<Shape2>, name3?: ReactXX.getNameType<Shape3>, comp3?: ReactXX.PartialSheetCreatorX<Shape3>) => (themeState: ReactXX.ThemeState) => {
  const theme = themeState.theme

  const c1 = themeState[name1 as string] as ReactXX.ThemeCompX<Shape1>
  const res: ReactXX.ThemeState = { ...themeState, [name1]: { ...c1, override: themeOverrideCreate(theme, c1 && c1.themePar, comp1) } }

  if (name2) {
    const c2 = themeState[name2 as string] as ReactXX.ThemeCompX<Shape2>
    res[name2 as string] = { ...c2, override: themeOverrideCreate(theme, c2 && c2.themePar, comp2) }
  }

  if (name3) {
    const c3 = themeState[name3 as string] as ReactXX.ThemeCompX<Shape3>
    res[name3 as string] = { ...c3, override: themeOverrideCreate(theme, c3 && c3.themePar, comp3) }
  }

  return res
}

export const themeParCreate = <R extends ReactXX.Shape>(theme: ReactXX.ThemeX, par: ReactXX.ThemeParCreatorX<R>) => typeof par === 'function' ? par(theme) : par
export const themeOverrideCreate = <R extends ReactXX.Shape>(theme: ReactXX.ThemeX, themePar: ReactXX.getThemePar<R>, sheet: ReactXX.PartialSheetCreatorX<R>) => typeof sheet === 'function' ? sheet(theme, themePar) : sheet
export const themeCompCreate = <R extends ReactXX.Shape>(theme: ReactXX.ThemeX, comp: ReactXX.ThemeCompCreatorX<R>) => { const themePar = themeParCreate(theme, comp.par); return { themePar, override: themeOverrideCreate(theme, themePar, comp.override) } as ReactXX.ThemeCompX<R> }

