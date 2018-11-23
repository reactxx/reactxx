export * from './conditions/index'
export * from './utils/deep-merge'
export * from './utils/globals'
export * from './utils/use-force-update'
export * from './utils/use-unique-id'
export * from './utils/merge'
export * from './utils/wrap-pseudo-prefixes'

import { init } from './$native'
import { initGlobals } from './utils/globals'

export const initSheeter$Native = (force?:boolean) => initGlobals(force, init)
export const initSheeter = initSheeter$Native

export {atomizeSheet, atomizeRuleset, atomizeStyle} from './utils/atomize'
export {toClassNamesWithQuery} from './utils/to-classnames'
export {adjustAtomizedLow} from './utils/atomize-low'

initSheeter()
