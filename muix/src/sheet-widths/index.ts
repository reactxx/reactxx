export * from './utils/pipe'
export * from './utils/atomize'
export * from './utils/provider'
export * from './variants'
export { onWidthChanged } from './utils/subscribe'

import { init } from './$web'
import { initGlobals } from './utils/globals'

export const initWidths = (force?: boolean) => initGlobals(force, init)
export const initWidths$Web = initWidths

initWidths()