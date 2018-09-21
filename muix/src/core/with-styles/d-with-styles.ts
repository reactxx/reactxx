import React from 'react';
import { TAtomize, TComponents, TSheeter, TTheme, TVariants } from '../d-index';

export namespace TWithStyles {

  // application options
  export interface GlobalState {
    getDefaultTheme?: () => TTheme.Theme
    createPipeline?: Pipeline
    namedThemes?: { [themeName: string]: TTheme.Theme }
    getPipeCounter?: () => number
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

  export type Pipe = (instanceState: TWithStyles.InstanceState, next: ReactNodeCreator) => ReactNodeCreator
  export type Pipeline = (instanceState: TWithStyles.InstanceState) => ReactNodeCreator
  export type ReactNodeCreator = () => React.ReactNode

}
