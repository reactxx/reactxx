import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

import { getSystemPipes, whenUsedFinishAddIns } from './system-pipes'
import { renderCounterPipe } from './develop'
import { ThemeProvider, ThemeConsumer, themePipe } from './theme'
import { deepMerges } from './to-platform'

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
  addInProps?: TAddIn.PropsX // separated props, which name starts with $, e.g. $mediaq, $developer_flag etc.

  // Step 3 - propsAddInPipeline: call addIns PROPS phase (addIn use addInProps and fills codeSystemPropsPatch)
  codePropsPatch?: { [addInName: string]: TAddIn.CodeProps } // codeProps, modified by addIns 

  // Step 4 - stylePipe:
  // - finalProps = codeSystemPropsPatch to platformProps
  // - merge all styles to codeClasses, separate addIns sheet and ruleset props to addInClasses
  finalProps?: Types.CodeProps
  addInClasses?: TCommon.TAddIns // separated sheet and ruleset props, which name starts with $, e.g. <sheet>.$animations, <ruleset>.$mediaq etc.
  //codeClasses?: TCommon.SheetFragmentsData // platform dependent classes

  // Step 5 - styleAddInPipeline: call addIns STYLE phase (addIn es addInClasses and fills codeClassesPatch)
  codeClassesPatch?: TCommon.SheetPatch // codeClasses modified by addIns 

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
  finishAddInClasses: ((addInClasses: {}) => void)[]
}

// empty addIn configuration
const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (renderState, next) => next,
  styleAddInPipeline: (renderState, next) => next,
  finishAddInClasses: [whenUsedFinishAddIns]
}

/************************
* WITH STYLES
*************************/

export const withStylesCreator = <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, codeComponent: Types.CodeComponentType<R>) =>
  (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStylesLow<R, TStatic>(displayName, sheetCreator, renderAddIn, overrideOptions)(codeComponent)

const withStylesLow = <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, addIns: RenderAddIn, options?: Types.WithStyleOptions_ComponentX<R>, overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => (CodeComponent: Types.CodeComponentType<R>) => {

  type TPropsX = Types.PropsX<R>

  const id = compCounter++
  displayName = `${displayName} (${id})`

  options = options && overrideOptions ? deepMerges({}, options, overrideOptions) : options ? options : overrideOptions ? overrideOptions : {}

  //sheetCreator = options.sheet || sheetCreator

  options.withTheme = typeof options.withTheme === 'boolean' ? options.withTheme : typeof sheetCreator === 'function'

  //**** PROPERTY CASCADING 

  const { propsPipe, stylePipe, renderComponentPipe, cascadingProvider } = getSystemPipes<R>(id, displayName, sheetCreator, addIns.finishAddInClasses, options)

  //****************************
  // Styled COMPONENT
  //****************************
  class Styled extends React.Component<Types.PropsX> {

    renderState: TRenderState = {
      codePropsPatch: {},
      $developer_id: displayName + ' *' + compIdCounter++
    }

    render() {
      //console.log('*** render: ', this.renderState.$developer_id)
      if (DEV_MODE && this.props.$developer_flag)
        debugger
      return this.renderPipeline()
    }

    renderPipeline =
      themePipe(
        () => ({ withTheme: options.withTheme }),
        themeContext => this.renderState.themeContext = themeContext,
        propsPipe(
          () => ({ props: this.props, renderState: this.renderState }),
          ({ platformProps, addInProps }) => { this.renderState.platformProps = platformProps; this.renderState.addInProps = addInProps },
          addIns.propsAddInPipeline(this.renderState,
            stylePipe(this.renderState,
              addIns.styleAddInPipeline(this.renderState,
                renderCounterPipe(
                  () => ({ developer_flag: this.renderState.addInProps.$developer_flag }),
                  count => { this.renderState.addInProps.$developer_RenderCounter = count },
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

    //// *** tracing for developer
    //componentDidCatch(error, info) {
    //  // Display fallback UI
    //  //this.setState({ hasError: true });
    //  // You can also log the error to an error reporting service
    //  console.error('**** ERROR: ', this.renderState.$developer_id, error, info)
    //}

    //constructor(props) {
    //  super(props)
    //  //if (props.$developer_flag) debugger
    //}

    //static getDerivedStateFromProps(nextProps, prevState): any {
    //  //if (nextProps.$developer_flag) debugger
    //  return null
    //}

    //componentWillUnmount() {
    //  //if (DEV_MODE && this.props.$developer_flag) debugger
    //}

    //developer_trace(msg: string) {

    //}

    public static Provider = cascadingProvider
    public static displayName = displayName
  }

  const styled: React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic = Styled as any
  return styled

}

export const withStyles: <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, addIns: RenderAddIn, options?, overrideOptions?) => (CodeComponent) => any = withStylesLow

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

let compCounter = 0
let compIdCounter = 0