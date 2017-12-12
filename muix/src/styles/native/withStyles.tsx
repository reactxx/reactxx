import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import mui_withStyles, { StyleRules, StyleRulesCallback, WithStyles, WithStylesOptions, StyledComponentProps } from 'material-ui/styles/withStyles'
//import { StyleRules as muiStyleRules} from 'material-ui/styles/withStyles'
import { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme from 'muix-styles/common/createMuiTheme'
import warning from 'invariant'
import pure from 'recompose/pure'
import { View } from 'react-native'
import { toPlatformSheetLow, toRuleLow } from 'muix-styles/common/toPlatform'

let defaultTheme: Mui.Theme
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

const styleCreator = <R extends Mui.Shape>(styleOrCreator: Mui.PlatformSheetCreator<R>, theme: Mui.Theme, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Mui.SheetNative<R>
  const styles = (typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator) as Mui.SheetNative<R>
  return styleOverride(styles, overrides, name)
}

//export const sheetCreator = <R extends Mui.Shape>(sheetGetter: Mui.SheetGetter<R>) => (theme: Mui.Theme) => toPlatformSheet(sheetGetter(theme) as Mui.PartialSheet<R>)

export const withStyles = <R extends Mui.Shape>(styleOrCreator: Mui.PlatformSheetCreator<R>, options?: Mui.WithStylesOptions) => (Component: Mui.CodeComponentType<R>) => {
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

    const newProps = { ...other, ...native, theme, classes, style: toRule(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Mui.CodePropsNative<R>
    if (onPress || onClick) newProps.onPress = onPress || onClick

    return <Component {...newProps } />
  }
  Style.contextTypes = MuiThemeContextTypes
  Style['options'] = options
  hoistNonReactStatics(Style, Component as any)
  return pure(Style)
}

export const toRule = <T extends Mui.RuleSetNative>(style: Mui.RuleSetX<T>) => toRuleLow(style, true) as T
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheetX<R>) => toPlatformSheetLow(rules, true) as Mui.SheetNative<R>

export default withStyles

export const classNames = <T extends Mui.RuleSetNative>(...styles: Array<T | T[]>) => {
  if (!styles) return null
  return Object.assign({}, ...styles.filter(p => !!p).map(p => {
    if (Array.isArray(p)) return Object.assign({}, ...p)
    else return p
  })) as T
}