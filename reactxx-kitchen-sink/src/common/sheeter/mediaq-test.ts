import { TSheeter, mergeSheets, toPatchableAndMergeable, mergeRulesetsForCode, mediaqFinishAddInCreator, mediaqRulesetPatchGetterCreator, whenUsedRulesetFilter } from 'reactxx-sheeter'

//****************************
// CODE

export const test = () => {

  const finishAddIns: TSheeter.FinishAddIns = {
    $mediaq: mediaqFinishAddInCreator()
  }
  const addInRulesetFilters: TSheeter.RulesetPatchGetters = {
    $mediaq: mediaqRulesetPatchGetterCreator(400),
    $whenUsed: whenUsedRulesetFilter
  }
  const patchable = toPatchableAndMergeable(root)

  window.isWeb = true
  const mergedWeb = mergeSheets(patchable, [], finishAddIns)
  const codeRootWeb = mergeRulesetsForCode(mergedWeb, addInRulesetFilters, [mergedWeb.root])

  window.isWeb = false
  const mergedNative = mergeSheets(patchable, [], finishAddIns)
  const codeRootNative = mergeRulesetsForCode(mergedNative, addInRulesetFilters, [mergedNative.root])

  debugger
}

const root: TSheeter.Sheet = {
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
