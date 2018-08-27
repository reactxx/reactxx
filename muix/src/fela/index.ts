import React from 'react';
import { createRenderer, IRenderer } from 'fela';
import { render } from 'fela-dom';
import pluginExtend from 'fela-plugin-extend';
import pluginFallbackValue from 'fela-plugin-fallback-value';
import pluginLvha from 'fela-plugin-lvha';
import pluginPrefixer from 'fela-plugin-prefixer';
import pluginUnit from 'fela-plugin-unit';


const plugins = {
  plugins: [
    pluginUnit('px'),
    pluginExtend(),
    pluginPrefixer(),
    pluginFallbackValue(),
    pluginLvha(),
    //pluginRtl(),
  ]
}

export const renderer = createRenderer(plugins)

renderer.renderStatic({ //http://book.mixu.net/css/5-tricks.html
  height: '100%',
  width: '100%',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
}, 'html, body, #root')
renderer.renderStatic({ fontFamily: 'Roboto' }, 'body')
renderer.renderStatic({ boxSizing: 'border-box' }, '*')
renderer.renderStatic({ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }, '#root')

render(renderer)


//Converts ruleset to blank delimited atomic classes
export const rulesetToClassNames = (ruleset: React.CSSProperties) => ruleset ? renderer.renderRule(() => ruleset, {}) : ''
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

  const res = (empty ? '' : renderer.renderRule(() => rs, {})) + (forceRuleNames ? ' ' + forceRuleNames.join(' ') : '')

  return res
}

const forceRuleName = 'NAME$'