import React from 'react';
import { globalOptions, mergeCodeProps, mergeRulesets, mergeSheets, mergeStyles, toClassNamesWithQuery } from 'reactxx-sheeter';
import { TComponents, TVariants, TWithStyles } from 'reactxx-typings';

export const lastPipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  return () => {
    const { pipeStates, withSheetQueryComponent } = pipelineState
    // UNDO and init
    const pipeState: TWithStyles.PipeState = pipeStates[pipeId] = {}
    // prepare code component props
    const propsCode: TComponents.PropsCode = pipelineState.propsCode = {
      ...mergeCodeProps(pipeStates.map(p => p.codeProps)),
      theme: pipelineState.theme,
      classNameX: mergeRulesets(pipeStates.map(p => p.classNameX)),
      classes: mergeSheets(pipelineState.sheet, pipeStates.map(p => p.classes)),
      styleX: mergeStyles(pipeStates.map(p => p.styleX)),
      toClassNames: rulesets => toClassNamesWithQuery(pipelineState, rulesets),
      setInnerState: setState => {
        const { sheetQueryComponent, pipeStates, propsCode } = pipelineState
        if (!sheetQueryComponent) return
        pipeState.data = setState(pipeState.data, propsCode)
        sheetQueryComponent.setState(null)
      }
    }

    if (globalOptions.finalizePropsCode) globalOptions.finalizePropsCode(pipelineState)

    delete propsCode.$web
    delete propsCode.$native
    return withSheetQueryComponent ?
      <SheetQueryComponent
        pipelineState={pipelineState}
        pipeState={pipeState}
        ref={comp => pipelineState.sheetQueryComponent = comp} /> :
      <pipelineState.CodeComponent {...propsCode} />
  }
}

class SheetQueryComponent extends React.Component<TWithStyles.SheetQueryComponentProps, TVariants.Query> {
  render() {
    const { pipelineState, pipeState, pipelineState: { CodeComponent, propsCode } } = this.props
    if (CodeComponent.fillSheetQuery)
      CodeComponent.fillSheetQuery(propsCode, pipeState)
    propsCode.sheetQuery = globalOptions.mergeSheetQueries(pipelineState)
    return <CodeComponent {...propsCode} />
  }
}
