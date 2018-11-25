import { initPlatform as initPlatformSheeter } from 'reactxx-sheeter-test/init-platform'
import { initUseSheeter } from 'reactxx-use'

export { render, dump } from 'reactxx-sheeter-test/init-platform'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    initUseSheeter()
}


