import React from 'react';
import { TAtomize, TComponents, TSheeter, TTheme, TVariants } from './index'

declare namespace TWithStyles {

  // application options
  export interface GlobalState {
    getDefaultTheme?: () => TTheme.Theme
    createPipeline?: Pipeline
    namedThemes?: { [themeName: string]: TTheme.Theme }
    getPipeCounter?: () => number
  }

  // component type options
  export interface ComponentState<R extends TSheeter.Shape = TSheeter.Shape>  {
    name?: string
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentTypeCode<R>
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

    classNameX?: TAtomize.Ruleset
    styleX?: TSheeter.StyleOrAtomized
    classes?: TSheeter.PartialSheet
  }

  export type Pipe = (instanceState: TWithStyles.InstanceState, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.InstanceState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}
