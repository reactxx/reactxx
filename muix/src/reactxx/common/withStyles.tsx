﻿import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { Types, TCommonStyles, toPlatformEvents, deepMerge, deepMergesSys, deepMerges } from 'reactxx-basic'
import { animations, TAnimation } from 'reactxx-animation'
import { mediaQFlags, TMediaQ, MediaQ_AppContainer, mediaQProviderExists, mediaQSheet } from 'reactxx-mediaq'
import { activeFlag, activeSheet, TActivable } from 'reactxx-activable'

import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { TBasic } from '../typings/basic'
import { TAddIn } from '../typings/add-in'
import { theme, TTheme, ThemeProvider, ThemeConsumer } from './theme'
import { Overrides } from 'material-ui/styles/overrides';

const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends TBasic.Shape, TStatic extends {} = {}>(name: Types.getNameType<R>, sheetCreator: TBasic.SheetCreatorX<R>, component: TBasic.CodeComponentType<R>, options?: TTheme.WithStyleOptions_ComponentX<R>) =>
  (overrideOptions?: TTheme.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(name, sheetCreator, options, overrideOptions)(component)

export const withStyles = <R extends TBasic.Shape, TStatic extends {} = {}>(name: Types.getNameType<R>, sheetCreator: TBasic.SheetCreatorX<R>, _options?: TTheme.WithStyleOptions_ComponentX<R>, overrideOptions?: TTheme.WithStyleOptions_ComponentX<R>) => (Component: TBasic.CodeComponentType<R>) => {

  type TPropsX = TBasic.PropsX<R>

  //*** OPTIONS
  const options: TTheme.WithStyleOptions_ComponentX = _options && overrideOptions ? deepMerges({}, _options, overrideOptions) : (overrideOptions ? { ...overrideOptions } : (_options ? { ..._options } : {}))
  options.withTheme = fromOptions(typeof sheetCreator === 'function', options ? options.withTheme : undefined)

  //**** PROPERTY CASCADING 

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = options.withCascading ? React.createContext<TPropsX>(null) : { Provider: null, Consumer: null } as React.Context<TPropsX>

  class provider extends React.Component<TPropsX> {

    render() {
      if (options.withCascading) return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
      warning(DEV_MODE, `Component.Provider does not exist (component.name=${name}). Use 'C' variant of the component, e.g. <LabelC.Provider><LabelC>. 'C' variant of the component is created by e.g. 'LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label); export const LabelC = LabelCreator({ withCascading: true})'`) //`
      return null
    }

    CASCADING = (parentsProps: TPropsX) => {
      const { children, ...rest } = this.props as TBasic.PropsX & { children?: React.ReactNode }
      return <CascadingProvider value={(parentsProps && rest ? deepMerges({}, parentsProps, rest) : rest) as TPropsX}>{children}</CascadingProvider>
    }

  }

  const resolveDefaultProps = (defaultProps, cascadingProps, props) => {
    if (!defaultProps && !cascadingProps) return props
    const modifier = defaultProps && cascadingProps ? deepMerges({}, defaultProps, cascadingProps) : (defaultProps ? defaultProps : cascadingProps)
    const canChangeModifier = defaultProps && cascadingProps //modifier is deepMerged => can change it
    const res = { ...props }
    for (const p in modifier) {
      const modp = modifier[p]
      const propsp = props[p]
      if (propsp && typeof modp === 'object') res[p] = canChangeModifier ? deepMerge(modp, propsp) : deepMerges({}, modp, propsp)
      else res[p] = modifier[p]
    }
    return res
  }

  const cascading = (input: () => TBasic.PropsX, output: (outputPar: TBasic.PropsX) => void, next: () => React.ReactNode) => {
    let componentProps: TBasic.PropsX
    const render = (inheritedProps: TBasic.PropsX) => {
      output(resolveDefaultProps(options.defaultProps, inheritedProps, componentProps))
      return next()
    }
    const res = () => {
      componentProps = input()
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(resolveDefaultProps(options.defaultProps, null, componentProps))
      return next()
    }
    return res
  }

  //**** TO PLATFORM
  const toPlatform = (input: () => { mediaQFlags: TMediaQ.MediaFlags; activeFlag: boolean; propsWithCascading: TBasic.PropsX; themeContext: TTheme.ThemeContext }, output: (outputPar: { codeProps: TBasic.CodeProps, codeClasses: Types.Sheet, $animations: TAnimation.SheetsX }) => void, next: () => React.ReactNode) => {
    const res = () => {
      const { mediaQFlags, activeFlag, propsWithCascading, themeContext } = input()
      const { codeProps, codeClasses } = prepareSheet(name, sheetCreator, options, propsWithCascading, themeContext, mediaQFlags, activeFlag)
      output({ codeProps, codeClasses, $animations: codeClasses.$animations as TAnimation.SheetsX })
      delete codeClasses.$animations
      return next()
    }
    return res
  }

  //****************************
  // Styled COMPONENT
  //****************************
  class Styled extends React.Component<TPropsX> {

    themeContext: TTheme.ThemeContext = {}
    propsWithCascading: TBasic.PropsX
    codeProps: TBasic.CodeProps
    codeClasses: Types.Sheet
    $animations: TAnimation.SheetsX
    mediaQFlags: TMediaQ.MediaFlags
    mediaSheetPatch: TMediaQ.MediaQSheet //Types.Sheet & { $animations?: TAnimation.SheetsX }
    activable: TActivable.ActiveResult
    activablePatch: Types.Sheet
    animations: TAnimation.Drivers

    render() {
      if (DEV_MODE && this.props.developer_flag)
        debugger
      return this.renderer()
    }

    renderCodeComponent = () => {
      const { mediaSheetPatch, activablePatch, codeProps, codeClasses, animations } = this

      if (DEV_MODE && codeProps.system.developer_flag) console.log(
        `### withStyles AFTER_ANIMATION for ${name}`,
        '\ntheme: ', this.themeContext.theme,
        '\npropsWithCascading: ', this.propsWithCascading,
        '\ncodeProps: ', this.codeProps,
        '\ncodeClasses: ', codeClasses,
        '\nmediaSheetPatch: ', this.mediaSheetPatch,
        '\nactivablePatch: ', this.activablePatch,
        //':\n', this.,
      )

      // apply patches
      let classes = codeClasses as Types.Sheet<R>
      if (mediaSheetPatch || activablePatch) classes = deepMerges({}, codeClasses, mediaSheetPatch, activablePatch)

      // call component code
      return <Component {...codeProps as TBasic.CodeProps<R>} system={{ ...codeProps.system, classes, animations: animations as TAnimation.Drivers<TAddIn.getAnimation<R>> }} />
    }

    renderer =
      theme(() => options.withTheme, themeContext => this.themeContext = themeContext || {},
        cascading(() => this.props, propsWithCascading => this.propsWithCascading = propsWithCascading,
          mediaQFlags(() => ({ $mediaq: this.propsWithCascading.$mediaq, theme: this.themeContext.theme }), mediaQFlags => this.mediaQFlags = mediaQFlags,
            //activeFlag(() => withOptions.withActive, activable => this.activable = activable,
            toPlatform(() => ({ mediaQFlags: this.mediaQFlags, activeFlag: false /*this.activable.active*/, propsWithCascading: this.propsWithCascading, themeContext: this.themeContext }), ({ codeProps, codeClasses, $animations }) => { this.codeClasses = codeClasses, this.codeProps = codeProps, this.$animations = $animations },
              mediaQSheet(() => this.codeClasses as TMediaQ.MediaQSheet, mediaSheetPatch => this.mediaSheetPatch = mediaSheetPatch,
                //activeSheet(() => ({ activeFlag: this.activable.active, sheet: this.codeClasses as TActivable.SheetWithAddIn, activable: withOptions.withActive }), patch => this.activablePatch = patch,
                animations(() => this.$animations, animations => this.animations = animations,
                  this.renderCodeComponent
                )
              )
            )
          )
        )
      )
    //)
    //)

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !nextProps.CONSTANT
    }

    public static Provider = provider
    public static displayName = name
  }

  const styled: React.ComponentClass<TBasic.PropsX<R>> & TProvider<R> & TStatic = Styled as any
  return styled

}

export interface TProvider<R extends TBasic.Shape> { Provider: React.ComponentClass<TBasic.PropsX<R>> }

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

export const AppContainer: React.SFC<{ theme?: TTheme.ThemeCreator }> = props => {
  const theme = <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
  return mediaQProviderExists() ? theme : <MediaQ_AppContainer>{theme}</MediaQ_AppContainer>
}

/************************
* PRIVATE
*************************/

const prepareSheet = (name: string, createSheetX: TBasic.SheetCreatorX, options: TTheme.WithStyleOptions_ComponentX, props: TBasic.PropsX, themeContext: TTheme.ThemeContext, mediaqFlags: TMediaQ.MediaFlags, activeFlag: boolean) => {

  const { classes, className, style, $mediaq: ignore1, onPress, onLongPress, onPressIn, onPressOut, $web, $native, developer_flag, CONSTANT, ...rest } = props as TBasic.PropsX & TCommonStyles.OnPressAllX
  const { theme, $cache } = (themeContext || {}) as TTheme.ThemeContext

  //** STATIC SHEET
  let staticSheet: Types.Sheet
  let getStaticSheet: () => Types.Sheet
  let variantCacheId
  let variant = null
  if (typeof createSheetX !== 'function') {
    variantCacheId = '#static#'
    getStaticSheet = () => toPlatformSheet(createSheetX)
  } else {
    if (options && options.getVariant) {
      const propsWithMediaQ = mediaqFlags ? { ...props, mediaqFlags } : props
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
  //if (!staticSheet) staticSheet = getStaticSheet()

  if (!staticSheet) {
    if (!$cache) staticSheet = getStaticSheet()
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
  const codeClasses: Types.Sheet = classes || root ? deepMergesSys(false, {}, staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet


  //** RETURN platform dependent props for pure component code
  const codeProps = {
    ...rest,
    system: {
      classes: codeClasses,
      style: toPlatformRuleSet(callCreator(theme, variant, style)),
      variant,
      mediaqFlags,
      activeFlag,
      developer_flag,
    }
  } as TBasic.CodeProps

  toPlatformEvents($web, $native as TCommonStyles.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

  return { codeProps, codeClasses }
}
const callCreator = <T extends {}>(theme: TTheme.ThemeBase, variant, creator: T | ((theme: TTheme.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

const fromOptions = (...bools: boolean[]) => {
  let res = undefined
  if (bools) bools.forEach(b => { if (typeof b === 'boolean') res = b })
  return res
}

