import React from 'react';
import { globalOptions, mergeDeep } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';

export const innerStatePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => {
    const { pipeStates, propsCode } = pipelineState
    // reset pipe state
    const pipeState: TWithStyles.PipeState = pipeStates[pipeId] = {}

    propsCode.setInnerState = setState => {
      const { propsCode } = pipelineState
      const newState = setState(pipeState.innerState, propsCode)
      pipeState.innerState = pipeState.innerState ? { ...pipeState.innerState, ...newState } : newState
      pipelineState.refreshInnerStateComponent() // rerender
    }

    return <InnerStateComponent
      pipelineState={pipelineState}
      pipeState={pipeState}
      ref={comp => pipelineState.innerStateComponent = comp}>{next}</InnerStateComponent>
  }
}

class InnerStateComponent extends React.Component<InnerStateComponentProps> {
  render() {
    const { pipeState, pipelineState: { pipeStates, CodeComponent, propsCode }, children } = this.props
    if (CodeComponent.modifyInnerState) {
      if (!pipeState.innerState) pipeState.innerState = {}
      CodeComponent.modifyInnerState(propsCode, pipeState.innerState)
    }
    propsCode.mergedInnerState = mergeDeep(pipeStates.map(s => s.innerState))
    return children()
  }
}

interface InnerStateComponentProps {
  pipelineState: TWithStyles.PipelineState
  pipeState: TWithStyles.PipeState
  children: () => React.ReactNode
}