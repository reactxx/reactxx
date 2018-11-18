import { render, cleanup } from 'react-testing-library'

export const mount = comp => render(comp).container

import { initSheeter$Web, resetPlatform } from 'reactxx-sheeter'
import { initSheeter$Native } from 'reactxx-sheeter-native'

export const initPlatform = (isWeb: boolean, __DEV__: boolean | 1 | 2 | 3 | 4 | 5 = true) => {

    afterEach(cleanup)

    window.isWeb = isWeb
    if (typeof __DEV__ === 'number') {
        window.__TRACE__ = true
        window.__TRACELEVEL__ = __DEV__
    } else
        window.__TRACE__ = __DEV__

    resetPlatform()
    if (isWeb) {
        initSheeter$Web()
    } else {
        initSheeter$Native()
    }
}