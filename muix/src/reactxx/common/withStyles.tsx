import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'
import PropTypes from 'prop-types'

import { Types, toPlatformEvents, deepMerge, deepMerges } from 'reactxx-basic'
import { Animations, TAnimation, AnimationsComponent } from 'reactxx-animation'
import * as MediaQ from 'reactxx-mediaq'

import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic, TAddInConfig } from '../typings/basic'
import { TTheme } from '../typings/theme'

const themeContext = React.createContext<TTheme.ThemeX>({ type: 'ThemeX', $cache: {} })

export const ThemeProvider = themeContext.Provider

export const withStyles = <R extends TBasic.Shape>(name: TBasic.getNameType<R>, sheetCreator: TTheme.SheetCreatorX<R>, _options?: TTheme.WithStyleOptions_Component<R>, overrideOptions?: TTheme.WithStyleOptions_Component<R>) => (Component: TBasic.CodeComponentType<R>) => {

  type TProps = TBasic.PropsX<R>
  type ThemeResult = TProps & { theme: TTheme.ThemeX }
  type TCascadingResult = ThemeResult & Types.OnPressAllX
  type TCodeProps = Partial<Overwrite<TBasic.CodeProps<R>, { classes?: TBasic.Sheet<R> & { $animations?: TAnimation.SheetsX; $preserve?: boolean } }>>

  type TAnimationShape = TBasic.getAnimation<R>
  type T$Animations = TAnimation.SheetsX<TAnimationShape>
  type TAnimations = TAnimation.Drivers<TAnimationShape>

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

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = withOptions.withCascading ? React.createContext<TProps>(null) : {} as React.Context<TProps>

  return class Styled extends React.Component<TBasic.PropsX<R>> {

    render() {
      //if (name === 'comp$withstyle2')
      //  debugger 
      //Skip withTheme?
      if (withOptions.withTheme)
        return <themeContext.Consumer>{this.THEME}</themeContext.Consumer>
      else {
        this.themeResult = this.props as ThemeResult
        // Skip propsModifier?
        if (withOptions.withCascading)
          return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
        else
          return this.call_MEDIA_NOTIFY(this.themeResult as TCascadingResult)
      }
    }

    THEME = (theme: TTheme.ThemeX) => {
      // set theme from themeContext.Consumer to themeResult
      this.themeResult = { ...this.props as TBasic.PropsX, theme } as ThemeResult
      // Skip propsModifier?
      if (withOptions.withCascading)
        return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
      else
        return this.call_MEDIA_NOTIFY(this.themeResult as TCascadingResult)
    }
    themeResult: ThemeResult

    CASCADING = (source: TBasic.PropsX<R>) => {
      // set props from ComponentPropsConsumer to propsModifierResult
      const { themeResult } = this
      const result = (withOptions.withCascading ? (source && themeResult ? deepMerges(false, {}, themeResult, source) : themeResult) : themeResult) as TCascadingResult
      return this.call_MEDIA_NOTIFY(result)
    }
    cascadingResult: { cascadingResult: TCascadingResult; usedNotifyBreakpoints: MediaQ.NotifyIntervalDecoded<string>; observedBits: number }

    MEDIAQ_NOTIFY = () => {
      const { cascadingResult, usedNotifyBreakpoints, observedBits: ob } = this.cascadingResult
      // actualize media record with respect to actual screen size 
      const mediaNotifyRecord = ob === 0 ? null : MediaQ.mediaqActualizetNotifyBreakpoints(usedNotifyBreakpoints)
      // prepare platform dependent sheet
      this.codeProps = prepareSheet(name, sheetCreator, options, cascadingResult, mediaNotifyRecord) as TCodeProps
      // get media breakpoints, used in sheet
      const { usedSheetBreakpoints, observedBits } = MediaQ.mediaqGetSheetBreakpoints(this.codeProps.classes as MediaQ.MediaQSheet)
      // save
      this.mediaNotifyResult = { usedSheetBreakpoints, observedBits }
      // observe for screen size changing
      return this.MediaQConsumer_RenderIfNeeded(observedBits, this.MEDIAQ_SHEET)
    }
    mediaNotifyResult: { usedSheetBreakpoints: MediaQ.MediaQRulesetDecoded[]; observedBits: number }
    codeProps: TCodeProps

    MEDIAQ_SHEET = () => {
      const { codeProps, mediaNotifyResult: { usedSheetBreakpoints, observedBits } } = this
      // actualize sheet with respect to actual screen size 
      if (observedBits !== 0) codeProps.classes = MediaQ.mediaqActualizeSheetBreakpoints(codeProps.classes as MediaQ.MediaQSheet, usedSheetBreakpoints) as TBasic.Sheet<R>
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
      return observedBits === 0 ? child() : <MediaQ.MediaQConsumer unstable_observedBits={observedBits}>{child}</MediaQ.MediaQConsumer>
    }

    AnimationsComponent_RenderIfNeeded($animations: TAnimation.SheetsX, child: (animations: TAnimation.Drivers) => React.ReactElement<any>) {
      return !$animations ? child(null) : <AnimationsComponent $initAnimations={$animations}>
        {child}
      </AnimationsComponent>
    }

    call_MEDIA_NOTIFY(cascadingResult: TCascadingResult) {
      // get used notify breakpoints from '$mediaq' component props
      const { usedNotifyBreakpoints, observedBits } = MediaQ.mediaqGetNotifyBreakpoints(cascadingResult)
      // save
      this.cascadingResult = { cascadingResult, usedNotifyBreakpoints, observedBits }
      // observe for screen size changing (if observedBits!=0)
      return this.MediaQConsumer_RenderIfNeeded(observedBits, this.MEDIAQ_NOTIFY)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !nextProps.CONSTANT
    }

    public static Provider: React.SFC<TProps> = (() => {
      if (withOptions.withCascading) return props => {
        const { children, ...rest } = props as TBasic.PropsX & { children?: React.ReactNode }
        return <CascadingProvider value={rest as TProps}>{children}</CascadingProvider>
      }
      return process.env.NODE_ENV == 'development' ? (() => {
        warning(false, 'PropsProvider does not exist. Set global ')
        return null
      }) : null
    })()

    public static displayName = name
    public static defaultProps = options && options.defaultProps
  }

}

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

export const AppContainer: React.SFC<{ theme?: TTheme.ThemeX }> = props => <MediaQ.MediaQ_AppContainer>
  <ThemeProvider value={props.theme || { type: 'ThemeX', $cache: {} }}>
    {props.children}
  </ThemeProvider>
</MediaQ.MediaQ_AppContainer>

const prepareSheet = (name: string, createSheetX: TTheme.SheetCreatorX, options: TTheme.WithStyleOptions_Component, props: TBasic.PropsX & { theme: TTheme.ThemeX } & MediaQ.CodeProps & Types.OnPressAllX, mediaqCode: MediaQ.CodePropsItems) => {

  const { theme, classes, className, style, $mediaq: ignore1, onPress, onLongPress, onPressIn, onPressOut, $web, $native, ...rest } = props

  //** STATIC SHEET
  let staticSheet: TBasic.Sheet
  let getStaticSheet: () => TBasic.Sheet
  let variantCacheId
  let variant = null
  if (typeof createSheetX !== 'function') {
    variantCacheId = '#static#'
    getStaticSheet = () => toPlatformSheet(createSheetX)
  } else {
    if (options.getVariant) {
      const propsWithMediaQ = mediaqCode ? { ...props, mediaqCode } : props
      variant = options.getVariant(propsWithMediaQ)
      variantCacheId = options.variantToString && options.variantToString(variant)
      if (variantCacheId) {
        getStaticSheet = () => toPlatformSheet(callCreator(theme, variant, createSheetX))
      } else {
        //getVariant!=null && variantToString==null => NO CACHING
        staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
      }
    }
  }
  if (!staticSheet) {
    if (!theme) staticSheet = getStaticSheet()
    else {
      let compCache = theme.$cache[name]
      if (!compCache) theme.$cache[name] = compCache = {}
      staticSheet = compCache[variantCacheId]
      if (!staticSheet) compCache[variantCacheId] = staticSheet = getStaticSheet();
      (staticSheet as any).$preserve = true
    }
  }

  //** MERGE staticSheet with classes and className
  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
  const actSheet: TBasic.Sheet = classes || root ? deepMerges(false, {}, staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet
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
      case 1: res = deepMerges(true, {}, res, ruleset); break
      default: deepMerges(true, res, ruleset); break
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

