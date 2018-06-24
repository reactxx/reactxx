import { Dimensions } from 'react-native'

import { deepMerge } from 'reactxx-basic'
import { TMediaQ, refresh, mediaQBreaks } from '../common/media-q'

export const onSubscribe = (b: TMediaQ.Breakpoint, inRuleset: boolean) => {
  b.active = (b.value <= Dimensions.get('window').width)
}

export const modifyRuleset = (items: TMediaQ.RulesetDecoded[]) => {
  if (!items) return null
  //const res = { ...ruleset }
  //const res = { $mediaq: undefined }
  const res = []
  items.forEach(it => {
    if (!it.from.active || it.to.active) return
    Array.prototype.push.apply(res, it.ruleset)
    //deepMerge(res, it.ruleset)
  })
  return res
}

Dimensions.addEventListener('change', arg => {
  const width = Dimensions.get('window').width
  let doRefresh = false
  mediaQBreaks.forEach(b => {
    const newActive = b.value <= width
    if (newActive === b.active) return
    doRefresh = true
    b.active = newActive
  })
  if (doRefresh) refresh()
})