import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import PropTypes from 'prop-types'

import { Types, toPlatformEvents, deepMerge, deepMergesSys } from 'reactxx-basic'
import { Animations, TAnimation, AnimationsComponent } from 'reactxx-animation'
//import { TMediaQ, mediaqActualizetNotifyBreakpoints, mediaqActualizeSheetBreakpoints, mediaqGetNotifyBreakpoints, mediaqGetSheetBreakpoints, mediaQProviderExists, MediaQ_AppContainer, MediaQConsumer } from 'reactxx-mediaq'

import { TMediaQ, MediaQComponent, MediaQ_AppContainer, mediaQProviderExists } from 'reactxx-mediaq'

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
  type TCodeProps = TBasic.CodeProps<R> //Partial<Overwrite<TBasic.CodeProps<R>, { classes?: TBasic.Sheet<R> & { $animations?: TAnimation.SheetsX; $preserve?: boolean } }>>

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
      //Skip withTheme?
      if (withOptions.withTheme)
        return <ThemeConsumer>{this.THEME}</ThemeConsumer>
      else 
        return this.callCascading()
    }

    themeContext: TTheme.ThemeContext = {}
    propsWithCascading: TPropsWithEvents
    codeProps: TCodeProps

    THEME = (themeContext: TTheme.ThemeContext) => {
      // set theme from themeContext.Consumer to themeResult
      this.themeContext = themeContext
      return this.callCascading()
    }

    AFTER_CASCADING = (fromConsumer: TBasic.PropsX<R>) => {
      // set props from ComponentPropsConsumer to propsModifierResult
      const { props } = this
      this.propsWithCascading = (withOptions.withCascading ? (fromConsumer ? deepMergesSys(false, {}, fromConsumer, props) : fromConsumer) : props) as TPropsWithEvents
      return this.callMediaQComponent()
    }

    BEFORE_ANIMATION = () => {
      const $animations = this.afterMediaQSheet.$animations
      return !$animations ? this.AFTER_ANIMATION(null) : <AnimationsComponent $initAnimations={$animations}>{this.AFTER_ANIMATION}</AnimationsComponent>
    }

    AFTER_ANIMATION = (animations: TAnimation.Drivers<TBasic.getAnimation<R>>) => {
      const { afterMediaQSheet, codeProps } = this
      // optimalization: when platformSheet.classes is cached, make its copy 
      const res = { ...afterMediaQSheet}
      // remove internal props
      const classes = clearSystemProps(res)
      // call component code
      return <Component {...codeProps} classes={classes} animations={animations} />
    }

    callCascading = () => {
      // Skip withCascading?
      if (withOptions.withCascading)
        return <CascadingConsumer>{this.AFTER_CASCADING}</CascadingConsumer>
      else {
        this.propsWithCascading = this.props as TPropsWithEvents
        return this.callMediaQComponent()
      }
    }

    callMediaQComponent = () => <MediaQComponent
      theme={this.themeContext.theme}
      notifyIntervals={this.propsWithCascading.$mediaq} // $mediaq containse e.g. '{ mobile: [null, 480], desktop: [480, null] }'
      onNotifyRecord={mediaNotifyRecord => { // mediaNotifyRecord is result of media evaluation, e.g. '{ mobile: true, desktop:false }.
        // codeSheet can contain rulesets with @media prop (e.g. @media: { '640-1025': { fontSize: 24} })
        const { codeProps, codeSheet } = prepareSheet(name, sheetCreator, options, this.propsWithCascading, this.themeContext, mediaNotifyRecord)
        this.codeProps = codeProps as TBasic.CodeProps<R>
        return codeSheet as TMediaQ.MediaQSheet
      }}
      onAfterSheet={afterMediaQSheet => this.afterMediaQSheet = afterMediaQSheet} // ruleset.@media is converted to afterMediaQSheet: for WEB to FELA CSS media query rules, for Native are matching media rules merged to ruleset
    >{this.BEFORE_ANIMATION}</MediaQComponent>

    afterMediaQSheet: TBasic.Sheet & { $animations?: TAnimation.SheetsX }

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

const prepareSheet = (name: string, createSheetX: TTheme.SheetCreatorX, options: TTheme.WithStyleOptions_Component, props: TBasic.PropsX & Types.OnPressAllX, themeContext: TTheme.ThemeContext, mediaqCode: TMediaQ.MediaRecord) => {

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

  return { codeProps: outputProps, codeSheet: actSheet}
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

