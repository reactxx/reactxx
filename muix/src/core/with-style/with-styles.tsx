import React from 'react'
import { TSheeter, TComponents, TWithStyles } from '../index-d'
import { globalOptions } from './global-options'
import { sheetPipe } from './pipe-sheet'
import { themePipe, initThemePipe } from './pipe-theme'
import { deepMerges } from '../utils/deep-merge'

export const initWithStyles = (options?: TWithStyles.GlobalOptions) => initThemePipe({
  createPipeline: context =>
    themePipe(context,
      sheetPipe(context,
        lastPipe(context, null)
      )
    ),
  ...options || null
})

const withStylesLow = <TStatic extends {} = {}>(
  sheetOrCreator: TSheeter.SheetOrCreator, CodeComponent: TComponents.ComponentType,
  options: TWithStyles.Options, overrideOptions: TWithStyles.Options
) => {
  options = options && overrideOptions ? deepMerges({}, [options, overrideOptions]) : options ? options : overrideOptions ? overrideOptions : {}
  const componentId = compCounter++

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
      id: pipelineContextStatic.displayName + ' *' + compIdCounter++,
      props: this.props,
      codeProps: { ...this.props } as TComponents.PropsCode
    }

    render() {
      return this.renderPipeline()
    }

    renderPipeline = options.createPipeline(this.pipelineContex)

    public static displayName = pipelineContextStatic.displayName
  }

}

export const lastPipe: TWithStyles.Pipe = (context, next) =>
  () => <this.pipelineContex.CodeComponent {...context.codeProps} />

let compCounter = 0
let compIdCounter = 0

