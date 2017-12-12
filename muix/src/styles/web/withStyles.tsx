import React from 'react'
import RN from 'react-native'

import withStylesMui from 'material-ui/styles/withStyles'
import hoistNonReactStatics from 'hoist-non-react-statics'
import _classnames from 'classnames'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

import { sheetToClassSheet } from './inline-styles'
import { toPlatformSheetLow, toRuleLow } from 'muix-styles/common/toPlatform'

import { ButtonClassKey } from 'material-ui/Button/Button'

/*
Order of FELA x JSS <style>'s tag:
1. .html file
  <!-- insertion-point-jss -->  <-- JSS sheet's
  <style data-fela-type="RULE" type="text/css" id="fela-rules"></style> <-- FELA sheets

2. create jss instance, as in rw-mui-w/styles/withStyles, doc in https://material-ui-next.com/customization/css-in-js/

3. react app root is JssProvider:
import JssProvider from 'react-jss/lib/JssProvider'
import { jss } from 'muix-styles/common/withStyles'
<JssProvider jss={jss}>
</JssProvider> 

*/

const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const Styler: React.SFC<{}> = props => <JssProvider jss={jss}>{props.children}</JssProvider>

const origWithStyles = withStylesMui as Mui.muiWithStyles

type webKeys<R extends Mui.Shape> = Mui.getWeb<R> | keyof Mui.getCommon<R>

export const beforeWithStyles = <R extends Mui.Shape>(Component: Mui.muiComponentType<Mui.getProps<R>, webKeys<R>>) => {
  type TKey = webKeys<R>
  const res: Mui.SFC<R> = props => {
    const { classes: common, classesNative, classesWeb, style, web, native, onClick: onClickInit, onPress: onPressInit, ...rest } = props as Mui.Props<Mui.Shape>
    const sheet = { common, native: classesNative, web: classesWeb} as Mui.PartialSheet<R>
    const classes = sheetToClassSheet(toPlatformSheet(sheet) as Mui.PlatformSheetWeb<R>)
    const onPress = onPressInit || onClickInit //|| (props.native && props.native['onPress']) || (props.web && props.web['onClick'])
    const webProps = { ...rest, ...web, style: toRule(style), classes, onPress} as (Mui.getProps<R> & Mui.muiProps<TKey>) 
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyles = <R extends Mui.Shape>(styleOrCreator: Mui.PlatformSheetCreator<R>, options?: Mui.WithStylesOptions) => (comp: Mui.muiComponentType<Mui.getProps<R>, webKeys<R>>) => {
  return beforeWithStyles<R>(origWithStyles(styleOrCreator, options)(comp as Mui.muiCodeComponentType<Mui.getProps<R>, webKeys<R>>))
}

export const toRule = (style: Mui.TRuleSetX) => toRuleLow(style, false) as React.CSSProperties
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheet<R>) => toPlatformSheetLow(rules, false) as Mui.PlatformSheetWeb<R>

//export const sheetCreator = <R extends Mui.Shape>(styleOrCreator: Mui.SheetGetter<R>) => {
//  const styleOrCreatorEx: Mui.PlatformSheetCreator<R> = (theme: Mui.Theme) => {
//    if (typeof styleOrCreator == 'function') return toPlatformSheet(styleOrCreator(theme) as Mui.PartialSheet<R>)
//    else return styleOrCreator
//  }
//  return styleOrCreatorEx
//}

export const classNames = _classnames
