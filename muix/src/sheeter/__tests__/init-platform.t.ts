import { initPlatform as initPlatformSheeter } from 'reactxx-styler-test/init-platform.t'

import { initUse$Web } from 'reactxx-sheeter'
import { initUse$Native } from 'reactxx-sheeter-native'

export { render, dump } from 'reactxx-styler-test/init-platform.t'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    if (isWeb) {
        initUse$Web()
    } else {
        initUse$Native()
    }
}


