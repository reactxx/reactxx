export * from './with-styles'

export { ThemeProviderGeneric, registerTheme, defaultThemeName } from './pipes/pipe-theme'

import { platform, resetPlatform } from 'reactxx-styler'
import { defaultThemeName } from './pipes/pipe-theme'

export const initWithStyles = (force?: boolean) => {
    if (force) resetPlatform()
    if (platform._withStyles) return
    platform._withStyles = {
        $cache: {},
        namedThemes: {}
    }
    if (platform.getDefaultTheme)
        platform._withStyles.namedThemes[defaultThemeName] = platform.getDefaultTheme()
}
