import React from 'react'
import ReactN from 'react-native'

import withStylesMui from 'material-ui/styles/withStyles'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import hoistNonReactStatics from 'hoist-non-react-statics'
import _classnames from 'classnames'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import jssDefault, { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

import { sheetToClassSheet } from './inline-styles'

import { toPlatformRuleSet, toPlatformSheet } from 'muix-styles'

import { getDefaultTheme } from '../common/index'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName

export const AppContainer: React.SFC<{}> = props => <MuiThemeProvider theme={getDefaultTheme()}><JssProvider jss={jss}>{props.children}</JssProvider></MuiThemeProvider>

type webKeys<R extends Mui.Shape> = Mui.getWeb<R> | keyof Mui.getCommon<R>

export const withStylesX = <R extends Mui.Shape>(Component: Mui.muiComponentType<Mui.getProps<R>, webKeys<R>>) => {
  type TKey = webKeys<R>
  const res: Mui.SFCX<R> = props => {
    const { classes: common, classesNative, classesWeb, style, web, native, onClick, onPress: onPressInit, ...rest } = props as Mui.PropsX<Mui.Shape>
    const sheet = { common, /*native: classesNative,*/ web: classesWeb} as Mui.PartialSheetX<R>
    const classes = sheetToClassSheet(toPlatformSheet(sheet) as Mui.SheetWeb<R>)
    const onPress = onPressInit || onClick 
    const webProps = { ...rest, ...web, style: toPlatformRuleSet(style), classes, onPress, } as (Mui.getProps<R> & Mui.muiProps<TKey>) 
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyles = <R extends Mui.Shape>(styleOrCreator: Mui.SheetOrCreator<R>, options?: Mui.WithStylesOptions) => (comp: Mui.muiComponentType<Mui.getProps<R>, webKeys<R>>) => {
  const withStyles = withStylesMui as any as Mui.muiWithStyles
  return withStylesX<R>(withStyles(styleOrCreator, options)(comp as Mui.muiCodeComponentType<Mui.getProps<R>, webKeys<R>>))
}

export const classNames = _classnames
