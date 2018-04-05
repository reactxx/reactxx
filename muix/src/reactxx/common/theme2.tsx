import React, { createContext } from 'react'
import ReactN from 'react-native'
import { TBasic, toPlatformSheet, toPlatformRuleSet, deepMerges } from 'reactxx-basic'

import { TTheme } from '../typings/theme'
import { TSheets } from '../typings/sheets'

import warning from 'warning'

//************ TYPINGS

// Component part of 
export interface ThemeCompX<R extends TSheets.Shape = TSheets.Shape> { sheet?: TBasic.PartialSheetX<R>, par?: TSheets.getCompTheme<R>, cachedStaticSheet?: TBasic.Sheet }

export type ThemeWithCompsX = { theme: TTheme.ThemeX } & { [P in keyof TSheets.Shapes]?: ThemeCompX<TSheets.Shapes[P]> }

export interface ThemeWithCompX {
  theme: TTheme.ThemeX // theme from ThemeProvider
  themeComp?: ThemeCompX // themeComp from ThemeProvider
}

export type HOCProps = TBasic.PropsX & ThemeWithCompX

export interface HOCState {
  classes: TBasic.Sheet
  className: TBasic.Ruleset
  style: TBasic.Ruleset
  // following props can check cachedStaticSheet validity in withTheme HOC
  actTheme: TTheme.ThemeX // actual theme
  actThemeComp?: ThemeCompX // actual themeComp
}

export interface ComponentTypeWithModifierProps<R extends TSheets.Shape> {
  sheet?: TBasic.PartialSheetX<R>
  par?: TSheets.getCompTheme<R>
}

export interface ComponentTypeWithModifier<R extends TSheets.Shape> extends React.SFC<TBasic.PropsX<R>> {
  Modifier: React.SFC<ComponentTypeWithModifierProps<R>>
}

//************ CODE

const { Provider, Consumer } = createContext<ThemeWithCompsX>({ theme: { type: 'ThemeX' } })

// withTheme HOC, used in withStyles HOC
const withTheme = <R extends TSheets.Shape>(name: string, Component: React.ComponentClass<HOCProps>, createSheetX: TTheme.SheetCreatorX<R>, compThemePar?: TSheets.getCompTheme<R>) => {

  defaultCompThemePars[name] = compThemePar

  const res = (outerProps => <Consumer>
    {(themeProps) => {
      const themeComp: TTheme.ThemeCompX = themeProps[name] || {}
      const themeAddIn: ThemeWithCompX = { theme: themeProps.theme, themeComp }
      return <Component {...outerProps} {...themeAddIn} />
    }}
  </Consumer>
  ) as ComponentTypeWithModifier<R>
  res.Modifier = compThemeModifier<R>(name)

  return res
}

// compute classes, clasName and style (platform dependent and themed)
const applyTheme = (name: string, createSheetX: TTheme.SheetCreatorX, nextProps: HOCProps, prevState: HOCState) => {

  let themedStaticSheet: TBasic.Sheet

  const { theme, themeComp, themeComp: { par = defaultCompThemePars[name], sheet }, classes, className, style } = nextProps

  // cachedStaticSheet validity test:
  if (prevState.actTheme === theme && prevState.actThemeComp === themeComp) themedStaticSheet = themeComp.cachedStaticSheet
  else {

    //*** get platform dependent sheet (from creator, actual theme and actual themeCompPar)
    const staticSheet = toPlatformSheet(callCreator(theme, par, createSheetX))

    themedStaticSheet = themeComp.cachedStaticSheet = sheet ? deepMerges(false, {}, staticSheet, sheet) : staticSheet
  }

  const actSheet: TBasic.Sheet = classes ? deepMerges(false, {}, themedStaticSheet, toPlatformSheet(callCreator(theme, par, classes))) : themedStaticSheet
  for (const p in actSheet) if (!p.startsWith('$')) actSheet[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

  const nextState: HOCState = {
    classes: actSheet,
    className: toPlatformRuleSet(callCreator(theme, par, className)),
    style: toPlatformRuleSet(callCreator(theme, par, style)),
    // save actual theme and themeComp to state: 
    actTheme: theme,
    actThemeComp: themeComp,
  }

  return nextState
}

// comp theme modifier
const compThemeModifier: <R extends TSheets.Shape>(name: string) => React.SFC<ComponentTypeWithModifierProps<R>> = name => ({ sheet, par, children }) => <Consumer>
  {themeProps => {
    const newTheme: ThemeWithCompsX = { theme: themeProps.theme }
    // clone ThemeCompX's (without 
    for (const p in themeProps) if (p != 'theme' && p != name) {
      const { sheet, par } = themeProps[p] as ThemeCompX
      newTheme[p] = { sheet, par }
    }
    const old: ThemeCompX = themeProps[name] || {}
    newTheme[name] = { sheet: sheet || old.sheet, par: par || old.par } as ThemeCompX
    return <Provider value={newTheme}>{children}</Provider>
  }}
</Consumer>

// theme modifier
const themeModifier: React.SFC<{ theme: TTheme.ThemeX | ((theme: TTheme.ThemeX) => TTheme.ThemeX) }> = ({ theme, children }) => <Consumer>
  {themeProps => {
    theme = typeof theme === 'function' ? theme(themeProps.theme) : theme
    const newTheme: ThemeWithCompsX = { theme }
    // clone ThemeCompX's, without cachedStaticSheet
    for (const p in themeProps) if (p != 'theme') {
      const { sheet, par } = themeProps[p] as ThemeCompX
      newTheme[p] = { sheet, par }
    }
    return <Provider value={newTheme}>{children}</Provider>
  }}
</Consumer>

//default compThemePars from "withStyles" component definition
const defaultCompThemePars: { [Name in keyof TSheets.Shapes]?: TSheets.getCompTheme<TSheets.Shapes[Name]> } = {}

function callCreator<T>(theme: TTheme.ThemeX, compThemePar, creator: T | ((theme: TTheme.ThemeX, compThemePar) => T)) {
  return typeof creator === 'function' ? creator(theme, compThemePar) : creator
}

//************ EXPORT

export const Themer = { withTheme, applyTheme, Modifier: themeModifier }
