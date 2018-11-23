import React from 'react'
import { createRenderer } from 'fela'
import { render } from 'fela-dom'
import pluginExtend from 'fela-plugin-extend'
import pluginFallbackValue from 'fela-plugin-fallback-value'
//import pluginLvha from 'fela-plugin-lvha'
import pluginPrefixer from 'fela-plugin-prefixer'
import pluginUnit from 'fela-plugin-unit'

import patch, { IRendererEx, dump } from './patch';
import { TAtomize, TVariants } from 'reactxx-typings';

const plugins = {
  plugins: [
    pluginUnit('px'),
    pluginExtend(),
    pluginPrefixer(),
    pluginFallbackValue(),
    //pluginLvha(),
    //pluginRtl(),
  ]
}

const initFela$Web = (platform?: TVariants.Platform) => {
  
  if (platform && platform.renderer) return

  renderer = patch(createRenderer(plugins))
  if (platform) platform.renderer = renderer

  renderer.renderStatic({
    fontFamily: 'Roboto'
  }, 'body')
  //renderer.renderStatic({ boxSizing: 'border-box' }, '*')
  renderer.renderStatic({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  }, '#root')

  // C:\reactxx\muix\src\mui-web\CssBaseline\CssBaseline.tsx
  renderer.renderStatic({
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    boxSizing: "border-box"
  } as any, 'html')
  renderer.renderStatic({
    boxSizing: "inherit"
  }, '*, *::before, *::after')
  renderer.renderStatic({
    // Remove the margin in all browsers.
    margin: 0,
    // backgroundColor: theme.palette.background.default,
    // "@media print": {
    //   Save printer ink.
    //   backgroundColor: theme.palette.common.white
    // }
  }, 'body')

  render(renderer)
}

const dataTrace = (classNames: TAtomize.AtomicWebsLow, flags: TraceFlags = 'long' ) => {
  if (!classNames || classNames.length === 0) return ''
  if (!window.__TRACE__) return ''
  return '\n' + classNames.map(c => dump(c, flags==='short')).join('\n')
}

//Converts ruleset to blank delimited atomic classes
const rulesetToClassNames = (ruleset: React.CSSProperties) => {
  return ruleset ? renderer.renderRule(() => ruleset, {}) : ''
}
const rulesetsToClassNames = (...rulesets: React.CSSProperties[]) => {
  if (!rulesets) return ''
  rulesets = rulesets.filter(r => !!r)
  let res: string
  if (rulesets.length == 1) res = rulesetToClassNames(rulesets[0])
  else res = rulesetToClassNames(Object.assign({}, ...rulesets))
  return res
}
const keyFrameToClassNames = (keyFrame: React.CSSProperties) => keyFrame ? renderer.renderKeyframe(() => keyFrame, {}) : ''

const rulesetToClassNamesMUI = (ruleset: React.CSSProperties) => {
  if (!ruleset) return ''

  let rs = ruleset
  let empty = true
  let forceRuleNames: string[] = null
  for (const p in ruleset) {
    if (!p.startsWith(forceRuleName)) {
      empty = false
      continue
    }
    if (rs === ruleset) {
      rs = { ...ruleset }
      forceRuleNames = []
    }
    forceRuleNames.push(p.substr(forceRuleName.length))
    delete rs[p]
  }

  let classNames = ''
  if (!empty) {
    const classNamesEx = renderer.renderRuleEx(rs)
    classNames = classNamesEx.join(' ')
  }

  const res = classNames + (forceRuleNames ? ' ' + forceRuleNames.join(' ') : '')

  return res
}

const forceRuleName = 'NAME$'

let renderer: IRendererEx
//initFela$Web()

const Fela = {
  dataTrace, initFela$Web,
  rulesetToClassNames, rulesetsToClassNames, keyFrameToClassNames, rulesetToClassNamesMUI,
  getRenderer: () => renderer
}

export default Fela

declare module 'reactxx-typings' {

  namespace TVariants {
    interface Platform {
      renderer?: IRendererEx
    }
  }
}
