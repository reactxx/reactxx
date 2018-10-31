export * from './sheet-helper'
export * from './shape'

import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16.3'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })
process.env.NODE_ENV = 'development'

// Make Enzyme functions available in all test files without importing
export { shallow, mount, render }
export default Enzyme

import { initSheeter$Web, resetPlatform } from 'reactxx-sheeter'
import { initSheeter$Native } from 'reactxx-sheeter-native'

import { initWidths$Web } from 'reactxx-sheet-widths'
import { initWidths$Native } from 'reactxx-sheet-widths-native'

import { initSwitch } from 'reactxx-sheet-switch'

export const initPlatform = (isWeb: boolean, __DEV__: boolean | 1 | 2 | 3 | 4 | 5 = true) => {

    window.isWeb = isWeb
    if (typeof __DEV__ === 'number') {
        window.__TRACE__ = true
        window.__TRACELEVEL__ = __DEV__
    } else
        window.__TRACE__ = __DEV__

    init(isWeb)
}

const init = (isWeb: boolean) => {
    resetPlatform()
    if (isWeb) {
        initSheeter$Web()
        initWidths$Web()
    } else {
        initSheeter$Native()
        initWidths$Native()
    }
    initSwitch()
}
