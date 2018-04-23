import { Dimensions } from 'react-native'

import { deepMerge } from 'reactxx-basic'
import { Breakpoint, RulesetDecoded, refresh, breakpoints } from '../common/media-q2'

export const onSubscribe = (b: Breakpoint, inRuleset: boolean) => b.active = b.value >= Dimensions.get('window').width

export const modifyRuleset = (ruleset: {}, items: RulesetDecoded[]) => {
  if (!items) return ruleset
  const res = { ...ruleset }
  items.forEach(it => {
    if (!it.from.active || it.to.active) return
    deepMerge(res, it.ruleset)
  })
  return res
}

Dimensions.addEventListener('change', arg => {
  const width = Dimensions.get('window').width
  let doRefresh = false
  breakpoints.forEach(b => {
    const newActive = b.value >= width
    if (newActive === b.active) return
    doRefresh = true
    b.active = newActive
  })
  if (doRefresh) refresh()
})