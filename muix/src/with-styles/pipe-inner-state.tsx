import React from 'react';
import { globalOptions, mergeDeep } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';

export const innerStatePipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  const render = () => {

  }
  return () => {
    const { pipeStates, propsCode } = pipelineState
    // reset pipe state
    const pipeState: TWithStyles.PipeState = pipeStates[pipeId] = { }

    propsCode.setInnerState = setState => {
      const { propsCode } = pipelineState
      const newState = setState(pipeState.innerState, propsCode)
      pipeState.innerState = pipeState.innerState ? {...pipeState.innerState, ...newState} : newState
      pipelineState.refreshInnerStateComponent() // rerender
    }

    return <InnerStateComponent
      pipelineState={pipelineState}
      pipeState={pipeState}
      ref={comp => pipelineState.innerStateComponent = comp}>{render}</InnerStateComponent>
  }
}

class InnerStateComponent extends React.Component<InnerStateComponentProps> {
  render() {
    const { pipelineState, pipeState, pipelineState: { CodeComponent, propsCode }, children } = this.props
    if (CodeComponent.modifyInnerState) {
      if (!pipeState.innerState) pipeState.innerState = {}
      CodeComponent.modifyInnerState(propsCode, pipeState.innerState)
    }
    propsCode.mergedInnerState = mergeDeep(pipelineState.pipeStates.map(s => s.innerState))
    return children
  }
}
interface InnerStateComponentProps {
  pipelineState: TWithStyles.PipelineState
  pipeState: TWithStyles.PipeState
}
