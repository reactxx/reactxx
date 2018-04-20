import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { deepMerges } from 'reactxx-basic'

import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic } from '../typings/basic'
import { TTheme } from '../typings/theme'

//************ TYPINGS

// Component part of 
export interface ThemeCompX<R extends TBasic.Shape = TBasic.Shape> { sheet?: TBasic.PartialSheetX<R>, par?: TBasic.getCompTheme<R>, cachedStaticSheet?: TBasic.Sheet }

export type ThemeWithCompsX = { theme: TTheme.ThemeX } & { [P in keyof TBasic.Shapes]?: ThemeCompX<TBasic.Shapes[P]> }

export interface ThemeWithCompX {
  theme: TTheme.ThemeX // theme from ThemeProvider
  themeComp?: ThemeCompX // themeComp from ThemeProvider
}

export type HOCProps = TBasic.PropsX & ThemeWithCompX

export interface HOCState<R extends TBasic.Shape = TBasic.Shape> {
  classes?: TBasic.Sheet<R>
  style?: TBasic.Ruleset
  // following props can check cachedStaticSheet validity in withTheme HOC
  actTheme?: TTheme.ThemeX // actual theme
  actThemeComp?: ThemeCompX // actual themeComp
}

export interface ComponentTypeWithModifierProps<R extends TBasic.Shape> {
  sheet?: TBasic.PartialSheetX<R>
  par?: TBasic.getCompTheme<R>
}

export interface ComponentTypeWithModifier<R extends TBasic.Shape> extends React.SFC<TBasic.PropsX<R>> {
  Modifier: React.SFC<ComponentTypeWithModifierProps<R>>
}

//************ CODE

const { Provider, Consumer } = React.createContext<ThemeWithCompsX>({ theme: { type: 'ThemeX' } })

// withTheme HOC, used in withStyles HOC
const withTheme = <R extends TBasic.Shape>(name: string, Component: React.ComponentClass<HOCProps>, createSheetX: TTheme.SheetCreatorX<R>, compThemePar?: TBasic.getCompTheme<R>) => {

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

  let cachedStaticSheet: TBasic.Sheet

  const { theme, themeComp, themeComp: { par = defaultCompThemePars[name], sheet }, classes, className, style } = nextProps

  // cachedStaticSheet validity test:
  if (prevState.actTheme === theme && prevState.actThemeComp === themeComp) cachedStaticSheet = themeComp.cachedStaticSheet
  else { // create new

    //*** get platform dependent sheet (from creator, actual theme and actual themeCompPar)
    const staticSheet = toPlatformSheet(callCreator(theme, par, createSheetX))

    cachedStaticSheet = themeComp.cachedStaticSheet = sheet ? deepMerges(false, {}, staticSheet, sheet) : staticSheet

    warning(cachedStaticSheet.root, `Missing "root" ruleset in "${name}" component sheet`)
  }

  const root = className && { root: toPlatformRuleSet(callCreator(theme, par, className)) }

  const actSheet: TBasic.Sheet = classes || root ? deepMerges(false, {}, cachedStaticSheet, toPlatformSheet(callCreator(theme, par, classes)), root) : cachedStaticSheet
  for (const p in actSheet) if (!p.startsWith('$')) actSheet[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

  const nextState = {
    classes: actSheet,
    style: toPlatformRuleSet(callCreator(theme, par, style)),
    // save actual themeComps to state:
    actTheme: theme,
    actThemeComp: themeComp,
  } as HOCState

  return nextState
}

// modify comp part of theme 
const compThemeModifier: <R extends TBasic.Shape>(name: string) => React.SFC<ComponentTypeWithModifierProps<R>> = name => ({ sheet, par, children }) => <Consumer>
  {themeProps => {
    const themeComps: ThemeWithCompsX = { theme: themeProps.theme }
    // clone ThemeCompX's (without 
    for (const p in themeProps) if (p != 'theme' && p != name) {
      const { sheet, par } = themeProps[p] as ThemeCompX
      themeComps[p] = { sheet, par }
    }
    const old: ThemeCompX = themeProps[name] || {}
    themeComps[name] = { sheet: sheet || old.sheet, par: par || old.par } as ThemeCompX
    return <Provider value={themeComps}>{children}</Provider>
  }}
</Consumer>

// theme modifier
const themeModifier: React.SFC<{ theme: TTheme.ThemeX | ((t: TTheme.ThemeX) => TTheme.ThemeX) }> = ({ theme, children }) => <Consumer>
  {themeProps => {
    theme = typeof theme === 'function' ? theme(themeProps.theme) : theme
    const themeComps: ThemeWithCompsX = { theme }
    // clone ThemeCompX's, without cachedStaticSheet
    for (const p in themeProps) if (p != 'theme') {
      const { sheet, par } = themeProps[p] as ThemeCompX
      themeComps[p] = { sheet, par }
    }
    return <Provider value={themeComps}>{children}</Provider>
  }}
</Consumer>

//default compThemePars from "withStyles" component definition
const defaultCompThemePars: { [Name in keyof TBasic.Shapes]?: TBasic.getCompTheme<TBasic.Shapes[Name]> } = {}

function callCreator<T>(theme: TTheme.ThemeX, compThemePar, creator: T | ((theme: TTheme.ThemeX, compThemePar) => T)) {
  return typeof creator === 'function' ? creator(theme, compThemePar) : creator
}

//************ EXPORT

export const Themer = { withTheme, applyTheme, Modifier: themeModifier }
