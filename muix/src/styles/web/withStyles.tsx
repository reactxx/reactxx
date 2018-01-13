import React from 'react'
import ReactN from 'react-native'

//import withStylesMui from 'material-ui/styles/withStyles'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Theme } from 'material-ui/styles/createMuiTheme'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import _classnames from 'classnames'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

//import { sheetToClassNames } from './inline-styles'
import { sheetToClassSheet } from './fela'

import { toPlatformRuleSet, toPlatformSheet, MuiThemeProvider } from 'muix-styles'

import createMuiTheme, { AppContainerProps, classesToPlatformSheet, getDefaultTheme, MuiThemeContextTypes } from '../common/index'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC<AppContainerProps> = props => <MuiThemeProvider theme={createMuiTheme(props.themeOptions)}><JssProvider jss={jss}>{props.children}</JssProvider></MuiThemeProvider>

type webKeys<R extends Muix.Shape> = Muix.getWeb<R> | keyof Muix.getCommon<R>

type TMuiProps<R extends Muix.Shape> = R['propsWeb']

export const muiCompatible = <R extends Muix.Shape>(Component: React.ComponentType<TMuiProps<R>>) => {
  const Styled: Muix.SFCX<R> = (props, context: Muix.MuiThemeContextValue) => {
    const { classes: _classes, style, web, native, onClick, ...rest } = props as Muix.PropsX<Muix.Shape> & Muix.TOnClickWeb

    const click = (web && web.onClick) || onClick

    const theme = context.theme || getDefaultTheme()

    const classes = sheetToClassSheet(classesToPlatformSheet(theme, _classes) as Muix.SheetWeb<R>)
    const webProps = { ...rest, ...web, style: toPlatformRuleSet(style), classes, onClick: click, theme, } as TMuiProps<R>
    return <Component {...webProps} />
  }
  Styled.contextTypes = MuiThemeContextTypes
  return Styled
}
