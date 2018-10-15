import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })
process.env.NODE_ENV = 'development'

// Make Enzyme functions available in all test files without importing
export { shallow, mount, render }
export default Enzyme

import { platform } from 'reactxx-sheeter'

import { platform as platformNative } from 'reactxx-sheeter-native'

import { resetRenderer } from "reactxx-fela";

const platformWeb = { ...platform }

export const initPlatform = (isWeb: boolean, __DEV__: boolean = true) => {
    window.isWeb = isWeb
    window.__TRACE__ = __DEV__
    //const p = platform
    Object.assign(platform, isWeb ? platformWeb : platformNative)
    // if (p != platform)
    //     throw 'p!=platform'
    // const _web = platform.toPlatformAtomizeRuleset === platformWeb.toPlatformAtomizeRuleset
    // const _native = platform.toPlatformAtomizeRuleset === platformNative.toPlatformAtomizeRuleset
    if (isWeb)
        resetRenderer();
}
