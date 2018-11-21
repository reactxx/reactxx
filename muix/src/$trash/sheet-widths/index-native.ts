export * from './utils/pipe'
export * from './utils/atomize'
export * from './utils/provider'
export * from './variants'

export { onWidthChanged } from './utils/subscribe'

import { init } from './$native'
import { initGlobals } from './utils/globals'

export const initWidths = (force?: boolean) => initGlobals(force, init)
export const initWidths$Native = initWidths

initWidths()