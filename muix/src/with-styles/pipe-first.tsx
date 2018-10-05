import React from 'react';
import { TTheme, TWithStyles } from 'reactxx-typings';
import { globalOptions } from 'reactxx-sheeter';
import { applyTheme, ThemeContextConsumer, defaultThemeName } from './themer'

export const firstPipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  const render = (theme: TTheme.Theme) => {
    applyTheme(pipeId, theme || globalOptions.namedThemes[defaultThemeName], pipelineState)
    return next()
  }
  return () => {
    // UNDO
    delete pipelineState.sheet
    // apply theme
    if (!pipelineState.withTheme) {
      // no theme
      applyTheme(pipeId, null, pipelineState)
      return next()
    }
    // theme => listen to theme change
    return <ThemeContextConsumer>{render}</ThemeContextConsumer>
  }
}
