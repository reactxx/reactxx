import { initPlatform as initPlatformSheeter } from 'reactxx-sheeter-test/init-platform'
import { initUseReactxx } from 'reactxx-use'

export { mount, dump } from 'reactxx-sheeter-test/init-platform'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    initUseReactxx()
}


