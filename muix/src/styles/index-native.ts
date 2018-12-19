export * from './queryable/index'
export * from './utils/deep-merge'
export * from './utils/globals'
export * from './utils/merge'
export * from './utils/wrap-pseudo-prefixes'
export * from './utils/get-component'

export { useStyles, useStylesUntyped } from './hooks/use-styles'
export { ThemeProvider, useTheme } from './hooks/use-theme'
export { useDefaults } from './hooks/use-defaults'
export { useProps } from './hooks/use-props'

export { atomizeSheet, atomizeRuleset, atomizeStyle } from './utils/atomize'
export { toClassNamesWithQuery, toClassNames } from './utils/to-classnames'
export { adjustAtomizedLow, isToAtomizeArray } from './utils/atomize-low'
export { getTypedEngine } from './utils/get-engine'

export { View, Text, Image, ScrollView } from './$native'

import { init } from './$native'
import { initGlobals } from './utils/globals'

export const initSheeter$Native = (trace: Trace = {}, force?: boolean) => {
    window.isWeb = false
    initGlobals(trace, force, init)
}
export const initSheeter = initSheeter$Native
