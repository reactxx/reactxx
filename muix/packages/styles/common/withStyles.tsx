import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { MuiThemeContextTypes, MuiOverridesContextTypes, getDefaultTheme, classesToPlatformSheet } from './index'
import { toPlatformRuleSet, toPlatformSheet, clearSystemProps } from 'muix-styles'
import warning from 'invariant'
//import { getAnimations } from 'muix-animation'

const withStyles = <R extends ReactXX.Shape>(sheetOrCreator: ReactXX.SheetOrCreator<R>, options: Muix.WithStylesOptionsNew) => (Component: ReactXX.CodeComponentType<R>) => {

  class Styled extends React.PureComponent<ReactXX.PropsX<R>> {
    usedChildOverrides: ReactXX.Sheets = {}
    codeClasses: ReactXX.Sheet<R>
    animations: Animation.Drivers<{ }>
    theme: Muix.Theme
    cacheItem: Muix.SheetCacheItem

    constructor(props: ReactXX.PropsX<R>, context: TContext) {
      super(props, context)

      const theme = this.theme = context.theme || getDefaultTheme()

      //*** caching aplyThemeToSheet result in actual theme (in its .$sheetCache prop)
      if (!theme.$sheetCache) theme.$sheetCache = []
      let cacheItem = theme.$sheetCache.find(it => it.sheetOrCreator === sheetOrCreator)
      if (!cacheItem) theme.$sheetCache.push(cacheItem = aplyThemeToSheet(sheetOrCreator, theme, options.name))
      this.cacheItem = cacheItem

      //if (options.name === 'MuiText') console.log(cacheItem)

      //*** apply childOverrides from context
      const fromParentContext = context.childOverrides && context.childOverrides[options.name]
      this.codeClasses = fromParentContext ? deepMerges(false, {}, cacheItem.fromTheme, fromParentContext) : cacheItem.fromTheme // modify static sheet 
      for (const p in this.codeClasses) this.codeClasses[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = null //getAnimations(cacheItem.fromTheme.$animations, this)
    }

    getChildContext() { return { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getRulesetWithSideEffect is called)*/ } }

    componentWillReceiveProps() {
      this.animations.reset()
    }

    render() {
      const { flip: flipProp, name } = options
      const { theme, cacheItem, animations } = this
      const { classes: classesPropX, style, $web, $native, onClick, className: rulesetX, ...other } = this.props as ReactXX.PropsX<ReactXX.Shape> & ReactXX.OnPressAllWeb

      //****************************  getRulesetWithSideEffect
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = classesToPlatformSheet(theme, classesPropX as Muix.ThemeValueOrCreator<ReactXX.PartialSheetX<R>>)
      const usedOverrides = {}
      const mergeRulesetWithOverrides: ReactXX.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => { // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
        rulesets.forEach(ruleset => { // acumulate $overrides and $childOverrides
          if (!ruleset) return
          mergeOverrides(usedOverrides, ruleset.$overrides)
          //mergeOverrides(this.usedChildOverrides, ruleset.$childOverrides) //modify react context for 
        })
        //apply used $overrides and classes prop
        const rulesetResult: typeof rulesets[0] = {}
        rulesets.forEach(ruleset => {
          if (!ruleset) return
          deepMerges(true, rulesetResult,
            ruleset, //ruleset, used in Component render
            usedOverrides[ruleset.$name], //modify it with used $overrides
            classesProp && ruleset.$name && classesProp[ruleset.$name], //force using classes component property (it has highter priority)
          )
        })
        return rulesetResult as ReactXX.RulesetX
      }

      const cn = null //(typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as ReactXX.RulesetX
      const className = toPlatformRuleSet(cn)
      const flip = typeof flipProp === 'boolean' ? flipProp : theme.direction === 'rtl'

      const newProps = { ...other, ...(window.isWeb ? $web : $native), theme, style: clearSystemProps(toPlatformRuleSet(style as any)), classes: this.codeClasses, className, mergeRulesetWithOverrides, animations } as ReactXX.CodeProps<R> & {onClick, onPress}
      if (window.isWeb) {
        const cl = ($web && ($web as any).onClick) || onClick
        if (cl) newProps.onClick = cl
      } else {
        const cl = ($native && ($native as any).onPress) || onClick
        newProps.onPress = cl
      }

      //newProps.classes = this.codeClasses
      return <Component {...newProps } />
    }

    static contextTypes = { ...MuiThemeContextTypes, ...MuiOverridesContextTypes }
    static childContextTypes = MuiOverridesContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  const styled: any = Styled
  return styled as React.ComponentClass<ReactXX.PropsX<R>>
}

export default withStyles


//*************************************************************** 
// HELPERS
//***************************************************************

type TContext = Muix.MuiThemeContextValue & Muix.MuiOverridesContext

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = <R extends ReactXX.Shape>(sheetOrCreator: ReactXX.SheetOrCreator, theme: Muix.Theme, name: string) => {
  const overrides = null //(theme.overrides && name && theme.overrides[name]) as ReactXX.Sheet<R>
  const styles = null //(typeof sheetOrCreator === 'function' ? sheetOrCreator(theme) : sheetOrCreator)
  const res: ReactXX.Sheet<R> = overrides ? deepMerges(false, {}, styles, overrides) : styles //deepMerge only when needed
  return { sheetOrCreator, fromTheme: res } as Muix.SheetCacheItem
}

// merge named values
const mergeOverrides = (result, patches) => {
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
      } else {
        //if (source[key]['_interpolation']) {
        //  //const dump = deepMerge({}, { x: Object.keys(source[key]) })
        //  const dump = { x: Object.keys(source[key]) }
        //  console.log('#### MERGE', key, source[key]._parent.__getValue(), source[key]._interpolation(source[key]._parent.__getValue()))
        //}
        target[key] = source[key]
      }
    }
  else
    throw 'deepMerge: cannot merge object and non object'
  return target
}
const deepMerges = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop

