import React from 'react'
import { TSheeter, TComponents, TCompiler, TTheme, TVariants } from '../d-index'
import { globalOptions } from './global-options'
import { lastPipe } from './pipe-sheet'
import { firstPipe, themePipeInit } from './pipe-theme'
import { deepMerges } from '../utils/deep-merge'

export namespace TWithStyles {

  export interface GlobalOptions {
    getDefaultTheme?: TTheme.GetDefaultTheme
    createPipeline?: PipeLine
    namedThemes?: { [themeName: string]: TTheme.Theme }
  }

  export interface Options<R extends TSheeter.Shape = TSheeter.Shape> extends GlobalOptions {
    name?: string,
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean,
  }

  export interface PipelineContext extends Options<TSheeter.Shape> {
    // static part
    componentId?: number
    displayName?: string
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentType,
    // instance part
    id?: string
    props?: TComponents.Props
    //codeProps?: TComponents.PropsCode
    pipeData?: PipeData[]
    sheet?: TCompiler.Sheet
    sheetQuery?: TVariants.Query
    theme?: TSheeter.getTheme
  }

  export interface PipeData {
    codeProps?: TComponents.PropsCode

    classNameX?: TSheeter.ClassName
    styleX?: TSheeter.StylesX
    classes?: TSheeter.PartialSheet // cross platform sheet
  }

  export type Pipe = (pipeId: number, context: TWithStyles.PipelineContext, next: () => React.ReactNode) => () => React.ReactNode
  export type PipeLine = (context: TWithStyles.PipelineContext) => () => React.ReactNode

}

export const withStylesInit = (options: TWithStyles.GlobalOptions = null) => themePipeInit({
  createPipeline: context =>
    firstPipe(0, context,
      lastPipe(2, context,
        null)
    ),
  ...options
})

export const withStylesCreator = <R extends TSheeter.Shape, TStatic extends {} = {}>(
  sheetCreator: TSheeter.SheetOrCreator<R>,
  codeComponent: TComponents.ComponentType<R>,
  options?: TWithStyles.Options<R>
) => (
  overrideOptions?: TWithStyles.Options<R>
) => withStylesLow(
  sheetCreator, codeComponent, options, overrideOptions
) as TComponents.ComponentClass<R> & TStatic & TProvider<R>

export interface TProvider<R extends TSheeter.Shape> { Provider: React.ComponentClass<TComponents.Props<R>> }

//*********************************************************
//  PRIVATE
//*********************************************************

const withStylesLow = (
  sheetOrCreator: TSheeter.SheetOrCreator, CodeComponent: TComponents.ComponentType,
  options: TWithStyles.Options, overrideOptions: TWithStyles.Options
) => {
  options = options && overrideOptions ? deepMerges({}, [options, overrideOptions]) : options ? options : overrideOptions ? overrideOptions : {}
  const componentId = componentTypeCounter++

  const pipelineContextStatic: TWithStyles.PipelineContext = {
    ...globalOptions,
    ...options,
    sheetOrCreator,
    componentId,
    CodeComponent,
    withTheme: typeof options.withTheme === 'boolean' ? options.withTheme : typeof sheetOrCreator === 'function',
    displayName: `${options.name || CodeComponent.displayName} (${componentId})`
  }

  class Styled extends React.Component<TComponents.Props> {

    pipelineContex: TWithStyles.PipelineContext = {
      ...pipelineContextStatic,
      id: pipelineContextStatic.displayName + ' *' + componentInstaneCounter++,
      props: this.props,
    }

    renderPipeline = options.createPipeline(this.pipelineContex)

    render() {
      return this.renderPipeline()
    }

    public static displayName = pipelineContextStatic.displayName
  }

  const styled: TComponents.ComponentClass = Styled
  return styled
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances