import { TFinishAddIns, TSheet, AddInRulesetFilters, mergeSheets, toPatchableAndMergeable, mergeRulesetsForCode, nameRulesets } from './sheeter'
import { finishAddInCreator, rulesetFilterCreator } from './sheeter-mediaq'
import { rulesetFilter } from './sheeter-when-used'

//****************************
// CODE

export const test = () => {

  debugger

  const finishAddIns: TFinishAddIns = {
    $mediaq: finishAddInCreator()
  }
  const addInRulesetFilters: AddInRulesetFilters = {
    $mediaq: rulesetFilterCreator(400),
    $whenUsed: rulesetFilter
  }
  const patchable = toPatchableAndMergeable(root)

  nameRulesets(patchable)

  window.isWeb = true
  const mergedWeb = mergeSheets(patchable, [], finishAddIns, false)
  const codeRootWeb = mergeRulesetsForCode(mergedWeb, addInRulesetFilters, [mergedWeb.root])

  window.isWeb = false
  const mergedNative = mergeSheets(patchable, [], finishAddIns, false)
  const codeRootNative = mergeRulesetsForCode(mergedNative, addInRulesetFilters, [mergedNative.root])
}

const root: TSheet = {
  root: {
    a1:1,
    $mediaq: {
      '-320': {
        a2: 1,
      },
      '320-640': {
        a3: 1,
      },
      '640-': {
        a4: 1,
      },
    }
  }
}
