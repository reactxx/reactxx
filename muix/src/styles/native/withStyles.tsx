import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme from 'muix-styles/common/index'
import warning from 'invariant'
import pure from 'recompose/pure'
import { View } from 'react-native'
import { toPlatformSheet, toPlatformRuleSet } from 'muix-styles/native/index'

let defaultTheme: Mui.nw.ThemeNew
const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

export const Styler: React.SFC<{}> = props => <View>{props.children}</View>

const styleOverride = <R extends Mui.Shape>(renderedClasses: Mui.SheetNative<R>, classesProp: Mui.SheetNative<R>, name: string) => {  
  type untyped = Mui.SheetNative<Mui.Shape>
  if (!classesProp) return renderedClasses
  const stylesWithOverrides = { ...renderedClasses as untyped }  //destructor does not work with generics
  Object.keys(classesProp).forEach(key => {
    warning(!!stylesWithOverrides[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
    stylesWithOverrides[key] = { ...stylesWithOverrides[key], ...(classesProp as untyped)[key] };
  })
  return stylesWithOverrides as Mui.SheetNative<R>
}

const styleCreator = <R extends Mui.Shape>(styleOrCreator: Mui.SheetOrCreator<R>, theme: Mui.nw.ThemeNew, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Mui.SheetNative<R>
  const styles = (typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator) as Mui.SheetNative<R>
  return styleOverride(styles, overrides, name)
}

export const withStyles = <R extends Mui.Shape>(styleOrCreator: Mui.SheetOrCreator<R>, options?: Mui.WithStylesOptions) => (Component: Mui.CodeComponentType<R>) => {
  const Style: Mui.SFCX<R> = (props, context: Mui.TMuiThemeContextValue) => {
    const { flip, name } = options
    const { classes: common, classesNative, classesWeb, style, web, native, onClick, onPress, ...other } = props as Mui.PropsX<Mui.Shape>//as any //without any: does not works in TS

    const theme = context.theme || getDefaultTheme()

    let cacheItem = theme.nativeSheetCache.find(it => it.key === styleOrCreator)
    if (!cacheItem) theme.nativeSheetCache.push(cacheItem = { key: styleOrCreator, value: styleCreator(styleOrCreator, theme, name) })

    const classes = styleOverride(
      cacheItem.value, //styleCreator(styleOrCreator, theme, name),
      toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>),
      name)

    const newProps = { ...other, ...native, theme, classes, style: toPlatformRuleSet(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Mui.CodePropsNative<R>
    if (onPress || onClick) newProps.onPress = onPress || onClick

    return <Component {...newProps } />
  }
  Style.contextTypes = MuiThemeContextTypes
  Style['options'] = options
  hoistNonReactStatics(Style, Component as any)
  return pure(Style)
}

export default withStyles

export const classNames = <T extends Mui.CSSPropertiesNative>(...styles: Array<T | T[]>) => {
  if (!styles) return null
  return Object.assign({}, ...styles.filter(p => !!p).map(p => {
    if (Array.isArray(p)) return Object.assign({}, ...p)
    else return p
  })) as T
}

