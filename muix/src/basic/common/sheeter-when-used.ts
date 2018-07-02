import { filterRulesetNames, AddInRulesetFilter } from './sheeter'

export const rulesetFilter: AddInRulesetFilter = ({ addInSheet, usedRulesetNames }) => filterRulesetNames(addInSheet).filter(key => usedRulesetNames[key]).map(key => addInSheet[key])


