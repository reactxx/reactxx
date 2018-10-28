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

import { platform } from 'reactxx-sheeter'

import { platform as platformNative } from 'reactxx-sheeter-native'

import { resetRenderer } from "reactxx-fela"
import { resetTheme } from 'reactxx-with-styles'

import 'reactxx-sheet-widths'

let platformWeb

export const initPlatform = (isWeb: boolean, __DEV__: boolean | 1 | 2 | 3 | 4 | 5 = true) => {
    if (!platformWeb)
        platformWeb = { ...platform }
    window.isWeb = isWeb
    if (typeof __DEV__ === 'number') {
        window.__TRACE__ = true
        window.__TRACELEVEL__ = __DEV__
    } else
        window.__TRACE__ = __DEV__

    Object.assign(platform, isWeb ? platformWeb : platformNative)

    if (isWeb)
        resetRenderer()
    resetTheme();
    platform.resetWidths()
}
