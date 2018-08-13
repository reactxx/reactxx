import React from 'react';
import { RenderAddIn, TCommon, ThemeProviderUntyped, TProvider, Types, withStyles } from 'reactxx-basic';
import { renderer, rulesetToClassNamesMUI } from 'reactxx-fela';
import { Theme as MuiTheme } from './createMuiTheme'
import { WithTheme } from './withTheme'
import { default as createMuiTheme } from 'reactxx-mui-web/styles/createMuiTheme';
import {classNamesStr} from 'reactxx-basic';

const old: any = React.createElement
React.createElement = (tag, props, ...children) => {
  if (!props || typeof tag !== 'string' || !props.className || typeof props.className === 'string') 
    return old(tag, props, ...children)
  props.className = classNamesStr(props.className)
  return old(tag, props, ...children)
}

export type Theme = MuiTheme & TCommon.ThemeBase

export const ThemeProvider = ThemeProviderUntyped as TCommon.ThemeProviderTyped<Theme>

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type StyleRules<ClassKey extends string = string> = Record<ClassKey, CSSProperties>;

export type StyleRulesCallback<ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<ClassKey>;

export interface StylesCreator {
  create(theme: Theme, name: string): StyleRules;
  options: { index: number };
  themingEnabled: boolean;
}

export type WithStyles<T extends string | StyleRules | StyleRulesCallback = string> = Partial<
  WithTheme
> & {
  classes: ClassNameMap<
    T extends string
      ? T
      : T extends StyleRulesCallback<infer K> ? K : T extends StyleRules<infer K> ? K : never
  >;
};

export interface StyledComponentProps<ClassKey extends string = string> {
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}


export type CSSProperties = React.CSSProperties

const withStylesCreator =
  <R extends Types.Shape>
    (sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R>(sheetCreator, renderAddIn, { ...options || null }, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R>

export default withStylesCreator

export const toAtomic = (prefix: 'margin' | 'padding', value: number | string) => {
  let vals: (string | number)[] //top, bottom, left, right
  if (typeof value === 'number')
    vals = [value, value, value, value]
  else if (typeof value === 'string') {
    const parts = value.split(' ')
    switch (parts.length) {
      case 1: vals = [value, value, value, value]; break
      case 2: vals = [parts[0], parts[0], parts[1], parts[1]]; break
      case 3: vals = [parts[0], parts[2], parts[1], parts[1]]; break
      case 4: vals = [parts[0], parts[2], parts[3], parts[1]]; break // top | right | bottom | left
      default: throw 'Wrong value: ' + value
    }
  } else
    throw 'Wrong value: ' + value
  return {
    [`${prefix}Top`]: vals[0],
    [`${prefix}Bottom`]: vals[1],
    [`${prefix}Left`]: vals[2],
    [`${prefix}Right`]: vals[3],
  }
}

// for MUI RIPPLE etc
renderer.renderStatic(['keyframes', '-webkit-keyframes'].map(keyframes => `
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

//************ SHEET HOOK

const createSheetHook = (sheetCreator: Types.SheetCreatorX) => {
  if (typeof sheetCreator === 'function')
    return (theme, par) => modifySheet(sheetCreator(theme, par))
  else
    return modifySheet(sheetCreator)
}

const modifySheet = sheet => {
  for (const rulesetName in sheet) modifyRuleset(sheet, rulesetName)
  return sheet
}

function modifyRuleset(sheet: {}, rulesetName: string) {
  if (rulesetName.startsWith('@keyframes')) {
    delete sheet[rulesetName]
    return
  }
  return
  const ruleset = sheet[rulesetName]
  let $whenUsed = null
  Object.keys(ruleset).forEach(ruleName => {
    const rule = ruleset[ruleName]
    const pseudoClasses = rx$pseudoClasses.exec(ruleName)
    if (false && pseudoClasses) {
      ruleset[pseudoClasses[1]] = rule
      delete ruleset[ruleName]
    } else {
      const whenUsed = rx$whenUsed.exec(ruleName)
      if (whenUsed) {
        ($whenUsed || ($whenUsed = {}))[whenUsed[1]] = rule
        delete ruleset[ruleName]
      } else if (rule && typeof rule === 'object') {
        modifyRuleset(ruleset, ruleName)
      }
    }
  })
  if ($whenUsed)
    ruleset['$whenUsed'] = $whenUsed
}

const rx$pseudoClasses = /&(:(:)?((\w|-)+))$/
const rx$whenUsed = /&\$(\w+)$/


// empty addIn configuration
const renderAddIn: RenderAddIn = {
  propsAddInPipeline: (renderState, next) => next,
  styleAddInPipeline: (renderState, next) => next,
  getDefaultTheme: () => createMuiTheme() as Theme,
  createSheetHook: createSheetHook,
  rulesetsToClassNames: rulesetToClassNamesMUI,
}
