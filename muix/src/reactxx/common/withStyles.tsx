import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { Types, toPlatformEvents, deepMerge, deepMerges } from 'reactxx-basic'
import { Animations } from 'reactxx-animation'
import { ComponentsMediaQ, TMediaQ } from 'reactxx-mediaq'
import { TAddInConfig, ComponentTypeWithModifier } from 'reactxx'


import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic } from '../typings/basic'
import { TTheme } from '../typings/theme'
import { Themer, HOCState, HOCProps } from './theme2'


export interface State<R extends TBasic.Shape = TBasic.Shape> extends HOCState<R> {
  animations?: Animations //TAnimation.Drivers
  mediaq?: ComponentsMediaQ<TBasic.getMediaQ<R>>
}

//http://jamesknelson.com/should-i-use-shouldcomponentupdate/
export const withStyles = <R extends TBasic.Shape>(_name: TBasic.getNameType<R>, sheetCreator: TTheme.SheetCreatorX<R>, compThemePar?: TBasic.getCompTheme<R>) => (Component: TBasic.CodeComponentType<R>) => {

  const name = _name as string

  class Styled extends React.PureComponent<HOCProps, State<R>> {

    state: State<R> = {
      animations: new Animations(this),
      mediaq: new ComponentsMediaQ<TBasic.getMediaQ<R>>(this) 
    }

    componentWillUnmount() {
      this.state.mediaq.destroy()
      this.state.animations.destroy()
    }

    static getDerivedStateFromProps = (nextProps: HOCProps, prevState: State) => {
      //if (name === 'comp$label')
        //debugger
      if (nextProps.ignore) return {} //noop
      const { animations, mediaq } = prevState
      animations.destroy()
      const nextState: State = Themer.applyTheme(name, sheetCreator, nextProps, prevState)
      animations.init(nextState.classes.$animations)
      return nextState // nextState props are merged to prevState props. So animations and mediaq props are preserved
    }

    render() {

      //if (name === 'comp$label')
      //  debugger

      const { animations, mediaq, style, classes } = this.state

      mediaq.destroy(); mediaq.init(classes.$mediaq)

      const {
        classes: ignore0, className: ignore1, style: ignore2, themeComp: ignore3, // already used props
        theme, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore,
        ...other
      } = this.props as HOCProps & Types.OnPressAllX

      if (ignore) return null

      // calling createRulesetWithOverridesMerger signals which rulesets are used. So it can use their $overrides to modify self sheet
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(mediaq)

      const codeProps = {
        ...other,
        ...(window.isWeb ? $web : $native),
        mergeRulesetWithOverrides,
        theme,
        animations,
        mediaq: mediaq as TMediaQ.ComponentsMediaQ<TBasic.getMediaQ<R>>,
        classes, //available classes for mergeRulesetWithOverrides (this.classes = merge(sheet, theme.overrides[name], classes prop)
        style,
      } as TBasic.CodeProps<R>

      toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      return <Component {...codeProps} />
    }

  }

  return Themer.withTheme(name, Styled, sheetCreator, compThemePar)

}

//****************************  createRulesetWithOverridesMerger
// Could be called in <Component> render method to compute component styles. Side effects:
// - use sheet.ruleset.$overrides to modify self sheet
// - use sheet.ruleset.$mediaq to modify ruleset 
const createRulesetWithOverridesMerger = (media: ComponentsMediaQ) => {
  const usedOverrides: TBasic.Sheet = {}
  const res: TBasic.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
    let single = undefined //optimalization: rulesets contains just single non empty item => no deepMerge is needed
    rulesets.forEach(ruleset => { // acumulate $overrides from used rulesets
      if (!ruleset) return
      if (single === undefined) single = ruleset //first 
      else if (single !== null) single = null //second 
      mergeOverrides(usedOverrides, ruleset.$overrides)
    })
    if (single === undefined) return {} //no not empty ruleset
    const rulesetResult = {}
    if (single) {
      const override = usedOverrides[single.$name]
      if (!override) return clearSystemProps(media.processRuleset({ ...single })) // optimalization: nothing to merge
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

// merge named values
const mergeOverrides = (result, patches) => {
  if (!patches) return
  for (const p in patches) {
    const patch = patches[p]; if (!patch) continue
    if (!result[p]) result[p] = {}
    deepMerge(result[p], patch, false)
  }
}

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, ...rest } = obj as TBasic.RulesetX
  return rest
}

