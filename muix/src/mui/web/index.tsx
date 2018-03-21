import React from 'react'

//import hoistNonReactStatics from 'hoist-non-react-statics'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import jssShared, { create} from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'
import { ThemeProvider, ThemeModifier } from 'reactxx'
import { ModifierType } from 'reactxx-stateman'

import { TTheme, TSheets } from 'reactxx-typings'

export * from '../common/createMuiTheme'

import { rulesetToClassNames } from 'reactxx/web'
import { createMuiTheme } from '../common/createMuiTheme'
import * as Mui from '../typings/mui'

import { toPlatformRuleSet, toPlatformSheet, toPlatformEvents } from 'reactxx'

export type JSS = typeof jssShared

export const jss: JSS = create({ ...preset(), createGenerateClassName, insertionPoint: 'insertion-point-jss' })
//jss.options.createGenerateClassName = createGenerateClassName
//jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC = props => {
  const theme = createMuiTheme()
  return <JssProvider jss={jss}>
    <ThemeProvider value={{ theme: {} as any }}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeProvider>
  </JssProvider>
}

export const ThemeModifierX: ModifierType<TTheme.ThemeState, TTheme.ThemeState> = props => <ThemeModifier {...props} render={themeState => {
  return props.children
  //TODO THEME
  //const { theme, overrides} = themeState
  //theme.overrides = expandOverrides(themeState)
  //return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}} />

//Get platform component sheet (from creator and theme)
const expandOverrides = (themeState: TTheme.ThemeState) => {
  if (!themeState) return null
  const theme = themeState.theme
  const res = { theme }
  for (const componentName in themeState) {
    if (componentName == 'theme') continue
    const themeComp: TTheme.ThemeCompX = themeState[componentName]; if (!themeComp) return res
    const { sheet, par } = themeComp
    //TODO THEME
    //res[componentName] = typeof override != 'function' ? override : override(theme, compThemePar)
  }
  return res
}

type webKeys<R extends TSheets.Shape> = TSheets.getWeb<R> | keyof TSheets.getCommon<R>
type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & Mui.StyledComponentProps<ClassKey>>

export const muiCompatible = <R extends TSheets.Shape>(Component: muiComponentType<TSheets.getPropsWeb<R>, webKeys<R>>) => {

  const Styled: TSheets.SFCX<R> = props => {

    const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, modifyThemeState, ...other } = props as any as (TSheets.PropsX & TSheets.OnPressAllX)

    const classes = toPlatformSheet(classesX as TSheets.SheetX)

    const codeProps = {
      ...other, ...$web,
      style: toPlatformRuleSet(styleX as TSheets.RulesetX),
      className: rulesetToClassNames(toPlatformRuleSet(classNameX as TSheets.RulesetX)),
      classes: classes
    }

    toPlatformEvents($web, $native as TSheets.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps as any)

    return <Component {...codeProps as any} />
  }

  return Styled

}
