export { default as useSheeter, useSheeterUntyped } from './hooks/use-sheeter'
export { ThemeProvider, useTheme } from './hooks/use-theme'
export * from './utils/get-component-creator'

import { platform, resetPlatform } from 'reactxx-sheeter'

export const initUse = (force?: boolean) => {
    if (force) resetPlatform()
    if (platform._useSheeter) return
    platform._useSheeter = {
        $cache: {},
        defaultTheme: platform.getDefaultTheme && platform.getDefaultTheme(),
        uniqueIdCounter: 0,
        idCounter: 0,
    }
}



