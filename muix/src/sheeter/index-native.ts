export * from './utils/deep-merge'
export * from './atomize'
export * from './globals'
export * from './atomize-low'
export * from './conditions'
export * from './merge'
export * from './to-classnames'
export * from './utils/wrap-pseudo-prefixes'

import { init } from './$native'
import { initGlobals } from './globals'

export const initSheeter$Native = (force?:boolean) => initGlobals(force, init)
export const initSheeter = initSheeter$Native

initSheeter()
