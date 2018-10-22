import { atomizeRuleset, atomizeStyle } from 'reactxx-sheeter';
import { TWithStyles } from 'reactxx-typings';
import { sheetFromThemeCache } from './pipe-theme';

export const defaultPropsPipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => {
    init(pipeId, pipelineState)
    return next()
  }
}

const init = (pipeId: number, pipelineState: TWithStyles.PipelineState) => {
  
  const { defaultProps, theme, sheetOrCreator, componentId } = pipelineState

  // use first pipeId for default props
  if (defaultProps) {
    const { classNameX, styleX, themedProps, classes, ...defaultPropsRest } = defaultProps
    pipelineState.pipeStates[pipeId] = {
      codeProps: [defaultPropsRest, themedProps ? themedProps(theme) : null],
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, classes),
      classNameX: atomizeRuleset(classNameX, theme, 'option.classNameX'),
      styleX: atomizeStyle(styleX, theme),
    }
  } else {
    pipelineState.pipeStates[pipeId] = {
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, null),
    }
  }

}
