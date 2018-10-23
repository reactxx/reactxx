import React from 'react';
import { TAtomize, TComponents, TSheeter, TTheme, TVariants } from './index'

declare namespace TWithStyles {

  export interface GetPipesResult {
    beforePropsCode?: Pipe[]
    afterPropsCode?: Pipe[]
  }
  export type GetPipes = (options: TWithStyles.ComponentOptions) => GetPipesResult

  // application options
  export interface GlobalState {
    getDefaultTheme?: () => any
    getPipes?: (options: TWithStyles.ComponentOptions) => GetPipesResult
    getInnerStatePipes?: (options: TWithStyles.ComponentOptions) => Pipe[]
    namedThemes?: { [themeName: string]: any }
    finalizePropsCode?: FinishPropsCode
    //applyLastWinStrategy?: TAtomize.ToPlatformClassName
    //mergeInnerStates?: (pipelineState: TWithStyles.PipelineState) => TVariants.Query
    processDeffereds?: ProcessDeffereds
  }

  export type FinishPropsCode = (instanceState: TWithStyles.PipelineState) => void
  export type ProcessDeffereds = (values: TAtomize.AtomicArray, defferedIdxs:number[], state: TWithStyles.PipelineState) => void

  // component type options
  export interface ComponentOptions<R extends TSheeter.Shape = TSheeter.Shape> extends TVariants.ComponentOptions{
    displayName?: string
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentTypeCode<R>
    getPipes?: (options: TWithStyles.ComponentOptions) => GetPipesResult
    //getInnerStatePipes?: (systemPipes: SystemPipes, options: TWithStyles.ComponentOptions) => Pipe[]
    //codeHooks?: TVariants.CodeHooks<R>
    // computed props
    //withSheetQueryComponent?: boolean // codeHooks && codeHooks.innerStateToSheetQuer
    componentId?: number
  }

  // component instance options
  export interface PipelineState extends ComponentOptions<TSheeter.Shape> {
    uniqueId?: string
    props?: TComponents.Props

    propsCode?: TComponents.PropsCode
    pipeStates?: PipeState[]
    //sheet?: TAtomize.Sheet
    theme?: TSheeter.getTheme

    //setInnerState?: TComponents.SetInnerState
    //innerState?: TComponents.InnerState
    innerStateComponent?: React.Component
    refreshInnerStateComponent?: () => void

    //sheetQuery?: TVariants.Query
    //sheetQueryComponent?: React.Component
  }

  export interface PipeState extends TVariants.PipeState {
    propsCode?: TComponents.PropsCode | TComponents.PropsCode[]
    innerState?: TComponents.InnerState

    classNameX?: TAtomize.Ruleset
    styleX?: TSheeter.StyleOrAtomized
    classes?: TSheeter.PartialSheet
  }

  export type Pipe = (instanceState: TWithStyles.PipelineState, pipeId:number, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.PipelineState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}
