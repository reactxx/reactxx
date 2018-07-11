import { filterRulesetNames, RulesetPatchGetter } from 'reactxx-sheeter'

export const whenUsedRulesetFilter: RulesetPatchGetter = ({ addInSheet, usedRulesetNames }) => filterRulesetNames(addInSheet).filter(key => usedRulesetNames[key]).map(key => addInSheet[key])


