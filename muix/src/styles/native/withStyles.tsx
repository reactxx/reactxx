import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme from '../common/index'
import warning from 'invariant'
import pure from 'recompose/pure'
import { View } from 'react-native'
import { toPlatformSheet, toPlatformRuleSet } from '../native/index'
import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

let defaultTheme: Mui.ThemeNew
const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

export class AppContainer extends React.PureComponent {
  state = { isReady: false }
  render() {
    if (this.state.isReady) return React.Children.only(this.props.children)
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  }
}

const styleOverride = <R extends Mui.Shape>(renderedClasses: Mui.SheetNative<R>, classesProp: Mui.SheetNative<R>, name: string) => {
  type untyped = Mui.SheetNative<Mui.Shape>
  if (!classesProp) return renderedClasses
  const stylesWithOverrides = { ...renderedClasses as untyped }  //destructor does not work with generics
  Object.keys(classesProp).forEach(key => {
    warning(!!stylesWithOverrides[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
    console.log('2', stylesWithOverrides[key], classesProp[key])
    stylesWithOverrides[key] = { ...stylesWithOverrides[key], ...(classesProp as untyped)[key] };
  })
  return stylesWithOverrides as Mui.SheetNative<R>
}

const styleCreator = <R extends Mui.Shape>(styleOrCreator: Mui.SheetOrCreator<R>, theme: Mui.ThemeNew, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Mui.SheetNative<R>
  const styles = (typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator) as Mui.SheetNative<R>
  return styleOverride(styles, overrides, name)
}

export const withStyles = <R extends Mui.Shape>(styleOrCreator: Mui.SheetOrCreator<R>, options?: Mui.WithStylesOptions) => (Component: Mui.CodeComponentType<R>) => {
  const Styled: Mui.SFCX<R> = (props, context: Mui.TMuiThemeContextValue) => {
    const { flip, name } = options
    const { classes: common, classesNative, classesWeb, style, web, native, onClick, onPress, ...other } = props as Mui.PropsX<Mui.Shape>

    const theme = context.theme || getDefaultTheme()

    let cacheItem = theme.nativeSheetCache.find(it => it.key === styleOrCreator)
    if (!cacheItem) theme.nativeSheetCache.push(cacheItem = { key: styleOrCreator, value: styleCreator(styleOrCreator, theme, name) })

    //console.log('1', toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>))

    const classes = styleOverride(
      cacheItem.value,
      toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>),
      name)

    const newProps = { ...other, ...native, theme, classes, style: toPlatformRuleSet(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Mui.CodePropsNative<R>
    if (onPress || onClick) newProps.onPress = onPress || onClick

    return <Component {...newProps } />
  }
  Styled.contextTypes = MuiThemeContextTypes
  Styled['options'] = options
  hoistNonReactStatics(Styled, Component as any)
  return pure(Styled)
}

export default withStyles

export const classNames = <T extends Mui.CSSPropertiesNative>(...styles: Array<T | T[]>) => {
  if (!styles) return null
  return Object.assign({}, ...styles.filter(p => !!p).map(p => {
    if (Array.isArray(p)) return Object.assign({}, ...p)
    else return p
  })) as T
}

