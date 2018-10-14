import React from 'react'
import { createRenderer, IRenderer } from 'fela'
import { render } from 'fela-dom'
import pluginExtend from 'fela-plugin-extend'
import pluginFallbackValue from 'fela-plugin-fallback-value'
//import pluginLvha from 'fela-plugin-lvha'
import pluginPrefixer from 'fela-plugin-prefixer'
import pluginUnit from 'fela-plugin-unit'

import patch, { IRendererEx } from './patch';
import { TAtomize } from 'reactxx-typings';

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

export { IRendererEx }

export const resetRenderer = () => { renderer = patch(createRenderer(plugins)) }

//export const rendererCreate = () => patch(createRenderer(plugins))

export let renderer: IRendererEx // = rendererCreate()
resetRenderer()

export const getRenderer = () => renderer

export const dumpAtomized = (classNames: TAtomize.AtomicWebs) => {
  const res = {};
  if (window.__DEV__) {
    /*
"{
  "type": "RULE",
  "className": "a",
  "selector": ".a",
  "declaration": "color:red",
  "pseudo": "",
  "media": "",
  "support": "",
  "path": "root"
}"    
     */
    classNames.forEach((c: TAtomize.__dev_AtomicWeb) => {
      const {className, selector, declaration, path, media, support} = c 
      res[`${support ? '@support' + support : ''}${media ? '@media ' + media : ''}${selector}`] = `${declaration} /* ${path} */`
    });
  } else {
    res['info'] = 'DUMP is available in window.__DEV__ only'
  }
  return res
}

// renderer.renderStatic({ //http://book.mixu.net/css/5-tricks.html
//   height: '100%',
//   width: '100%',
//   margin: 0,
//   padding: 0,
//   overflow: 'hidden',
// }, 'html, body, #root')
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

//Converts ruleset to blank delimited atomic classes
export const rulesetToClassNames = (ruleset: React.CSSProperties) => {
  return ruleset ? renderer.renderRule(() => ruleset, {}) : ''
}
export const rulesetsToClassNames = (...rulesets: React.CSSProperties[]) => {
  if (!rulesets) return ''
  rulesets = rulesets.filter(r => !!r)
  let res: string
  if (rulesets.length == 1) res = rulesetToClassNames(rulesets[0])
  else res = rulesetToClassNames(Object.assign({}, ...rulesets))
  return res
}
export const keyFrameToClassNames = (keyFrame: React.CSSProperties) => keyFrame ? renderer.renderKeyframe(() => keyFrame, {}) : ''

export const rulesetToClassNamesMUI = (ruleset: React.CSSProperties) => {
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
  // const res1 = (empty ? '' : renderer.renderRule(() => rs, {})) + (forceRuleNames ? ' ' + forceRuleNames.join(' ') : '')
  // if (res1 !== res)
  //   debugger

  return res
}

const forceRuleName = 'NAME$'

