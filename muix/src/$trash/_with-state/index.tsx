import React from 'react';
import { TWithStyles, TVariants } from 'reactxx-typings';

export const innerStatePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  let innerStateComponent: InnerStateComponent

  return () => {
    const { pipeStates, propsCode, options } = pipelineState

    if (!options.withInnerState) return next()

    delete pipeStates[pipeId]

    propsCode.setInnerState = setInnerState => {
      const { propsCode, pipeStates } = pipelineState
      const pipeState = pipeStates[pipeId] || (pipeStates[pipeId] = { sheetQuery: {innerState: {}} })
      const newInnerState = setInnerState(pipeState.sheetQuery.innerState, propsCode)
      if (newInnerState === null) return
      pipeState.sheetQuery.innerState = newInnerState
      innerStateComponent && innerStateComponent.setState(st => st)
    }

    return <InnerStateComponent ref={comp => innerStateComponent = comp}>{next}</InnerStateComponent>
  }
}

class InnerStateComponent extends React.Component<{ children: () => React.ReactNode }> {
  render() { return this.props.children() }
}
