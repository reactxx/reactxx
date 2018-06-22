import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

import { getSystemPipes } from './system-pipes'
import { renderCounterPipe } from './develop'
import { ThemeProvider, ThemeConsumer, themePipe } from './theme'
import { deepMerges, SheetData } from './to-platform'

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
  addInClasses?: TAddIn.SheetX // separated sheet and ruleset props, which name starts with $, e.g. $mediaq
  codeClasses?: SheetData // platform dependent classes

  // Step 5 - styleAddInPipeline: call addIns STYLE phase (addIn use addInClasses and fills codeClassesPatch)
  codeClassesPatch?: { [addInName: string]: SheetData } // codeClasses modified by addIns 

  // Step 6 - renderCounterPipe: for development mode - render counter (fills addInProps.$developer_RenderCounter). It allows to display number of component render calls

  // Step 7 - renderComponentPipe: 
  // - merges codeClassesPatch to codeClasses, save result to finalProps.system.classes
  // - render code component

}

/************************
* ADDIN
*************************/
// addIn configuration type
export interface RenderAddIn {
  propsAddInPipeline: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  styleAddInPipeline: (state: TRenderState, next: () => React.ReactNode) => () => React.ReactNode
  finishAddIns: ((addIns: {}) => void)[]
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

  //sheetCreator = options.sheet || sheetCreator

  options.withTheme = typeof options.withTheme === 'boolean' ? options.withTheme : typeof sheetCreator === 'function'

  //**** PROPERTY CASCADING 

  const { propsPipe, stylePipe, renderComponentPipe, cascadingProvider } = getSystemPipes<R>(id, displayName, sheetCreator, options)

  //****************************
  // Styled COMPONENT
  //****************************
  class Styled extends React.Component<Types.PropsX, TRenderState> {

    state: TRenderState = {
      codePropsPatch: {},
      codeClassesPatch: {},
    }

    render() {
      if (DEV_MODE && this.props.$developer_flag)
        debugger
      return this.renderPipeline()
    }

    renderPipeline =
      themePipe(
        () => ({ withTheme: options.withTheme }),
        themeContext => this.state.themeContext = themeContext,
        propsPipe(
          () => ({ props: this.props, renderState: this.state }),
          ({ platformProps, addInProps }) => { this.state.platformProps = platformProps; this.state.addInProps = addInProps },
          renderAddIn.propsAddInPipeline(this.state,
            stylePipe(this.state,
              renderAddIn.styleAddInPipeline(this.state,
                renderCounterPipe(
                  () => ({ developer_flag: this.state.addInProps.$developer_flag }),
                  count => { this.state.addInProps.$developer_RenderCounter = count },
                  renderComponentPipe(this.state, CodeComponent)
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

export const withStyles: <R extends Types.Shape, TStatic extends {} = {}>(displayName: string, sheetCreator: Types.SheetCreatorX<R>, options?, overrideOptions?) => (CodeComponent) => any = withStylesLow

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

let compCounter = 0