import React from 'react'
import { TWithStyles, TSheeter, TComponents, TAtomize, TTheme, TVariants } from 'reactxx-typings'
import { deepMerges } from 'reactxx-sheeter'

import { globalOptions } from './global-state'
import { lastPipe } from './pipe-last'
import { firstPipe } from './pipe-first'
import { defaultThemeName } from './themer'

export const initGlobalState = (options: TWithStyles.GlobalState = null) => {

  Object.assign(globalOptions, options)

  if (!globalOptions.namedThemes[defaultThemeName] && globalOptions.getDefaultTheme)
    globalOptions.namedThemes[defaultThemeName] = globalOptions.getDefaultTheme()
}

export const withStylesCreator = <R extends TSheeter.Shape, TStatic extends {} = {}>(
  sheetOrCreator: TSheeter.SheetOrCreator<R>,
  codeComponent: TComponents.ComponentTypeCode<R>,
  componentState?: TWithStyles.ComponentState<R>
) => (
  overrideComponentState?: TWithStyles.ComponentState<R>
) => withStyles(
  finishComponentState(sheetOrCreator, codeComponent, componentState, overrideComponentState)
) as TComponents.ComponentClass<R> & TStatic & TProvider<R>

export interface TProvider<R extends TSheeter.Shape> { Provider: React.ComponentClass<TComponents.Props<R>> }

//*********************************************************
//  PRIVATE
//*********************************************************

const withStyles = (componentState: TWithStyles.ComponentState) => {

  //const componentState = componentStateProc()

  class Styled extends React.Component<TComponents.Props> {

    instanceState: TWithStyles.InstanceState = {
      ...componentState,
      id: componentState.displayName + ' *' + componentInstaneCounter++,
      props: this.props,
      pipeCounter: 1,
    }

    pipeline = (() => {
      if (globalOptions.createPipeline)
        return firstPipe(this.instanceState,
          globalOptions.createPipeline(this.instanceState,
            lastPipe(this.instanceState, null)))
      else
        return firstPipe(this.instanceState,
          lastPipe(this.instanceState, null))
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
  componentState: TWithStyles.ComponentState, overrideComponentState: TWithStyles.ComponentState
) => {
  const mergedOptions = componentState && overrideComponentState ?
    deepMerges({}, [componentState, overrideComponentState]) : componentState ?
      componentState : overrideComponentState ?
        overrideComponentState : {}
  const componentId = componentTypeCounter++
  const res: TWithStyles.ComponentState = {
    ...mergedOptions,
    sheetOrCreator,
    componentId,
    CodeComponent,
    withTheme: typeof mergedOptions.sheetOrCreator === 'function' ? true : mergedOptions.withTheme,
    displayName: `${mergedOptions.name || CodeComponent.displayName} (${componentId})`
  }
  return res
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances