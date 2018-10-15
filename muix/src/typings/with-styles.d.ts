import React from 'react';
import { TAtomize, TComponents, TSheeter, TTheme, TVariants } from './index'

declare namespace TWithStyles {

  // application options
  export interface GlobalState {
    getDefaultTheme?: () => TTheme.Theme
    createPipeline?: Pipe
    namedThemes?: { [themeName: string]: TTheme.Theme }
    finalizePropsCode?: FinishPropsCode
    //applyLastWinStrategy?: TAtomize.ToPlatformClassName
    mergeSheetQueries?: (pipelineState: TWithStyles.PipelineState) => TVariants.Query
    processDeffereds?: ProcessDeffereds
  }

  export type FinishPropsCode = (instanceState: TWithStyles.PipelineState) => void
  export type ProcessDeffereds = (values: TAtomize.AtomicArray, defferedIdxs:number[], state: TWithStyles.PipelineState) => void

  // component type options
  export interface ComponentOptions<R extends TSheeter.Shape = TSheeter.Shape> {
    displayName?: string
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentTypeCode<R>
    //codeHooks?: TVariants.CodeHooks<R>
    // computed props
    withSheetQueryComponent?: boolean // codeHooks && codeHooks.innerStateToSheetQuer
    componentId?: number
  }

  // component instance options
  export interface PipelineState extends ComponentOptions<TSheeter.Shape> {
    id?: string
    props?: TComponents.Props
    pipeCounter?: number

    propsCode?: TComponents.PropsCode
    pipeStates?: PipeState[]
    sheet?: TAtomize.Sheet
    theme?: TSheeter.getTheme

    sheetQuery?: TVariants.Query
    sheetQueryComponent?: SheetQueryComponent
  }

  export interface SheetQueryComponentProps {
    pipelineState: TWithStyles.PipelineState
    pipeState: PipeState
  }

  export type SheetQueryComponent = React.Component<SheetQueryComponentProps, TVariants.Query> //{

  export interface PipeState extends TVariants.PipeState {
    codeProps?: TComponents.PropsCode | TComponents.PropsCode[]
    sheetQuery?: TVariants.Query
    data?: any

    classNameX?: TAtomize.Ruleset
    styleX?: TSheeter.StyleOrAtomized
    classes?: TSheeter.PartialSheet
  }

  export type Pipe = (instanceState: TWithStyles.PipelineState, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.PipelineState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}
