import React from 'react';
import { TTheme, TWithStyles } from 'reactxx-typings';
import { ThemeContextConsumer } from './pipe-init'

export const themePipe: TWithStyles.Pipe = (pipelineState, next) => {
  const pipeId = pipelineState.pipeCounter++
  const render = (theme: TTheme.Theme) => {
    pipelineState.theme = theme
    return next()
  }
  return () => pipelineState.withTheme
    ? <ThemeContextConsumer>{render}</ThemeContextConsumer>
    : next()
}
