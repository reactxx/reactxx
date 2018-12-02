﻿export { default as useSheeter } from './hooks/use-sheeter'
export { ThemeProvider, useTheme } from './hooks/use-theme'
export * from './utils/get-component-creator'

import { platform } from 'reactxx-sheeter'
import { createElement } from './$web'

import { initGlobals } from './utils/globals'

export const initUse$Web = (force?: boolean) => initGlobals(force, () => platform.createElement = createElement)
export const initUse = initUse$Web

