import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import PropTypes from 'prop-types'

import { Types, toPlatformEvents, deepMerge, deepMergesSys } from 'reactxx-basic'
import { Animations, TAnimation, AnimationsComponent } from 'reactxx-animation'
import { TMediaQ, mediaqActualizetNotifyBreakpoints, mediaqActualizeSheetBreakpoints, mediaqGetNotifyBreakpoints, mediaqGetSheetBreakpoints, mediaQProviderExists, MediaQ_AppContainer, MediaQConsumer } from 'reactxx-mediaq'

import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic, TAddInConfig } from '../typings/basic'
import { TTheme, ThemeProvider, ThemeConsumer } from './theme'

/************************
* THEME PROVIDER AND CONSUMER
*************************/

//export type ThemeCreator<T extends TTheme.ThemeBase = TTheme.ThemeBase> = T | ((theme: T) => T)
//export type ThemeProviderTyped<T extends TTheme.ThemeBase = TTheme.ThemeBase> = React.ComponentClass<{ theme: ThemeCreator<T> }>
//export interface ThemeContext { theme?: TTheme.ThemeBase; $cache?: {} }

//const themeContext = React.createContext<ThemeContext>({ theme: null, $cache: {} })

//export class ThemeProvider extends React.Component<{ theme: ThemeCreator }> {

//  render() {
//    return <themeContext.Consumer>{this.PROVIDER}</themeContext.Consumer>
//  }

//  PROVIDER = (parentContext: ThemeContext) => {
//    const { children, theme } = this.props
//    const actTheme = typeof theme === 'function' ? theme(parentContext && parentContext.theme) : theme
//    if (!this.consumerContext || actTheme !== this.consumerContext.theme)
//      this.consumerContext = { theme: actTheme, $cache: {} }
//    return <themeContext.Provider value={this.consumerContext}>{children}</themeContext.Provider>
//  }

//  consumerContext: ThemeContext
//}

//export const ThemeProviderUntyped = ThemeProvider as React.ComponentClass<{ theme: any }>

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends TBasic.Shape>(name: TBasic.getNameType<R>, sheetCreator: TTheme.SheetCreatorX<R>, component: TBasic.CodeComponentType<R>, options?: TTheme.WithStyleOptions_Component<R>) =>
  (overrideOptions?: TTheme.WithStyleOptions_Component<R>) => withStyles(name, sheetCreator, options, overrideOptions)(component)

export const withStyles = <R extends TBasic.Shape>(name: TBasic.getNameType<R>, sheetCreator: TTheme.SheetCreatorX<R>, _options?: TTheme.WithStyleOptions_Component<R>, overrideOptions?: TTheme.WithStyleOptions_Component<R>) => (Component: TBasic.CodeComponentType<R>) => {

  type Theme = TBasic.getTheme<R>
  type TProps = TBasic.PropsX<R>
  type TPropsWithEvents = TProps & Types.OnPressAllX
  type TCodeProps = Partial<Overwrite<TBasic.CodeProps<R>, { classes?: TBasic.Sheet<R> & { $animations?: TAnimation.SheetsX; $preserve?: boolean } }>>

  type TAnimationShape = TBasic.getAnimation<R>
  type T$Animations = TAnimation.SheetsX<TAnimationShape>
  type TAnimations = TAnimation.Drivers<TAnimationShape>

  //**** OPTIONS
  const options: TTheme.WithStyleOptions_Component<R> = _options && overrideOptions ? deepMerge(_options, overrideOptions) : (overrideOptions ? overrideOptions : _options)

  // compute withStyles HOC options from: global 'withStyleOptions' and component specific 'options'
  // 1. component creator sets options.withTheme=true IF sheetCreator uses some theme info
  // 2. app developer sets withPropsModifier IF you need <Component.PropsProvider ...> feature
  // 3. app developer can overrides component.options by creating app specific component variant (by calling ComponentCreator(optionOverride))
  const withOptions: TTheme.WithStyleOptions = {
    withCascading: fromOptions(false, options ? options.withCascading : undefined), // 
    withTheme: options ? options.withCascading : undefined
  }
  if (withOptions.withTheme === undefined) withOptions.withTheme = typeof sheetCreator === 'function'

  //**** PROPERTY CASCADING CONTEXT
  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = withOptions.withCascading ? React.createContext<TPropsWithEvents>(null) : {} as React.Context<TPropsWithEvents>

  class Provider extends React.Component<TProps> {

    render() {
      if (withOptions.withCascading) return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
      warning(process.env.NODE_ENV == 'development', `Component.Provider does not exist (component.name=${name}). Use <ComponentC.Provider ...><ComponentC ...> variant of component or create it (if it does not exist).`) //`
      return null
    }

    CASCADING = (parentsProps: TPropsWithEvents) => {
      const { children, ...rest } = this.props as TBasic.PropsX & { children?: React.ReactNode }
      return <CascadingProvider value={(parentsProps && rest ? deepMerge(parentsProps, rest) : rest) as TPropsWithEvents}>{children}</CascadingProvider>
    }

  }

  //**** INNER COMPONENT
  return class Styled extends React.Component<TBasic.PropsX<R>> {

    render() {
      //if (name === 'comp$withstyle2')
      //  debugger 
      if (!withOptions.withCascading) this.propsWithCascading = this.props as TPropsWithEvents
      //Skip withTheme?
      if (withOptions.withTheme)
        return <ThemeConsumer>{this.THEME}</ThemeConsumer>
      else {
        // Skip withCascading?
        if (withOptions.withCascading)
          return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
        else
          return this.call_MEDIA_NOTIFY()
      }
    }

    THEME = (themeContext: TTheme.ThemeContext) => {
      // set theme from themeContext.Consumer to themeResult
      this.themeContext = themeContext
      // Skip propsModifier?
      if (withOptions.withCascading)
        return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
      else
        return this.call_MEDIA_NOTIFY()
    }
    themeContext: TTheme.ThemeContext = {}

    CASCADING = (fromConsumer: TBasic.PropsX<R>) => {
      // set props from ComponentPropsConsumer to propsModifierResult
      const { props } = this
      this.propsWithCascading = (withOptions.withCascading ? (fromConsumer ? deepMergesSys(false, {}, fromConsumer, props) : fromConsumer) : props) as TPropsWithEvents
      return this.call_MEDIA_NOTIFY()
    }
    propsWithCascading: TPropsWithEvents

    MEDIAQ_NOTIFY = () => {
      const { usedNotifyBreakpoints, observedBits: ob } = this.mediaqGetNotifyBreakpointsResult
      // actualize media record with respect to actual screen size 
      const mediaNotifyRecord = ob === 0 ? null : mediaqActualizetNotifyBreakpoints(usedNotifyBreakpoints)
      // prepare platform dependent sheet
      this.codeProps = prepareSheet(name, sheetCreator, options, this.propsWithCascading, this.themeContext, mediaNotifyRecord) as TCodeProps
      // get media breakpoints, used in sheet
      this.mediaqGetSheetBreakpointsResult = mediaqGetSheetBreakpoints(this.codeProps.classes as TMediaQ.MediaQSheet)
      // observe for screen size changing
      return this.MediaQConsumer_RenderIfNeeded(this.mediaqGetSheetBreakpointsResult.observedBits, this.MEDIAQ_SHEET)
    }
    mediaqGetNotifyBreakpointsResult: { usedNotifyBreakpoints: TMediaQ.NotifyIntervalDecoded<string>; observedBits: number }
    mediaqGetSheetBreakpointsResult: { usedSheetBreakpoints: TMediaQ.MediaQRulesetDecoded[]; observedBits: number }
    codeProps: TCodeProps

    MEDIAQ_SHEET = () => {
      const { codeProps, mediaqGetSheetBreakpointsResult: { usedSheetBreakpoints, observedBits } } = this
      // actualize sheet with respect to actual screen size 
      if (observedBits !== 0) codeProps.classes = mediaqActualizeSheetBreakpoints(codeProps.classes as TMediaQ.MediaQSheet, usedSheetBreakpoints) as TBasic.Sheet<R>
      // returns statefull animation component, which: compute platform specific animation part of the sheet, change its state when animation opens x closes.
      return this.AnimationsComponent_RenderIfNeeded(codeProps.classes.$animations, this.ANIMATION)
    }

    ANIMATION = (animations: TAnimation.Drivers) => {
      const { codeProps } = this
      // optimalization: when platformSheet.classes is cached, make its copy 
      if (codeProps.classes.$preserve) codeProps.classes = { ...codeProps.classes as any }
      // remove internal props
      codeProps.classes = clearSystemProps(codeProps.classes)
      // call component code
      return <Component {...codeProps as TBasic.CodeProps<R>} animations={animations} />
    }

    MediaQConsumer_RenderIfNeeded(observedBits: number, child: () => React.ReactNode) {
      return observedBits === 0 ? child() : <MediaQConsumer unstable_observedBits={observedBits}>{child}</MediaQConsumer>
    }

    AnimationsComponent_RenderIfNeeded($animations: TAnimation.SheetsX, child: (animations: TAnimation.Drivers) => React.ReactElement<any>) {
      return !$animations ? child(null) : <AnimationsComponent $initAnimations={$animations}>
        {child}
      </AnimationsComponent>
    }

    call_MEDIA_NOTIFY() {
      // get used notify breakpoints from '$mediaq' component props
      this.mediaqGetNotifyBreakpointsResult = mediaqGetNotifyBreakpoints(this.propsWithCascading, this.themeContext.theme)
      // observe for screen size changing (if observedBits!=0)
      return this.MediaQConsumer_RenderIfNeeded(this.mediaqGetNotifyBreakpointsResult.observedBits, this.MEDIAQ_NOTIFY)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !nextProps.CONSTANT
    }

    public static Provider = Provider
    public static displayName = name
    public static defaultProps = options && options.defaultProps
  }

}

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

export const AppContainer: React.SFC<{ theme?: TTheme.ThemeCreator }> = props => {
  const theme = <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
  return mediaQProviderExists() ? theme : <MediaQ_AppContainer>{theme}</MediaQ_AppContainer>
}

/************************
* PRIVATE
*************************/

const prepareSheet = (name: string, createSheetX: TTheme.SheetCreatorX, options: TTheme.WithStyleOptions_Component, props: TBasic.PropsX & Types.OnPressAllX, themeContext: TTheme.ThemeContext, mediaqCode: TMediaQ.CodePropsItems) => {

  const { classes, className, style, $mediaq: ignore1, onPress, onLongPress, onPressIn, onPressOut, $web, $native, ...rest } = props
  const { theme, $cache } = (themeContext || {}) as TTheme.ThemeContext

  //** STATIC SHEET
  let staticSheet: TBasic.Sheet
  let getStaticSheet: () => TBasic.Sheet
  let variantCacheId
  let variant = null
  if (typeof createSheetX !== 'function') {
    variantCacheId = '#static#'
    getStaticSheet = () => toPlatformSheet(createSheetX)
  } else {
    if (options && options.getVariant) {
      const propsWithMediaQ = mediaqCode ? { ...props, mediaqCode } : props
      variant = options.getVariant(propsWithMediaQ, theme)
      variantCacheId = options.variantToString && options.variantToString(variant)
      if (variantCacheId) {
        getStaticSheet = () => toPlatformSheet(callCreator(theme, variant, createSheetX))
      } else {
        //getVariant!=null && variantToString==null => NO CACHING
        staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
      }
    } else
      getStaticSheet = () => toPlatformSheet(callCreator(theme, null, createSheetX))
  }
  if (!staticSheet) {
    if (!theme) staticSheet = getStaticSheet()
    else {
      let compCache = $cache[name]
      if (!compCache) $cache[name] = compCache = {}
      staticSheet = compCache[variantCacheId]
      if (!staticSheet) compCache[variantCacheId] = staticSheet = getStaticSheet();
      (staticSheet as any).$preserve = true
    }
  }

  //** MERGE staticSheet with classes and className
  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
  const actSheet: TBasic.Sheet = classes || root ? deepMergesSys(false, {}, staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet
  //for (const p in actSheet) if (!p.startsWith('$')) actSheet[p].$name = p // assign name to ruleSets. $name is used in mergeRulesetWithOverrides to recognize used rulesets


  //** RETURN platform dependent props for pure component code
  const outputProps = {
    ...rest,
    classes: actSheet,
    style: toPlatformRuleSet(callCreator(theme, variant, style)),
    variant,
    mergeRulesetWithOverrides,
    mediaqCode,
  } as TBasic.CodeProps

  toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, outputProps)

  return outputProps
}
const callCreator = <T extends {}>(theme: TTheme.ThemeBase, variant, creator: T | ((theme: TTheme.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

const mergeRulesetWithOverrides: TBasic.MergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
  let count = 0
  let res
  rulesets.forEach((ruleset: TAddInConfig.RulesetWithAddIn) => { // acumulate $overrides from used rulesets
    if (!ruleset) return
    switch (count) {
      case 0: res = ruleset; break
      case 1: res = deepMergesSys(true, {}, res, ruleset); break
      default: deepMergesSys(true, res, ruleset); break
    }
    count++
  })
  return res
}

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, $preserve, $animations, CONSTANT, ...rest } = obj as TBasic.RulesetX & { $preserve, $animations, CONSTANT }
  return rest
}

const fromOptions = (...bools: boolean[]) => {
  let res = undefined
  if (bools) bools.forEach(b => { if (typeof b === 'boolean') res = b })
  return res
}

