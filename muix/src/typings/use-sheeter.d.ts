import { TComponents, TTyped } from './index';

declare namespace TUseSheeter {

  export interface ComponentConfigLow {
    // withoutTheme?: boolean
    // withCascaing?: boolean
    //------
    displayName?: string // assigned in useSheeter
    id?: number // generated in useSheeter
  }

  // component type options
  export interface ComponentConfig<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    defaultProps?: TComponents.Props<R> // classes, classNameX and styleX ignored
    defaultSheet?: TTyped.SheetOrCreator<R>
  }

  export interface ComponentConfigOverride<R extends TTyped.Shape = TTyped.Shape> extends ComponentConfigLow {
    overrideProps?: TComponents.Props<R> // classes, classNameX and styleX ignored
    overrideSheet?: TTyped.SheetOrCreator<R> 
    myConfigId?: number // ComponentConfig.id
  }

  export type ThemeContext<T extends any> = [T, (newTheme: T) => void]

}
