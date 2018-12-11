

import TestRenderer from 'react-test-renderer'
import { platform } from 'reactxx-sheeter'
import { withStylesCreator } from 'reactxx-with-styles'
import { TComponents } from 'reactxx-typings'

import { Shape } from 'reactxx-core/tests/flow/shape'
import { sheet } from 'reactxx-core/tests/flow/drawer/sheet'
import { props, cascading, width, fillInnerState, componentOptions, classNameX, styleX } from 'reactxx-core/tests/flow/drawer/props'

//https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f  
//https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8
//https://blog.callstack.io/unit-testing-react-native-with-the-new-jest-ii-redux-snapshots-for-your-actions-and-reducers-8559f6f8050b

export const flowSource = {
    componentOptions,
    sheet,
    width,
    fillInnerState,
    cascading,
    classNameX,
    styleX,
    props,
}

const comp: TComponents.SFCCode<Shape> = props => <div></div>
//comp.fillSheetQuery = flowSource.fillSheetQuery

const Comp = withStylesCreator<Shape>(flowSource.sheet, comp, flowSource.componentOptions)()

const testRenderer = TestRenderer.create(
    <Comp {...flowSource.props} styleX={flowSource.styleX} classNameX={flowSource.classNameX} />
)

const json = testRenderer.toJSON()


