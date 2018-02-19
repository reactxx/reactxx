import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { toPlatformRuleSet, toPlatformSheet, applyTheme, deepMerge } from './index'
import { MuiThemeContextTypes, MuiOverridesContextTypes, getDefaultTheme } from './theme'
import warning from 'warning'
import { getAnimations } from './animation'

const withStyles = <R extends ReactXX.Shape>(sheetOrCreator: ReactXX.SheetOrCreator<R>, options: ReactXX.WithStylesOptionsNew) => (Component: ReactXX.CodeComponentType<R>) => {

  const { name } = options
  //warning(!!name || allNames[name], `Empty or duplicated withStyle options.name: "${name}"`)
  allNames[name] = true

  class Styled extends React.PureComponent<ReactXX.PropsX<R>> {
    usedChildOverrides: ReactXX.Sheets = {}
    withParentContext: ReactXX.Sheet
    animations: Animation.Drivers<{}>
    theme: ReactXX.getTheme<R>

    constructor(props: ReactXX.PropsX<R>, context: TContext) {
      super(props, context)

      //const theme: ThemeWithCache = this.theme = context.theme || getDefaultTheme()

      //*** caching aplyThemeToSheet result in actual theme (in its .$sheetsCache prop)
      const staticSheet = aplyThemeToSheet(sheetOrCreator, this.themeGetter, name)

      //if (options.name === 'MuiText') console.log(cacheItem)

      //*** apply childOverrides from context
      const fromParentContext = context.childOverrides && context.childOverrides[name]
      this.withParentContext = fromParentContext ? deepMerges(false, {}, staticSheet, fromParentContext) : staticSheet // modify static sheet 
      for (const p in this.withParentContext) {
        try {
          this.withParentContext[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets
        } catch {
          console.log('*** ERROR propName: ', p) 
        }
      }

      //*** init animations
      this.animations = getAnimations(staticSheet.$animations, this)
    }

    getChildContext() { return { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getRulesetWithSideEffect is called)*/ } }

    componentWillReceiveProps() { this.animations && this.animations.reset() }

    themeGetter = (() => {
      if (this.theme) return this.theme
      return this.theme = this.context.theme || getDefaultTheme()
    }).bind(this)

    render() {
      const { flip: flipProp, name } = options
      const { animations, theme } = this
      const { classes: classesPropX, style, $web, $native, onPress, onLongPress, onPressIn, onPressOut, className: rulesetX, ...other } = this.props as ReactXX.PropsX & ReactXX.OnPressAllX

      //****************************  getRulesetWithSideEffect 
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = toPlatformSheet(applyTheme(this.themeGetter, classesPropX as ReactXX.FromThemeValueOrCreator<R, ReactXX.PartialSheetX<R>>))
      // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(classesProp, this.usedChildOverrides)

      //const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as ReactXX.TRulesetX
      const className = toPlatformRuleSet(applyTheme(this.themeGetter, rulesetX))
      const flip = typeof flipProp === 'boolean' ? flipProp : (theme && theme.direction === 'rtl')

      const codeProps = {
        ...other, ...(window.isWeb ? $web : $native), theme,
        flip, mergeRulesetWithOverrides, animations,
        classes: this.withParentContext, //all code component, for root lower priority than className and style. Classes are used by getRulesetWithSideEffect prop in Component.render
        className: className, //code root by means of className (web) or style (native)
        style: toPlatformRuleSet(applyTheme(this.themeGetter, style)), //code root by means of style (higher priority than className)
      } as ReactXX.CodeProps<R>

      toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      //newProps.classes = this.codeClasses
      //console.log(codeProps.style)
      return <Component {...codeProps} />
    }

    static contextTypes = { ...MuiThemeContextTypes, ...MuiOverridesContextTypes }
    static childContextTypes = MuiOverridesContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  const styled: any = Styled
  return styled as React.ComponentClass<ReactXX.PropsX<R>>
}
const allNames = {}

const clearSystemProps = obj => {
  if (!obj) return obj
  delete obj.$overrides; delete obj.$childOverrides; delete obj.$name; delete obj.$web; delete obj.$native
  return obj
}

export default withStyles

interface ThemeWithCache extends ReactXX.Theme {
  $sheetsCache?: ReactXX.Sheets
}

const toPlatformEvents = ($web: ReactXX.OnPressAllWeb, $native: ReactXX.OnPressAllNative, propsX: ReactXX.OnPressAllX, codeProps: ReactXX.CodeProps) => {
  const { onPress, onLongPress, onPressIn, onPressOut } = propsX
  if (window.isWeb) {
    const cp = codeProps as ReactXX.CodePropsWeb
    const cl = $web && $web.onClick || onPress; if (cl) cp.onClick = cl
    const cl2 = $web && $web.onMouseDown || onPressIn; if (cl2) cp.onMouseDown = cl2
    const cl3 = $web && $web.onMouseUp || onPressOut; if (cl3) cp.onMouseUp = cl3
  } else {
    const cp = codeProps as ReactXX.CodePropsNative
    const cl = $native && $native.onPress || onPress; if (cl) cp.onPress = cl
    const cl1 = $native && $native.onLongPress || onLongPress; if (cl1) cp.onLongPress = cl1
    const cl2 = $native && $native.onPressIn || onPressIn; if (cl2) cp.onPressIn = cl2
    const cl3 = $native && $native.onPressOut || onPressOut; if (cl3) cp.onPressOut = cl3
  }
}

//****************************  getRulesetWithSideEffect
// Could be called in <Component> render method to compute component styles. Side effects:
// - use sheet..$overrides to modify self sheet
// - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides)
const createRulesetWithOverridesMerger = (classesProp: ReactXX.Sheet, usedChildOverrides: ReactXX.Sheets) => {
  const usedOverrides: ReactXX.Sheet = {}
  const res: ReactXX.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
    let single = undefined //optimalization: rulesets contains ony not empty item
    rulesets.forEach(ruleset => { // acumulate $overrides and $childOverrides
      if (!ruleset) return
      if (single === undefined) single = ruleset //first not empty
      else if (single !== null) single = null //second not empty
      mergeOverrides(usedOverrides, ruleset.$overrides)
      mergeOverrides(usedChildOverrides, ruleset.$childOverrides) //modify react context with child component overriding
    })
    if (single === undefined) return {}
    const rulesetResult: typeof rulesets[0] = {}
    if (single) {
      //nothing to merge?
      const other = [
        single, // ruleset, used in Component render
        usedOverrides[single.$name], //... modify it with used $overrides
        classesProp && single.$name && classesProp[single.$name] //... and force using classes component property (it has hight priority)
      ]
      if (other.filter(s => !!s).length <= 1) return clearSystemProps(single) //otimalization: nothing to merge
      deepMerges(true, rulesetResult, ...other)
    }
    //apply used $overrides and classes prop
    else
      rulesets.forEach(ruleset => {
        if (!ruleset) return
        deepMerges(true, rulesetResult,
          ruleset, //ruleset, used in Component render
          usedOverrides[ruleset.$name], //modify it with used $overrides
          classesProp && ruleset.$name && classesProp[ruleset.$name], //force using classes component property (it has hight priority)
        )
      })
    return clearSystemProps(rulesetResult)
  }
  return res
}

//*************************************************************** 
// HELPERS
//***************************************************************

type TContext = ReactXX.ThemeContextValue & ReactXX.OverridesContext

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = (sheetOrCreator: ReactXX.SheetOrCreator, themerCreator: () => ThemeWithCache, name: string) => {

  if (typeof sheetOrCreator != 'function') return sheetOrCreator

  const theme = themerCreator()

  //already in cache?
  let res: ReactXX.Sheet = theme.$sheetsCache && theme.$sheetsCache[name]
  if (res) return res

  const sheet = applyTheme(theme, sheetOrCreator) //apply theme to sheet
  const override = (theme.overrides && theme.overrides[name]) //find sheet override in theme
  res = override ? deepMerges(false, {}, sheet, override) : sheet //deepMerge only when needed

  //put to cache
  if (!theme.$sheetsCache) theme.$sheetsCache = {}
  theme.$sheetsCache[name] = res

  return res
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

const deepMerges = (skipSystem: boolean, target, ...sources) => {
  //if (!sources || !sources.find(s => !!s)) return target 
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}


