import React from 'react';
import { TAtomize, TComponents, TSheeter, TTheme, TVariants } from './index'

declare namespace TWithStyles {

  export interface GetPipesResult {
    beforePropsCode?: Pipe[]
    afterPropsCode?: Pipe[]
  }
  export type GetPipes = (options: TWithStyles.ComponentOptions) => GetPipesResult

  // application options
  export interface Globals {
    getDefaultTheme?: () => any
    getPipes?: GetPipes
    namedThemes?: { [themeName: string]: any }
    // OBSOLETE
    finalizePropsCode?: FinishPropsCode
    // OBSOLETE
    processDeffereds?: ProcessDeffereds
  }

  export type FinishPropsCode = (instanceState: TWithStyles.PipelineState) => void
  export type ProcessDeffereds = (values: TAtomize.AtomicArray, defferedIdxs: number[], state: TWithStyles.PipelineState) => void

  // component type options
  export interface ComponentOptions<R extends TSheeter.Shape = TSheeter.Shape> extends TVariants.ComponentOptions {
    displayName?: string
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean
    withInnerState?: boolean
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentTypeCode<R>
    getPipes?: (options: TWithStyles.ComponentOptions) => GetPipesResult
    componentId?: number
  }

  // component instance options
  export interface PipelineState { //extends ComponentOptions<TSheeter.Shape> {
    options?: ComponentOptions<TSheeter.Shape>

    uniqueId?: string

    props?: TComponents.Props
    propsCode?: TComponents.PropsCode

    pipeStates?: PipeState[]
    theme?: TSheeter.getTheme
  }

  export interface PipeState extends TVariants.PipeState {
    propsCode?: TComponents.PropsCode | TComponents.PropsCode[]
    sheetQuery?: TVariants.Query

    classNameX?: TAtomize.Ruleset
    styleX?: TSheeter.StyleOrAtomized
    classes?: TSheeter.PartialSheet
  }

  export type Pipe = (instanceState: TWithStyles.PipelineState, pipeId: number, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.PipelineState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}
