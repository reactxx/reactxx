import React from 'react';
import { TAtomize, TComponents, TSheeter, TTheme, TVariants } from './index'

declare namespace TWithStyles {

  export interface SystemPipes {
    firsts: (options: TWithStyles.ComponentOptions) => Pipe[]
    lasts: (options: TWithStyles.ComponentOptions) => Pipe[]
  }

  // application options
  export interface GlobalState {
    getDefaultTheme?: () => TTheme.Theme
    getPipes?: (systemPipes: SystemPipes, options: TWithStyles.ComponentOptions) => Pipe[]
    getInnerStatePipes?: (systemPipes: SystemPipes, options: TWithStyles.ComponentOptions) => Pipe[]
    namedThemes?: { [themeName: string]: TTheme.Theme }
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
    getPipes?: (systemPipes: SystemPipes, options: TWithStyles.ComponentOptions) => Pipe[]
    getInnerStatePipes?: (systemPipes: SystemPipes, options: TWithStyles.ComponentOptions) => Pipe[]
    //codeHooks?: TVariants.CodeHooks<R>
    // computed props
    //withSheetQueryComponent?: boolean // codeHooks && codeHooks.innerStateToSheetQuer
    componentId?: number
  }

  // component instance options
  export interface PipelineState extends ComponentOptions<TSheeter.Shape> {
    uniqueId?: string
    props?: TComponents.Props
    //pipeCounter?: number

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
    codeProps?: TComponents.PropsCode | TComponents.PropsCode[]
    innerState?: TComponents.InnerState

    classNameX?: TAtomize.Ruleset
    styleX?: TSheeter.StyleOrAtomized
    classes?: TSheeter.PartialSheet
  }

  export type Pipe = (instanceState: TWithStyles.PipelineState, pipeId:number, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.PipelineState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}
