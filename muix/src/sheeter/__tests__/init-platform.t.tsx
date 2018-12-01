import React from 'react'

import { cleanup } from 'react-testing-library'
import { TEngine } from 'reactxx-typings'

import { initSheeter$Web, resetPlatform, platform } from 'reactxx-sheeter'
import { initSheeter$Native } from 'reactxx-sheeter-native'

export { render } from 'react-testing-library'
export { theme, Shape } from 'reactxx-typings-test/shape.t'

function mockComponent(data: string) {
    const res: React.SFC<any> = props => {
        const newProps = {}
        for (const p in props)
            if (p === 'style' || p === 'children' || p.startsWith('data-')) newProps[p] = props[p]
            else newProps['data-' + p.toLowerCase()] = props[p]
        //else newProps[p.toLowerCase()] = props[p]
        return <div data-type={data.toUpperCase()} {...newProps} />
    }
    res.displayName = data
    return res
}

jest.mock('@expo/vector-icons', () => ({
    MaterialCommunityIcons: mockComponent('MaterialCommunityIcons')
}))

jest.mock('react-native', () => ({
    Dimensions: null,
    Text: mockComponent('Text'),
    View: mockComponent('View'),
    ScrollView: mockComponent('ScrollView'),
    Image: mockComponent('Image'),
    TouchableWithoutFeedback: mockComponent('TouchableWithoutFeedback'),
    Animated: {
        Text: mockComponent('AnimatedText'),
        View: mockComponent('AnimatedView'),
        Image: mockComponent('AnimatedImage'),
        createAnimatedComponent: comp => mockComponent('Animated')
    },
}))

export const doMock = () => {
    jest.doMock('react-native', () => ({
        Text: mockComponent('Text'),
        View: mockComponent('View'),
        ScrollView: mockComponent('ScrollView'),
        Image: mockComponent('Image'),
        TouchableWithoutFeedback: mockComponent('TouchableWithoutFeedback'),
        Animated: {
            Text: mockComponent('AnimatedText'),
            View: mockComponent('AnimatedView'),
            Image: mockComponent('AnimatedImage'),
        },
    }))
}

window.matchMedia = jest.fn().mockImplementation(query /*e.g. '(min-width: 123px)'*/ => ({
    addListener: jest.fn(),
}))

export const initPlatform = (isWeb: boolean, trace: Trace = {}) => {

    afterEach(cleanup)

    window.isWeb = isWeb
    window.__TRACE__ = trace

    resetPlatform()
    if (isWeb) {
        initSheeter$Web()
    } else {
        initSheeter$Native()
    }
}

export const dump = (ruleset: TEngine.Queryables | any) => {
    expect(ruleset).toMatchSnapshot()
    const won = platform.applyLastwinsStrategy(ruleset)
    expect(won).toMatchSnapshot()
    expect(platform.finalizeClassName(won)).toMatchSnapshot()
}

export const afterLastWin = (ruleset) => {
    const won = platform.applyLastwinsStrategy(ruleset)
    expect(won).toMatchSnapshot()
}
