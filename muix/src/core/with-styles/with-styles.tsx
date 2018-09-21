import React from 'react'
import { TSheeter, TComponents, TAtomize, TTheme, TVariants } from '../d-index'
import { globalOptions } from './global-state'
import { lastPipe } from './pipe-last'
import { firstPipe, defaultThemeName } from './pipe-first'
import { deepMerges } from '../utils/deep-merge'

export namespace TWithStyles {

  // application options
  export interface GlobalState {
    getDefaultTheme?: () => TTheme.Theme
    createPipeline?: Pipeline
    namedThemes?: { [themeName: string]: TTheme.Theme }
  }

  // component type options
  export interface ComponentState<R extends TSheeter.Shape = TSheeter.Shape> extends GlobalState {
    name?: string
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentType
    // computed props
    componentId?: number
    displayName?: string
  }

  // component instance options
  export interface InstanceState extends ComponentState<TSheeter.Shape> {
    id?: string
    props?: TComponents.Props
    pipeStates?: PipeState[]
    sheet?: TAtomize.Sheet
    sheetQuery?: TVariants.Query
    theme?: TSheeter.getTheme
  }

  export interface PipeState {
    codeProps?: TComponents.PropsCode

    classNameX?: TSheeter.ClassName
    styleX?: TSheeter.StylesX
    classes?: TSheeter.PartialSheet
  }

  export type Pipe = (pipeId: number, instanceState: TWithStyles.InstanceState, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.InstanceState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}

export const initGlobalState = (options: TWithStyles.GlobalState = null) => {
  Object.assign(globalOptions, {
    namedThemes: {},
    createPipeline: context =>
      firstPipe(0, context,
        lastPipe(1, context,
          null)
      ),
    ...options
  })
  if (globalOptions.getDefaultTheme)
    globalOptions.namedThemes[defaultThemeName] = globalOptions.getDefaultTheme()
}

export const withStylesCreator = <R extends TSheeter.Shape, TStatic extends {} = {}>(
  sheetOrCreator: TSheeter.SheetOrCreator<R>,
  codeComponent: TComponents.ComponentType<R>,
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

  class Styled extends React.Component<TComponents.Props> {

    instanceState: TWithStyles.InstanceState = {
      ...componentState,
      id: componentState.displayName + ' *' + componentInstaneCounter++,
      props: this.props,
    }

    pipeline = componentState.createPipeline(this.instanceState)

    render() {
      return this.pipeline()
    }

    public static displayName = componentState.displayName
  }

  const styled: TComponents.ComponentClass = Styled
  styled[TAtomize.TypedInterfaceProp] = TAtomize.TypedInterfaceTypes.reactxxComponent
  return styled
}

const finishComponentState = (
  sheetOrCreator: TSheeter.SheetOrCreator, CodeComponent: TComponents.ComponentType,
  componentState: TWithStyles.ComponentState, overrideComponentState: TWithStyles.ComponentState
) => {
  const mergedOptions = componentState && overrideComponentState ?
    deepMerges({}, [componentState, overrideComponentState]) : componentState ?
      componentState : overrideComponentState ?
        overrideComponentState : {}
  const componentId = componentTypeCounter++
  const res: TWithStyles.ComponentState = {
    ...globalOptions,
    ...mergedOptions,
    sheetOrCreator,
    componentId,
    CodeComponent,
    withTheme: typeof mergedOptions.sheetOrCreator === 'function' ? true : mergedOptions.withTheme,
    displayName: `${mergedOptions.name || mergedOptions.CodeComponent.displayName} (${componentId})`
  }
  return res
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances