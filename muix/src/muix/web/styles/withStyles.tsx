import { default as createMuiTheme } from 'material-ui/styles/createMuiTheme';
import React from 'react';
import { RenderAddIn, TCommon, ThemeProviderUntyped, TProvider, Types, withStyles } from 'reactxx-basic';
import { Theme as MuiTheme } from 'reactxx-muix/typings/styles/createMuiTheme';
import createSheetHook from 'reactxx-muix/web/styles/create-sheet-hook';
import { rulesetsToClassNames, renderer } from 'reactxx-fela'




export type Theme = MuiTheme & TCommon.ThemeBase

export const ThemeProvider = ThemeProviderUntyped as TCommon.ThemeProviderTyped<Theme>

// empty addIn configuration
const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (renderState, next) => next,
  styleAddInPipeline: (renderState, next) => next,
  getDefaultTheme: () => createMuiTheme() as Theme,
  createSheetHook: createSheetHook,
  rulesetsToClassNames: rulesetsToClassNames,
}


const withStylesMui = <R extends Types.Shape>
  (sheetCreator: Types.SheetCreatorX<R>, options?: { name: string }) => (component) => 
    withStyles<R, {}>(sheetCreator, renderAddIn, options, {isMui:true})(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R>

export default withStylesMui

renderer.renderStatic(`
@-webkit-keyframes mui-ripple-enter {
  0% {
    opacity: 0.1;
    transform: scale(0);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
@-webkit-keyframes mui-ripple-exit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes mui-ripple-pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
}
`)
