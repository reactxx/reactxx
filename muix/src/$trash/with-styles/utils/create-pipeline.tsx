import { TWithStyles } from 'reactxx-typings';
import { codePipe } from '../pipes/pipe-code';
import { propsPipe } from '../pipes/pipe-props';
import { defaultPropsPipe } from '../pipes/pipe-default-props';
import { propsCodePipe } from '../pipes/pipe-props-code';
import { themePipe } from '../pipes/pipe-theme';

export const createPipeline = (getPipe: TWithStyles.GetPipes, pipelineState: TWithStyles.PipelineState): TWithStyles.ReactNodeCreator => {
  const getPipePipes = getPipe ? getPipe(pipelineState.options) : null
  const system = systemPipes(pipelineState)
  const pipes = [
      ...system.firsts,
      ...getPipePipes && getPipePipes.beforePropsCode || [],
      ...system.second,
      ...getPipePipes && getPipePipes.afterPropsCode || [],
      ...system.thirds,
    ].filter(p => !!p)
    return createPipelineLow(pipelineState, pipes)
}
const systemPipes = (options: TWithStyles.PipelineState) => ({
  firsts: [options.options.withTheme && themePipe, defaultPropsPipe, propsPipe],
  second: [propsCodePipe],
  thirds: [codePipe]
})

function createPipelineLow(pipelineState: TWithStyles.PipelineState, pipes: TWithStyles.Pipe[], lastPipeIdx = 0): TWithStyles.ReactNodeCreator {
  return lastPipeIdx >= pipes.length
    ? null
    : pipes[lastPipeIdx](pipelineState, lastPipeIdx, createPipelineLow(pipelineState, pipes, lastPipeIdx + 1))
}

