import React from 'react';
import { globalOptions, mergeDeep } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';

export const innerStatePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  const render = () => {
    return next()
  }
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
      ref={comp => pipelineState.innerStateComponent = comp}>{render}</InnerStateComponent>
  }
}

class InnerStateComponent extends React.Component<InnerStateComponentProps> {
  render() {
    //this.props['toJSON'] = this.toJSON.bind(this.props)
    const { pipelineState, pipeState, pipelineState: { CodeComponent, propsCode }, children } = this.props
    __SET_TRACING__(this)
    if (CodeComponent.modifyInnerState) {
      if (!pipeState.innerState) pipeState.innerState = {}
      CodeComponent.modifyInnerState(propsCode, pipeState.innerState)
    }
    propsCode.mergedInnerState = mergeDeep(pipelineState.pipeStates.map(s => s.innerState))
    return children()
  }
  toJSON
}

const __SET_TRACING__ = (comp: InnerStateComponent) => {
  if (!window.__TRACE__ && !window.__TRACELEVEL__) return
  const { pipelineState, pipeState, pipelineState: { propsCode: { classes, styleX, classNameX, mergedInnerState } } } = comp.props
  let objs: {}[]
  switch (window.__TRACELEVEL__ || 1) {
    case 1: // display only childs of ComponentCode
    case 2: // display childs of ComponentCode with trace attr 
    case 3: return //objs = [comp, pipelineState, pipeState, styleX, mergedInnerState, classes, classNameX]; break
    case 4: objs = [comp, pipelineState, pipeState]; break
    case 5: objs = [comp ]; break
  }
  objs.forEach(obj => obj && (obj['toJSON'] = () => '...'))
}

interface InnerStateComponentProps {
  pipelineState: TWithStyles.PipelineState
  pipeState: TWithStyles.PipeState
  children: () => React.ReactNode
}
