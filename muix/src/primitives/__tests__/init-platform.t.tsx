import React from 'react'

import { initPlatform as initPlatformSheeter } from 'reactxx-styles-test/init-platform.t'
import { initPrimitives$Web } from 'reactxx-primitives'

import { initPrimitives$Native } from 'reactxx-primitives-native'


export { render, dump, doMock } from 'reactxx-styles-test/init-platform.t'

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {
    initPlatformSheeter(isWeb, trace)
    if (isWeb) {
        initPrimitives$Web()
    } else {
        initPrimitives$Native()
    }

}

// function mockComponent(data: string, props, ...children: any[]) {
//         return <div data-type={data.toUpperCase()} {...props} children={children} />
// }




