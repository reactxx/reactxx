import warning from 'warning'

export class ComponentsMediaQ {
  constructor(private component: React.Component) { }
  id = ComponentsMediaCount++
  breaks: boolean[] = []

  unsubscribe() {
    for (const idx in this.breaks) unSubscribe(parseInt(idx), this.id)
    this.breaks = []
  }

  processRuleset(ruleset) {
    const { $media } = ruleset
    const { id, breaks, component } = this
    if (!$media) return ruleset
    const patches = []
    const width = window.innerWidth
    for (const p in $media) {
      const interval = p.split('-').map((i, idx) => !i ? (idx == 0 ? 0 : maxInt) : parseInt(i))
      warning(interval.length == 2, `'-480' or '480-1024' or '1024-' expected, ${p} found`)
      breaks[interval[0]] = true; breaks[interval[1]] = true
      if (interval[0] <= width && interval[1] < width) patches.push($media[p])
    }
    for (const idx in breaks) subscribe(parseInt(idx), id, component)
    if (patches.length === 0) return ruleset
    return Object.assign({}, ruleset, ...patches)
  }

  static count = 0
}

class BreakPoint {
  constructor(breakPoint: number) { }
  subscribers: React.Component[] = []
  notify() {
    const { subscribers } = this
    for (const p in subscribers) subscribers[p].forceUpdate()
  }
}

const breaks: BreakPoint[] = []

const subscribe = (breakPoint: number, id: number, component: React.Component) => {
  let actBreak = breaks[breakPoint]
  if (!actBreak) actBreak = breaks[breakPoint] = new BreakPoint(breakPoint)
  actBreak.subscribers[id] = component
}
const unSubscribe = (breakPoint: number, id: number) => {
  delete breaks[breakPoint].subscribers[id]
}

const maxInt = 1000000
let ComponentsMediaCount = 0