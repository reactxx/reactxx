import { onWidthChanged } from './utils/subscribe'

export const actWidth = () => window.innerWidth

export const addBreakpoint = (width: number) => {
  if (!width || widthDir[width]) return
  widthDir[width] = true
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
let widthDir: { [width: number]: true }
