import * as React from 'react'
import ReactN from 'react-native'
//import hoistNonReactStatics from 'hoist-non-react-statics'
import { toPlatformRuleSet, toPlatformSheet, deepMerge } from './index'
import { ComponentsMediaQ /*platform dependent*/ } from 'reactxx'
import warning from 'warning'
import { getAnimations } from './animation'

import { ThemeModifier, themeCompCreate } from './theme'

//http://jamesknelson.com/should-i-use-shouldcomponentupdate/
export const withStyles = <R extends ReactXX.Shape>(_name: ReactXX.getNameType<R>, createSheetX: ReactXX.SheetCreatorX<R>, themePar?: ReactXX.getThemePar<R>) => (Component: ReactXX.CodeComponentType<R>) => {

  const name = _name as string
  themePars[name] = themePar

  type TStyled = ReactXX.PropsX & ReactXX.ThemeCompSelectedX

  class Styled extends React.PureComponent<TStyled> {
    classes: ReactXX.Sheet
    animations: Animation.Drivers
    mediaq: ComponentsMediaQ<ReactXX.getMediaQ<R>>

    constructor(p, c) {
      super(p, c)
      this.componentWillReceiveProps()
    }

    componentWillReceiveProps() {
      this.animations && this.animations.reset()

      const { theme, themePar = themePars[name], override, classes: classesX } = this.props

      //*** get platform component sheet (from creator and actual theme)
      const staticSheet = toPlatformSheet(applyTheme(theme, themePar, createSheetX))

      //*** apply "component override" from actual "theme app state"
      const classes: ReactXX.Sheet = toPlatformSheet(applyTheme(theme, themePar, classesX, ))

      this.classes = override || classes ? deepMerges(false, {}, staticSheet, override, classes) : staticSheet // modify static sheet 
      for (const p in this.classes) if (!p.startsWith('$')) this.classes[p].$name = p // assign name to ruleSets. $name is used in getRulesetWithSideEffect to recognize used rulesets

      //*** init animations
      this.animations = getAnimations(staticSheet.$animations, this)
      //*** init media queries
      this.mediaq = new ComponentsMediaQ<ReactXX.getMediaQ<R>>(this)

    }

    componentWillUnmount() { this.mediaq.destroy() }

    render() {
      const { animations, mediaq } = this
      const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, theme, override, themePar, modifyThemeState, ...other } = this.props as TStyled & ReactXX.OnPressAllX
      //const theme = themeState.theme

      if (ignore) return null

      const className: ReactXX.Ruleset = toPlatformRuleSet(applyTheme(theme, themePar, classNameX))
      const style: ReactXX.Ruleset = toPlatformRuleSet(applyTheme(theme, themePar, styleX))

      // calling createRulesetWithOverridesMerger signals which rulesets are used. So it can use their $overrides to modify self sheet
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(mediaq)

      mediaq.setNotifyBreakpoints(this.classes.$mediaq as MediaQ.NotifySheetX<ReactXX.getMediaQ<R>>) //release media notifications

      //const flip = typeof flipProp === 'boolean' ? flipProp : (theme && theme.direction === 'rtl')

      const codeProps = {
        ...other, ...(window.isWeb ? $web : $native),
        mergeRulesetWithOverrides,
        theme, animations,
        mediaq: mediaq as MediaQ.ComponentsMediaQ<ReactXX.getMediaQ<R>>,
        classes: this.classes, //available classes for mergeRulesetWithOverrides (this.classes = merge(sheet, theme.overrides[name], classes prop)
        className,
        style,
      } as ReactXX.CodeProps<R>

      toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      renderCount++

      return <Component {...codeProps} />
    }

  }

  //hoistNonReactStatics(Styled, Component as any)

  return (props => <ThemeModifier quiet modify={props.modifyThemeState} selector={modifierSelector(name)} render={selectedThemeState =>
    <Styled {...selectedThemeState} {...props} />
  } />) as React.ComponentType<ReactXX.PropsX<R>>

}

const modifierSelector = (componentName: string) => (themeStates: ReactXX.ThemeState) => ({ theme: themeStates.theme, ...themeStates[componentName] } as ReactXX.ThemeCompSelectedX)

//const toPlatformFromSheetCreator = <R extends ReactXX.Shape>(componentName: string, themeState: ReactXX.ThemeStateX2, createSheetX: ReactXX.SheetCreatorX<R>) => {
//  //try to get platform specific component sheet from cache (from theme.themePars.componentName.$cache)
//  //let themePar = theme.themePars[componentName]
//  //if (!themePar) themePar = theme.themePars[componentName] = {}
//  //let res = themePar['$cache'] as ReactXX.Sheet<R>
//  //if (res) return res
//  //create sheet
//  const res = toPlatformSheet(typeof createSheetX === 'function' ? createSheetX(theme, par) : createSheetX)
//  //themePar['$cache'] = res
//  return res
//}


let renderCount = 0

export const themePars: {[Name in keyof ReactXX.Shapes]?: ReactXX.getThemePar<ReactXX.Shapes[Name]> } = {}

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

//****************************  createRulesetWithOverridesMerger
// Could be called in <Component> render method to compute component styles. Side effects:
// - use sheet.ruleset.$overrides to modify self sheet
// - use sheet.ruleset.$mediaq to modify ruleset 
const createRulesetWithOverridesMerger = (media: ComponentsMediaQ) => {
  const usedOverrides: ReactXX.Sheet = {}
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
      if (!override) return clearSystemProps(media.processRuleset({ ...single })) //otimalization: nothing to merge
      deepMerges(true, rulesetResult, single, override)
    } else //apply used $overrides
      rulesets.forEach(ruleset => {
        if (!ruleset) return
        deepMerges(true, rulesetResult, //deepMerges(false, due to $media2 merging
          ruleset, //ruleset, used in Component render
          usedOverrides[ruleset.$name], //modify it with used $overrides
        )
      })
    return clearSystemProps(media.processRuleset(rulesetResult))
  }
  return res
}

//*************************************************************** 
// HELPERS
//***************************************************************
function applyTheme<T>(theme: ReactXX.ThemeX, themePar, creator: T | ((theme: ReactXX.ThemeX, themePar) => T)) {
  return typeof creator === 'function' ? creator(theme, themePar) : creator
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

export const deepMerges = (skipSystem: boolean, target, ...sources) => {
  sources.forEach(source => deepMerge(target, source, skipSystem))
  return target
}

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, ...rest } = obj as ReactXX.RulesetX
  return rest
}

class PureComponent<T> extends React.Component<T> {
  shouldComponentUpdate(nextProps, nextState, nextContext: any) {
    return !shallowEqual(this.state, nextState) || !shallowEqual(this.props, nextProps) || (this.props && nextProps && (!shallowEqual((this.props as any).className, nextProps.className) || !shallowEqual((this.props as any).style, nextProps.style)))
  }
}

const shallowEqual = (objA: {}, objB: {}, ignoreStyle?: boolean) => {
  if (objA === objB) return true

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false

  const keysA = Object.keys(objA); if (keysA.length !== Object.keys(objB).length) return false

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const prop = keysA[i]
    if (prop.startsWith('on')) continue
    if (ignoreStyle && (prop === 'className' || prop === 'style')) continue
    if (!bHasOwnProperty(prop) || objA[prop] !== objB[prop]) {
      //console.log(prop)
      return false
    }
  }

  return true;
}