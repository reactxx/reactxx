import { initPlatform as initPlatformSheeter } from 'reactxx-sheeter-test/init-platform.t'

// import { initUse$Web } from 'reactxx-use-sheeter'
// import { initUse$Native } from 'reactxx-use-sheeter-native'
import { initUse } from 'reactxx-use-sheeter'

export { render, dump } from 'reactxx-sheeter-test/init-platform.t'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    initUse()
    // if (isWeb) {
    //     initUse$Web()
    // } else {
    //     initUse$Native()
    // }
}


