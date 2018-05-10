import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles, TCommon, toPlatformEvents, toPlatformSheet, toPlatformRuleSet, deepMerges, ThemeProvider, ThemeConsumer, theme, Cascading } from 'reactxx-basic'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* TYPINGS
*************************/
export interface TRenderState {
  props?: Types.PropsX
  finalProps?: Types.PropsX
  themeContext?: TCommon.ThemeContext

  propsPatch?: TAddIn.CodeProps[]
  $props?: TAddIn.PropX
  $classes?: TAddIn.SheetX

  codeProps?: Types.CodeProps
  codeSystemProps?: Types.CodeSystemProps
  codeClasses?: Types.Sheet
  codeClassesPatch?: Types.Sheet[]
}

export interface RenderAddIn {
  toPlatformSheet: (sheet: Types.SheetX | Types.PartialSheetX) => Types.Sheet
  toPlatformRuleSet: (style: Types.RulesetX) => TCommonStyles.Ruleset
  addInHOCsX: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  addInHOCs: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
}

/************************
* ADDIN
*************************/
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

  const { cascading, provider } = Cascading<TPropsX>(options)

  //**** TO PLATFORM
  const toPlatform = (state: TRenderState, next: () => React.ReactNode) => {
    const res = () => {
      prepareSheet(name, sheetCreator, options, state)
      return next()
    }
    return res
  }

  //****************************
  // Styled COMPONENT
  //****************************
  class Styled extends React.Component<TPropsX> {

    renderState: TRenderState = {
      props: this.props,
      finalProps: this.props,
      $props: {},
      $classes: {},
      propsPatch: [],
      codeClassesPatch: [],
      themeContext: {}
    }

    render() {
      if (DEV_MODE && this.props.developer_flag)
        debugger
      return this.renderer()
    }

    renderCodeComponent = () => {
      const { codeClassesPatch, codeProps, codeClasses, codeSystemProps } = this.renderState

      if (DEV_MODE && codeSystemProps.developer_flag) {
        const { themeContext, finalProps, propsPatch, props } = this.renderState
        console.log(
          `### withStyles RENDER CODE for ${name}`,
          '\nprops: ', props,
          '\ninputProps: ', finalProps,
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
      return <CodeComponent {...codeProps as Types.CodeProps<R>} system={{ ...codeSystemProps, classes }} />
    }

    renderer =
      cascading(
        () => this.renderState.props,
        ({ finalProps, $props }) => this.renderState.finalProps = finalProps,
        theme(
          () => ({ withTheme: options.withTheme }),
          themeContext => this.renderState.themeContext = themeContext || {},
          renderAddIn.addInHOCsX(this.renderState,
            toPlatform(this.renderState,
              //({ codeProps, codeClasses, codeSystemProps }) => { this.renderState.codeClasses = codeClasses; this.renderState.codeProps = codeProps; this.renderState.codeSystemProps = codeSystemProps },
              renderAddIn.addInHOCs(this.renderState,
                this.renderCodeComponent
              )
            )
          )
        )
      )

    shouldComponentUpdate(nextProps: Types.PropsX, nextState, nextContext) {
      return !nextProps.CONSTANT
    }

    public static Provider = provider
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

const prepareSheet = (name: string, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

  const { propsPatch, finalProps } = renderState
  const { classes, className, style, onPress, onLongPress, onPressIn, onPressOut, $web, $native, developer_flag, CONSTANT, ...rest } = finalProps as Types.PropsX & TCommonStyles.OnPressAllX
  const { theme, $cache } = renderState.themeContext

  //** STATIC SHEET
  let staticSheet: Types.Sheet & { __isCached?: boolean }
  let getStaticSheet: () => Types.Sheet
  let variantCacheId
  let variant = null
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
    let compCache = $cache[name]
    if (!compCache) $cache[name] = compCache = {}
    staticSheet = compCache[variantCacheId]
    if (!staticSheet) compCache[variantCacheId] = staticSheet = getStaticSheet();
    staticSheet.__isCached = true
  }

  //** MERGE staticSheet with classes and className
  const root = className && { root: renderAddIn.toPlatformRuleSet(callCreator(theme, variant, className)) }
  renderState.codeClasses = classes || root ? deepMerges({}, staticSheet, renderAddIn.toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet

  // separate AddIns from sheet to $classes
  let finalCodeClasses = renderState.codeClasses
  renderState.$classes = {} as any
  for (const p in renderState.codeClasses) {
    if (p.startsWith('$')) {
      if (finalCodeClasses === renderState.codeClasses && renderState.codeClasses.__isCached) finalCodeClasses = { ...renderState.codeClasses } // cannot modify __isCached codeClasses => make shallow copy
      renderState.$classes[p] = finalCodeClasses[p]
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

