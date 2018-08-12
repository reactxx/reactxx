import { rulesetsToClassNames } from 'reactxx-primitives'
import { deepMerges } from 'reactxx-sheeter'

export const mergeRulesets = (...rulesets: React.CSSProperties[]) => {
  if (!rulesets || (rulesets = rulesets.filter(r => !!r)).length === 0) return null
  const merged = rulesets.length===1 ? rulesets[0] : deepMerges({}, rulesets)
  return deepMerges ? rulesetsToClassNames(merged) : merged
}

