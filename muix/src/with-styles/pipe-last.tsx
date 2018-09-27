import React from 'react';
import { TWithStyles, TComponents } from 'reactxx-typings'
import { mergeRulesets, mergeSheets, mergeCodeProps, mergeStyles } from 'reactxx-sheeter'
import { globalOptions } from './global-state'

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
      sheetQuery: {}
    }
    // state.sheetQuery.$sheetFlags = mergeFlags(pipeStates.map(p => p.flags))
    // codeProps.toClassNames = toClassNamesForBind(state.sheetQuery, state.theme)
    if (globalOptions.finishPropsCode) globalOptions.finishPropsCode(propsCode, state)
    delete propsCode.$web
    delete propsCode.$native
    return <state.CodeComponent {...propsCode} />
  }
}
