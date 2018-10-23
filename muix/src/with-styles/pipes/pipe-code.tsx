import React from 'react';
import { TWithStyles } from 'reactxx-typings';

export const codePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => <pipelineState.CodeComponent {...pipelineState.propsCode} />
}
