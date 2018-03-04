import { BreakPoint } from '../common/media-q'

class BreakPointNative extends BreakPoint {
  constructor(breakPoint: number) {
    super(breakPoint)
  }
}


export const createBreakPoint = (breakPoint: number) => new BreakPointNative(breakPoint)

export const getWindowWidth = () => window.innerWidth