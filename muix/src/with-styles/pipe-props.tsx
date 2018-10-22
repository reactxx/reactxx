import { atomizeRuleset, atomizeSheet, atomizeStyle } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';
import { sheetFromThemeCache } from './pipe-theme';

export const propsPipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => {
    init(pipeId, pipelineState)
    return next()
  }
}

const init = (pipeId: number, pipelineState: TWithStyles.PipelineState) => {

  const { props: { classes, classNameX, styleX, themedProps, ...propsRest }, theme } = pipelineState

  pipelineState.pipeStates[pipeId] = {
    codeProps: [propsRest, themedProps ? themedProps(theme) : null],
    classes: atomizeSheet(classes, theme, 'classes'),
    classNameX: atomizeRuleset(classNameX, theme, 'classNameX'),
    styleX: atomizeStyle(styleX, theme),
  }
}
