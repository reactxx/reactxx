import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { MuiThemeContextTypes, MuiOverridesContextTypes, getDefaultTheme, classesToPlatformSheet } from '../common/index'
import { toPlatformSheet, toPlatformRuleSet } from 'muix-styles'
import warning from 'invariant'

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, theme: Muix.ThemeNew, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Muix.Sheet<R>
  const styles = (typeof sheetOrCreator === 'function' ? sheetOrCreator(theme) : sheetOrCreator)
  return overrides ? deepMerges(false, {}, styles, overrides) : styles //deepMerge only when needed
}

type TContext = Muix.MuiThemeContextValue & Muix.MuiOverridesContext

export const withStyles = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, options: Muix.WithStylesOptionsNew) => (Component: Muix.CodeComponentType<R>) => {

  class Styled extends React.PureComponent<Muix.PropsX<R>> {
    newProps: Muix.CodeProps<R>
    usedChildOverrides: Muix.Sheets = {}
    codeClasses: Muix.Sheet<R>

    constructor(props: Muix.PropsX<R>, context: TContext) {
      super(props, context)
      const { flip, name } = options
      const { classes: _classes, style, web, native, onClick, onPress, ...other } = props as Muix.PropsX<Muix.Shape>

      const theme = this.context.theme || getDefaultTheme()

      //caching aplyThemeToSheet result in actual theme (in its .$sheetCache prop)
      let cacheItem = theme.$sheetCache.find(it => it.sheetOrCreator === sheetOrCreator)
      if (!cacheItem) theme.$sheetCache.push(cacheItem = { sheetOrCreator, fromTheme: aplyThemeToSheet(sheetOrCreator, theme, name) })

      //console.log('1', toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>))

      const fromParentContext = context.overrides && context.overrides[options.name]
      this.codeClasses = fromParentContext ? deepMerges(false, {}, cacheItem.fromTheme, fromParentContext) : cacheItem.fromTheme
      for (const p in this.codeClasses) this.codeClasses[p].$name = p // assign name to ruleSets. $name is used in getStyleWithSideEffect to recognize used rulesets

      // Could be called in <Component> render method. Side effect:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet
      const classesProp = typeof _classes === 'function' ? _classes(theme) : _classes
      const usedOverrides = {}
      const getStyleWithSideEffect: Muix.TClassnames = (...rulesets/*all used rulesets*/) => {
        rulesets.forEach(ruleset => { // acumulate $overrides and $childOverrides
          if (!ruleset) return
          mergeOverride(usedOverrides, ruleset.$overrides)
          mergeOverride(this.usedChildOverrides, ruleset.$childOverrides) //modify react context for 
        })
        const res: typeof rulesets[0] = {}
        rulesets.forEach(ruleset => {
          if (!ruleset) return
          deepMerges(true, res, /*ruleset, used in Component render*/ruleset, /*modify it with used overrides*/usedOverrides[ruleset.$name], /*force classes prop, it cannot be overrided */classesProp && classesProp[ruleset.$name])
        })
        return res
      }

      this.newProps = { ...other, ...(window.isWeb ? web : native), theme, style: toPlatformRuleSet(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl', getStyleWithSideEffect} as Muix.CodeProps<R>
      if (onPress || onClick) this.newProps.onPress = onPress || onClick
    }

    getChildContext() { return { overrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render, where getStyleWithSideEffect is called*/ } }

    render() {
      this.newProps.classes = this.codeClasses 
      return <Component {...this.newProps } />
    }

    static contextTypes = { ...MuiThemeContextTypes, ...MuiOverridesContextTypes }
    static childContextTypes = MuiOverridesContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  return Styled
}

const mergeOverride = (result, patches) => {
  if (!patches) return
  for (const p in patches) {
    const patch = patches[p]; if (!patch) continue
    if (!result[p]) result[p] = {}
    deepMerge(false, result[p], patch)
  }
}

const deepMerge = (skipSystem: boolean, target, source) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      if (skipSystem && key[0] === '$') continue //skip $override, $overrides and $name props
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {}
        deepMerge(skipSystem, target[key], source[key])
      } else
        target[key] = source[key]
    }
  else
    throw 'deepMerge: cannot merge object and non object'
  return target
}
const deepMerges = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(skipSystem, target, source))
  return target
}
const isObject = item => item && typeof item === 'object' && !Array.isArray(item)

export default withStyles

//type CSSPropertiesNative = Muix.CSSPropertiesNative & Muix.RulesetOverridesNative<Muix.Shape>

//export const classNames = <T extends CSSPropertiesNative>(override, overrides: Muix.Sheets, ...ruleSets: Array<T>) => {
//  if (!ruleSets) return null
//  //console.log('classNames, ruleSets', ruleSets)
//  //extract ruleset patches
//  const list: T[] = []
//  ruleSets.map(r => {
//    if (!r) return
//    const { $name, $overrides, $childOverrides } = r
//    if (!$name) { //e.g. 'style' as last argument
//      list.push(r)
//      return
//    }
//    const patch = override[$name]
//    //console.log('classNames, patch', patch)
//    override[$name] = patch ? Object.assign(r, patch) : r
//    list.push(override[$name])
//    if (!r.$overrides) return
//    for (const p in r.$overrides) {
//      const patch = r.$overrides[p] as T
//      const name = p
//      const rule = override[name]
//      override[name] = rule ? Object.assign(rule, patch) : patch
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

