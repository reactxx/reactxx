import React from 'react'

//import hoistNonReactStatics from 'hoist-non-react-statics'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'
import { ThemeProvider, ThemeModifier, expandOverrides } from 'reactxx'
import { ModifierType } from 'reactxx-appstate'


export * from '../common/createMuiTheme'

import { sheetToClassSheet, rulesetToClassNames } from 'reactxx/web'
import { createMuiTheme } from '../common/createMuiTheme'

import { toPlatformRuleSet, toPlatformSheet, toPlatformEvents } from 'reactxx'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC = props => {
  const theme = createMuiTheme()
  return <JssProvider jss={jss}>
    <ThemeProvider value={{ theme: theme, overrides: {} }}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeProvider>
  </JssProvider>
}

export const ThemeModifierX: ModifierType<ReactXX.ThemeStatesX, ReactXX.ThemeStatesX> = props => <ThemeModifier {...props} render={themeState => {
  const { theme, overrides} = themeState
  theme.overrides = expandOverrides(theme, overrides)
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}} />


type webKeys<R extends ReactXX.Shape> = ReactXX.getWeb<R> | keyof ReactXX.getCommon<R>

export const muiCompatible = <R extends ReactXX.Shape>(Component: Muix.muiComponentType<ReactXX.getPropsWeb<R>, webKeys<R>>) => {

  const Styled: ReactXX.SFCX<R> = props => {

    const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, modifyThemeState, ...other } = props as (ReactXX.PropsX & ReactXX.OnPressAllX)

    const classes = toPlatformSheet(classesX as ReactXX.SheetX)

    const codeProps = {
      ...other, ...$web,
      style: toPlatformRuleSet(styleX as ReactXX.RulesetX),
      className: rulesetToClassNames(toPlatformRuleSet(classNameX as ReactXX.RulesetX)),
      classes: classes
    }

    toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps as any)

    return <Component {...codeProps as any} />
  }

  return Styled

}
