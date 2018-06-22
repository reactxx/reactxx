import { mergeRulesetsParts } from 'reactxx-basic'
import { TMediaQ, refresh } from '../common/media-q'

export const onSubscribe = (b: TMediaQ.Breakpoint, inRuleset: boolean) => {
  const mediaQuery = window.matchMedia(`(min-width: ${b.value}px)`)
  b.active = mediaQuery.matches
  //console.log('onSubscribe: ', b)
  const onChange = (q: MediaQueryList) => {
    b.active = q.matches
    //console.log('onChange: ', b)
    if (!timer) timer = window.setTimeout(() => {
      timer = 0
      refresh()
    }, 1)
  }
  mediaQuery.addListener(onChange)
}

export const modifyRuleset = (ruleset: {}, items: TMediaQ.RulesetDecoded[]) => {
  if (!items) return ruleset
  //const res = {...ruleset}
  const res = {}
  items.forEach(it => res[intervalToSelector(it.from.value, it.to.value)] = mergeRulesetsParts(it.ruleset.data))
  return res
}

let timer = 0

const intervalToSelector = (start: number, end: number) => {
  if (start === 0) return `@media (max-width: ${end - 1}px)`
  if (end === TMediaQ.Consts.maxBreakpoint) return `@media (min-width: ${start}px)`
  return `@media (min-width: ${start}px) and (max-width: ${end - 1}px)`
}
