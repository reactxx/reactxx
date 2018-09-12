import { TComponents, TSheeter, TTheme } from '../index-d';

export namespace TWithStyles {

  export interface GlobalOptions {
    getDefaultTheme?: TTheme.GetDefaultTheme
    createPipeline?: PipeLine
    namedThemes?: { [themeName: string]: TTheme.Theme }
  }

  export interface Options<R extends TSheeter.Shape = TSheeter.Shape> extends GlobalOptions {
    name?: string,
    defaultProps?: TComponents.Props<R>
    withTheme?: boolean,
  }

  export interface PipelineContext extends Options<TSheeter.Shape> {
    // static part
    componentId?: number
    displayName?: string
    sheetOrCreator?: TSheeter.SheetOrCreator
    CodeComponent?: TComponents.ComponentType,
    // instance part
    id?: string
    theme?: TTheme.Theme
    props?: TComponents.Props
    codeProps?: TComponents.PropsCode
  }

  export type Pipe = (context: TWithStyles.PipelineContext, next: () => React.ReactNode) => () => React.ReactNode
  export type PipeLine = (context: TWithStyles.PipelineContext) => () => React.ReactNode

}