import { createRenderer, combineRules } from 'fela'
import { render } from 'fela-dom'
import pluginExtend from 'fela-plugin-extend'
import pluginPrefixer from 'fela-plugin-prefixer'
import pluginFallbackValue from 'fela-plugin-fallback-value'
import pluginLvha from 'fela-plugin-lvha'
import pluginUnit from 'fela-plugin-unit'
import pluginRtl from 'fela-plugin-rtl'

const plugins = {
  plugins: [
    pluginUnit('px'),
    pluginExtend(),
    pluginPrefixer(),
    pluginFallbackValue(),
    pluginLvha(),
    pluginRtl(),
  ]
}

const renderer = createRenderer(plugins)
render(renderer)

//Converts ruleset to blank delimited atomic classes
export const rulesetToClassNames = (ruleset: React.CSSProperties) => ruleset ? renderer.renderRule(() => ruleset, {}) : ''
export const rulesetsToClassNames = (...rulesets: React.CSSProperties[]) => {
  if (!rulesets) return ''
  rulesets = rulesets.filter(r => !!r)
  if (rulesets.length == 1) return rulesetToClassNames(rulesets[0])
  return rulesetToClassNames(Object.assign({}, ...rulesets))
}


//Converts sheet to named atomic classes
export const sheetToClassSheet = <TKey extends string>(sheet: Partial<Record<TKey, React.CSSProperties>>) => {
  if (!sheet) return null
  const res: Partial<Record<TKey, string>> = {}
  for (const p in sheet) res[p] = rulesetToClassNames(sheet[p])
  return res
}

