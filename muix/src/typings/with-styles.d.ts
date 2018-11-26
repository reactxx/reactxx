import React from 'react';
import { TAtomize, TComponents, TSheeter, TVariants } from './index'

declare namespace TWithStyles {

  export interface ComponentConfigLow {
    withoutTheme?: boolean
    withCascaing?: boolean
    //------
    displayName?: string // assigned in useSheeter
    id?: number // generated in useSheeter
  }

  // component type options
  export interface ComponentConfig<R extends TSheeter.Shape = TSheeter.Shape> extends TVariants.ComponentOptions, ComponentConfigLow {
    defaultProps?: TComponents.Props<R> // classes, classNameX and styleX ignored
    defaultSheet?: TSheeter.SheetOrCreator<R>
  }

  export interface ComponentConfigOverride<R extends TSheeter.Shape = TSheeter.Shape> extends ComponentConfigLow {
    overrideProps?: TComponents.Props<R> // classes, classNameX and styleX ignored
    overrideSheet?: TSheeter.SheetOrCreator<R> 
    myConfigId?: number // ComponentConfig.id
  }

  export type ThemeContext<T extends any> = [T, (newTheme: T) => void]

}
