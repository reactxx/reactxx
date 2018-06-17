import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { ThemeProvider, ThemeConsumer, themePipe } from './theme'
import { deepMerges } from './to-platform'
import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { CreateToPlatformContext } from './finalize-props'
import { renderCounterPipe } from './develop'
//import { getPlatformSheet } from './sheet-cache'

const DEV_MODE = process.env.NODE_ENV === 'development'

//deepModifyTest()

/************************
* TRenderState
*************************/
export interface TRenderState {

  // Step 1: themeContext from ThemeProvider
  themeContext?: TCommon.ThemeContext

  // Step 2: merge props, separate addInProps and cascadingStyles. Sources are defaultProps, cascading result, actual props
  finalCodeProps?: Types.CodeProps // component props PLUS $web or $native platform props PLUS platform events
  accumulatedStylesFromProps?: Types.AccumulatedStylesFromProps // 
  addInProps?: TAddIn.PropsX // separated props, which name starts with $, e.g. $mediaq, $developer_flag etc.
  eventsX?: Types.OnPressAllX

  // Step 3: call addIns - can change platformProps and codeSystemProps
  codeSystemPropsPatch?: { [addInName: string]: TAddIn.CodeProps } // codeSystemProps, modified by addIns 

  // Step 4: 
  // - 
  //codeSystemProps?: Types.CodeSystemProps // system props
  addInClasses?: TAddIn.SheetX // separated addIn sheet

  codeClassesPatch?: Types.Sheet[] // classes modified by addIns 

  codeClasses?: Types.Sheet // platform dependent classes

  //finalCodeProps?: Types.CodeProps // final props (processed by component code). Is passed to e.g. onPress's event.current
}

/************************
* ADDIN
*************************/
// addIn configuration type
export interface RenderAddIn {
  propsAddInPipeline: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  styleAddInPipeline: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  finishAddIns: ((addIns: {}) => void)[]
  //toPlatformRulesetHooks?: ((propName: string, value) => { done?: boolean; value?})[]
  //toPlatformSheetHooks?: ((propName: string, value) => { done?: boolean; value?})[]
}

// empty addIn configuration
export const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (state, next) => next,
  styleAddInPipeline: (state, next) => next,
  finishAddIns: []
}

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, codeComponent: Types.CodeComponentType<R>) =>
  (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStylesLow<R, TStatic>(displayName, sheetCreator, overrideOptions)(codeComponent)

const withStylesLow = <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, options?: Types.WithStyleOptions_ComponentX<R>, overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => (CodeComponent: Types.CodeComponentType<R>) => {

  type TPropsX = Types.PropsX<R>

  const id = compCounter++
  displayName = `${displayName} (${id})`

  options = options && overrideOptions ? deepMerges({}, options, overrideOptions) : options ? options : overrideOptions ? overrideOptions : {}

  sheetCreator = options.sheet || sheetCreator

  options.withTheme = typeof options.withTheme === 'boolean' ? options.withTheme : typeof sheetCreator === 'function'

  //**** PROPERTY CASCADING 

  const { propsPipe, stylePipe, cascadingProvider } = CreateToPlatformContext<R>(id, displayName, sheetCreator, options)

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
      return this.renderPipeline()
    }

    renderComponentCode = () => {
      const { finalCodeProps, codeClassesPatch, codeClasses, addInProps } = this.state

      if (addInProps.$developer_flag) {
        const { themeContext, codeSystemPropsPatch/*, addInClasses*/ } = this.state
        console.log(
          `### withStyles RENDER CODE for ${displayName}`,
          '\nprops: ', this.props,
          '\nplatformProps: ', finalCodeProps,
          '\naddInProps: ', addInProps,
          '\ntheme: ', themeContext.theme,
          //'\ncodeProps: ', codeProps,
          '\npropsPatch: ', codeSystemPropsPatch,
          //'\ncodeSystemProps: ', codeSystemProps,
          '\ncodeClasses: ', codeClasses,
          '\ncodeClassesPatch: ', codeClassesPatch,
          //'\naddInClasses: ', addInClasses,
        )
      }

      // apply patches
      let classes = codeClasses
      if (codeClassesPatch.length > 0) classes = deepMerges({}, codeClasses, ...codeClassesPatch)

      finalCodeProps.system.classes = classes

      //this.state.finalCodeProps = finalCodeProps

      // call component code
      return <CodeComponent {...this.state.finalCodeProps as Types.CodeProps<R>} />
    }

    renderPipeline =
      themePipe(
        () => ({ withTheme: options.withTheme }),
        themeContext => this.state.themeContext = themeContext,
        propsPipe(
          () => ({ props: this.props, theme: this.state.themeContext.theme, renderState: this.state }),
          ({ platformProps, addInProps, accumulatedStylesFromProps, eventsX }) => {
            this.state.finalCodeProps = platformProps; this.state.addInProps = addInProps; this.state.accumulatedStylesFromProps = accumulatedStylesFromProps; this.state.eventsX = eventsX
          },
          renderAddIn.propsAddInPipeline(this.state,
            stylePipe(this.state,
              renderAddIn.styleAddInPipeline(this.state,
                renderCounterPipe(
                  () => ({ developer_flag: this.state.addInProps.$developer_flag }),
                  count => { this.state.addInProps.$developer_RenderCounter = count },
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

//const convertToPlatform = (displayName: string, id: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState, _defaultClasses: Types.PartialSheetCreatorX) => {

//  const { codeSystemPropsPatch, platformProps, addInProps, accumulatedStylesFromProps } = renderState
//  const { theme, $cache } = renderState.themeContext

//  // **** codeSystemProps
//  const codeSystemProps = renderState.codeSystemProps = {} as Types.CodeSystemProps
//  for (const p in codeSystemPropsPatch) Object.assign(codeSystemProps, codeSystemPropsPatch[p])

//  // **** variant
//  let variant: {} = null
//  let variantCacheId: string = null
//  const expandCreator = creator => typeof creator === 'function' ? creator(theme, variant) : creator

//  if (options && options.getVariant) {
//    variant = options.getVariant(codeSystemProps, theme)
//    variantCacheId = options.variantToString ? options.variantToString(variant) : null
//  }
//  codeSystemProps.variant = variant

//  // **** style (for web only). For native: is included in sheetXPatch.root.
//  const toMergeStylesCreators = window.isWeb && accumulatedStylesFromProps.style.length > 0 ? accumulatedStylesFromProps.style : null
//  const toMergeStylesX: Types.RulesetX[] = !toMergeStylesCreators ? null : toMergeStylesCreators.map(creator => expandCreator(creator))

//  if (toMergeStylesX) codeSystemProps.style = toPlatformRulesets(toMergeStylesX)

//  // **** sheet patch (for native: style included)
//  const toMergeSheetCreators = [...accumulatedStylesFromProps.classes || null, ...accumulatedStylesFromProps.className.map(className => ({ root: className })), ... (window.isWeb ? [] : accumulatedStylesFromProps.style.map(style => ({ root: style })))]
//  const sheetXPatch: Types.PartialSheetX[] = toMergeSheetCreators.length === 0 ? null : toMergeSheetCreators.map(creator => expandCreator(creator))
//  const defaultClasses: Types.PartialSheetX = typeof _defaultClasses === 'function' ? expandCreator(_defaultClasses) : _defaultClasses

//  // **** apply sheet patch to sheet:
//  // call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
//  const { sheet, addIns } = getPlatformSheet({ id, createSheetX, themeContext: renderState.themeContext, sheetXPatch, defaultClasses, variant, variantCacheId })
//  renderState.addInClasses = addIns //e.g {$animations:..., root: {$mediaq:...}}
//  renderState.codeClasses = sheet
//}

//const toPlatformStyle = (style: Types.RulesetX, isConst: boolean) => {
//  if (!style) return style

//  const $web = style.$web; const $native = style.$native

//  const process = data => isConst ? deepMerges({}, style, data) : deepMerge(style, data)

//  let res = style
//  if ($web) {
//    if (!window.isWeb) delete style.$web
//    else { res = process($web); delete res.$web }
//  }
//  if ($native) {
//    if (window.isWeb) delete style.$native
//    else { res = process($native); delete res.$native }
//  }
//  return res
//}

