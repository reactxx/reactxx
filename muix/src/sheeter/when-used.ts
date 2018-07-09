import { filterRulesetNames, RulesetPatchGetter } from './index'

export const whenUsedRulesetFilter: RulesetPatchGetter = ({ addInSheet, usedRulesetNames }) => filterRulesetNames(addInSheet).filter(key => usedRulesetNames[key]).map(key => addInSheet[key])


