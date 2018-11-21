import { onWidthChanged } from './utils/subscribe'

import { assignPlatform, platform } from 'reactxx-sheeter'

export const init = () => assignPlatform({

  actWidth: () => window.innerWidth,

  addBreakpoint: (width: number) => {
    const {_widths: {widthDir}} = platform
    if (!width || widthDir[width]) return
    widthDir[width] = true
    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`)
    mediaQuery.addListener(onChange)
  },

})

const onChange = () => {
  const {_widths} = platform
  if (_widths.timer) return
  _widths.timer = window.setTimeout(() => {
    _widths.timer = 0
    onWidthChanged()
  }, 1)
}
