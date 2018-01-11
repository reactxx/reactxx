import React from 'react'
import ReactN from 'react-native'

import withStylesMui from 'material-ui/styles/withStyles'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Theme } from 'material-ui/styles/createMuiTheme'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import _classnames from 'classnames'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

//import { sheetToClassNames } from './inline-styles'
import { sheetToClassSheet } from './fela'

import { toPlatformRuleSet, toPlatformSheet } from 'muix-styles'

import createMuiTheme, { AppContainerProps, classesToPlatformSheet, getDefaultTheme, MuiThemeContextTypes } from '../common/index'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC<AppContainerProps> = props => <MuiThemeProvider theme={createMuiTheme(props.themeOptions) as Theme}><JssProvider jss={jss}>{props.children}</JssProvider></MuiThemeProvider>

type webKeys<R extends Muix.Shape> = Muix.getWeb<R> | keyof Muix.getCommon<R>

export const muiCompatible = <R extends Muix.Shape>(Component: Muix.muiComponentType<Muix.getProps<R>, webKeys<R>>) => {
  type TKey = webKeys<R>
  const Styled: Muix.SFCX<R> = (props, context: Muix.MuiThemeContextValue) => {
    const { classes: _classes, style, web, native, onClick, onPress: onPressInit, ...rest } = props as Muix.PropsX<Muix.Shape>

    const theme = context.theme || getDefaultTheme()

    const classes = sheetToClassSheet(classesToPlatformSheet(theme, _classes) as Muix.SheetWeb<R>)
    const onPress = onPressInit || onClick 
    const webProps = { ...rest, ...web, style: toPlatformRuleSet(style), classes, onPress, theme, } as (Muix.getProps<R> & Muix.muiProps<TKey>) 
    return <Component {...webProps} />
  }
  Styled.contextTypes = MuiThemeContextTypes
  return hoistNonReactStatics(Styled, Component)
}
