import { atomizeRuleset, atomizeStyle } from 'reactxx-styler';
import { TWithStyles } from 'reactxx-typings';
import { sheetFromThemeCache } from './pipe-theme';

export const defaultPropsPipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
  return () => {
    init(pipeId, pipelineState)
    return next()
  }
}

const init = (pipeId: number, pipelineState: TWithStyles.PipelineState) => {
  
  const { theme, options: {defaultProps, sheetOrCreator, componentId, displayName} } = pipelineState

  // use first pipeId for default props
  if (defaultProps) {
    const { classNameX, styleX, themedProps, classes, ...defaultPropsRest } = defaultProps
    pipelineState.pipeStates[pipeId] = {
      propsCode: [defaultPropsRest, themedProps ? themedProps(theme) : null],
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, classes, displayName),
      classNameX: atomizeRuleset(classNameX, theme, `${displayName}.option.classNameX`),
      styleX: atomizeStyle(styleX, theme, `${displayName}.option.styleX`),
    }
  } else {
    pipelineState.pipeStates[pipeId] = {
      classes: sheetFromThemeCache(componentId, sheetOrCreator, theme, null, displayName),
    }
  }

}

