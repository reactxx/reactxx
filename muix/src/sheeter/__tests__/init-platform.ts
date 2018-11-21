import { cleanup, render } from 'react-testing-library'
import { TAtomize } from 'reactxx-typings'

export const mount = comp => render(comp)

import { initSheeter$Web, resetPlatform, platform } from 'reactxx-sheeter'
import { initSheeter$Native } from 'reactxx-sheeter-native'

export const initPlatform = (isWeb: boolean, __DEV__: boolean = true) => {

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

export const dump = (ruleset: TAtomize.Ruleset) => {
    expect(ruleset).toMatchSnapshot()
    const won = platform.applyLastwinsStrategy(ruleset)
    expect(won).toMatchSnapshot()
    expect(platform.finalizeClassName(won)).toMatchSnapshot()
}
