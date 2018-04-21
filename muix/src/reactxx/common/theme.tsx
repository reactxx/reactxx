import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { Types, deepMerges } from 'reactxx-basic'

import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic, TAddInConfig } from '../typings/basic'
import { TTheme } from '../typings/theme'

//************ TYPINGS

// Component part of 
export interface ThemeCompX<R extends TBasic.Shape = TBasic.Shape> { sheet?: TBasic.PartialSheetX<R>, par?: TBasic.get_$CompTheme<R>, staticSheet?: TBasic.Sheet }

export type ThemeWithCompsX = { theme: TTheme.ThemeX } & { [P in keyof TBasic.Shapes]?: ThemeCompX<TBasic.Shapes[P]> }

export interface ThemeWithCompX {
  theme: TTheme.ThemeX // theme from ThemeProvider
  themeComp?: ThemeCompX // themeComp from ThemeProvider
}

export type HOCProps<R extends TBasic.Shape = TBasic.Shape> = TBasic.PropsX<R> & Types.OnPressAllX & {
  theme: TTheme.ThemeX // theme from ThemeProvider
  staticSheet: TBasic.Sheet<R>
  variant: TBasic.getVariant<R>
}

export interface HOCState<R extends TBasic.Shape = TBasic.Shape> {
  classes?: TBasic.Sheet<R>
  style?: TBasic.Ruleset
  variant?: TBasic.getVariant<R>
  // following props can check staticSheet validity in withTheme HOC
  //actTheme?: TTheme.ThemeX // actual theme
  //actThemeComp?: ThemeCompX // actual themeComp
}

export interface ComponentTypeWithModifierProps<R extends TBasic.Shape> {
  sheet?: TBasic.PartialSheetX<R>
  par?: TBasic.get_$CompTheme<R>
}

export interface ComponentTypeWithModifier<R extends TBasic.Shape> extends TBasic.SFCX<R> {
  PropsModifier: React.ComponentType<TBasic.getProps<R>>
}

//************ CODE

const { Provider: ThemeProvider, Consumer: ThemeConsumer } = React.createContext<TTheme.ThemeBase>({ type: 'ThemeX', $cache: {} })
//ThemeProvider.displayName = 'ThemeProvider'; ThemeConsumer.displayName = 'ThemeConsumer'

const withTheme = <R extends TBasic.Shape>(name: string, Component: React.ComponentClass<HOCProps<R>>, createSheetX: TTheme.SheetCreatorX<R>, options?: TTheme.WithStyleOptions<R>) => {

  const res = ((outerProps: TBasic.PropsX) => <ThemeConsumer>
    {theme => {
      let sheet: TBasic.SheetX<R>
      if (!theme) theme = { type: 'ThemeX', $cache: {} }
      let staticSheet: TBasic.Sheet
      let variant = null
      if (typeof createSheetX !== 'function') {
        staticSheet = toPlatformSheet(createSheetX)
      } else {
        if (options.getVariant) {
          variant = options.getVariant(outerProps)
          const variantCacheId = options.variantToString && options.variantToString(variant)
          if (variantCacheId) {
            let compCache = theme.$cache[name]
            if (!compCache) theme.$cache[name] = compCache = {}
            staticSheet = compCache[variantCacheId]
            if (!staticSheet) compCache[variantCacheId] = staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
          } else
            staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
        }
      }
      //if (name === 'comps$responsibledrawer')
      //  debugger
      const codeProps = { ...outerProps, theme, staticSheet, variant } as HOCProps<R>
      return <Component {...codeProps} />
    }}
  </ThemeConsumer>
  ) as TBasic.SFCX<R>

  res.displayName = 'withTheme'

  return res
}

// compute classes, clasName and style (platform dependent and themed)
const applyTheme = (name: string, nextProps: HOCProps, prevState: HOCState) => {

  const { theme, staticSheet, classes, className, style, variant } = nextProps

  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }

  const actSheet: TBasic.Sheet = classes || root ? deepMerges(false, {}, staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet
  for (const p in actSheet) if (!p.startsWith('$')) actSheet[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

  const nextState = {
    classes: actSheet,
    style: toPlatformRuleSet(callCreator(theme, variant, style)),
    variant,
    // save actual themeComps to state:
    //actTheme: theme,
    //actThemeComp: themeComp,
  } as HOCState

  return nextState
}

/*// modify comp part of theme
const compThemeModifier: <R extends TBasic.Shape>(name: string) => React.SFC<ComponentTypeWithModifierProps<R>> = name => ({ sheet, par, children }) => null <Consumer>
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
</Consumer>*/

// theme modifier
const themeModifier: React.SFC<{ theme: TTheme.ThemeX | ((t: TTheme.ThemeX) => TTheme.ThemeX) }> = ({ theme, children }) => <ThemeConsumer>
  {oldTheme => {
    theme = typeof theme === 'function' ? theme(oldTheme) : theme
    //const themeComps: ThemeWithCompsX = { theme }
    //// clone ThemeCompX's, without staticSheet
    //for (const p in themeProps) if (p != 'theme') {
    //  const { sheet, par } = themeProps[p] as ThemeCompX
    //  themeComps[p] = { sheet, par }
    //}
    return <ThemeProvider value={theme as TTheme.ThemeBase}>{children}</ThemeProvider>
  }}
</ThemeConsumer>

//default compThemePars from "withStyles" component definition
//const defaultCompThemePars: { [Name in keyof TBasic.Shapes]?: TBasic.get_$CompTheme<TBasic.Shapes[Name]> } = {}

function callCreator<T>(theme: TTheme.ThemeX, variant, creator: T | ((theme: TTheme.ThemeX, variant) => T)) {
  return typeof creator === 'function' ? creator(theme, variant) : creator
}

const AppContainer = themeModifier

const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

//************ EXPORT

export const Themer = { withTheme, applyTheme, AppContainer, Modifier: themeModifier, variantToString }
