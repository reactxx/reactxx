export * from './conditions/index'
export * from './utils/deep-merge'
export * from './globals'
export * from './conditions'
export * from './merge'
export * from './utils/wrap-pseudo-prefixes'

import { init } from './$native'
import { initGlobals } from './globals'

export const initSheeter$Native = (force?:boolean) => initGlobals(force, init)
export const initSheeter = initSheeter$Native

export {atomizeSheet, atomizeRuleset, atomizeStyle} from './atomize'
export {toClassNamesWithQuery} from './to-classnames'
export {adjustAtomizedLow} from './atomize-low'

initSheeter()
