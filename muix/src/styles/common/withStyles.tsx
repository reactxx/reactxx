import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { MuiThemeContextTypes, MuiOverridesContextTypes, getDefaultTheme, classesToPlatformSheet } from '../common/index'
import { toPlatformRuleSet, clearSystemProps } from 'muix-styles'
import warning from 'invariant'

const withStyles = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, options: Muix.WithStylesOptionsNew) => (Component: Muix.CodeComponentType<R>) => {

  class Styled extends React.PureComponent<Muix.PropsX<R>> {
    newProps: Muix.CodeProps<R>
    usedChildOverrides: Muix.Sheets = {}
    codeClasses: Muix.Sheet<R>

    constructor(props: Muix.PropsX<R>, context: TContext) {
      super(props, context)
      const { flip, name } = options
      const { classes: _classes, style, web, native, onClick, ...other } = props as Muix.PropsX<Muix.Shape> & Muix.TOnClickWeb
      const onPressNative = native && (native as any).onPress
      const onClickWeb: Muix.TOnClickWeb = web && (web as any).onClick

      let theme = context.theme || getDefaultTheme()

      //caching aplyThemeToSheet result in actual theme (in its .$sheetCache prop)
      if (!theme.$sheetCache) theme.$sheetCache = []
      let cacheItem = theme.$sheetCache.find(it => it.sheetOrCreator === sheetOrCreator)
      if (!cacheItem) theme.$sheetCache.push(cacheItem = { sheetOrCreator, fromTheme: aplyThemeToSheet(sheetOrCreator, theme, name) })

      //console.log('1', toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheetX<R>))

      //console.log(name, 'context.childOverrides', context.childOverrides)
      const fromParentContext = context.childOverrides && context.childOverrides[options.name]
      //console.log('fromParentContext: ',fromParentContext)
      this.codeClasses = fromParentContext ? deepMerges(false, {}, cacheItem.fromTheme, fromParentContext) : cacheItem.fromTheme // modify static sheet 
      //console.log('cacheItem.fromTheme: ',cacheItem.fromTheme)
      for (const p in this.codeClasses) this.codeClasses[p].$name = p // assign name to ruleSets. $name is used in getStyleWithSideEffect to recognize used rulesets

      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = classesToPlatformSheet(theme, _classes)
      //if (classesProp) console.log('### classesProp', classesProp)
      const usedOverrides = {}
      const getStyleWithSideEffect: Muix.TClassnames = (...rulesets/*all used rulesets*/) => {
        //console.log('getStyleWithSideEffect', rulesets)
        rulesets.forEach(ruleset => { // acumulate $overrides and $childOverrides
          if (!ruleset) return
          mergeOverride(usedOverrides, ruleset.$overrides)
          mergeOverride(this.usedChildOverrides, ruleset.$childOverrides) //modify react context for 
        })
        //console.log('this.usedChildOverrides', this.usedChildOverrides)
        const rulesetResult: typeof rulesets[0] = {}
        rulesets.forEach(ruleset => {
          if (!ruleset) return
          //if (classesProp && ruleset.$name=='root') console.log('### BEFORE', rulesetResult)
          deepMerges(true, rulesetResult, /*ruleset, used in Component render*/ruleset, /*modify it with used $overrides*/usedOverrides[ruleset.$name], /*force using classes component property, its rulesets cannot be overrided */classesProp && classesProp[ruleset.$name])
          //if (classesProp && ruleset.$name == 'root') console.log('### AFTER', rulesetResult)
        })
        return rulesetResult
      }

      this.newProps = { ...other, ...(window.isWeb ? web : native), theme, style: clearSystemProps(toPlatformRuleSet(style)), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl', getStyleWithSideEffect } as Muix.CodeProps<R>
      if (window.isWeb) this.newProps.onClick = onClickWeb || onClick
      else this.newProps.onPress = onPressNative || onClick
      
    }

    getChildContext() { return { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getStyleWithSideEffect is called)*/ } }

    render() {
      this.newProps.classes = this.codeClasses 
      return <Component {...this.newProps } />
    }

    static contextTypes = { ...MuiThemeContextTypes, ...MuiOverridesContextTypes }
    static childContextTypes = MuiOverridesContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  //return Styled: error when compiling with "declaration": true in tsconfig.json
  const styled: any = Styled 
  return styled as React.ComponentClass<Muix.PropsX<R>>
}

export default withStyles

//********************* HELPERS
type TContext = Muix.MuiThemeContextValue & Muix.MuiOverridesContext

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = <R extends Muix.Shape>(sheetOrCreator: Muix.SheetOrCreator<R>, theme: Muix.ThemeNew, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Muix.Sheet<R>
  //console.log('###BEFORE', overrides)
  const styles = (typeof sheetOrCreator === 'function' ? sheetOrCreator(theme) : sheetOrCreator) 
  const res = overrides ? deepMerges(false, {}, styles, overrides) : styles //deepMerge only when needed
  //console.log('###AFTER', res.root)
  return res
}

// merge named values
const mergeOverride = (result, patches) => {
  if (!patches) return
  for (const p in patches) {
    const patch = patches[p]; if (!patch) continue
    if (!result[p]) result[p] = {}
    deepMerge(result[p], patch, false)
  }
}

//simple deep merge
export const deepMerge = (target, source, skipSystem = false) => {
  if (!source) return target
  if (isObject(target) && isObject(source))
    for (const key in source) {
      if (skipSystem && key[0] === '$') continue //skip $override, $overrides and $name props
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {}
        deepMerge(target[key], source[key], skipSystem)
      } else
        target[key] = source[key]
    }
  else
    throw 'deepMerge: cannot merge object and non object'
  return target
}
const deepMerges = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}
const isObject = item => item && typeof item === 'object' && !Array.isArray(item)

