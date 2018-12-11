import { platform, resetPlatform } from 'reactxx-sheeter'

export const initGlobals = (force: boolean) => { //, platformDependentInit: () => void) => {
    if (force) resetPlatform()
    if (platform._useSheeter) return
    platform._useSheeter = {
        $cache: {},
        defaultTheme: platform.getDefaultTheme && platform.getDefaultTheme(),
        uniqueIdCounter: 0,
        idCounter: 0,
    }
    //platformDependentInit()
}

