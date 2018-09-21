import React from 'react';
import { TWithStyles, TComponents } from '../d-index'
//import { adjustSheet } from '../reacts/adjust-sheet'
import { mergeRulesetsForBind } from 'reactxx-core/sheeter/merges'


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
    codeProps.mergeRulesets = mergeRulesetsForBind.bind(codeProps)
    return <state.CodeComponent {...codeProps} />
  }
}
