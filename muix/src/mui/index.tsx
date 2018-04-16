import React from 'react'
import * as Cfg from 'typescript-config'

//import hoistNonReactStatics from 'hoist-non-react-statics'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import jssShared, { create} from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'
import { TTheme, ThemeProvider, ThemeModifier, Themer } from 'reactxx'
import { ModifierType } from 'reactxx-stateman'

export * from './common/createMuiTheme'

import { createMuiTheme } from './common/createMuiTheme'
import * as Mui from './typings/mui'

import { TBasic, toPlatformRuleSet, toPlatformSheet, toPlatformEvents } from 'reactxx-basic'
import { rulesetToClassNames } from 'reactxx-fela'

export type JSS = typeof jssShared

export const jss: JSS = create({ ...preset(), createGenerateClassName, insertionPoint: 'insertion-point-jss' })
//jss.options.createGenerateClassName = createGenerateClassName
//jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC = props => {
  const theme = createMuiTheme()
  return <JssProvider jss={jss}>
    <Themer.Modifier theme={{} as TTheme.ThemeX }>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </Themer.Modifier>
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

type webKeys<R extends TBasic.Shape> = TBasic.getWeb<R> | keyof TBasic.getCommon<R>
type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & Mui.StyledComponentProps<ClassKey>>

export const muiCompatible = <R extends TBasic.Shape>(Component: muiComponentType<TBasic.getPropsWeb<R>, webKeys<R>>) => {

  const Styled: TBasic.SFCX<R> = props => {

    const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, ...other } = props as any as (TBasic.PropsX & TBasic.OnPressAllX)

    const classes = toPlatformSheet(classesX as TBasic.SheetX)

    const codeProps = {
      ...other, ...$web,
      style: toPlatformRuleSet(styleX as TBasic.RulesetX),
      className: rulesetToClassNames(toPlatformRuleSet(classNameX as TBasic.RulesetX) as React.CSSProperties),
      classes: classes
    }

    toPlatformEvents($web, $native as TBasic.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps as any)

    return <Component {...codeProps as any} />
  }

  return Styled

}
