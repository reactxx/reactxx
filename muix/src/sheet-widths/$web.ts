import { onWidthChanged, resetCallback } from './utils/subscribe'
import { resetProvider } from './utils/provider'

import { platform as p } from 'reactxx-sheeter'
import { PlatformWidth } from './variants'
const platform = p as PlatformWidth

platform.actWidth = () => window.innerWidth

platform.addBreakpoint = (width: number) => {
  if (!width || widthDir[width]) return
  widthDir[width] = true
  const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
  mediaQuery.addListener(onChange)
}
const onChange = () => {
  if (timer) return
  timer = window.setTimeout(() => {
    timer = 0
    onWidthChanged()
  }, 1)
}

platform.resetWidths = () => { // for jest test reset
  widthDir = {}
  resetCallback()
  resetProvider()
}

let timer: number
let widthDir: { [width: number]: true } = {}

export let $webFake