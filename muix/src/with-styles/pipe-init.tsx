import { atomizeRuleset, atomizeSheet, atomizeStyle } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';
import warning from 'warning';
import { sheetFromThemeCache } from './pipe-theme';

export const initPipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  pipelineState.pipeCounter++ // alocate two pipeId's
  return () => {
    init(pipeId, pipelineState)
    return next()
  }
}

const init = (pipeId: number, pipelineState: TWithStyles.PipelineState) => {
  const { props: { classes, classNameX, styleX, themedProps, ...propsRest }, theme, sheetOrCreator, defaultProps, componentId } = pipelineState

  // use first pipeId for default props
  if (defaultProps) {
    const { classNameX, styleX, themedProps, classes, ...defaultPropsRest } = defaultProps
    pipelineState.pipeStates[pipeId] = {
      codeProps: [defaultPropsRest, themedProps ? themedProps(theme) : null],
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, classes),
      classNameX: atomizeRuleset(classNameX, theme),
      styleX: atomizeStyle(styleX, theme),
    }
  } else {
    pipelineState.pipeStates[pipeId] = {
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, null),
    }
  }

  // and second for component props
  pipelineState.pipeStates[pipeId + 1] = {
    codeProps: [propsRest, themedProps ? themedProps(theme) : null],
    classes: atomizeSheet(classes, theme),
    classNameX: atomizeRuleset(classNameX, theme),
    styleX: atomizeStyle(styleX, theme),
  }
}

