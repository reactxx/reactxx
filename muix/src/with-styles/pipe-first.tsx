import React from 'react';
import { TTheme, TWithStyles } from 'reactxx-typings';
import { globalOptions } from 'reactxx-sheeter';
import { applyTheme, ThemeContextConsumer, defaultThemeName } from './themer'

export const firstPipe: TWithStyles.Pipe = (state, next) => {
  const pipeId = state.pipeCounter++
  const render = (theme: TTheme.Theme) => {
    applyTheme(pipeId, theme || globalOptions.namedThemes[defaultThemeName], state)
    return next()
  }
  return () => {
    // UNDO
    delete state.sheet
    // apply theme
    if (!state.withTheme) {
      // no theme
      applyTheme(pipeId, null, state)
      return next()
    }
    // theme => listen to theme change
    return <ThemeContextConsumer>{render}</ThemeContextConsumer>
  }
}
