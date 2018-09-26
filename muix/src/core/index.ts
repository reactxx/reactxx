export * from 'reactxx-sheeter'
export * from 'reactxx-primitives'
export * from 'reactxx-with-styles'

import { initSheeterVariants } from 'reactxx-sheeter-variants'
import { initWithStyles } from 'reactxx-with-styles'

export const initCore = () => {
    if (initCoreCalled) return
    initCoreCalled = true
    initSheeterVariants()
    initWithStyles()
}
let initCoreCalled =false

initCore()
