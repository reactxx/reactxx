import React from 'react';
import { TWithStyles, TComponents } from 'reactxx-typings'
import { toClassNamesWithQuery, globalOptions, mergeRulesets, mergeSheets, mergeCodeProps, mergeStyles } from 'reactxx-sheeter'

export const lastPipe: TWithStyles.Pipe = (state, next) => {
  const pipeId = state.pipeCounter++
  return () => {
    const { pipeStates } = state
    // UNDO
    delete pipeStates[pipeId]
    // prepare code component props
    const propsCode: TComponents.PropsCode = {
      ...mergeCodeProps(pipeStates.map(p => p.codeProps)),
      theme: state.theme,
      classNameX: mergeRulesets(pipeStates.map(p => p.classNameX)),
      classes: mergeSheets(state.sheet, pipeStates.map(p => p.classes)),
      styleX: mergeStyles(pipeStates.map(p => p.styleX)),
      toClassNames: rulesets => toClassNamesWithQuery(null, state.theme, rulesets)
    }
    propsCode.toClassNames = rulesets => toClassNamesWithQuery(null, propsCode, rulesets)
    
    if (globalOptions.finalizePropsCode) globalOptions.finalizePropsCode(propsCode, state)
    delete propsCode.$web
    delete propsCode.$native
    return <state.CodeComponent {...propsCode} />
  }
}
