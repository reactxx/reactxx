import { initPlatform as initPlatformSheeter } from 'reactxx-sheeter-test/init-platform.t'
import { initUseSheeter } from 'reactxx-use'

export { render, dump } from 'reactxx-sheeter-test/init-platform.t'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    initUseSheeter()
}


