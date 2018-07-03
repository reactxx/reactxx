import { filterRulesetNames, TSheeter } from './index'

export const whenUsedRulesetFilter: TSheeter.AddInRulesetFilter = ({ addInSheet, usedRulesetNames }) => filterRulesetNames(addInSheet).filter(key => usedRulesetNames[key]).map(key => addInSheet[key])


