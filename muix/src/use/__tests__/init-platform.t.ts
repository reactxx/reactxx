import { initPlatform as initPlatformSheeter } from 'reactxx-sheeter-test/init-platform.t'

import { initUse$Web } from 'reactxx-use'
import { initUse$Native } from 'reactxx-use-native'

export { render, dump } from 'reactxx-sheeter-test/init-platform.t'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    if (isWeb) {
        initUse$Web()
    } else {
        initUse$Native()
    }
}


