import { BreakPoint } from '../common/media-q'

class BreakPointWeb extends BreakPoint {
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

export const createBreakPoint = (breakPoint: number) => new BreakPointWeb(breakPoint)

export const getWindowWidth = () => window.innerWidth