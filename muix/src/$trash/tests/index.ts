export * from './sheet-helper'
export * from './shape'

// error in https://github.com/jsakas/CSSStyleDeclaration/issues/48
import { render, cleanup } from 'react-testing-library'

// import Enzyme, { shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16.3'

// // React 16 Enzyme adapter
// Enzyme.configure({ adapter: new Adapter() })
// process.env.NODE_ENV = 'development'

export const mount = comp => render(comp).container

// Make Enzyme functions available in all test files without importing
export { render }
//export default Enzyme

import { initSheeter$Web, resetPlatform } from 'reactxx-sheeter'
import { initSheeter$Native } from 'reactxx-sheeter-native'

import { initWidths$Web } from 'reactxx-sheet-widths'
import { initWidths$Native } from 'reactxx-sheet-widths-native'

import { initPrimitives$Web } from 'reactxx-primitives'
import { initPrimitives$Native } from 'reactxx-primitives-native'

import { initSwitch } from 'reactxx-sheet-switch'
import { initWithStyles } from 'reactxx-with-styles'

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
        initWidths$Web()
        initPrimitives$Web()
    } else {
        initSheeter$Native()
        initWidths$Native()
        initPrimitives$Native()
    }
    initSwitch()
    initWithStyles()
}

