import React from 'react';
import { deepMerges, platform } from 'reactxx-sheeter';
import { TAtomize, TComponents, TSheeter, TWithStyles, TVariants } from 'reactxx-typings';

import { createPipeline } from './utils/create-pipeline'

export const withStylesCreator = <R extends TSheeter.Shape>(
  sheetOrCreator: TSheeter.SheetOrCreator<R>,
  codeComponent: TComponents.ComponentTypeCode<R>,
  options?: TWithStyles.ComponentOptions<R>
) => (
  overridedOptions?: TWithStyles.ComponentOptions<R>
) => withStyles(
  finishComponentState(sheetOrCreator, codeComponent, options, overridedOptions)
) as TComponents.ComponentClass<R>

//*********************************************************
//  PRIVATE
//*********************************************************


const withStyles = (options: TWithStyles.ComponentOptions) => {

  class Styled extends React.Component<TComponents.Props> {

    constPipelineState:TWithStyles.PipelineState = {
      options,
      uniqueId: options.displayName + ' *' + componentInstaneCounter++,
    }
    
    initPipelineState = () => ({
      ...this.constPipelineState,
      pipeStates: [],
      props: this.props,
    } as TWithStyles.PipelineState)

    pipelineState = this.initPipelineState()

    pipeline = createPipeline(
      options.getPipes || platform.getPipes,
      this.pipelineState,
    )

    render() {
      // reset pipelineState (must be IN-PLACE!!!)
      const { pipelineState } = this
      for (const p in pipelineState) delete pipelineState[p]
      Object.assign(pipelineState, this.initPipelineState())
      // return pipeline result
      return this.pipeline()
    }

    public static displayName = options.displayName
  }

  const styled = Styled as unknown as TComponents.ComponentClass
  styled[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.reactxxComponent
  //if (window.process)
  if (process.env.NODE_ENV === 'development') {
    styled['~~'] = 'comp'
    options.CodeComponent['~~'] = 'compCode'
  }
  return styled
}

const finishComponentState = (
  sheetOrCreator: TSheeter.SheetOrCreator, CodeComponent: TComponents.ComponentTypeCode,
  options: TWithStyles.ComponentOptions, overridedOptions: TWithStyles.ComponentOptions
) => {
  const mergedOptions: TWithStyles.ComponentOptions = options && overridedOptions ?
    deepMerges({}, [options, overridedOptions]) : options ?
      options : overridedOptions ?
        overridedOptions : {}
  const componentId = componentTypeCounter++

  const res: TWithStyles.ComponentOptions = {
    ...mergedOptions,
    sheetOrCreator,
    componentId,
    CodeComponent,
    withTheme: typeof mergedOptions.withTheme === 'boolean'
      ? mergedOptions.withTheme
      : typeof sheetOrCreator === 'function',
    displayName: `${mergedOptions.displayName || CodeComponent['name'] || 'Noname'}`,
  }

  CodeComponent.displayName = CodeComponent.displayName || res.displayName + 'Code'

  return res
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances