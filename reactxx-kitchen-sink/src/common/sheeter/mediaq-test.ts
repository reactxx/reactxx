
import * as Sheeter from 'reactxx-sheeter'

//****************************
// CODE

export const test = () => {

  const finishAddIns: Sheeter.FinishAddIns = {
    $mediaq: Sheeter.mediaqFinishAddInCreator()
  }
  const addInRulesetFilters: Sheeter.RulesetPatchGetters = {
    $mediaq: Sheeter.mediaqRulesetPatchGetterCreator(400),
    $whenUsed: Sheeter.whenUsedRulesetFilter
  }
  const patchable = Sheeter.toPatchableAndMergeable(root)

  window.isWeb = true
  const mergedWeb = Sheeter.mergeSheetsAndFinish(patchable, [], finishAddIns)
  const codeRootWeb = Sheeter.mergeRulesetsForCode(mergedWeb, addInRulesetFilters, [mergedWeb.root])

  window.isWeb = false
  const mergedNative = Sheeter.mergeSheetsAndFinish(patchable, [], finishAddIns)
  const codeRootNative = Sheeter.mergeRulesetsForCode(mergedNative, addInRulesetFilters, [mergedNative.root])

  debugger
}

const root: Sheeter.Sheet = {
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
