import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { ThemeProvider, ThemeConsumer, theme } from './theme'
import { deepMerges, deepModify } from './to-platform'
import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { FinalizeProps, getStyleFromProps } from './finalize-props'
import { renderCounter } from './develop'

const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* TRenderState
*************************/
export interface TRenderState {

  // Step 1: themeContext from ThemeProvider
  themeContext?: TCommon.ThemeContext 

  // Step 2: merge props, separate addInProps and cascadingStyles. Sources are defaultProps, cascading result, actual props
  finalProps?: Types.PropsX
  accumulatedStylesFromProps?: Types.AccumulatedStylesFromProps // 
  addInProps?: TAddIn.PropsX // separated props, which name starts with $, e.g. $mediaq, $developer_flag etc.
  codeProps?: Types.CodeProps // platform dependent events
  codeSystemProps?: Types.CodeSystemProps // platform independent events with codeSystemProps parametters

  // Step 3: call addIns - can change codeProps and codeSystemProps
  propsPatch?: TAddIn.CodeProps[] // props modified by addIns 

  // Step 4: 
  // - 
  addInClasses?: TAddIn.SheetX // separated addIn sheet

  codeClassesPatch?: Types.Sheet[] // classes modified by addIns 

  codeClasses?: Types.Sheet // platform dependent classes

  finalCodeProps?: Types.CodeProps // final props, processed by component code
}

/************************
* ADDIN
*************************/
// addIn configuration type
export interface RenderAddIn {
  beforeToPlatform: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  afterToPlatform: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
}

// addIn configuration
export const renderAddIn: RenderAddIn = {
  beforeToPlatform: (state, next) => next,
  afterToPlatform: (state, next) => next
}

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, codeComponent: Types.CodeComponentType<R>) =>
  (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStylesLow<R, TStatic>(displayName, sheetCreator, overrideOptions)(codeComponent)

const withStylesLow = <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, options?: Types.WithStyleOptions_ComponentX<R>) => (CodeComponent: Types.CodeComponentType<R>) => {

  type TPropsX = Types.PropsX<R>

  const id = compCounter++
  displayName = `${displayName} (${id})`

  if (!options) options = {}

  sheetCreator = options.sheet || sheetCreator

  options.withTheme = typeof options.withTheme === 'boolean' ? options.withTheme : typeof sheetCreator === 'function'

  if (options.defaultProps) options._defaultPropsAsStyleFromProps = getStyleFromProps(options.defaultProps)

  //**** PROPERTY CASCADING 

  const { finalizeProps, cascadingProvider } = FinalizeProps<R>(options)

  //**** TO PLATFORM
  const toPlatform = (state: TRenderState, next: () => React.ReactNode) => {
    const res = () => {
      convertToPlatform(displayName, id, sheetCreator, options, state)
      return next()
    }
    return res
  }

  //****************************
  // Styled COMPONENT
  //****************************
  class Styled extends React.Component<Types.PropsX, TRenderState> {

    state: TRenderState = {
      propsPatch: [],
      codeClassesPatch: [],
    }

    render() {
      if (DEV_MODE && this.props.$developer_flag)
        debugger
      return this.renderer()
    }

    renderComponentCode = () => {
      const { codeClassesPatch, codeProps, codeClasses, codeSystemProps, addInProps } = this.state

      if (addInProps.$developer_flag) {
        const { themeContext, finalProps, propsPatch/*, addInClasses*/ } = this.state
        console.log(
          `### withStyles RENDER CODE for ${displayName}`,
          '\nprops: ', this.props,
          '\nfinalProps: ', finalProps,
          '\ntheme: ', themeContext.theme,
          '\ncodeProps: ', codeProps,
          '\npropsPatch: ', propsPatch,
          '\ncodeSystemProps: ', codeSystemProps,
          '\ncodeClasses: ', codeClasses,
          '\ncodeClassesPatch: ', codeClassesPatch,
          '\naddInProps: ', addInProps,
          //'\naddInClasses: ', addInClasses,
        )
      }

      // apply patches
      let classes = codeClasses as Types.Sheet & { $isCached?: boolean }
      if (codeClassesPatch.length > 0) {
        classes = deepMerges({}, codeClasses, ...codeClassesPatch)
        delete classes.$isCached
      }

      this.state.finalCodeProps = {
        ...codeProps,
        system: { ...codeSystemProps, ...this.state.addInProps, classes }
      }

      // call component code
      return <CodeComponent {...this.state.finalCodeProps as Types.CodeProps<R>} />
    }

    renderer =
      theme(
        () => ({ withTheme: options.withTheme }),
        themeContext => this.state.themeContext = themeContext,
        finalizeProps(
          () => ({ props: this.props, theme: this.state.themeContext.theme, renderState: this.state }),
          ({ finalProps, addInProps, accumulatedStylesFromProps }) => { this.state.finalProps = finalProps; this.state.addInProps = addInProps; this.state.accumulatedStylesFromProps = accumulatedStylesFromProps },
          renderAddIn.beforeToPlatform(this.state,
            toPlatform(this.state,
              renderAddIn.afterToPlatform(this.state,
                renderCounter(() => ({ developer_flag: this.state.addInProps.$developer_flag }), count => { this.state.addInProps.$developer_RenderCounter = count },
                  this.renderComponentCode
                )
              )
            )
          )
        )
      )

    shouldComponentUpdate(nextProps: Types.PropsX, nextState, nextContext) {
      return !nextProps.$constant
    }

    public static Provider = cascadingProvider
    public static displayName = displayName
  }

  const styled: React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic = Styled as any
  return styled

}

let compCounter = 0

export const withStyles: <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, options?, overrideOptions?) => (CodeComponent) => any = withStylesLow


export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

/************************
* PRIVATE
*************************/

//const uniqueNameCheck: { [name: string]: boolean } = {}

const convertToPlatform = (displayName: string, id:number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

  const { propsPatch, finalProps, addInProps, accumulatedStylesFromProps } = renderState
  const { theme, $cache } = renderState.themeContext
  const { onPress, onLongPress, onPressIn, onPressOut, ...rest } = finalProps as Types.PropsX & Types.OnPressAllX
  let variant = null

  // classes modifiers
  const toMergeSheetsX = [...accumulatedStylesFromProps.classes, ...accumulatedStylesFromProps.className.map(className => ({ root: className })), ... (window.isWeb ? null : accumulatedStylesFromProps.style.map(style => ({ root: style })))]
  const toMergeStylesX = window.isWeb && accumulatedStylesFromProps.style.length > 0 ? accumulatedStylesFromProps.style : null

  let getSheetFromCache
  let toPlatformSheets
  let toPlatformStyles
  const sheetFromCache = getSheetFromCache(toMergeSheetsX.length <= 0)

  const classes = toPlatformSheets(theme, variant, sheetFromCache, toMergeSheetsX) // call creators (theme, variant), deepmerges toMergeSheetsX to sheetFromCache, process RulesetX.$web & $native & $before & $after
  renderState.addInClasses = classes.addInClasses //e.g {$animations:..., root: {$mediaq:...}}
  renderState.codeClasses = classes.codeClasses

  const style = toPlatformStyles(theme, variant, toMergeStylesX) // call creators (theme, variant), deepmerges toMergeStylesX to {}


  //const sheet = toMerge.length <= 1 ? sheetFromCache.sheet : deepMerges(sheetFromCache.isConstant ? deepClone(sheetFromCache.sheet) : sheetFromCache.sheet, ...toMerge)

  //const { classes, className, style, onPress, onLongPress, onPressIn, onPressOut, $web, $native, ...rest } = finalProps as Types.PropsX & Types.OnPressAllX

  //** STATIC SHEET
  //let staticSheet: Types.Sheet & { $isCached?: boolean }
  //let getStaticSheet: () => Types.Sheet
  //let variantCacheId
  //if (typeof createSheetX !== 'function') {
  //  variantCacheId = '#static#'
  //  getStaticSheet = () => toPlatformSheet(createSheetX)
  //} else {
  //  if (options && options.getVariant) {
  //    const propsWithPatch = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
  //    variant = options.getVariant(propsWithPatch, theme)
  //    variantCacheId = options.variantToString && options.variantToString(variant)
  //    if (variantCacheId) {
  //      getStaticSheet = () => toPlatformSheet(callCreator(theme, variant, createSheetX))
  //    } else {
  //      //getVariant!=null && variantToString==null => NO CACHING
  //      staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
  //    }
  //  } else {
  //    variantCacheId = '#novariant#'
  //    getStaticSheet = () => toPlatformSheet(callCreator(theme, null, createSheetX))
  //  }
  //}

  //if (!staticSheet) {
  //  let compCache = $cache[id]
  //  if (!compCache) $cache[id] = compCache = {}
  //  staticSheet = compCache[variantCacheId]
  //  if (!staticSheet) {
  //    compCache[variantCacheId] = staticSheet = getStaticSheet();
  //    staticSheet.$isCached = true
  //  }
  //}

  ////** MERGE staticSheet with classes and className
  //const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
  //const rootStyle = !window.isWeb && style && { root: toPlatformRuleSet(callCreator(theme, variant, style)) }
  //if (classes || root || rootStyle) {
  //  renderState.codeClasses = deepModify(staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root, rootStyle)
  //  delete renderState.codeClasses.$isCached
  //} else
  //  renderState.codeClasses = staticSheet

  //if (addInProps.$developer_flag) {
  //  console.log(
  //    `### withStyles PREPARE SHEET for ${displayName}`,
  //    '\nstaticSheet: ', staticSheet,
  //    '\nroot: ', root,
  //    '\nclasses: ', classes,
  //  )
  //}

  //// separate AddIns from sheet to $classes
  //let finalCodeClasses = renderState.codeClasses
  //renderState.addInClasses = {} as any
  //for (const p in renderState.codeClasses) {
  //  if (p.startsWith('$')) {
  //    if (finalCodeClasses.$isCached) { // cannot modify $isCached codeClasses => make shallow copy
  //      finalCodeClasses = { ...renderState.codeClasses }
  //      delete finalCodeClasses.$isCached
  //    }
  //    renderState.addInClasses[p] = finalCodeClasses[p]
  //    delete finalCodeClasses[p] // modify finalCodeClasses
  //    continue
  //  }
  //}
  //renderState.codeClasses = finalCodeClasses


  renderState.codeProps = rest as Types.CodeProps

  //** RETURN platform dependent props for pure component code
  const systemFromPatch = propsPatch.length > 0 ? Object.assign({}, ...propsPatch) : null
  renderState.codeSystemProps = {
    ...systemFromPatch,
    classes: null,
    style,
    variant,
  } as Types.CodeSystemProps

  //toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, renderState.codeProps, renderState.codeSystemProps)
}
const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

export const toPlatformRuleSet = (style: Types.RulesetX & { $mediaq?}) => {
  if (!style) return style
  const isNative = !window.isWeb
  if (!style.$mediaq && !style.$web && !style.$native /*&& !style.$props*/) return style
  const { $web, $native, /*$overrides,*/ $mediaq, /*$props: $propsX,*/ ...rest } = style
  //let $props: any = $propsX
  //if ($propsX && ($propsX.$native && isNative || $propsX.$web && !isNative)) {
  //  const { $native: $propsNative, $web: $propsWeb, ...restProps } = $propsX
  //  $props = { ...restProps, ...(isNative ? $propsNative : $propsWeb) }
  //}
  const res: any = { ...rest, ...(isNative ? $native : $web), $mediaq: toPlatformSheet($mediaq as any)/*, $props*/ }
  //if (!res.$overrides) delete res.$overrides;  //remove NULL or UNDEFINED
  //if (!res.$props) delete res.$props //remove NULL or UNDEFINED
  return res as TCommonStyles.Ruleset
}

//create platform specific sheet from cross platform one
export const toPlatformSheet = (sheet: Types.PartialSheetX) => {
  if (typeof sheet !== 'object') return sheet
  const res = {}
  for (const p in sheet) {
    const sheet$p = sheet[p]
    if (p === '$mediaq') { // media breakpoints
      res[p] = sheet$p
    } else // ruleset
      res[p] = toPlatformRuleSet(sheet$p)
  }
  return res as Types.Sheet
}
