import * as Sheeter from 'reactxx-sheeter'

//****************************
// CODE

export const test = () => {

  const finishAddIns: Sheeter.FinishAddIns = {
    $animations: Sheeter.animationFinishAddInClasses
  }
  const rulesetPatchGetters: Sheeter.RulesetPatchGetters = {
  }
  const patchable = Sheeter.toPatchableAndMergeable(root)

  window.isWeb = true
  const mergedWeb = Sheeter.mergeSheetsAndFinish(patchable, [], finishAddIns)
  console.log(JSON.stringify(mergedWeb, null, 2))
  //const codeRootWeb = Sheeter.mergeRulesetsForCode(mergedWeb, rulesetPatchGetters, [mergedWeb.root])

  window.isWeb = false
  const mergedNative = Sheeter.mergeSheetsAndFinish(patchable, [], finishAddIns)
  console.log(JSON.stringify(mergedNative, null, 2))
  //const codeRootNative = Sheeter.mergeRulesetsForCode(mergedNative, rulesetPatchGetters, [mergedNative.root])

  debugger
}

const root: Sheeter.Sheet = {
  $animations: {
    anim: {
      rootAnim: {
        opacity: [0.2, 1, '-30'] // means 0%-30% of $duration
      },
      labelAnim: {
        transform: {
          scale: [1, 0],
          rotate: ['0deg', '180deg'],
          time: '40-' // means 40%-100% of $duration
        },
      },
      $duration: 2000,
      //$easing: '',
      //$delay: 500,
      $opened: true,
    },
  }
}
