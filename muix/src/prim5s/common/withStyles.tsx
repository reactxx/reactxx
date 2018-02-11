import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { toPlatformRuleSet, toPlatformSheet, applyTheme, deepMerge } from './index'
import { MuiThemeContextTypes, MuiCascadingContextTypes, getDefaultTheme } from './theme'
import warning from 'warning'
import { getAnimations } from './animation'

const withStyles = <R extends Prim5s.Shape>(sheetOrCreator: Prim5s.SheetOrCreator<R>, options: Prim5s.WithStylesOptionsNew) => (Component: Prim5s.CodeComponentType<R>) => {

  const { name } = options
  //warning(!!name || allNames[name], `Empty or duplicated withStyle options.name: "${name}"`)
  allNames[name] = true

  class Styled extends React.PureComponent<Prim5s.PropsX<R>> {
    usedChildCascading: Prim5s.Sheets = {}
    withParentContext: Prim5s.Sheet
    animations: Animation.Drivers<{}>
    theme: Prim5s.getTheme<R>

    constructor(props: Prim5s.PropsX<R>, context: TContext) {
      super(props, context)

      //const theme: ThemeWithCache = this.theme = context.theme || getDefaultTheme()

      //*** caching aplyThemeToSheet result in actual theme (in its .$sheetsCache prop)
      const staticSheet = aplyThemeToSheet(sheetOrCreator, this.themeGetter, name)

      //if (options.name === 'MuiText') console.log(cacheItem)

      //*** apply childCascading from context
      const fromParentContext = context.childCascading && context.childCascading[name]
      this.withParentContext = fromParentContext ? deepMerges(false, {}, staticSheet, fromParentContext) : staticSheet // modify static sheet 
      for (const p in this.withParentContext) this.withParentContext[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = getAnimations(staticSheet.$animations, this)
    }

    getChildContext() { return { childCascading: this.usedChildCascading /*usedChildCascading is modified during Component render (where getRulesetWithSideEffect is called)*/ } }

    componentWillReceiveProps() { this.animations.reset() }

    themeGetter() {
      if (this.theme) return this.theme
      return this.theme = this.context.theme || getDefaultTheme()
    }

    render() {
      const { flip: flipProp, name } = options
      const { animations, theme } = this
      const { classes: classesPropX, style, $web, $native, onClick, className: rulesetX, ...other } = this.props as Prim5s.PropsX & Prim5s.OnClick

      //****************************  getRulesetWithSideEffect 
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$cascading to modify self sheet
      // - sheet..$childCascading to modify children sheet (passed to children via context.childCascading) 
      const classesProp = toPlatformSheet(applyTheme(this.themeGetter, classesPropX as Prim5s.FromThemeValueOrCreator<R, Prim5s.PartialSheetX<R>>))
      // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $cascading and $childCascading props to modify self sheet and child sheets
      const mergeRulesetWithCascading = createRulesetWithCascadingMerger(classesProp, this.usedChildCascading)

      //const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as Prim5s.TRulesetX
      const className = toPlatformRuleSet(applyTheme(this.themeGetter, rulesetX))
      const flip = typeof flipProp === 'boolean' ? flipProp : (theme && theme.direction === 'rtl')

      const newProps = {
        ...other, ...(window.isWeb ? $web : $native), theme,
        flip, mergeRulesetWithCascading, animations,
        classes: this.withParentContext, //all code component, for root lower priority than className and style. Classes are used by getRulesetWithSideEffect prop in Component.render
        className, //code root by means of className (web) or style (native)
        style: clearSystemProps(toPlatformRuleSet(applyTheme(this.themeGetter, style))), //code root by means of style (higher priority than className)
      } as Prim5s.CodeProps<R>

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

    static contextTypes = { ...MuiThemeContextTypes, ...MuiCascadingContextTypes }
    static childContextTypes = MuiCascadingContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  const styled: any = Styled
  return styled as React.ComponentClass<Prim5s.PropsX<R>>
}
const allNames = {}

const clearSystemProps = obj => {
  if (!obj) return obj
  delete obj.$overrides; delete obj.$childOverrides; delete obj.$name; delete obj.$web; delete obj.$native
  return obj
}

export default withStyles

interface ThemeWithCache extends Prim5s.Theme {
  $sheetsCache?: Prim5s.Sheets
}

//****************************  getRulesetWithSideEffect
// Could be called in <Component> render method to compute component styles. Side effects:
// - use sheet..$cascading to modify self sheet
// - sheet..$childCascading to modify children sheet (passed to children via context.childCascading) 
const createRulesetWithCascadingMerger = (classesProp: Prim5s.Sheet, usedChildCascading: Prim5s.Sheets) => {
  const usedCascading: Prim5s.Sheet = {}
  const res: Prim5s.MergeRulesetWithCascading = (...rulesets/*all used rulesets*/) => {
    rulesets.forEach(ruleset => { // acumulate $cascading and $childCascading
      if (!ruleset) return
      mergeCascading(usedCascading, ruleset.$cascading)
      mergeCascading(usedChildCascading, ruleset.$childCascading) //modify react context with child component overriding
    })
    //apply used $cascading and classes prop
    const rulesetResult: typeof rulesets[0] = {}
    rulesets.forEach(ruleset => {
      if (!ruleset) return
      deepMerges(true, rulesetResult,
        ruleset, //ruleset, used in Component render
        usedCascading[ruleset.$name], //modify it with used $cascading
        classesProp && ruleset.$name && classesProp[ruleset.$name], //force using classes component property (it has hight priority)
      )
    })
    return rulesetResult
  }
  return res
}

//*************************************************************** 
// HELPERS
//***************************************************************

type TContext = Prim5s.MuiThemeContextValue & Prim5s.MuiCascadingContext

//apply theme to sheet AND merge it with theme.cascading
const aplyThemeToSheet = (sheetOrCreator: Prim5s.SheetOrCreator, themerCreator: () => ThemeWithCache, name: string) => {

  if (typeof sheetOrCreator != 'function') return sheetOrCreator

  const theme = themerCreator()

  //already in cache?
  let res: Prim5s.Sheet = theme.$sheetsCache && theme.$sheetsCache[name]
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
const mergeCascading = (result, patches) => {
  if (!patches) return
  for (const p in patches) {
    const patch = patches[p]; if (!patch) continue
    if (!result[p]) result[p] = {}
    deepMerge(result[p], patch, false)
  }
}

const deepMerges = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}


