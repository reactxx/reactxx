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
  (sheetCreator: Types.SheetCreatorX<R>, options?: { name: string, defaultProps: Types.PropsX<R>}) => (component) => 
    withStyles<R, {}>(sheetCreator, renderAddIn, options, {isMui:true})(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R>

export default withStylesMui

// for MUI RIPPLE
renderer.renderStatic( ['keyframes', '-webkit-keyframes'].map(keyframes => `
@${keyframes} mui-ripple-enter {
  0% {
    opacity: 0.1;
    transform: scale(0);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
@${keyframes} mui-ripple-exit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@${keyframes} mui-ripple-pulsate {
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
@${keyframes} mui-progress-circular-rotate: {
  100%: {
    transform: rotate(360deg);
  }
}
@${keyframes} mui-progress-circular-dash: {
  0%: {
    strokeDasharray: 1px 200px;
    strokeDashoffset: 0px;
  }
  50%: {
    strokeDasharray: 100px 200px;
    strokeDashoffset: -15px;
  }
  100%: {
    strokeDasharray: 100px 200px;
    strokeDashoffset: -120px;
  }

@${keyframes} mui-indeterminate1: {
    0%: {
      left: -35%;
      right: 100%;
    }
    60%: {
      left: 100%;
      right: -90%;
    }
    100%: {
      left: 100%;
      right: -90%;
    }
  }
@${keyframes} mui-indeterminate2: {
  0%: {
    left: -200%;
    right: 100%;
  }
  60%: {
    left: 107%;
    right: -8%;
  }
  100%: {
    left: 107%;
    right: -8%;
  }
}
@${keyframes} buffer: {
  0%: {
    opacity: 1;
    backgroundPosition: 0px -23px;
  }
  50%: {
    opacity: 0;
    backgroundPosition: 0px -23px;
  }
  100%: {
    opacity: 1;
    backgroundPosition: -200px -23px;
  }
}

`).join(''))
