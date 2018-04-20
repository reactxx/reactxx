import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import { Properties } from 'csstype'

import { createContext, ModifierType, ConsumerType, ProviderProps, ConsumerProps, ModifierProps } from 'reactxx-stateman'
import { TCommonStyles } from 'reactxx-basic'
import { TAddInConfig, TTheme, TBasic } from 'reactxx'

const { Provider, Modifier, Consumer } = createContext<TTheme.ThemeState>(() => ({ theme: { type: 'ThemeX' } }))

export const ThemeProvider = Provider
export const AppContainer = Provider
export const ThemeModifier = Modifier as ModifierType<TTheme.ThemeState, TTheme.ThemeCompSelectedX>
export const ThemeConsumer = Consumer

export const compThemeModifier = <Shape1 extends TBasic.Shape, Shape2 extends TBasic.Shape = never, Shape3 extends TBasic.Shape = never>(name1: TBasic.getNameType<Shape1>, comp1: TTheme.ThemeCompCreatorX<Shape1>, name2?: TBasic.getNameType<Shape2>, comp2?: TTheme.ThemeCompCreatorX<Shape2>, name3?: TBasic.getNameType<Shape3>, comp3?: TTheme.ThemeCompCreatorX<Shape3>) => (themeState: TTheme.ThemeState) => {
  const theme = themeState.theme
  const res: TTheme.ThemeState = { ...themeState, [name1]: compThemeCreate(theme, comp1) }
  if (name2) res[name2 as string] = compThemeCreate(theme, comp2)
  if (name3) res[name3 as string] = compThemeCreate(theme, comp3)
  return res
}
export const compThemeParModifier = <Shape1 extends TBasic.Shape, Shape2 extends TBasic.Shape = never, Shape3 extends TBasic.Shape = never>(name1: TBasic.getNameType<Shape1>, comp1: TTheme.ThemeParCreatorX<Shape1>, name2?: TBasic.getNameType<Shape2>, comp2?: TTheme.ThemeParCreatorX<Shape2>, name3?: TBasic.getNameType<Shape3>, comp3?: TTheme.ThemeParCreatorX<Shape3>) => (themeState: TTheme.ThemeState) => {
  const theme = themeState.theme
  const res: TTheme.ThemeState = { ...themeState, [name1]: { ...themeState[name1 as string], par: compThemeParCreate(theme, comp1) } }
  if (name2) res[name2 as string] = { ...themeState[name2 as string], par: compThemeParCreate(theme, comp2) }
  if (name3) res[name3 as string] = { ...themeState[name3 as string], par: compThemeParCreate(theme, comp3) }
  return res
}
export const compThemeSheetModifier = <Shape1 extends TBasic.Shape, Shape2 extends TBasic.Shape = never, Shape3 extends TBasic.Shape = never>(name1: TBasic.getNameType<Shape1>, comp1: TTheme.PartialSheetCreatorX<Shape1>, name2?: TBasic.getNameType<Shape2>, comp2?: TTheme.PartialSheetCreatorX<Shape2>, name3?: TBasic.getNameType<Shape3>, comp3?: TTheme.PartialSheetCreatorX<Shape3>) => (themeState: TTheme.ThemeState) => {
  const theme = themeState.theme

  const c1 = themeState[name1 as string] as TTheme.ThemeCompX<Shape1>
  const res: TTheme.ThemeState = { ...themeState, [name1]: { ...c1, sheet: compThemeSheetCreate(theme, c1 && c1.par, comp1) } }

  if (name2) {
    const c2 = themeState[name2 as string] as TTheme.ThemeCompX<Shape2>
    res[name2 as string] = { ...c2, sheet: compThemeSheetCreate(theme, c2 && c2.par, comp2) }
  }

  if (name3) {
    const c3 = themeState[name3 as string] as TTheme.ThemeCompX<Shape3>
    res[name3 as string] = { ...c3, sheet: compThemeSheetCreate(theme, c3 && c3.par, comp3) }
  }

  return res
}

export const compThemeParCreate = <R extends TBasic.Shape>(theme: TTheme.ThemeX, par: TTheme.ThemeParCreatorX<R>) => typeof par === 'function' ? par(theme) : par
export const compThemeSheetCreate = <R extends TBasic.Shape>(theme: TTheme.ThemeX, compThemePar: TBasic.getCompTheme<R>, sheet: TTheme.PartialSheetCreatorX<R>) => typeof sheet === 'function' ? sheet(theme, compThemePar) : sheet
export const compThemeCreate = <R extends TBasic.Shape>(theme: TTheme.ThemeX, comp: TTheme.ThemeCompCreatorX<R>) => { const par = compThemeParCreate(theme, comp.par); return { par, sheet: compThemeSheetCreate(theme, par, comp.sheet) } as TTheme.ThemeCompX<R> }

