import { BreakPoint, ComponentsMediaQLow, breaks } from '../common/media-q'
import { TMediaQ } from 'reactxx'
import { deepMerges } from 'reactxx-basic'
import warning from 'warning'
import { Dimensions } from 'react-native'
import { TAddInConfig } from 'typescript-config'

export class ComponentsMediaQ<TState extends string = string> extends ComponentsMediaQLow<TState> implements TMediaQ.ComponentsMediaQ<TState>{

  private breaks: boolean[] = []
  
  close() {
    super.close()
    for (const idx in this.breaks) this.unSubscribe(parseInt(idx), this.componentId)
    this.breaks = []
  }

  processRuleset(ruleset: TAddInConfig.RulesetWithAddIn) {
    const { $mediaq } = ruleset
    if (!$mediaq) return ruleset
    const { componentId, breaks, component } = this
    const patches: TAddInConfig.RulesetWithAddIn[] = []
    const width = this.getWindowWidth()
    for (const p in $mediaq) {
      const interval = p.split('-').map((i, idx) => !i ? (idx == 0 ? 0 : TMediaQ.Consts.maxBreakpoint) : parseInt(i))
      warning(interval.length == 2, `E.g. '-480' or '480-1024' or '1024-' expected, ${p} found`)
      breaks[interval[0]] = true; breaks[interval[1]] = true
      if (width >= interval[0] && width < interval[1]) patches.push($mediaq[p])
    }
    //subscribe for watching changes
    for (const idx in breaks) this.subscribe(parseInt(idx), componentId, component)
    if (patches.length === 0) return ruleset
    //merge
    return deepMerges(true, {}, ruleset, ...patches)
  }

  createBreakPoint(breakPoint: number) { return new BreakPointNative(breakPoint) }

  getWindowWidth() { return Dimensions.get('window').width}

}

Dimensions.addEventListener('change', arg => breaks.forEach(br => br.notify()))

export class BreakPointNative extends BreakPoint {
  constructor(breakPoint: number) {
    super(breakPoint)
  }
}
