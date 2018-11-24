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
    sheetOrCreator?: TSheeter.SheetOrCreator<R>
  }

  export interface ComponentConfigOverride<R extends TSheeter.Shape = TSheeter.Shape> extends ComponentConfigLow {
    props?: TComponents.Props<R> // classes, classNameX and styleX ignored
    classes?: TSheeter.SheetOrCreator<R> 
  }

}
