import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { ThemeProvider, ThemeConsumer, theme } from './theme'
import { deepMerges, deepMerge, immutableMerge, deepModifyTest } from './to-platform'
import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { FinalizeProps, getStyleFromProps } from './finalize-props'
import { renderCounter } from './develop'
import { getPlatformSheet } from './sheet-cache'

const DEV_MODE = process.env.NODE_ENV === 'development'

deepModifyTest()

/************************
* TRenderState
*************************/
export interface TRenderState {

  // Step 1: themeContext from ThemeProvider
  themeContext?: TCommon.ThemeContext

  // Step 2: merge props, separate addInProps and cascadingStyles. Sources are defaultProps, cascading result, actual props
  platformProps?: Types.CodeProps
  accumulatedStylesFromProps?: Types.AccumulatedStylesFromProps // 
  addInProps?: TAddIn.PropsX // separated props, which name starts with $, e.g. $mediaq, $developer_flag etc.
  //codeProps?: Types.CodeProps // platform dependent events
  codeSystemProps?: Types.CodeSystemProps // platform independent events with codeSystemProps parametters

  // Step 3: call addIns - can change platformProps and codeSystemProps
  codeSystemPropsPatch?: { [addInName: string]: TAddIn.CodeProps } // props modified by addIns 

  // Step 4: 
  // - 
  addInClasses?: TAddIn.SheetX // separated addIn sheet

  codeClassesPatch?: Types.Sheet[] // classes modified by addIns 

  codeClasses?: Types.Sheet // platform dependent classes

  //finalCodeProps?: Types.CodeProps // final props, processed by component code
}

/************************
* ADDIN
*************************/
// addIn configuration type
export interface RenderAddIn {
  beforeToPlatform: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  afterToPlatform: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
}

// empty addIn configuration
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

  if (options.defaultProps) {
    const { $themedProps, classes, rest } = getStyleFromProps(options.defaultProps)
    options._defaultPropsAsStyleFromProps = { $themedProps, rest }
    options._defaultClasses = classes
  }

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
      codeSystemPropsPatch: {},
      codeClassesPatch: [],
    }

    render() {
      if (DEV_MODE && this.props.$developer_flag)
        debugger
      return this.renderer()
    }

    renderComponentCode = () => {
      const { platformProps, codeClassesPatch, codeClasses, codeSystemProps, addInProps } = this.state

      if (addInProps.$developer_flag) {
        const { themeContext, codeSystemPropsPatch/*, addInClasses*/ } = this.state
        console.log(
          `### withStyles RENDER CODE for ${displayName}`,
          '\nprops: ', this.props,
          '\nplatformProps: ', platformProps,
          '\naddInProps: ', addInProps,
          '\ntheme: ', themeContext.theme,
          //'\ncodeProps: ', codeProps,
          '\npropsPatch: ', codeSystemPropsPatch,
          '\ncodeSystemProps: ', codeSystemProps,
          '\ncodeClasses: ', codeClasses,
          '\ncodeClassesPatch: ', codeClassesPatch,
          //'\naddInClasses: ', addInClasses,
        )
      }

      // apply patches
      let classes = codeClasses as Types.Sheet & { $isCached?: boolean }
      if (codeClassesPatch.length > 0) {
        classes = deepMerges({}, codeClasses, ...codeClassesPatch)
        delete classes.$isCached
      }

      const finalCodeProps = {
        ...platformProps,
        system: { ...codeSystemProps, ...this.state.addInProps, classes }
      }

      // call component code
      return <CodeComponent {...finalCodeProps as Types.CodeProps<R>} />
    }

    renderer =
      theme(
        () => ({ withTheme: options.withTheme }),
        themeContext => this.state.themeContext = themeContext,
        finalizeProps(
          () => ({ props: this.props, theme: this.state.themeContext.theme, renderState: this.state }),
          ({ platformProps, addInProps, accumulatedStylesFromProps, eventsX }) => { this.state.platformProps = platformProps; this.state.addInProps = addInProps; this.state.accumulatedStylesFromProps = accumulatedStylesFromProps },
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

const convertToPlatform = (displayName: string, id: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

  const { codeSystemPropsPatch, platformProps, addInProps, accumulatedStylesFromProps } = renderState
  const { theme, $cache } = renderState.themeContext

  // **** codeSystemProps
  const codeSystemProps = renderState.codeSystemProps = {} as Types.CodeSystemProps
  for (const p in codeSystemPropsPatch) Object.assign(codeSystemProps, codeSystemPropsPatch[p])

  // **** variant
  let variant: {} = null
  let variantCacheId: string = null
  const expandCreator = creator => typeof creator === 'function' ? creator(theme, variant) : creator

  if (options && options.getVariant) {
    variant = options.getVariant(codeSystemProps, theme)
    variantCacheId = options.variantToString ? options.variantToString(variant) : null
  }
  codeSystemProps.variant = variant

  // **** style (for web only). For native: is included in sheetXPatch.root.
  const toMergeStylesCreators = window.isWeb && accumulatedStylesFromProps.style.length > 0 ? accumulatedStylesFromProps.style : null
  const toMergeStylesX = !toMergeStylesCreators ? null : toMergeStylesCreators.map(creator => expandCreator(creator))
  const styleXPatch = !toMergeStylesX ? null : toMergeStylesX.length === 1 ? toMergeStylesX[0] : deepMerges({}, ...toMergeStylesX)

  codeSystemProps.style = !styleXPatch ? null : toPlatformStyle(toMergeStylesX.length === 1, styleXPatch)

  // **** sheet patch (for native: style included)
  const toMergeSheetCreators = [...accumulatedStylesFromProps.classes, ...accumulatedStylesFromProps.className.map(className => ({ root: className })), ... (window.isWeb ? null : accumulatedStylesFromProps.style.map(style => ({ root: style })))]
  const sheetXPatch: Types.PartialSheetX[] = toMergeSheetCreators.length === 0 ? null : toMergeSheetCreators.map(creator => expandCreator(creator))
  const defaultClasses: Types.PartialSheetX = typeof options._defaultClasses === 'function' ? expandCreator(options._defaultClasses) : options._defaultClasses
  //const sheetXPatch: Types.PartialSheetCreatorX[] = !toMergeSheetsX ? null : toMergeSheetsX.length === 1 ? toMergeSheetsX[0] : deepMerges({}, ...toMergeSheetsX)

  // **** apply sheet patch to sheet:
  // call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
  const { codeClasses, addIns } = getPlatformSheet({ id, createSheetX, themeContext: renderState.themeContext, sheetXPatch, defaultClasses, variant, variantCacheId })
  renderState.addInClasses = addIns //e.g {$animations:..., root: {$mediaq:...}}
  renderState.codeClasses = codeClasses
}

const toPlatformStyle = (style: Types.RulesetX, isConst: boolean) => {
  if (!style) return style

  const $web = style.$web; const $native = style.$native

  const process = data => isConst ? deepMerges({}, style, data) : deepMerge(style, data)

  let res = style
  if ($web) {
    if (!window.isWeb) delete style.$web
    else { res = process($web); delete res.$web }
  }
  if ($native) {
    if (window.isWeb) delete style.$native
    else { res = process($native); delete res.$native }
  }
  return res
}


  //const { onPress, onLongPress, onPressIn, onPressOut, ...rest } = platformProps as Types.PropsX & Types.OnPressAllX
  //const classes = getStaticSheetFromCache(id, createSheetX, renderState.themeContext, sheetXPatch, variant, variantCacheId)


  //let getSheetFromCache
  //let toPlatformSheets
  //let toPlatformStyles
  //const sheetFromCache = getSheetFromCache(toMergeSheetsX.length <= 0)

  //// call creators (theme, variant), deepmerges toMergeSheetsX to sheetFromCache, process RulesetX.$web & $native & $before & $after
  //const classes = toPlatformSheets(theme, variant, sheetFromCache, toMergeSheetsX)


  //const style = toPlatformStyles(theme, variant, toMergeStylesCreators) // call creators (theme, variant), deepmerges toMergeStylesX to {}

  //** systemProps
  //renderState.codeSystemProps = {
  //  classes: null,
  //  style,
  //  variant,
  //} as Types.CodeSystemProps
  //for (const p in codeSystemPropsPatch) Object.assign(renderState.codeSystemProps, codeSystemPropsPatch[p])
  //const propsPatchKeys = Object.keys(propsPatch)
  //let systemFromPatch = propsPatchKeys.length > 0 ? Object.assign({}, ...propsPatch) : null
  //renderState.codeSystemProps = {
  //  ...systemFromPatch,
  //  classes: null,
  //  style,
  //  variant,
  //} as Types.CodeSystemProps
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


  //renderState.codeProps = rest as Types.CodeProps



  //toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, renderState.codeProps, renderState.codeSystemProps)
//}
//const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

//export const toPlatformRuleSet = (style: Types.RulesetX & { $mediaq?}) => {
//  if (!style) return style
//  const isNative = !window.isWeb
//  if (!style.$mediaq && !style.$web && !style.$native /*&& !style.$props*/) return style
//  const { $web, $native, /*$overrides,*/ $mediaq, /*$props: $propsX,*/ ...rest } = style
//  //let $props: any = $propsX
//  //if ($propsX && ($propsX.$native && isNative || $propsX.$web && !isNative)) {
//  //  const { $native: $propsNative, $web: $propsWeb, ...restProps } = $propsX
//  //  $props = { ...restProps, ...(isNative ? $propsNative : $propsWeb) }
//  //}
//  const res: any = { ...rest, ...(isNative ? $native : $web), $mediaq: toPlatformSheet($mediaq as any)/*, $props*/ }
//  //if (!res.$overrides) delete res.$overrides;  //remove NULL or UNDEFINED
//  //if (!res.$props) delete res.$props //remove NULL or UNDEFINED
//  return res as TCommonStyles.Ruleset
//}

////create platform specific sheet from cross platform one
//export const toPlatformSheet = (sheet: Types.PartialSheetX) => {
//  if (typeof sheet !== 'object') return sheet
//  const res = {}
//  for (const p in sheet) {
//    const sheet$p = sheet[p]
//    if (p === '$mediaq') { // media breakpoints
//      res[p] = sheet$p
//    } else // ruleset
//      res[p] = toPlatformRuleSet(sheet$p)
//  }
//  return res as Types.Sheet
//}
