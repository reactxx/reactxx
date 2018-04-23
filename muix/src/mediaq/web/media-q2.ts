import { Breakpoint, refresh, RulesetCodeItem, Consts } from '../common/media-q2'

export const onSubscribe = (b: Breakpoint, inRuleset: boolean) => {
  if (inRuleset) return // generate FELA media query ruleset
  const mediaQuery = window.matchMedia(`(min-width: ${b.value}px)`)
  b.active = mediaQuery.matches
  const onChange = (q: MediaQueryList) => {
    b.active = q.matches
    if (!timer) timer = window.setTimeout(() => {
      timer = 0
      refresh()
    }, 1)
  }
  mediaQuery.addListener(onChange)
}

export const modifyRuleset = (ruleset: {}, items: RulesetCodeItem[]) => {
  if (!items) return ruleset
  const res = {...ruleset}
  items.forEach(it => res[intervalToSelector(it.from.value, it.to.value)] = it.ruleset)
  return res
}

let timer = 0

const intervalToSelector = (start: number, end: number) => {
  if (start === 0) return `@media (max-width: ${end - 1}px)`
  if (end === Consts.maxBreakpoint) return `@media (min-width: ${start}px)`
  return `@media (min-width: ${start}px) and (max-width: ${end - 1}px)`
}
