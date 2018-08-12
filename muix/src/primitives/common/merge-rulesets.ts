import { rulesetsToClassNames } from 'reactxx-primitives'
import { deepMerges } from 'reactxx-sheeter'

export const mergeRulesets = (...rulesets: React.CSSProperties[]) => {
  if (!rulesets || (rulesets = rulesets.filter(r => !!r)).length === 0) return null
  return rulesets.length===1 ? rulesets[0] : deepMerges({}, rulesets)
}

export const mergeRulesetsStr = (...rulesets: React.CSSProperties[]) => {
  const merged = mergeRulesets(...rulesets)
  return rulesetsToClassNames ? rulesetsToClassNames(merged) : merged
}

