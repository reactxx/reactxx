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

type webKeys<R extends Muix.Shape> = Muix.getWeb<R> | keyof Muix.getCommon<R>

type TMuiProps<R extends Muix.Shape> = R['propsWeb']

export const muiCompatible = <R extends Muix.Shape>(Component: React.ComponentType<TMuiProps<R>>) => {
  const Styled: Muix.SFCX<R> = (props, context: Muix.MuiThemeContextValue) => {
    const { classes: _classes, classesInCode, style, web, native, onClick, classNameInCode, ...rest } = props as Muix.PropsX<Muix.Shape> & Muix.TOnClickWeb 

    const click = (web && web.onClick) || onClick

    const theme = context.theme || getDefaultTheme()

    const classes = sheetToClassSheet((classesToPlatformSheet(theme, _classes) || classesInCode) as Muix.SheetWeb<R>)
    const webProps = { ...rest, ...web, style: toPlatformRuleSet(style), classes, onClick: click, theme, className: rulesetToClassNames(classNameInCode as React.CSSProperties) } as TMuiProps<R>
    return <Component {...webProps} />
  }
  Styled.contextTypes = MuiThemeContextTypes
  return Styled
}
