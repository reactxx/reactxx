import React from 'react'
import ReactN from 'react-native'

import withStylesMui from 'material-ui/styles/withStyles'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Theme } from 'material-ui/styles/createMuiTheme';
import hoistNonReactStatics from 'hoist-non-react-statics'
import _classnames from 'classnames'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

import { sheetToClassNames } from './inline-styles'

import { toPlatformRuleSet, toPlatformSheet } from 'muix-styles'

import createMuiTheme, { AppContainerProps, classesToPlatformSheet, getDefaultTheme } from '../common/index'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC<AppContainerProps> = props => <MuiThemeProvider theme={createMuiTheme(props.themeOptions) as Theme}><JssProvider jss={jss}>{props.children}</JssProvider></MuiThemeProvider>

type webKeys<R extends Muix.Shape> = Muix.getWeb<R> | keyof Muix.getCommon<R>

export const withStylesX = <R extends Muix.Shape>(Component: Muix.muiComponentType<Muix.getProps<R>, webKeys<R>>) => {
  type TKey = webKeys<R>
  const res: Muix.SFCX<R> = (props, context: Muix.MuiThemeContextValue) => {
    const { classes: _classes, style, web, native, onClick, onPress: onPressInit, ...rest } = props as Muix.PropsX<Muix.Shape>

    const theme = context.theme || getDefaultTheme()

    const classes = sheetToClassNames(classesToPlatformSheet(theme, _classes) as Muix.SheetWeb<R>)
    const onPress = onPressInit || onClick 
    const webProps = { ...rest, ...web, style: toPlatformRuleSet(style), classes, onPress, } as (Muix.getProps<R> & Muix.muiProps<TKey>) 
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyles = <R extends Muix.Shape>(styleOrCreator: Muix.SheetOrCreator<R>, options?: Muix.WithStylesOptionsNew) => (comp: Muix.muiComponentType<Muix.getProps<R>, webKeys<R>>) => {
  const withStyles = withStylesMui as any as Muix.muiWithStyles
  return withStylesX<R>(withStyles(styleOrCreator, options)(comp as Muix.muiCodeComponentType<Muix.getProps<R>, webKeys<R>>))
}

export const classNames = _classnames
