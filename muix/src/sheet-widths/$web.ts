import { maxBreakpoint } from './utils/parser'
import { onWidthChanged } from './utils/subscribe'

export const actWidth = () => window.innerWidth

export const addBreakpoint = (width: number) => {
  if (!width || width === maxBreakpoint || widthDir[width]) return
  widthDir[width] = true
  //widths.push(width)
  const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
  const onChange = (q) => {
    if (!timer) timer = window.setTimeout(() => {
      timer = 0
      onWidthChanged(actWidth())
    }, 1)
  }
  mediaQuery.addListener(onChange)
}
let timer: number
//let widths: number[]
let widthDir: { [width: number]: true }
