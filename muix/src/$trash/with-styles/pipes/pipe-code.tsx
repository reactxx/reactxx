import React from 'react';
import { mergeDeep } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';

export const codePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => {
    const { pipeStates, options: { CodeComponent }, propsCode } = pipelineState
    if (CodeComponent.setSheetQuery) {
      const pipeState: TWithStyles.PipeState = pipeStates[pipeId] = { sheetQuery: {} }
      CodeComponent.setSheetQuery(propsCode, pipeState.sheetQuery)
    }
    propsCode.sheetQuery = mergeDeep(pipeStates.map(s => s && s.sheetQuery))

    return <CodeComponent {...pipelineState.propsCode} />
  }
}
