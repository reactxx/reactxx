import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { MuiThemeContextTypes, MuiOverridesContextTypes, getDefaultTheme, classesToPlatformSheet, applyTheme } from './index'
import { toPlatformRuleSet, toPlatformSheet, clearSystemProps } from 'muix-styles'
import warning from 'invariant'
import { getAnimations } from 'muix-animation'

const withStyles = <R extends Prim5s.Shape>(sheetOrCreator: Prim5s.SheetOrCreator<R>, options: Prim5s.WithStylesOptionsNew) => (Component: Prim5s.CodeComponentType<R>) => {

  class Styled extends React.PureComponent<Prim5s.PropsX<R>> {
    usedChildOverrides: Prim5s.Sheets = {}
    codeClasses: Prim5s.Sheet<R>
    animations: Animation.Drivers<{}>
    theme: Prim5s.getTheme<R>
    cacheItem: Prim5s.SheetCacheItem

    constructor(props: Prim5s.PropsX<R>, context: TContext) {
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
      this.animations = getAnimations(cacheItem.fromTheme.$animations, this)
    }

    getChildContext() { return { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getRulesetWithSideEffect is called)*/ } }

    componentWillReceiveProps() {
      this.animations.reset()
    }

    render() {
      const { flip: flipProp, name } = options
      const { theme, cacheItem, animations } = this
      const { classes: classesPropX, style, $web, $native, onClick, className: rulesetX, ...other } = this.props as Prim5s.PropsX<Prim5s.Shape> & Prim5s.TOnClickWeb

      //****************************  getRulesetWithSideEffect
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = classesToPlatformSheet(theme, classesPropX as Prim5s.ThemeValueOrCreator<R, Prim5s.PartialSheetX<R>>)
      const usedOverrides = {}
      const getRulesetWithSideEffect: Prim5s.StyleWithSideEffect = (...rulesets/*all used rulesets*/) => { // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
        rulesets.forEach(ruleset => { // acumulate $overrides and $childOverrides
          if (!ruleset) return
          mergeOverride(usedOverrides, ruleset.$overrides)
          mergeOverride(this.usedChildOverrides, ruleset.$childOverrides) //modify react context for 
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
        return rulesetResult
      }

      //const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as Prim5s.TRulesetX
      const className = toPlatformRuleSet(applyTheme(theme, rulesetX))
      const flip = typeof flipProp === 'boolean' ? flipProp : theme.direction === 'rtl'

      const newProps = { ...other, ...(window.isWeb ? $web : $native), theme, style: clearSystemProps(toPlatformRuleSet(style)), classes: this.codeClasses, className, flip, getRulesetWithSideEffect, animations } as Prim5s.CodeProps<R> & {onClick, onPress}
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
  return styled as React.ComponentClass<Prim5s.PropsX<R>>
}

export default withStyles


//*************************************************************** 
// HELPERS
//***************************************************************

type TContext = Prim5s.MuiThemeContextValue & Prim5s.MuiOverridesContext

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = <R extends Prim5s.Shape>(sheetOrCreator: Prim5s.SheetOrCreator<R>, theme: Prim5s.Theme, name: string) => {
  const override = (theme.overrides && name && theme.overrides[name])// as Prim5s.Sheet<R>
  const sheet = applyTheme(theme, sheetOrCreator)
  const res: Prim5s.Sheet<R> = override ? deepMerges(false, {}, sheet, override) : sheet //deepMerge only when needed
  return { sheetOrCreator, fromTheme: res } as Prim5s.SheetCacheItem
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


