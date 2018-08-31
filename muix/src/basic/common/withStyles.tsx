import React from 'react';
import * as Sheeter from 'reactxx-sheeter';
import { TCommon } from '../typings/common';
import { Types } from '../typings/types';
import { renderCounterPipe } from './develop';
import { getSystemPipes } from './system-pipes';
import { themePipe } from './theme';
import { TAddIn } from '../typings/add-in';

// DON'T REMOVE IT (project reference fails)
type fake = TAddIn.CodeProps

const DEV_MODE = process.env.NODE_ENV === 'development' 

/************************
* TRenderState
*************************/
export interface TRenderState {

  // Step 1 - themePipe: themeContext from ThemeProvider
  themeContext?: TCommon.ThemeContext

  // Step 2 - propsPipe: 
  // - merge props, separate addInProps and cascadingStyles.
  // - Sources are defaultProps, props from cascading, actual props
  platformProps?: Types.CodeProps // component props PLUS $web or $native platform props PLUS platform events
  //addInProps?: TAddIn.PropsX // separated props, which name starts with $, e.g. $mediaq, $developer_flag etc.

  // Step 3 - propsAddInPipeline: call addIns PROPS phase (addIn use addInProps and fills codeSystemPropsPatch)
  getPropsPatches?: Sheeter.PropsPatchGetters

  // Step 4 - stylePipe:
  // - finalProps = codeSystemPropsPatch to platformProps
  // - merge all styles to codeClasses, separate addIns sheet and ruleset props to addInClasses
  finalProps?: Types.CodeProps

  // Step 5 - styleAddInPipeline: call addIns STYLE phase (addIn es addInClasses and fills codeClassesPatch)
  getClassesPatches?: Sheeter.RulesetPatchGetters

  // Step 6 - renderCounterPipe: for development mode - render counter (fills addInProps.$developer_RenderCounter). It allows to display number of component render calls

  // Step 7 - renderComponentPipe: 
  // - merges codeClassesPatch to codeClasses, save result to finalProps.system.classes
  // - render code component

  $developer_id?: string  

}

/************************
* ADDIN
*************************/
// addIn configuration type
export interface RenderAddIn {
  propsAddInPipeline: (renderState: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  styleAddInPipeline: (renderState: TRenderState, next: () => React.ReactNode) => () => React.ReactNode

  getDefaultTheme?: () => TCommon.ThemeBase
  createSheetHook?: (sheetCreator: Types.SheetCreatorX) => Types.SheetCreatorX  // allow modify sheet, e.g. from material-ui format

  finishAddInProps?: Sheeter.FinishAddIns
  finishAddInClasses?: Sheeter.FinishAddIns

}

// empty addIn configuration
const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (renderState, next) => next,
  styleAddInPipeline: (renderState, next) => next,
}

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends Types.Shape, TStatic extends {} = {}>(sheetCreator: Types.SheetCreatorX<R>, codeComponent: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
  (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStylesLow<R, TStatic>(sheetCreator, renderAddIn, { ...options || null }, overrideOptions)(codeComponent)

const withStylesLow = <R extends Types.Shape, TStatic extends {} = {}>(sheetCreator: Types.SheetCreatorX<R>, addIns: RenderAddIn, options?: Types.WithStyleOptions_ComponentX<R>, overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => (CodeComponent: Types.CodeComponentType<R>) => {

  type TPropsX = Types.PropsX<R>

  const componentId = compCounter++

  options = options && overrideOptions ? Sheeter.deepMerges({}, [options, overrideOptions]) : options ? options : overrideOptions ? overrideOptions : {}

  const displayName = `${options.name} (${componentId})`

  //sheetCreator = options.sheet || sheetCreator

  options.withTheme = typeof options.withTheme === 'boolean' ? options.withTheme : typeof sheetCreator === 'function'

  //**** build in pipes
  sheetCreator = addIns.createSheetHook ? addIns.createSheetHook(sheetCreator) as Types.SheetCreatorX<R> : sheetCreator
  const { propsPipe, stylePipe, renderComponentPipe, cascadingProvider } = getSystemPipes<R>(componentId, displayName, sheetCreator, addIns, options)

  //****************************
  // Styled COMPONENT
  //****************************
  class Styled extends React.Component<Types.PropsX> {

    renderState: TRenderState = {
      $developer_id: displayName + ' *' + compIdCounter++
    }

    render() {
      //console.log('*** render: ', this.renderState.$developer_id)
      if (DEV_MODE && options && this.props.$developer_flag) {
        debugger
      }
      return this.renderPipeline()
    }

    renderPipeline =
      themePipe(
        addIns.getDefaultTheme,
        () => ({ withTheme: options.withTheme }),
        themeContext => this.renderState.themeContext = themeContext,
        propsPipe(
          () => ({ props: this.props, renderState: this.renderState }),
          platformProps => this.renderState.platformProps = platformProps,
          addIns.propsAddInPipeline(this.renderState,
            stylePipe(this.renderState,
              addIns.styleAddInPipeline(this.renderState,
                renderCounterPipe(
                  () => ({ developer_flag: this.renderState.finalProps.$system.$developer_flag }),
                  count => { this.renderState.finalProps.$system.$developer_RenderCounter = count },
                  renderComponentPipe(this.renderState, CodeComponent)
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

export const withStyles:
  <R extends Types.Shape, TStatic extends {} = {}>
  (sheetCreator: Types.SheetCreatorX<R>, addIns: RenderAddIn, options?: TCommon.WithStyleOptions, overrideOptions?: TCommon.WithStyleOptions)
    => (CodeComponent) => any = withStylesLow

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export type WithStyle<R extends Types.Shape> = React.ComponentClass<Types.PropsX<R>> & TProvider<R>
export type WithStyleCreator<R extends Types.Shape> = (options?:Types.WithStyleOptions_ComponentX<R>) => WithStyle<R>

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')


let compCounter = 0
let compIdCounter = 0