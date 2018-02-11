import React from 'react'
import ReactN from 'react-native'

import { Theme } from 'material-ui/styles/createMuiTheme'
import hoistNonReactStatics from 'hoist-non-react-statics'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

//import { sheetToClassNames } from './inline-styles'
import { sheetToClassSheet, rulesetToClassNames } from './fela'

import { classesToPlatformSheet, getDefaultTheme, MuiThemeContextTypes, AppContainerProps, createMuiTheme, toPlatformRuleSet, toPlatformSheet, MuiThemeProvider } from 'muix-styles'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC<AppContainerProps> = props => <JssProvider jss={jss}><MuiThemeProvider theme={createMuiTheme(props.themeOptions)}>{props.children}</MuiThemeProvider></JssProvider>

type webKeys<R extends Muix.Shape> = Prim5s.getWeb<R> | keyof Prim5s.getCommon<R>

export const muiCompatible = <R extends Muix.Shape>(Component: React.ComponentType<Prim5s.getPropsWeb<R>>) => {
  const Styled: Prim5s.SFCX<R> = (props, context: Muix.MuiThemeContextValue) => {
    const { classes: _classes, style, $web, $native, onClick, className: rulesetX, ...rest } = props as Prim5s.PropsX<Muix.Shape> & Prim5s.OnClick 

    const click = ($web && $web.onClick) || onClick

    const theme = context.theme || getDefaultTheme()

    const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as React.CSSProperties

    const classes = sheetToClassSheet((classesToPlatformSheet(theme, _classes as Muix.ThemeValueOrCreator<Prim5s.PartialSheetX<R>>)) as Prim5s.SheetWeb<R>)
    const webProps = { ...rest, ...$web, style: toPlatformRuleSet(style), classes, onClick: click, theme, className: rulesetToClassNames(cn) } as Prim5s.getPropsWeb<R>
    return <Component {...webProps} />
  }
  Styled.contextTypes = MuiThemeContextTypes
  return Styled
}
