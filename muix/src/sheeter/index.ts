export { default as useSheeter } from './hooks/use-sheeter'
export { ThemeProvider, useTheme } from './hooks/use-theme'
export * from './utils/get-component-creator'
export * from './utils/typed'

import { platform } from 'reactxx-styler'
import { createElement } from './$web'

import { initGlobals } from './utils/globals'

export const initUse$Web = (force?: boolean) => initGlobals(force, () => platform.createElement = createElement)
export const initUse = initUse$Web

