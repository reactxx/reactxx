import React from 'react'
import PropTypes from 'prop-types'
import deepmerge from 'deepmerge'
import hoistNonReactStatics from 'hoist-non-react-statics'
import MuiThemeProvider, { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme, { AppContainerProps, getDefaultTheme, classesPropsToSheet } from '../common/index'
import warning from 'invariant'
import pure from 'recompose/pure'
import { View } from 'react-native'
import { toPlatformSheet, toPlatformRuleSet } from '../native/index'
import loadFonts from './expoLoadFonts'
import { AppLoading } from 'expo'

export class AppContainer extends React.PureComponent<AppContainerProps> {
  state = { isReady: false }
  render() {
    //console.log('AppContainer COUNT: ', React.Children.count(this.props.children))
    if (this.state.isReady) return <MuiThemeProvider theme={createMuiTheme(this.props.themeOptions)}>{React.Children.only(this.props.children)}</MuiThemeProvider>
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  }
}

const mergeSheet = <R extends Muix.Shape>(source: Muix.SheetNative<R>, modify: Muix.SheetNative<R>/*, name: string*/) => modify ? deepmerge(source, modify) as Muix.SheetNative<R> : source
//  type untyped = Muix.SheetNative<Muix.Shape>
//  if (!modify) return source

//  const result = { ...source as untyped }  //destructor does not work with generics
//  Object.keys(modify).forEach(key => {
//    warning(!!result[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
//    result[key] = { ...result[key], ...(modify as untyped)[key] };
//  })
//  return result as Muix.SheetNative<R>
//}

const getSheet = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, theme: Muix.ThemeNew, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Muix.SheetNative<R>
  const styles = (typeof sheetOrCreator === 'function' ? sheetOrCreator(theme) : sheetOrCreator) as Muix.SheetNative<R>
  return mergeSheet(styles, overrides)
}

export const withStyles = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, options?: Muix.WithStylesOptions) => (Component: Muix.CodeComponentType<R>) => {
  const Styled: Muix.SFCX<R> = (props, context: Muix.TMuiThemeContextValue) => {
    const { flip, name } = options
    const { classes: common, classesNative, classesWeb, style, web, native, onClick, onPress, ...other } = props as Muix.PropsX<Muix.Shape>

    const theme = context.theme || getDefaultTheme()

    //apply theme to sheet AND merge with theme.overrides
    let cacheItem = theme.nativeSheetCache.find(it => it.sheetOrCreator === sheetOrCreator)
    if (!cacheItem) theme.nativeSheetCache.push(cacheItem = { sheetOrCreator: sheetOrCreator, sheet: getSheet(sheetOrCreator, theme, name) })

    //console.log('1', toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>))

    //apply classes
    const classes = mergeSheet(
      cacheItem.sheet,
      classesPropsToSheet(theme, props))

    //add name to classes
    for (const p in classes) classes[p].selfName = p

    const newProps = { ...other, ...native, theme, classes, style: toPlatformRuleSet(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Muix.CodePropsNative<R>
    if (onPress || onClick) newProps.onPress = onPress || onClick

    return <Component {...newProps } />
  }
  Styled.contextTypes = MuiThemeContextTypes
  Styled['options'] = options
  hoistNonReactStatics(Styled, Component as any)
  return pure(Styled) as Muix.ComponentTypeX<R>
}

export default withStyles

export const classNames = <T extends Muix.CSSPropertiesNative>(style: T, ...ruleSets: Array<T>) => {
  if (!ruleSets) return null
  //extract ruleset patches
  const patched: { [selfName: string]: T } = {}
  const list: T[] = []
  ruleSets.map(r => {
    const { selfName, rulesetPatch, ...rest } = r as any
    const patch = patched[selfName]
    patched[selfName] = patch ? { ...rest, ...patch as any } : rest
    list.push(patched[selfName])
    if (!r.rulesetPatch) return
    for (const p in r.rulesetPatch) {
      const newPatch = r.rulesetPatch[p]
      const name = extractRulesetPatchName(p)
      const patch = patched[name]
      patched[name] = patch ? { ...patch as any, ...newPatch } : newPatch
    }
  })
  //merge
  return Object.assign({}, ...list) as T
}
const extractRulesetPatchName = (name: string) => name

//export const classNamess = <T extends Muix.CSSPropertiesNative>(...ruleSets: Array<T | T[]>) => {
//  if (!ruleSets) return null

//  return Object.assign({}, ...ruleSets.filter(p => !!p).map(p => {
//    if (Array.isArray(p)) return Object.assign({}, ...p)
//    else return p
//  })) as T
//}

