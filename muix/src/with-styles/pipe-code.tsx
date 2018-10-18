import React from 'react';
import { TWithStyles } from 'reactxx-typings';

export const codePipe: TWithStyles.Pipe = (pipelineState, next) => {
  //const pipeId = pipelineState.pipeCounter++
  return () => <pipelineState.CodeComponent {...pipelineState.propsCode} />
}
