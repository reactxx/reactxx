import { TTyped } from 'reactxx-typings';
import { TComponents } from '../typings/components'


export namespace TUseSheeter {

  export interface ComponentConfigLow {
    // withCascaing?: boolean
    //------
    id?: number // unique component id. Generated in useSheeter
  }

  // component type options
  export interface AuthorConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    defaultProps?: Partial<TComponents.Props<R>> // classes, css and styles are  ignored
    defaultSheet?: TTyped.SheetOrCreator<R>
  }

  export interface UserConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    overrideProps?: TComponents.Props<R> // classes, css and styles are ignored
    overrideSheet?: TTyped.SheetOrCreator<R>
    myConfigId?: number // ComponentConfig.id
  }

  export type ThemeContext<T extends any> = [T, (newTheme: T) => void]

  export type ComponentCreator<R extends TTyped.Shape = TTyped.Shape> = (
    userDisplayName?: string, userConfig?: TUseSheeter.UserConfig<R>
  ) => React.SFC<TComponents.Props<R>>

  export type GetComponent<R extends TTyped.Shape> = (
    authorConfig: TUseSheeter.AuthorConfig<R>,
    displayName: string,
    userConfig: TUseSheeter.UserConfig<R>,
    par?
  ) => TComponents.SFC<R>
}
