export { default as useSheeter } from './hooks/use-sheeter'
export { ThemeProvider, useTheme } from './hooks/use-theme'
export * from './utils/get-component-creator'

import { platform, resetPlatform } from 'reactxx-sheeter'

export const initUseSheeter = (force?: boolean) => {
    if (force) resetPlatform()
    if (platform._withStyles) return
    platform._withStyles = {
        $cache: {},
        defaultTheme: platform.getDefaultTheme && platform.getDefaultTheme(),
        uniqueIdCounter: 0,
        idCounter: 0,
    }
}
