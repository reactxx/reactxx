import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { toPlatformRuleSet, toPlatformSheet, applyTheme, deepMerge } from './index'
import { ComponentsMediaQ } from './media-q'
import { ThemeContextTypes, ThemeExContextTypes, getDefaultTheme } from './theme'
import warning from 'warning'
import { getAnimations } from './animation'

const sheetCreator = <R extends ReactXX.Shape>(sheetXCreator: ReactXX.FromThemeValueOrCreator<ReactXX.SheetX<R>>) => {
  if (typeof sheetXCreator === 'function') return (theme => toPlatformSheet(applyTheme(theme, sheetXCreator))) as ReactXX.SheetCreator<R>
  return toPlatformSheet(sheetXCreator) //as ReactXX.Sheet<R>
}

export const withStylesEx = <R extends ReactXX.Shape>(_name: ReactXX.getNameType<R>, options: ReactXX.getComponentsTheme<R>, sheetXCreator: ReactXX.FromThemeValueOrCreator2<R, ReactXX.SheetX<R>>) => (Component: ReactXX.CodeComponentType<R>) => {

  const name = _name as string
  const sheetOrCreator = sheetCreator(sheetXCreator)

  class Styled extends React.PureComponent<ReactXX.PropsX<R>> {
    usedChildOverrides: ReactXX.Sheets
    withParentContext: ReactXX.Sheet
    animations: Animation.Drivers
    theme: ReactXX.Theme 
    media: ComponentsMediaQ

    constructor(props: ReactXX.PropsX<R>, context: TContext) {
      super(props, context)

      const childClasses = applyTheme(this.themeGetter, props.childClasses)
      const childOverrides = context.themeEx && context.themeEx.childOverrides
      this.usedChildOverrides = childOverrides && props.childClasses ? deepMerges(false, {}, childOverrides, childClasses) : childOverrides || childClasses

      //*** caching aplyThemeToSheet result in actual theme (in its .$sheetsCache prop)
      const staticSheet = aplyThemeToSheet(sheetOrCreator, this.themeGetter, name, options)

      //*** apply childOverrides from context
      const fromParentContext = childOverrides && childOverrides[name]
      this.withParentContext = fromParentContext ? deepMerges(false, {}, staticSheet, fromParentContext) : staticSheet // modify static sheet 
      for (const p in this.withParentContext) this.withParentContext[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = getAnimations(staticSheet.$animations, this)
      //*** init media queries
      this.media = new ComponentsMediaQ(this)
    }

    getChildContext() { return { themeEx: { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getRulesetWithSideEffect is called)*/ } } as ReactXX.ThemeExContextValue }

    componentWillReceiveProps() { this.animations && this.animations.reset() }
    componentWillUnmount() { this.media.unsubscribe() }

    themeGetter = (() => {
      if (this.theme) return this.theme
      return this.theme = this.context.theme || getDefaultTheme()
    }).bind(this)

    render() {
      //const { flip: flipProp } = options
      const { animations, theme } = this
      const { classes: classesPropX, style, $web, $native, onPress, onLongPress, onPressIn, onPressOut, className: classNameX, childClasses, ignore, ...other } = this.props as ReactXX.PropsX & ReactXX.OnPressAllX

      if (ignore) return null

      //****************************  getRulesetWithSideEffect 
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = toPlatformSheet(applyTheme(this.themeGetter, classesPropX))
      // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides to modify self sheet
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(classesProp, this.media)

      const className = toPlatformRuleSet(applyTheme(this.themeGetter, classNameX))
      //const flip = typeof flipProp === 'boolean' ? flipProp : (theme && theme.direction === 'rtl')

      const codeProps = {
        ...other, ...(window.isWeb ? $web : $native), theme,
        //
        mergeRulesetWithOverrides, animations,
        classes: this.withParentContext,
        className: className,
        style: toPlatformRuleSet(applyTheme(this.themeGetter, style)),
      } as ReactXX.CodeProps<R>

      toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      //newProps.classes = this.codeClasses
      //console.log(codeProps.style)
      return <Component {...codeProps} />
    }

    static contextTypes = { ...ThemeContextTypes, ...ThemeExContextTypes }
    static childContextTypes = ThemeExContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  const styled: any = Styled
  return styled as React.ComponentClass<ReactXX.PropsX<R>>
}

const withStyles = <R extends ReactXX.Shape>(sheetOrCreator: ReactXX.SheetOrCreator<R>, options: ReactXX.WithStylesOptionsNew<ReactXX.getNameType<R>>) => (Component: ReactXX.CodeComponentType<R>) => {

  const name = options.name as string
  //warning(!!name || allNames[name], `Empty or duplicated withStyle options.name: "${name}"`)
  //allNames[name] = true

  class Styled extends React.PureComponent<ReactXX.PropsX<R>> {
    usedChildOverrides: ReactXX.Sheets
    withParentContext: ReactXX.Sheet
    animations: Animation.Drivers<{}>
    theme: ReactXX.Theme //ReactXX.getTheme<R>
    media: ComponentsMediaQ

    constructor(props: ReactXX.PropsX<R>, context: TContext) {
      super(props, context)

      const childClasses = applyTheme(this.themeGetter, props.childClasses)
      const childOverrides = context.themeEx && context.themeEx.childOverrides
      this.usedChildOverrides = childOverrides && props.childClasses ? deepMerges(false, {}, childOverrides, childClasses) : childOverrides || childClasses

      //*** caching aplyThemeToSheet result in actual theme (in its .$sheetsCache prop)
      const staticSheet = aplyThemeToSheet(sheetOrCreator, this.themeGetter, name, options)

      //*** apply childOverrides from context
      const fromParentContext = childOverrides && childOverrides[name]
      this.withParentContext = fromParentContext ? deepMerges(false, {}, staticSheet, fromParentContext) : staticSheet // modify static sheet 
      for (const p in this.withParentContext) this.withParentContext[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = getAnimations(staticSheet.$animations, this)
      //*** init media queries
      this.media = new ComponentsMediaQ(this)
    }

    getChildContext() { return { themeEx: { childOverrides: this.usedChildOverrides /*usedChildOverrides is modified during Component render (where getRulesetWithSideEffect is called)*/ } } as ReactXX.ThemeExContextValue }

    componentWillReceiveProps() { this.animations && this.animations.reset() }
    componentWillUnmount() { this.media.unsubscribe() }

    themeGetter = (() => {
      if (this.theme) return this.theme
      return this.theme = this.context.theme || getDefaultTheme()
    }).bind(this)

    render() {
      const { flip: flipProp } = options
      const { animations, theme } = this
      const { classes: classesPropX, style, $web, $native, onPress, onLongPress, onPressIn, onPressOut, className: classNameX, childClasses, ignore, ...other } = this.props as ReactXX.PropsX & ReactXX.OnPressAllX

      if (ignore) return null

      //****************************  getRulesetWithSideEffect 
      // Could be called in <Component> render method to compute component styles. Side effects:
      // - use sheet..$overrides to modify self sheet
      // - sheet..$childOverrides to modify children sheet (passed to children via context.childOverrides) 
      const classesProp = toPlatformSheet(applyTheme(this.themeGetter, classesPropX))
      // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(classesProp, this.media)

      //const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as ReactXX.TRulesetX
      const className = toPlatformRuleSet(applyTheme(this.themeGetter, classNameX))
      const flip = typeof flipProp === 'boolean' ? flipProp : (theme && theme.direction === 'rtl')

      const codeProps = {
        ...other, ...(window.isWeb ? $web : $native), theme,
        mergeRulesetWithOverrides, animations,
        classes: this.withParentContext, 
        className: className, 
        style: toPlatformRuleSet(applyTheme(this.themeGetter, style)), 
      } as ReactXX.CodeProps<R>

      toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      //newProps.classes = this.codeClasses
      //console.log(codeProps.style)
      return <Component {...codeProps} />
    }

    static contextTypes = { ...ThemeContextTypes, ...ThemeExContextTypes }
    static childContextTypes = ThemeExContextTypes
    static options = options
  }
  hoistNonReactStatics(Styled, Component as any)
  const styled: any = Styled
  return styled as React.ComponentClass<ReactXX.PropsX<R>>
}
export default withStyles

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, ...rest } = obj as ReactXX.RulesetX
  return rest
}

interface ThemeWithCache extends ReactXX.Theme {
  $sheetsCache?: ReactXX.Sheets
}

export const toPlatformEvents = ($web: ReactXX.OnPressAllWeb, $native: ReactXX.OnPressAllNative, propsX: ReactXX.OnPressAllX, codeProps: ReactXX.CodeProps) => {
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
const createRulesetWithOverridesMerger = (classesProp: ReactXX.Sheet, media: ComponentsMediaQ) => { //, usedChildOverrides: ReactXX.Sheets) => {
  const usedOverrides: ReactXX.Sheet = {}
  media.unsubscribe() //release media notifications
  const res: ReactXX.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
    let single = undefined //optimalization: rulesets contains just single non empty item
    rulesets.forEach(ruleset => { // acumulate $overrides 
      if (!ruleset) return
      if (single === undefined) single = ruleset //first 
      else if (single !== null) single = null //second 
      mergeOverrides(usedOverrides, ruleset.$overrides)
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
      if (other.filter(s => !!s).length === 1) return clearSystemProps(media.processRuleset({ ...single })) //otimalization: nothing to merge
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
    return clearSystemProps(media.processRuleset(rulesetResult))
  }
  return res
}

//*************************************************************** 
// HELPERS
//***************************************************************

type TContext = ReactXX.ThemeContextValue & ReactXX.ThemeExContextValue

//apply theme to sheet AND merge it with theme.overrides
const aplyThemeToSheet = (sheetOrCreator: ReactXX.SheetOrCreator, themerCreator: () => ThemeWithCache, name:string, options: {}) => {

  if (typeof sheetOrCreator != 'function') return sheetOrCreator

  const theme = themerCreator()

  //already in cache?
  let res: ReactXX.Sheet = theme.$sheetsCache && theme.$sheetsCache[name]
  if (res) return res

  //const sheet = applyTheme(theme, sheetOrCreator) //apply theme to sheet
  //const override = (theme.overrides && theme.overrides[name]) //find sheet override in theme
  //res = override ? deepMerges(false, {}, sheet, override) : sheet //deepMerge only when needed
  //const compTheme = {} as any //theme.components[name]
  res = sheetOrCreator(theme, options)
  //res = applyTheme(theme, sheetOrCreator) //apply theme to sheet

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


