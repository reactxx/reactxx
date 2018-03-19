import { BreakPoint, ComponentsMediaQLow } from '../common/media-q'
import { deepMerges } from 'reactxx'
import warning from 'warning'
import { MediaQ } from 'reactxx-typings'

export class ComponentsMediaQ<TState extends string = string> extends ComponentsMediaQLow<TState> implements MediaQ.ComponentsMediaQ<TState>{

  processRuleset(ruleset: ReactXX.RulesetWithAddIn) {
    const { $mediaq } = ruleset
    if (!$mediaq) return ruleset
    const { componentId, component } = this
    let patches: MediaQ.Patch[] = []
    const width = this.getWindowWidth()
    for (const p in $mediaq) {
      const interval = p.split('-').map((i, idx) => !i ? (idx == 0 ? 0 : MediaQ.Consts.maxBreakpoint) : parseInt(i))
      warning(interval.length == 2, `E.g. '-480' or '480-1024' or '1024-' expected, ${p} found`)
      patches.push({ start: interval[0], end: interval[1], ruleset: $mediaq[p] })
    }
    //no subscribe for web platform (media query CSS is used)
    if (patches.length === 0) return ruleset
    //for web: modify add media query ruleset selector
    patches = addMediaQuerySelector(patches)
    //merge
    return deepMerges(true, {}, ruleset, ...patches)
  }

  createBreakPoint(breakPoint: number) { return new BreakPointWeb(breakPoint) }
  getWindowWidth() { return window.innerWidth }
}


export class BreakPointWeb extends BreakPoint {
  constructor(breakPoint: number) {
    super(breakPoint)
    this.mediaQuery = window.matchMedia(`(min-width: ${breakPoint}px)`)
    this.active = this.mediaQuery.matches
    const onChange = (q: MediaQueryList) => {
      this.active = q.matches
      this.notify()
    }
    this.mediaQuery.addListener(onChange)
  }
  private mediaQuery: MediaQueryList
}

const addMediaQuerySelector = (patchs: MediaQ.Patch[]) => patchs.map(p => ({ [intervalToSelector(p.start, p.end)]: p.ruleset } as any))

const intervalToSelector = (start: number, end: number) => {
  if (start === 0) return `@media (max-width: ${end-1}px)`
  if (end === MediaQ.Consts.maxBreakpoint) return `@media (min-width: ${start}px)`
  return `@media (min-width: ${start}px) and (max-width: ${end - 1}px)`
}