import React from 'react';
import { deepMerges, globalOptions } from 'reactxx-sheeter';
import { TAtomize, TComponents, TSheeter, TWithStyles } from 'reactxx-typings';
import { codePipe } from './pipe-code';
import { propsPipe } from './pipe-props';
import { defaultPropsPipe } from './pipe-default-props';
import { innerStatePipe } from './pipe-inner-state';
import { propsCodePipe } from './pipe-props-code';
import { defaultThemeName, themePipe } from './pipe-theme';


export const initGlobalState = (options: TWithStyles.GlobalState = null) => {

  Object.assign(globalOptions, options)

  if (!globalOptions.namedThemes[defaultThemeName] && globalOptions.getDefaultTheme)
    globalOptions.namedThemes[defaultThemeName] = globalOptions.getDefaultTheme()
}

export const withStylesCreator = <R extends TSheeter.Shape>(
  sheetOrCreator: TSheeter.SheetOrCreator<R>,
  codeComponent: TComponents.ComponentTypeCode<R>,
  componentState?: TWithStyles.ComponentOptions<R>
) => (
  overrideComponentState?: TWithStyles.ComponentOptions<R>
) => withStyles(
  finishComponentState(sheetOrCreator, codeComponent, componentState, overrideComponentState)
) as TComponents.ComponentClass<R> & TSheeter.getStaticProps<R> & TProvider<R>

export interface TProvider<R extends TSheeter.Shape> { Provider: React.ComponentClass<TComponents.Props<R>> }

//*********************************************************
//  PRIVATE
//*********************************************************

const systemPipes: TWithStyles.SystemPipes = {
  firsts: options => [options.withTheme && themePipe, defaultPropsPipe, propsPipe],
  lasts: options => [propsCodePipe, innerStatePipe, codePipe]
}

const withStyles = (componentState: TWithStyles.ComponentOptions) => {

  class Styled extends React.Component<TComponents.Props> {

    initPipelineState = () => ({
      ...componentState,
      // instance props
      pipeStates: [],
      uniqueId: componentState.displayName + ' *' + componentInstaneCounter++,
      props: this.props,
      refreshInnerStateComponent: () => this.pipelineState.innerStateComponent && this.pipelineState.innerStateComponent.setState(null)
    } as TWithStyles.PipelineState)

    pipelineState: TWithStyles.PipelineState = this.initPipelineState()

    pipeline = createPipeline(
      this.pipelineState,
      (componentState.getPipes
        ? componentState.getPipes(systemPipes, componentState)
        : globalOptions.getPipes
          ? globalOptions.getPipes(systemPipes, componentState)
          : [...systemPipes.firsts(componentState), ...systemPipes.lasts(componentState)]).filter(p => !!p)
    )

    render() {
      // reset pipelineState (must be IN-PLACE!!!)
      const { pipelineState } = this
      for (const p in pipelineState) delete pipelineState[p]
      Object.assign(pipelineState, this.initPipelineState())
      // return pipeline result
      return this.pipeline()
    }

    public static displayName = componentState.displayName
  }

  const styled: TComponents.ComponentClass = Styled
  styled[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.reactxxComponent
  return styled
}

const finishComponentState = (
  sheetOrCreator: TSheeter.SheetOrCreator, CodeComponent: TComponents.ComponentTypeCode,
  componentState: TWithStyles.ComponentOptions, overrideComponentState: TWithStyles.ComponentOptions
) => {
  const mergedOptions: TWithStyles.ComponentOptions = componentState && overrideComponentState ?
    deepMerges({}, [componentState, overrideComponentState]) : componentState ?
      componentState : overrideComponentState ?
        overrideComponentState : {}
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

function createPipeline(pipelineState: TWithStyles.PipelineState, pipes: TWithStyles.Pipe[], lastPipeIdx = 0): TWithStyles.ReactNodeCreator {
  return lastPipeIdx >= pipes.length
    ? null
    : pipes[lastPipeIdx](pipelineState, lastPipeIdx, createPipeline(pipelineState, pipes, lastPipeIdx + 1))
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances