import { platform } from 'reactxx-sheeter'
import { PlatformWidth } from './variants'

import { onWidthChanged, resetCallback } from './utils/subscribe'

const pl = platform as PlatformWidth

pl.actWidth = () => window.innerWidth

pl.addBreakpoint = (width: number) => {
  if (!width || widthDir[width]) return
  widthDir[width] = true
  const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
  const onChange = (q) => {
    if (!timer) timer = window.setTimeout(() => {
      timer = 0
      onWidthChanged(pl.actWidth())
    }, 1)
  }
  mediaQuery.addListener(onChange)
}

pl.resetWidths = () => { // for jest test reset
  widthDir = {} 
  resetCallback()
}

let timer: number
let widthDir: { [width: number]: true } = {}

export let $webFake