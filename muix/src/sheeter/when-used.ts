import { filterRulesetNames, TSheeter } from './index'

export const whenUsedRulesetFilter: TSheeter.RulesetPatchGetter = ({ addInSheet, usedRulesetNames }) => filterRulesetNames(addInSheet).filter(key => usedRulesetNames[key]).map(key => addInSheet[key])


