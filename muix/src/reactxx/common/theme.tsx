import * as React from 'react'
import * as ReactN from 'react-native'
import warning from 'warning'

import { createContext, ModifierType, ConsumerType, ProviderProps, ConsumerProps, ModifierProps } from 'reactxx-stateman'

import { toPlatformSheet } from './index'
import { defaultCompThemePars } from './withStyles'

const { Provider, Modifier, Consumer } = createContext<ReactXX.ThemeState>(() => ({ theme: { type: 'ThemeX' } }))

export const ThemeProvider = Provider
export const AppContainer = Provider
export const ThemeModifier = Modifier as ModifierType<ReactXX.ThemeState, ReactXX.ThemeCompSelectedX>
export const ThemeConsumer = Consumer

export const compThemeModifier = <Shape1 extends ReactXX.Shape, Shape2 extends ReactXX.Shape = never, Shape3 extends ReactXX.Shape = never>(name1: ReactXX.getNameType<Shape1>, comp1: ReactXX.ThemeCompCreatorX<Shape1>, name2?: ReactXX.getNameType<Shape2>, comp2?: ReactXX.ThemeCompCreatorX<Shape2>, name3?: ReactXX.getNameType<Shape3>, comp3?: ReactXX.ThemeCompCreatorX<Shape3>) => (themeState: ReactXX.ThemeState) => {
  const theme = themeState.theme
  const res: ReactXX.ThemeState = { ...themeState, [name1]: compThemeCreate(theme, comp1) }
  if (name2) res[name2 as string] = compThemeCreate(theme, comp2)
  if (name3) res[name3 as string] = compThemeCreate(theme, comp3)
  return res
}
export const compThemeParModifier = <Shape1 extends ReactXX.Shape, Shape2 extends ReactXX.Shape = never, Shape3 extends ReactXX.Shape = never>(name1: ReactXX.getNameType<Shape1>, comp1: ReactXX.ThemeParCreatorX<Shape1>, name2?: ReactXX.getNameType<Shape2>, comp2?: ReactXX.ThemeParCreatorX<Shape2>, name3?: ReactXX.getNameType<Shape3>, comp3?: ReactXX.ThemeParCreatorX<Shape3>) => (themeState: ReactXX.ThemeState) => {
  const theme = themeState.theme
  const res: ReactXX.ThemeState = { ...themeState, [name1]: { ...themeState[name1 as string], par: compThemeParCreate(theme, comp1) } }
  if (name2) res[name2 as string] = { ...themeState[name2 as string], par: compThemeParCreate(theme, comp2) }
  if (name3) res[name3 as string] = { ...themeState[name3 as string], par: compThemeParCreate(theme, comp3) }
  return res
}
export const compThemeSheetModifier = <Shape1 extends ReactXX.Shape, Shape2 extends ReactXX.Shape = never, Shape3 extends ReactXX.Shape = never>(name1: ReactXX.getNameType<Shape1>, comp1: ReactXX.PartialSheetCreatorX<Shape1>, name2?: ReactXX.getNameType<Shape2>, comp2?: ReactXX.PartialSheetCreatorX<Shape2>, name3?: ReactXX.getNameType<Shape3>, comp3?: ReactXX.PartialSheetCreatorX<Shape3>) => (themeState: ReactXX.ThemeState) => {
  const theme = themeState.theme

  const c1 = themeState[name1 as string] as ReactXX.ThemeCompX<Shape1>
  const res: ReactXX.ThemeState = { ...themeState, [name1]: { ...c1, sheet: compThemeSheetCreate(theme, c1 && c1.par, comp1) } }

  if (name2) {
    const c2 = themeState[name2 as string] as ReactXX.ThemeCompX<Shape2>
    res[name2 as string] = { ...c2, sheet: compThemeSheetCreate(theme, c2 && c2.par, comp2) }
  }

  if (name3) {
    const c3 = themeState[name3 as string] as ReactXX.ThemeCompX<Shape3>
    res[name3 as string] = { ...c3, sheet: compThemeSheetCreate(theme, c3 && c3.par, comp3) }
  }

  return res
}

export const compThemeParCreate = <R extends ReactXX.Shape>(theme: ReactXX.ThemeX, par: ReactXX.ThemeParCreatorX<R>) => typeof par === 'function' ? par(theme) : par
export const compThemeSheetCreate = <R extends ReactXX.Shape>(theme: ReactXX.ThemeX, compThemePar: ReactXX.getCompTheme<R>, sheet: ReactXX.PartialSheetCreatorX<R>) => typeof sheet === 'function' ? sheet(theme, compThemePar) : sheet
export const compThemeCreate = <R extends ReactXX.Shape>(theme: ReactXX.ThemeX, comp: ReactXX.ThemeCompCreatorX<R>) => { const par = compThemeParCreate(theme, comp.par); return { par, sheet: compThemeSheetCreate(theme, par, comp.sheet) } as ReactXX.ThemeCompX<R> }

