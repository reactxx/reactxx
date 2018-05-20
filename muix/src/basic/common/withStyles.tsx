import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { ThemeProvider, ThemeConsumer, theme } from './theme'
import { toPlatformEvents, deepMerges, deepModify } from './to-platform'
import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { FinalizeProps } from './finalize-props'
import { renderCounter } from './develop'

const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* TRenderState
*************************/
export interface TRenderState {
  finalProps?: Types.PropsX // processed defaultProps, cascadingProps, separated AddIn props
  themeContext?: TCommon.ThemeContext // cascading themeContext

  addInProps?: TAddIn.PropsX // separated addIn props
  addInClasses?: TAddIn.SheetX // separated addIn sheet

  propsPatch?: TAddIn.CodeProps[] // props modified by addIns 
  codeClassesPatch?: Types.Sheet[] // classes modified by addIns 

  codeProps?: Types.CodeProps // platform dependent props
  codeSystemProps?: Types.CodeSystemProps // props, processed by code
  codeClasses?: Types.Sheet // platform dependent classes

  finalCodeProps?: Types.CodeProps
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

export const withStylesCreator = <R extends Types.Shape, TStatic extends {} = {}>(name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, codeComponent: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
  (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStylesLow<R, TStatic>(name, sheetCreator, options, overrideOptions)(codeComponent)

const withStylesLow = <R extends Types.Shape, TStatic extends {} = {}>(name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, _options?: Types.WithStyleOptions_ComponentX<R>, overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => (CodeComponent: Types.CodeComponentType<R>) => {

  warning(!uniqueNameCheck[name], `*** withStylesCreator: Component with name=${name} already exist`)
  uniqueNameCheck[name] = true

  type TPropsX = Types.PropsX<R>

  //*** OPTIONS
  const options: Types.WithStyleOptions_ComponentX = _options && overrideOptions ? deepMerges({}, _options, overrideOptions) : (overrideOptions ? { ...overrideOptions } : (_options ? { ..._options } : {}))
  options.withTheme = fromOptions(typeof sheetCreator === 'function', options ? options.withTheme : undefined)

  //**** PROPERTY CASCADING 

  const { finalizeProps, cascadingProvider } = FinalizeProps<Types.PropsX>(options)

  //**** TO PLATFORM
  const toPlatform = (state: TRenderState, next: () => React.ReactNode) => {
    const res = () => {
      convertToPlatform(name, sheetCreator, options, state)
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
      if (DEV_MODE && this.props.developer_flag)
        debugger
      return this.renderer()
    }

    renderComponentCode = () => {
      const { codeClassesPatch, codeProps, codeClasses, codeSystemProps, addInProps } = this.state

      if (addInProps.developer_flag) {
        const { themeContext, finalProps, propsPatch, addInProps, addInClasses } = this.state
        console.log(
          `### withStyles RENDER CODE for ${name}`,
          '\nprops: ', this.props,
          '\nfinalProps: ', finalProps,
          '\ntheme: ', themeContext.theme,
          '\ncodeProps: ', codeProps,
          '\npropsPatch: ', propsPatch,
          '\ncodeSystemProps: ', codeSystemProps,
          '\ncodeClasses: ', codeClasses,
          '\ncodeClassesPatch: ', codeClassesPatch,
          '\naddInProps: ', addInProps,
          '\naddInClasses: ', addInClasses,
        )
      }

      // apply patches
      let classes = codeClasses as Types.Sheet<R> & { __isCached?: boolean }
      if (codeClassesPatch.length > 0) {
        classes = deepMerges({}, codeClasses, ...codeClassesPatch)
        delete classes.__isCached
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
          ({ finalProps, addInProps }) => { this.state.finalProps = finalProps; this.state.addInProps = addInProps },
          renderAddIn.beforeToPlatform(this.state,
            toPlatform(this.state,
              renderAddIn.afterToPlatform(this.state,
                renderCounter(() => ({ developer_flag: this.state.addInProps.developer_flag }), count => { this.state.addInProps.developer_RenderCounter = count },
                  this.renderComponentCode
                )
              )
            )
          )
        )
      )

    shouldComponentUpdate(nextProps: Types.PropsX, nextState, nextContext) {
      return !nextProps.CONSTANT
    }

    public static Provider = cascadingProvider
    public static displayName = name
  }

  const styled: React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic = Styled as any
  return styled

}

export const withStyles: <R extends Types.Shape, TStatic extends {} = {}>(name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, options?, overrideOptions?) => (CodeComponent) => any = withStylesLow


export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

/************************
* PRIVATE
*************************/

const uniqueNameCheck: { [name: string]: boolean } = {}

const convertToPlatform = (name: string, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

  const { propsPatch, finalProps, addInProps } = renderState
  const { classes, className, style, onPress, onLongPress, onPressIn, onPressOut, $web, $native, ...rest } = finalProps as Types.PropsX & Types.OnPressAllX
  const { theme, $cache } = renderState.themeContext

  //** STATIC SHEET
  let staticSheet: Types.Sheet & { __isCached?: boolean }
  let getStaticSheet: () => Types.Sheet
  let variantCacheId
  let variant = null
  if (typeof createSheetX !== 'function') {
    variantCacheId = '#static#'
    getStaticSheet = () => toPlatformSheet(createSheetX)
  } else {
    if (options && options.getVariant) {
      const propsWithPatch = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
      variant = options.getVariant(propsWithPatch, theme)
      variantCacheId = options.variantToString && options.variantToString(variant)
      if (variantCacheId) {
        getStaticSheet = () => toPlatformSheet(callCreator(theme, variant, createSheetX))
      } else {
        //getVariant!=null && variantToString==null => NO CACHING
        staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
      }
    } else {
      variantCacheId = '#novariant#'
      getStaticSheet = () => toPlatformSheet(callCreator(theme, null, createSheetX))
    }
  }

  if (!staticSheet) {
    let compCache = $cache[name]
    if (!compCache) $cache[name] = compCache = {}
    staticSheet = compCache[variantCacheId]
    if (!staticSheet) {
      compCache[variantCacheId] = staticSheet = getStaticSheet();
      staticSheet.__isCached = true
    }
  }

  //** MERGE staticSheet with classes and className
  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
  if (classes || root) {
    renderState.codeClasses = deepModify(staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root)
    delete renderState.codeClasses.__isCached
  } else
    renderState.codeClasses = staticSheet

  if (addInProps.developer_flag) {
    console.log(
      `### withStyles PREPARE SHEET for ${name}`,
      '\nstaticSheet: ', staticSheet,
      '\nroot: ', root,
      '\nclasses: ', classes,
    )
  }

  // separate AddIns from sheet to $classes
  let finalCodeClasses = renderState.codeClasses
  renderState.addInClasses = {} as any
  for (const p in renderState.codeClasses) {
    if (p.startsWith('$')) {
      if (finalCodeClasses.__isCached) { // cannot modify __isCached codeClasses => make shallow copy
        finalCodeClasses = { ...renderState.codeClasses }
        delete finalCodeClasses.__isCached
      }
      renderState.addInClasses[p] = finalCodeClasses[p]
      delete finalCodeClasses[p] // modify finalCodeClasses
      continue
    }
  }
  renderState.codeClasses = finalCodeClasses


  renderState.codeProps = rest as Types.CodeProps

  //** RETURN platform dependent props for pure component code
  const systemFromPatch = propsPatch.length > 0 ? Object.assign({}, ...propsPatch) : null
  renderState.codeSystemProps = {
    ...systemFromPatch,
    classes: null,
    style: toPlatformRuleSet(callCreator(theme, variant, style)),
    variant,
  } as Types.CodeSystemProps

  toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, renderState.codeProps, renderState.codeSystemProps)
}
const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

const fromOptions = (...bools: boolean[]) => {
  let res = undefined
  if (bools) bools.forEach(b => { if (typeof b === 'boolean') res = b })
  return res
}

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
