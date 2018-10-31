import { resetPlatform, platform } from 'reactxx-sheeter'

import { registerWidthsHandler } from './atomize'

export const initGlobals = (force: boolean, initPlatform: () => void) => {
    if (force) resetPlatform()
    if (platform._widths) return
    platform._widths = {
        callbacks: [],
        activeWidthsProvider: null,
        timer: 0,
        widthDir: {}
    }
    registerWidthsHandler()
    initPlatform()
}
