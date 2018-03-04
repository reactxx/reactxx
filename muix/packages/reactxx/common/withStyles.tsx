import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { toPlatformRuleSet, toPlatformSheet, deepMerge } from './index'
import { ComponentsMediaQ } from './media-q'
import warning from 'warning'
import { getAnimations } from './animation'

import { ThemeModifier, modifierSelector, toPlatformFromSheetCreator } from './theme'

export const withStylesEx = <R extends ReactXX.Shape>(_name: ReactXX.getNameType<R>, createSheetX: ReactXX.CreateSheetX<R>) => (Component: ReactXX.CodeComponentType<R>) => {

  const name = _name as string

  type TStyled = ReactXX.PropsX & ReactXX.ThemeStateX

  class Styled extends React.PureComponent<TStyled> {
    classes: ReactXX.Sheet
    animations: Animation.Drivers
    media: ComponentsMediaQ

    constructor(p, c) {
      super(p, c)
      this.componentWillReceiveProps()
    }

    componentWillReceiveProps() {
      this.animations && this.animations.reset()

      const { theme, override, classes: classesX } = this.props

      //*** get platform component sheet (from creator and actual theme)
      const staticSheet = toPlatformFromSheetCreator(name, theme, createSheetX)

      //*** apply "component override" from actual "theme app state"
      const classes: ReactXX.Sheet = toPlatformSheet(applyTheme(name, classesX, theme))

      this.classes = override || classes ? deepMerges(false, {}, staticSheet, override, classes) : staticSheet // modify static sheet 
      for (const p in this.classes) this.classes[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = getAnimations(staticSheet.$animations, this)
      //*** init media queries
      this.media = new ComponentsMediaQ(this)

    }
    componentWillUnmount() { this.media.unsubscribe() }

    render() {
      const { animations } = this
      const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, theme, override, modifyThemeState, ...other } = this.props as TStyled & ReactXX.OnPressAllX

      if (ignore) return null

      const className: ReactXX.Ruleset = toPlatformRuleSet(applyTheme(name, classNameX, theme))
      const style: ReactXX.Ruleset = toPlatformRuleSet(applyTheme(name, styleX, theme))


      // calling createRulesetWithOverridesMerger signals which rulesets are used. So it can use their $overrides to modify self sheet
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(this.media)

      //const flip = typeof flipProp === 'boolean' ? flipProp : (theme && theme.direction === 'rtl')

      const codeProps = {
        ...other, ...(window.isWeb ? $web : $native),
        mergeRulesetWithOverrides,
        theme, animations,
        classes: this.classes, //available classes for mergeRulesetWithOverrides (this.classes = merge(sheet, theme.overrides[name], classes prop)
        className,
        style,
      } as ReactXX.CodeProps<R>

      toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      return <Component {...codeProps} />
    }

  }
  hoistNonReactStatics(Styled, Component as any)

  return (props => <ThemeModifier modify={props.modifyThemeState} selector={modifierSelector(name)} render={themeState =>
    <Styled {...themeState} {...props} />
  } />) as React.ComponentType<ReactXX.PropsX<R>>

  //const styled: any = Styled
  //return styled as React.ComponentType<ReactXX.PropsX<R>>
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
const createRulesetWithOverridesMerger = (/*classesProp: ReactXX.Sheet,*/ media: ComponentsMediaQ) => { //, usedChildOverrides: ReactXX.Sheets) => {
  const usedOverrides: ReactXX.Sheet = {}
  if (media) media.unsubscribe() //release media notifications
  const res: ReactXX.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
    let single = undefined //optimalization: rulesets contains just single non empty item => no deepMerge is needed
    rulesets.forEach(ruleset => { // acumulate $overrides from used rulesets
      if (!ruleset) return
      if (single === undefined) single = ruleset //first 
      else if (single !== null) single = null //second 
      mergeOverrides(usedOverrides, ruleset.$overrides)
    })
    if (single === undefined) return {} //no not empty ruleset
    const rulesetResult: typeof rulesets[0] = {}
    if (single) {
      const override = usedOverrides[single.$name]
      if (!override) return clearSystemProps(media ? media.processRuleset({ ...single }) : { ...single }) //otimalization: nothing to merge
      deepMerges(true, rulesetResult, single, override)
    } else //apply used $overrides and classes prop
      rulesets.forEach(ruleset => {
        if (!ruleset) return
        deepMerges(true, rulesetResult,
          ruleset, //ruleset, used in Component render
          usedOverrides[ruleset.$name], //modify it with used $overrides
        )
      })
    return clearSystemProps(media ? media.processRuleset(rulesetResult) : rulesetResult)
  }
  return res
}

//*************************************************************** 
// HELPERS
//***************************************************************
const applyTheme = (name: string, valueOrCreator: any | ((theme: ReactXX.Theme, themePar) => any), theme: ReactXX.Theme) =>
  typeof valueOrCreator === 'function' ? valueOrCreator(theme, theme.themePars[name]) : valueOrCreator



// merge named values
const mergeOverrides = (result, patches) => {
  if (!patches) return
  for (const p in patches) {
    const patch = patches[p]; if (!patch) continue
    if (!result[p]) result[p] = {}
    deepMerge(result[p], patch, false)
  }
}

export const deepMerges = (skipSystem: boolean, target, ...sources) => {
  //if (!sources || !sources.find(s => !!s)) return target 
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, ...rest } = obj as ReactXX.RulesetX
  return rest
}