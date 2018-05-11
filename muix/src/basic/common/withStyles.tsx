import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { ThemeProvider, ThemeConsumer, theme } from './theme'
import { toPlatformEvents, toPlatformSheet, toPlatformRuleSet, deepMerges, deepModify } from './to-platform'
import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { FinalizeProps } from './finalize-props'

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
}

/************************
* ADDIN
*************************/
// addIn configuration type
export interface RenderAddIn {
  toPlatformSheet: (sheet: Types.SheetX | Types.PartialSheetX) => Types.Sheet
  toPlatformRuleSet: (style: Types.RulesetX) => TCommonStyles.Ruleset
  addInHOCsX: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  addInHOCs: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
}

// addIn configuration instance
export const renderAddIn: RenderAddIn = {
  toPlatformSheet,
  toPlatformRuleSet,
  addInHOCsX: (state, next) => next,
  addInHOCs: (state, next) => next
}

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends Types.Shape, TStatic extends {} = {}>(name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, codeComponent: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
  (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStylesLow<R, TStatic>(name, sheetCreator, options, overrideOptions)(codeComponent)

const withStylesLow = <R extends Types.Shape, TStatic extends {} = {}>(name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, _options?: Types.WithStyleOptions_ComponentX<R>, overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => (CodeComponent: Types.CodeComponentType<R>) => {

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
  class Styled extends React.Component<Types.PropsX> {

    state: TRenderState = {
      propsPatch: [],
      codeClassesPatch: [],
    }

    render() {
      if (DEV_MODE && this.props.developer_flag)
        debugger
      return this.renderer()
    }

    renderCodeComponent = () => {
      const { codeClassesPatch, codeProps, codeClasses, codeSystemProps } = this.state

      if (DEV_MODE && codeSystemProps.developer_flag) {
        const { themeContext, finalProps, propsPatch } = this.state
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
        )
      }

      // apply patches
      let classes = codeClasses as Types.Sheet<R>
      if (codeClassesPatch.length > 0) classes = deepMerges({}, codeClasses, ...codeClassesPatch)
      else if (codeClasses.__isCached) classes = { ...codeClasses } as Types.Sheet<R>

      // call component code
      return <CodeComponent {...codeProps as Types.CodeProps<R>} system={{ ...codeSystemProps, classes }}/>
    }

    renderer =
      finalizeProps(
        () => this.props,
        ({ finalProps, addInProps }) => { this.state.finalProps = finalProps; this.state.addInProps = addInProps },
        theme(
          () => ({ withTheme: options.withTheme }),
          themeContext => this.state.themeContext = themeContext,
          renderAddIn.addInHOCsX(this.state,
            toPlatform(this.state,
              renderAddIn.addInHOCs(this.state,
                this.renderCodeComponent
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

const convertToPlatform = (name: string, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

  const { propsPatch, finalProps } = renderState
  const { classes, className, style, onPress, onLongPress, onPressIn, onPressOut, $web, $native, developer_flag, CONSTANT, ...rest } = finalProps as Types.PropsX & TCommonStyles.OnPressAllX
  const { theme, $cache } = renderState.themeContext

  //** STATIC SHEET
  let staticSheet: Types.Sheet
  let getStaticSheet: () => Types.Sheet
  let variantCacheId
  let variant = null
  let isCached = false
  if (typeof createSheetX !== 'function') {
    variantCacheId = '#static#'
    getStaticSheet = () => renderAddIn.toPlatformSheet(createSheetX)
  } else {
    if (options && options.getVariant) {
      const propsWithMediaQ = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
      variant = options.getVariant(propsWithMediaQ, theme)
      variantCacheId = options.variantToString && options.variantToString(variant)
      if (variantCacheId) {
        getStaticSheet = () => renderAddIn.toPlatformSheet(callCreator(theme, variant, createSheetX))
      } else {
        //getVariant!=null && variantToString==null => NO CACHING
        staticSheet = renderAddIn.toPlatformSheet(callCreator(theme, variant, createSheetX))
      }
    } else {
      variantCacheId = '#novariant#'
      getStaticSheet = () => renderAddIn.toPlatformSheet(callCreator(theme, null, createSheetX))
    }
  }

  if (!staticSheet) {
    isCached = true
    let compCache = $cache[name]
    if (!compCache) $cache[name] = compCache = {}
    staticSheet = compCache[variantCacheId]
    if (!staticSheet) compCache[variantCacheId] = staticSheet = getStaticSheet();
  }

  //** MERGE staticSheet with classes and className
  const root = className && { root: renderAddIn.toPlatformRuleSet(callCreator(theme, variant, className)) }
  renderState.codeClasses = classes || root ? deepModify(staticSheet, renderAddIn.toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet

  if (DEV_MODE && finalProps.developer_flag) {
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
      // cannot modify __isCached codeClasses => make shallow copy
      if (finalCodeClasses === renderState.codeClasses && isCached) finalCodeClasses = { ...renderState.codeClasses } 
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
    style: renderAddIn.toPlatformRuleSet(callCreator(theme, variant, style)),
    variant,
    developer_flag,
  } as Types.CodeSystemProps

  toPlatformEvents($web, $native as TCommonStyles.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, renderState.codeProps)
}
const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

const fromOptions = (...bools: boolean[]) => {
  let res = undefined
  if (bools) bools.forEach(b => { if (typeof b === 'boolean') res = b })
  return res
}

