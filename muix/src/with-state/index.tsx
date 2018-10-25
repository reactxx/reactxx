import React from 'react';
import { TWithStyles } from 'reactxx-typings';

export const innerStatePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  let innerStateComponent: InnerStateComponent
  
  return () => {
    const { pipeStates, propsCode, options } = pipelineState
    if (!options.withInnerState) return next()

    delete pipeStates[pipeId]

    propsCode.setInnerState = setState => {
      const { propsCode, pipeStates } = pipelineState
      const pipeState = pipeStates[pipeId] || (pipeStates[pipeId] = { sheetQuery: {} })
      const newState = setState(pipeState.sheetQuery, propsCode)
      if (newState === null) return
      pipeState.sheetQuery = pipeState.sheetQuery ? { ...pipeState.sheetQuery, ...newState } : newState
      innerStateComponent && innerStateComponent.setState(st => st)
    }

    return <InnerStateComponent ref={comp => innerStateComponent = comp}>{next}</InnerStateComponent>
  }
}

class InnerStateComponent extends React.Component<{children: () => React.ReactNode}> {
  render() { return this.props.children() }
}
