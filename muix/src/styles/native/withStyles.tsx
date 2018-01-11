import React from 'react'
import deepmerge from 'deepmerge'
import hoistNonReactStatics from 'hoist-non-react-statics'
import MuiThemeProvider  from './MuiThemeProvider'
import createMuiTheme, { MuiThemeContextTypes, AppContainerProps, getDefaultTheme, classesToPlatformSheet } from '../common/index'
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

//const mergeSheet = <R extends Muix.Shape>(source: Muix.Sheet<R>, modifier: Muix.Sheet<R>) => modifier ? deepmerge(source, modifier) as Muix.Sheet<R> : source

//const aplyThemeToSheet = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, theme: Muix.ThemeNew, name?: string) => {
//  const overrides = (theme.overrides && name && theme.overrides[name]) as Muix.SheetNative<R>
//  const styles = (typeof sheetOrCreator === 'function' ? sheetOrCreator(theme) : sheetOrCreator) as Muix.SheetNative<R>
//  return mergeSheet(styles, overrides)
//}

//export const withStyles = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, options?: Muix.WithStylesOptionsNew) => (Component: Muix.CodeComponentType<R>) => {

//  class Styled extends React.PureComponent<Muix.PropsX<R>> {
//    context: Muix.MuiThemeContextValue
//    newProps: Muix.CodePropsNative<R>

//    constructor(props: Muix.PropsX<R>, context: Muix.MuiThemeContextValue) {
//      super(props, context)
//      const { flip, name } = options
//      const { classes: _classes, style, web, native, onClick, onPress, ...other } = props as Muix.PropsX<Muix.Shape>

//      const theme = context.theme || getDefaultTheme()

//      //apply theme to sheet AND merge it with theme.overrides
//      let cacheItem = theme.$sheetCache.find(it => it.sheetOrCreator === sheetOrCreator)
//      if (!cacheItem) theme.$sheetCache.push(cacheItem = { sheetOrCreator, fromTheme: aplyThemeToSheet(sheetOrCreator, theme, name) })

//      //console.log('1', toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>))

//      //apply classes
//      const classes = mergeSheet(
//        cacheItem.fromTheme,
//        classesToPlatformSheet(theme, _classes) as Muix.SheetNative<R>)

//      //add name to classes
//      for (const p in classes) classes[p].$name = p

//      this.newProps = { ...other, ...native, theme, classes, style: toPlatformRuleSet(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Muix.CodePropsNative<R>
//      if (onPress || onClick) this.newProps.onPress = onPress || onClick
//    }

//    render() {
//      return <Component {...this.newProps } />
//    }

//    static contextTypes = MuiThemeContextTypes
//    static options = options
//  }
//  //Styled['options'] = options
//  hoistNonReactStatics(Styled, Component as any)
//  return Styled //) as Muix.ComponentTypeX<R>
//}

//export default withStyles

//type CSSPropertiesNative = Muix.CSSPropertiesNative & Muix.RulesetOverridesNative<Muix.Shape>

//export const classNames = <T extends CSSPropertiesNative>(style: T, ...ruleSets: Array<T>) => {
//  if (!ruleSets) return null
//  //console.log('classNames, ruleSets', ruleSets)
//  //extract ruleset patches
//  const patched: { [selfName: string]: T } = {}
//  const list: T[] = []
//  ruleSets.map(r => {
//    if (!r) return
//    const { $name, $overrides } = r
//    const patch = patched[$name]
//    //console.log('classNames, patch', patch)
//    patched[$name] = patch ? Object.assign(r, patch) : r
//    list.push(patched[$name])
//    if (!r.$overrides) return
//    for (const p in r.$overrides) {
//      const patch = r.$overrides[p] as T
//      const name = extractRulesetPatchName(p)
//      const rule = patched[name]
//      patched[name] = rule ? Object.assign(rule, patch) : patch
//      //if (name == 'label') console.log(rule, patched[name])
//    }
//  })

//  //merge
//  const res = Object.assign({}, ...list, style) as T
//  delete res.$overrides; delete res.$name
//  return res
//}
//const extractRulesetPatchName = (name: string) => name.split('$')[1]

//export const classNames2 = <T extends CSSPropertiesNative>(patched: { [selfName: string]: T }, ...ruleSets: Array<T>) => {
//  if (!ruleSets) return null
//  //console.log('classNames, ruleSets', ruleSets)
//  //extract ruleset patches
//  //const patched: { [selfName: string]: T } = {}
//  const list: T[] = []
//  ruleSets.map(r => {
//    if (!r) return
//    const { $name, $overrides } = r
//    if (!$name) { //e.g. 'style' as last argument
//      list.push(r)
//      return
//    }
//    const patch = patched[$name]
//    //console.log('classNames, patch', patch)
//    patched[$name] = patch ? Object.assign(r, patch) : r
//    list.push(patched[$name])
//    if (!r.$overrides) return
//    for (const p in r.$overrides) {
//      const patch = r.$overrides[p] as T
//      const name = extractRulesetPatchName(p)
//      const rule = patched[name]
//      patched[name] = rule ? Object.assign(rule, patch) : patch
//      //if (name == 'label') console.log(rule, patched[name])
//    }
//  })

//  //merge
//  const res = Object.assign({}, ...list) as T
//  delete res.$overrides; delete res.$name
//  return res
//}


//export const classNamess = <T extends Muix.CSSPropertiesNative>(...ruleSets: Array<T | T[]>) => {
//  if (!ruleSets) return null

//  return Object.assign({}, ...ruleSets.filter(p => !!p).map(p => {
//    if (Array.isArray(p)) return Object.assign({}, ...p)
//    else return p
//  })) as T
//}

