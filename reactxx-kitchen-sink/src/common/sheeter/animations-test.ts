
import * as Sheeter from 'reactxx-sheeter'

//****************************
// CODE

export const test = () => {

  const finishAddIns: Sheeter.FinishAddIns = {
  }
  const addInRulesetFilters: Sheeter.RulesetPatchGetters = {
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
    $animation: {
      rootAnim: {
        opacity: [0.2, 1, '-35'] // means 0%-35% of $duration
      },
      labelAnim: {
        transform: [
          { scale: [1, 0] },
          { rotate: ['0deg', '180deg'] },
          '35-' // means 35%-100% of $duration
        ],
      },
      $duration: 2000
    }
  }
}
