import React from 'react';
import { TAtomize, TComponents, TSheeter, TVariants } from './index'

declare namespace TWithStyles {

  // component type options
  export interface ComponentOptions<R extends TSheeter.Shape = TSheeter.Shape> extends TVariants.ComponentOptions {
    id?: number // unique Id
    displayName?: string
    defaultProps?: TComponents.Props<R>
    //withTheme?: boolean
    sheetOrCreator?: TSheeter.SheetOrCreator<R>
    componentId?: number
  }

}
