import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import PropTypes from 'prop-types'

import { Types, toPlatformEvents, deepMerge, deepMerges } from 'reactxx-basic'
import { Animations, TAnimation } from 'reactxx-animation'
import * as MediaQ from 'reactxx-mediaq'
//import { TAddInConfig, ComponentTypeWithModifier } from 'reactxx'


import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic, TAddInConfig } from '../typings/basic'
import { TTheme } from '../typings/theme'
import * as Themer from './theme'


export interface State<R extends TBasic.Shape = TBasic.Shape> extends Themer.HOCState<R> {
  animations?: Animations //TAnimation.Drivers
  self: React.Component<{}, State<R>>
}

const themeContext = React.createContext<TTheme.ThemeX>({ type: 'ThemeX', $cache: {} })
export const ThemeProvider = themeContext.Provider

export const withStyles = <R extends TBasic.Shape>(name: TBasic.getNameType<R>, sheetCreator: TTheme.SheetCreatorX<R>, options?: TTheme.WithStyleOptions<R>) => (Component: TBasic.CodeComponentType<R>) => {

  const { Provider: ComponentPropsProvider, Consumer: ComponentPropsConsumer } = React.createContext<TBasic.getProps<R>>(null)

  return class Styled extends React.PureComponent<TBasic.PropsX<R>> {

    render() {
      // ******* 1. THEME, meta-code: (this.props, theme) => outputProps1
      return <themeContext.Consumer>
        {theme => {
          const outputProps1 = addThemeToProps(this.props, theme)
          type TOutputProps1 = typeof outputProps1

          // ******* 2. COMPONENT PROPS, meta-code: (outputProps1, propsModifier) => outputProps2
          const WithComponentProps = (outputProps1 => <ComponentPropsConsumer>
            {propsModifier => {
              const outputProps2 = mergePropsFromConsumer(outputProps1, propsModifier)
              type TOutputProps2 = typeof outputProps2

              // ******* 3. MEDIAQ NOTIFY, meta-code: if (outputProps2.$mediaq) (outputProps2, changed global-breakpoints) => outputProps3
              const WithMediaQNotify = (outputProps2 => {

                const { usedNotifyBreakpoints, observedBits: observedBits2 } = MediaQ.mediaqGetNotifyBreakpoints(outputProps2)

                return MediaQConsumer_RenderIfNeeded(observedBits2, () => {
                  const mediaNotifyRecord = observedBits2 === 0 ? null : MediaQ.mediaqActualizetNotifyBreakpoints(usedNotifyBreakpoints)
                  const outputProps3 = prepareSheet(name, sheetCreator, options, outputProps2, mediaNotifyRecord)
                  type TOutputProps3 = typeof outputProps3

                  // ******* 4. MEDIAQ SHEET, meta-code: if (some of rulesets in outputProps3.classes's sheet contains $mediaq) (outputProps3, changed global-breakpoints) => outputProps4
                  const { usedSheetBreakpoints, observedBits: observedBits3 } = MediaQ.mediaqGetSheetBreakpoints(outputProps3.classes as MediaQ.MediaQSheet)

                  return MediaQConsumer_RenderIfNeeded(observedBits3, () => {
                    const outputProps4 = observedBits3 === 0 ? outputProps3 : MediaQ.mediaqActualizeSheetBreakpoints(outputProps3 as { classes: MediaQ.MediaQSheet }, usedSheetBreakpoints) as TOutputProps3
                    // ******* 5. ANIMATION, meta-code: if (outputProps4.$animations) outputProps4.$animations => animations
                    return AnimationsComponent_RenderIfNeeded(outputProps4.classes.$animations as TAnimation.SheetsX, animations => {
                      // ******* 6. CODE COMPONENT, meta-code: (use outputProps4 and animations in component code)
                      if (outputProps4.classes.$preserve) outputProps4.classes = { ...outputProps4.classes }
                      clearSystemProps(outputProps4.classes)
                      return <Component {...outputProps4 as TBasic.CodeProps<R>} animations={animations} />
                    })
                  })

                })

              }) as React.SFC<TOutputProps2>

              return <WithMediaQNotify {...outputProps2} />
            }}
          </ComponentPropsConsumer>) as React.SFC<TOutputProps1>

          return <WithComponentProps {...outputProps1} />
        }}
      </themeContext.Consumer>
    }

    public static displayName = name
    public static ComponentPropsProvider = ComponentPropsProvider
    public static defaultProps = options && options.defaultProps
  }

}

const addThemeToProps = <T extends {}>(props: T, theme: TTheme.ThemeX) => {
  if (!theme) theme = { type: 'ThemeX', $cache: {} }
  return Object.assign({ theme }, props)
}

const mergePropsFromConsumer = <T extends {}>(props: T, modifier) => {
  return (modifier && props ? deepMerges(false, {}, props, modifier) : props) as T
}

const prepareSheet = (name: string, createSheetX: TTheme.SheetCreatorX, options: TTheme.WithStyleOptions, props: TBasic.PropsX & { theme: TTheme.ThemeX } & MediaQ.CodeProps, mediaqCode: MediaQ.CodePropsItems) => {

  const { theme, classes, className, style, $mediaq: ignore1, ...rest } = props

  //** STATIC SHEET
  let staticSheet: TBasic.Sheet
  let variant = null
  if (typeof createSheetX !== 'function') {
    staticSheet = toPlatformSheet(createSheetX)
  } else {
    if (options.getVariant) {
      const propsWithMediaQ = mediaqCode ? { ...props, mediaqCode} : props
      variant = options.getVariant(propsWithMediaQ)
      const variantCacheId = options.variantToString && options.variantToString(variant)
      if (variantCacheId) {
        let compCache = theme.$cache[name]
        if (!compCache) theme.$cache[name] = compCache = {}
        staticSheet = compCache[variantCacheId]
        if (!staticSheet) {
          compCache[variantCacheId] = staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX));
          (staticSheet as any).$preserve = true
        }
      } else
        staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
    }
  }

  //** MERGE staticSheet with classes and className
  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
  const actSheet: TBasic.Sheet = classes || root ? deepMerges(false, {}, staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet
  //for (const p in actSheet) if (!p.startsWith('$')) actSheet[p].$name = p // assign name to ruleSets. $name is used in mergeRulesetWithOverrides to recognize used rulesets

  //** RETURN platform dependent props for pure component code
  return {
    ...rest,
    classes: actSheet,
    style: toPlatformRuleSet(callCreator(theme, variant, style)),
    variant,
    mergeRulesetWithOverrides,
    mediaqCode,
  } as TBasic.CodeProps & { $animations?: TAnimation.SheetsX }
}
const callCreator = <T extends {}>(theme: TTheme.ThemeBase, variant, creator: T | ((theme: TTheme.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

const MediaQConsumer_RenderIfNeeded = <T extends {}>(observedBits: number, child: () => React.ReactElement<T>) => {
  return observedBits === 0 ? child() : <MediaQ.MediaQConsumer unstable_observedBits={observedBits}>{breakpoints => child()}</MediaQ.MediaQConsumer>
}

interface AnimState {
  animations?: Animations //TAnimation.Drivers
  self: React.Component<{}, AnimState>
  refreshCounter: number
}
interface AnimProps {
  $initAnimations: TAnimation.SheetsX
  children: (animations: Animations) => React.ReactNode
}
class AnimationsComponent extends React.PureComponent<AnimProps, AnimState> {

  state: AnimState = { self: this, refreshCounter: 0 }

  static getDerivedStateFromProps = (nextProps: AnimProps, prevState: AnimState) => {
    if (prevState.animations) prevState.animations.destroy()
    delete prevState.animations
    const newAnimations = new Animations(prevState.self as any)
    newAnimations.init(nextProps.$initAnimations)
    return { animations: newAnimations } as AnimState
  }

  refresh() {
    this.setState(({ refreshCounter }) => ({ refreshCounter: refreshCounter + 1 }))
  }

  render() {
    return this.props.children(this.state.animations)
  }

}

const AnimationsComponent_RenderIfNeeded = ($animations: TAnimation.SheetsX, child: (newProp) => React.ReactElement<any>) => {
  return !$animations ? child(null) : <AnimationsComponent $initAnimations={$animations}>
    {animations => child(animations)}
  </AnimationsComponent>
}

const mergeRulesetWithOverrides: TBasic.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
  let count = 0
  let res
  rulesets.forEach((ruleset: TAddInConfig.RulesetWithAddIn) => { // acumulate $overrides from used rulesets
    if (!ruleset) return
    switch (count) {
      case 0: res = ruleset; break
      case 1: res = deepMerges(true, {}, res, ruleset); break
      default: deepMerges(true, res, ruleset); break
    }
  })
  return res
}

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, $preserve, $animations, ...rest } = obj as TBasic.RulesetX & { $preserve, $animations}
  return rest
}

