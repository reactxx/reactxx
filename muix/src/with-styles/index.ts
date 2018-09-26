export * from './global-state'
export * from './pipe-first'
export * from './pipe-last'
export * from './with-styles'

import { initGlobalState } from './with-styles'

export const initWithStyles = () => initGlobalState()