import { mergeCodeProps, mergeRulesets, mergeSheets, mergeStyles, toClassNamesWithQuery } from 'reactxx-sheeter';
import { TComponents, TWithStyles } from 'reactxx-typings';

// prepare code component props
export const propsCodePipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => {
    const { pipeStates } = pipelineState
    const propsCode: TComponents.PropsCode = pipelineState.propsCode = {
      ...mergeCodeProps(pipeStates.map(p => p && p.propsCode)),
      theme: pipelineState.theme,
      classNameX: mergeRulesets(pipeStates.map(p => p && p.classNameX)),
      classes: mergeSheets(pipeStates.map(p => p && p.classes)),
      styleX: mergeStyles(pipeStates.map(p => p && p.styleX)),
      toClassNames: rulesets => toClassNamesWithQuery(pipelineState, rulesets),
    }

    //if (globals.finalizePropsCode) globals.finalizePropsCode(pipelineState)

    delete propsCode.$web; delete propsCode.$native

    return next()
  }
}