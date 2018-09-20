import React from 'react';
import { TWithStyles, TComponents } from '../d-index'
//import { adjustSheet } from '../reacts/adjust-sheet'
import { classNamesForBind } from '../reacts/class-names'


export const lastPipe: TWithStyles.Pipe = (pipeId, context, next) => {
  return () => {
    const { pipeStates } = context
    // UNDO
    delete pipeStates[pipeId]
    // prepare code component props
    const codeProps: TComponents.PropsCode = {
      sheetQuery: context.sheetQuery,
      theme: context.theme,
    }
    codeProps.classNames = classNamesForBind.bind(codeProps)
    return <context.CodeComponent {...codeProps} />
  }
}
