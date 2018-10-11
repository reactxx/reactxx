import React from 'react'
import { TWithStyles, TSheeter, TComponents, TAtomize, TTheme, TVariants } from 'reactxx-typings'
import { deepMerges, globalOptions } from 'reactxx-sheeter'

import { lastPipe } from './pipe-last'
import { firstPipe } from './pipe-first'
import { defaultThemeName } from './themer'

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

const withStyles = (componentState: TWithStyles.ComponentOptions) => {

  //const componentState = componentStateProc()

  class Styled extends React.Component<TComponents.Props> {

    pipelineState: TWithStyles.PipelineState = {
      ...componentState,
      // instance props
      id: componentState.displayName + ' *' + componentInstaneCounter++,
      props: this.props,
      pipeCounter: 1,
    }

    pipeline = (() => {
      if (globalOptions.createPipeline)
        return firstPipe(this.pipelineState,
          globalOptions.createPipeline(this.pipelineState,
            lastPipe(this.pipelineState, null)))
      else
        return firstPipe(this.pipelineState,
          lastPipe(this.pipelineState, null))
    })()

    render() {
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
  const mergedOptions:TWithStyles.ComponentOptions = componentState && overrideComponentState ?
    deepMerges({}, [componentState, overrideComponentState]) : componentState ?
      componentState : overrideComponentState ?
        overrideComponentState : {}
  const componentId = componentTypeCounter++

  const res: TWithStyles.ComponentOptions = {
    ...mergedOptions,
    sheetOrCreator,
    componentId,
    CodeComponent,
    withTheme: typeof mergedOptions.sheetOrCreator === 'function' ? true : mergedOptions.withTheme,
    displayName: `${mergedOptions.displayName || CodeComponent.displayName || CodeComponent['name'] || 'unknown'} (${componentId})`,
    withSheetQueryComponent: !!CodeComponent.fillSheetQuery, // mergedOptions.codeHooks && !!mergedOptions.codeHooks.innerStateToSheetQuery,
  }

  return res
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances