import { TSheeter, mergeSheets, toPatchableAndMergeable, mergeRulesetsForCode, whenUsedRulesetFilter } from 'reactxx-sheeter'

//****************************
// CODE

export const test = () => {

  const finishAddIns: TSheeter.FinishAddIns = {
  }
  const addInRulesetFilters: TSheeter.RulesetPatchGetters = {
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
