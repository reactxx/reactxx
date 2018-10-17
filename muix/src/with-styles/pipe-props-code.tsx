import { globalOptions, mergeCodeProps, mergeRulesets, mergeSheets, mergeStyles, toClassNamesWithQuery } from 'reactxx-sheeter';
import { TComponents, TWithStyles } from 'reactxx-typings';

// prepare code component props
export const propsCodePipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  return () => {
    const { pipeStates } = pipelineState
    // UNDO and init
    const pipeState: TWithStyles.PipeState = pipeStates[pipeId] = {}
    const propsCode: TComponents.PropsCode = pipelineState.propsCode = {
      ...mergeCodeProps(pipeStates.map(p => p.codeProps)),
      theme: pipelineState.theme,
      classNameX: mergeRulesets(pipeStates.map(p => p.classNameX)),
      classes: mergeSheets(pipeStates.map(p => p.classes)),
      styleX: mergeStyles(pipeStates.map(p => p.styleX)),
      toClassNames: rulesets => toClassNamesWithQuery(pipelineState, rulesets),
    }

    if (globalOptions.finalizePropsCode) globalOptions.finalizePropsCode(pipelineState)

    delete propsCode.$web; delete propsCode.$native

    return next()
  }
}