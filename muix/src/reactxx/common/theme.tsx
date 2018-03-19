import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { createContext, ModifierType, ConsumerType, ProviderProps, ConsumerProps, ModifierProps } from 'reactxx-stateman'

import { toPlatformSheet } from './index'
import { defaultCompThemePars } from './withStyles'
import { ThemeT, SheetsT } from 'reactxx-typings'

const { Provider, Modifier, Consumer } = createContext<ThemeT.ThemeState>(() => ({ theme: { type: 'ThemeX' } }))

export const ThemeProvider = Provider
export const AppContainer = Provider
export const ThemeModifier = Modifier as ModifierType<ThemeT.ThemeState, ThemeT.ThemeCompSelectedX>
export const ThemeConsumer = Consumer

export const compThemeModifier = <Shape1 extends SheetsT.Shape, Shape2 extends SheetsT.Shape = never, Shape3 extends SheetsT.Shape = never>(name1: SheetsT.getNameType<Shape1>, comp1: ThemeT.ThemeCompCreatorX<Shape1>, name2?: SheetsT.getNameType<Shape2>, comp2?: ThemeT.ThemeCompCreatorX<Shape2>, name3?: SheetsT.getNameType<Shape3>, comp3?: ThemeT.ThemeCompCreatorX<Shape3>) => (themeState: ThemeT.ThemeState) => {
  const theme = themeState.theme
  const res: ThemeT.ThemeState = { ...themeState, [name1]: compThemeCreate(theme, comp1) }
  if (name2) res[name2 as string] = compThemeCreate(theme, comp2)
  if (name3) res[name3 as string] = compThemeCreate(theme, comp3)
  return res
}
export const compThemeParModifier = <Shape1 extends SheetsT.Shape, Shape2 extends SheetsT.Shape = never, Shape3 extends SheetsT.Shape = never>(name1: SheetsT.getNameType<Shape1>, comp1: ThemeT.ThemeParCreatorX<Shape1>, name2?: SheetsT.getNameType<Shape2>, comp2?: ThemeT.ThemeParCreatorX<Shape2>, name3?: SheetsT.getNameType<Shape3>, comp3?: ThemeT.ThemeParCreatorX<Shape3>) => (themeState: ThemeT.ThemeState) => {
  const theme = themeState.theme
  const res: ThemeT.ThemeState = { ...themeState, [name1]: { ...themeState[name1 as string], par: compThemeParCreate(theme, comp1) } }
  if (name2) res[name2 as string] = { ...themeState[name2 as string], par: compThemeParCreate(theme, comp2) }
  if (name3) res[name3 as string] = { ...themeState[name3 as string], par: compThemeParCreate(theme, comp3) }
  return res
}
export const compThemeSheetModifier = <Shape1 extends SheetsT.Shape, Shape2 extends SheetsT.Shape = never, Shape3 extends SheetsT.Shape = never>(name1: SheetsT.getNameType<Shape1>, comp1: ThemeT.PartialSheetCreatorX<Shape1>, name2?: SheetsT.getNameType<Shape2>, comp2?: ThemeT.PartialSheetCreatorX<Shape2>, name3?: SheetsT.getNameType<Shape3>, comp3?: ThemeT.PartialSheetCreatorX<Shape3>) => (themeState: ThemeT.ThemeState) => {
  const theme = themeState.theme

  const c1 = themeState[name1 as string] as ThemeT.ThemeCompX<Shape1>
  const res: ThemeT.ThemeState = { ...themeState, [name1]: { ...c1, sheet: compThemeSheetCreate(theme, c1 && c1.par, comp1) } }

  if (name2) {
    const c2 = themeState[name2 as string] as ThemeT.ThemeCompX<Shape2>
    res[name2 as string] = { ...c2, sheet: compThemeSheetCreate(theme, c2 && c2.par, comp2) }
  }

  if (name3) {
    const c3 = themeState[name3 as string] as ThemeT.ThemeCompX<Shape3>
    res[name3 as string] = { ...c3, sheet: compThemeSheetCreate(theme, c3 && c3.par, comp3) }
  }

  return res
}

export const compThemeParCreate = <R extends SheetsT.Shape>(theme: ThemeT.ThemeX, par: ThemeT.ThemeParCreatorX<R>) => typeof par === 'function' ? par(theme) : par
export const compThemeSheetCreate = <R extends SheetsT.Shape>(theme: ThemeT.ThemeX, compThemePar: SheetsT.getCompTheme<R>, sheet: ThemeT.PartialSheetCreatorX<R>) => typeof sheet === 'function' ? sheet(theme, compThemePar) : sheet
export const compThemeCreate = <R extends SheetsT.Shape>(theme: ThemeT.ThemeX, comp: ThemeT.ThemeCompCreatorX<R>) => { const par = compThemeParCreate(theme, comp.par); return { par, sheet: compThemeSheetCreate(theme, par, comp.sheet) } as ThemeT.ThemeCompX<R> }

