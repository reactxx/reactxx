export { default as useSheeter, useSheeterUntyped } from './hooks/use-sheeter'
export { ThemeProvider, useTheme } from './hooks/use-theme'
export * from './utils/get-component-creator'
export * from './utils/from-engine'
export { TComponents } from './typings/components'
export { TUseSheeter } from './typings/use-sheeter'

import { platform } from 'reactxx-sheeter'
import { createElement } from './$web'

import { initGlobals } from './utils/globals'

export const initUse$Web = (force?: boolean) => initGlobals(force, () => platform.createElement = createElement)
export const initUse = initUse$Web

