import React from 'react';
import { TWithStyles, TComponents } from '../d-index'
import { toClassNamesForBind } from 'reactxx-core/sheeter/to-classnames'


export const lastPipe: TWithStyles.Pipe = (state, next) => {
  const pipeId = state.getPipeCounter()
  return () => {
    const { pipeStates } = state
    // UNDO
    delete pipeStates[pipeId]
    // prepare code component props
    const codeProps: TComponents.PropsCode = {
      sheetQuery: state.sheetQuery,
      theme: state.theme,
    }
    codeProps.toClassNames = toClassNamesForBind.bind(codeProps)
    return <state.CodeComponent {...codeProps} />
  }
}
