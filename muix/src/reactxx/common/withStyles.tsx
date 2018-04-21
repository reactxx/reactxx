import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import PropTypes from 'prop-types'

import { Types, toPlatformEvents, deepMerge, deepMerges } from 'reactxx-basic'
import { Animations } from 'reactxx-animation'
import { ComponentsMediaQ, TMediaQ } from 'reactxx-mediaq'
//import { TAddInConfig, ComponentTypeWithModifier } from 'reactxx'


import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic, TAddInConfig } from '../typings/basic'
import { TTheme } from '../typings/theme'
import { Themer, HOCState, HOCProps, ComponentTypeWithModifier } from './theme'


export interface State<R extends TBasic.Shape = TBasic.Shape> extends HOCState<R> {
  animations?: Animations //TAnimation.Drivers
  mediaq?: ComponentsMediaQ<TBasic.getMediaQ<R>>
}

export const withStyles = <R extends TBasic.Shape>(name: TBasic.getNameType<R>, sheetCreator: TTheme.SheetCreatorX<R>, options?: TTheme.WithStyleOptions<R>) => (Component: TBasic.CodeComponentType<R>) =>
  withComponentProps<R>(
    name,
    options,
    Themer.withTheme<R>(
      name,
      options,
      sheetCreator,
      withSheet<R>(
        name,
        options,
        Component
      ),
    ),
  )

/*************
* PRIVATE
**************/

const withSheet = <R extends TBasic.Shape>(name: string, options: TTheme.WithStyleOptions<R>, Component: TBasic.CodeComponentType<R>) =>

  class Styled extends React.PureComponent<HOCProps<R>, State<R>> {

    state: State<R> = {
      animations: new Animations(this),
      mediaq: new ComponentsMediaQ<TBasic.getMediaQ<R>>(this),
    }

    componentWillUnmount() {
      //if (name === 'comps$responsibledrawer')
      //  debugger
      this.state.mediaq.destroy()
      this.state.animations.destroy()
    }

    static getDerivedStateFromProps = (nextProps: HOCProps, prevState: State) => {
      //if (name === 'comps$responsibledrawer')
      //  debugger
      if (nextProps.ignore) return {} //noop
      const { animations, mediaq } = prevState
      animations.destroy()
      const nextState: State = Themer.applyTheme(name, nextProps, prevState)
      animations.init(nextState.classes.$animations)
      return nextState // nextState props are merged to prevState props. So animations and mediaq props are preserved
    }

    render() {

      //if (name === 'comps$responsibledrawer')
      //  debugger

      const { animations, mediaq, style, classes, variant } = this.state

      mediaq.destroy(); mediaq.init(classes.$mediaq)

      const {
        classes: ignore0, className: ignore1, style: ignore2, staticSheet: ignore3, variant: ignore4, // already processed props
        theme, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore,
        ...other
      } = this.props as HOCProps

      if (ignore) return null

      // calling createRulesetWithOverridesMerger signals which rulesets are used. So it can use their $overrides to modify self sheet
      const mergeRulesetWithOverrides = createRulesetWithOverridesMerger(mediaq)

      const codeProps = {
        ...other,
        ...(window.isWeb ? $web : $native),
        mergeRulesetWithOverrides,
        theme,
        variant,
        animations,
        mediaq: mediaq as TMediaQ.ComponentsMediaQ<TBasic.getMediaQ<R>>,
        classes, //available classes for mergeRulesetWithOverrides (this.classes = merge(sheet, theme.overrides[name], classes prop)
        style,
      } as TBasic.CodeProps<R>

      toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      return <Component {...codeProps} />
    }

    static displayName = 'withStyles'

  }


const withComponentProps = <R extends TBasic.Shape>(name: string, options: TTheme.WithStyleOptions<R>, WithTheme: TBasic.SFCX<R>) => {

  const { Provider: ComponentPropsProvider, Consumer: ComponentPropsConsumer } = React.createContext<TBasic.getProps<R>>(null)

  const res: TBasic.SFCX<R> & { ComponentPropsProvider?: React.Provider<TBasic.PropsX<R>> } = outerProps => <ComponentPropsConsumer>
    {modifiedProps => {
      if (modifiedProps && outerProps) outerProps = deepMerges(false, {}, outerProps, modifiedProps)
      return <WithTheme {...outerProps} />
    }}
  </ComponentPropsConsumer>

  res.displayName = name
  res.ComponentPropsProvider = ComponentPropsProvider
  if (options && options.defaultProps) res.defaultProps = options.defaultProps as any

  return res
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

