import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { toPlatformRuleSet, toPlatformSheet, clearSystemProps, MuiThemeContextTypes, MuiOverridesContextTypes, getDefaultTheme, applyTheme } from './index'
import warning from 'invariant'
import { getAnimations } from './animation'

const withStyles = <R extends Prim5s.Shape>(sheetOrCreator: Prim5s.SheetOrCreator<R>, options: Prim5s.WithStylesOptionsNew) => (Component: Prim5s.CodeComponentType<R>) => {

  const { name } = options
  warning(!!name || allNames[name], `Empty or duplicated withStyle options.name: "${name}"`)
  allNames[name] = true

  class Styled extends React.PureComponent<Prim5s.PropsX<R>> {
    usedChildOverrides: Prim5s.Sheets = {}
    withParentContext: Prim5s.Sheet
    animations: Animation.Drivers<{}>
    theme: Prim5s.getTheme<R>

    constructor(props: Prim5s.PropsX<R>, context: TContext) {
      super(props, context)

      const theme: ThemeWithCache = this.theme = context.theme || getDefaultTheme()

      //*** caching aplyThemeToSheet result in actual theme (in its .$sheetCache prop)
      const cacheItem = aplyThemeToSheet(sheetOrCreator, theme, name)

      //if (options.name === 'MuiText') console.log(cacheItem)

      //*** apply childOverrides from context
      const fromParentContext = context.childOverrides && context.childOverrides[name]
      this.withParentContext = fromParentContext ? deepMerges(false, {}, cacheItem, fromParentContext) : cacheItem // modify static sheet 
      for (const p in this.withParentContext) this.withParentContext[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = getAnimations(cacheItem.$animations, this)
    }

    getChildContext() { return { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getRulesetWithSideEffect is called)*/ } }

    componentWillReceiveProps() {
      this.animations.reset()
    }

    render() {
      const { flip: flipProp, name } = options
      const { theme, animations } = this
      const { classes: classesPropX, style, $web, $native, onClick, className: rulesetX, ...other } = this.props as Prim5s.PropsX<Prim5s.Shape> & Prim5s.TOnClickWeb
      const cacheItem = theme[name]

      //****************************  getRulesetWithSideEffect
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = toPlatformSheet(applyTheme(theme, classesPropX as Prim5s.ThemeValueOrCreator<R, Prim5s.PartialSheetX<R>>))
      // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      const getRulesetWithSideEffect = createRulesetWithSideEffect(classesProp, this.usedChildOverrides)

      //const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as Prim5s.TRulesetX
      const className = toPlatformRuleSet(applyTheme(theme, rulesetX))
      const flip = typeof flipProp === 'boolean' ? flipProp : theme.direction === 'rtl'

      const newProps = {
        ...other, ...(window.isWeb ? $web : $native), theme,
        flip, getRulesetWithSideEffect, animations,
        classes: this.withParentContext, //all code component, for root lower priority than className and style. Classes are used by getRulesetWithSideEffect prop in Component.render
        className, //code root by means of className (web) or style (native)
        style: clearSystemProps(toPlatformRuleSet(applyTheme(theme, style))), //code root by means of style (higher priority than className)
      } as Prim5s.CodeProps<R> & { onClick, onPress }

      if (window.isWeb) {
        const cl = ($web && ($web as any).onClick) || onClick
        if (cl) newProps.onClick = cl
      } else {
        const cl = ($native && ($native as any).onPress) || onClick
        newProps.onPress = cl
      }

      //newProps.classes = this.codeClasses
      return <Component {...newProps} />
    }

    static contextTypes = { ...MuiThemeContextTypes, ...MuiOverridesContextTypes }
    static childContextTypes = MuiOverridesContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  const styled: any = Styled
  return styled as React.ComponentClass<Prim5s.PropsX<R>>
}
const allNames = {}

export default withStyles

interface ThemeWithCache extends Prim5s.Theme {
  $sheetCache?: Prim5s.Sheets
}

//****************************  getRulesetWithSideEffect
// Could be called in <Component> render method to compute component styles. Side effects:
// - use sheet..$overrides to modify self sheet
// - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
const createRulesetWithSideEffect = (classesProp: Prim5s.Sheet, usedChildOverrides: Prim5s.Sheets) => {
  const usedOverrides: Prim5s.Sheet = {}
  const res: Prim5s.StyleWithSideEffect = (...rulesets/*all used rulesets*/) => {
    rulesets.forEach(ruleset => { // acumulate $overrides and $childOverrides
      if (!ruleset) return
      mergeOverride(usedOverrides, ruleset.$overrides)
      mergeOverride(usedChildOverrides, ruleset.$childOverrides) //modify react context with child component overriding
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
  return res
}



//*************************************************************** 
// HELPERS
//***************************************************************

type TContext = Prim5s.MuiThemeContextValue & Prim5s.MuiOverridesContext

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = (sheetOrCreator: Prim5s.SheetOrCreator, theme: ThemeWithCache, name: string) => {
  let res: Prim5s.Sheet = theme.$sheetCache && theme.$sheetCache[name]
  if (res) return res

  const override = (theme.overrides && theme.overrides[name])
  const sheet = applyTheme(theme, sheetOrCreator)
  res = override ? deepMerges(false, {}, sheet, override) : sheet //deepMerge only when needed

  if (!theme.$sheetCache) theme.$sheetCache = {}
  theme.$sheetCache[name] = res

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
const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && typeof item['_interpolation'] != 'function' //typeof item['_interpolation'] != 'function' prevent to merge ReactNative's Animated.Value.interpolate prop


