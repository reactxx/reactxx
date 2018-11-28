import { TComponents, TTyped } from './index';

declare namespace TUseSheeter {

  export interface ComponentConfigLow {
    // withCascaing?: boolean
    //------
    id?: number // generated in useSheeter
  }

  // component type options
  export interface AuthorConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    defaultProps?: Partial<TComponents.Props<R>> // classes, classNameX and styleX ignored
    defaultSheet?: TTyped.SheetOrCreator<R>
  }

  export interface UserConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    overrideProps?: TComponents.Props<R> // classes, classNameX and styleX ignored
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
