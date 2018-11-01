import React, { useState } from 'react'
import { initPlatform, mount, adjustSnashotSerializer } from "reactxx-tests"
import * as Primitives from 'reactxx-primitives'
import * as PrimitivesN from 'reactxx-primitives-native'
import renderer from 'react-test-renderer'

jest.mock('react-native', () => ({
  Text: props => <text {...props} />, //({ children }) => children,
  View: ({ children }) => children,
  ScrollView: ({ children }) => children,
  Image: ({ children }) => children,
  Animated: {
    Text: ({ children }) => children,
    View: ({ children }) => children,
    ScrollView: ({ children }) => children,
    Image: ({ children }) => children,
    createAnimatedComponent: comp => ({ children }) => children
  },
}))

jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: props => <svg {...props} />,
}))

const StateComp: React.SFC = props => {
  const [count, setCount] = useState(1)
  return <div>{count}</div>
}

describe("PRIMITIVES SIMPLE", () => {
  //it("NATIVE", () => traceTest(false, PrimitivesN))
  it("WEB", () => traceTest(true, Primitives))
})

const traceTest = (isWeb: boolean, prim: typeof Primitives | typeof PrimitivesN) => {
  const component = renderer.create(<StateComp/>)
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
}

const traceTest_ = (isWeb: boolean, prim: typeof Primitives | typeof PrimitivesN) => {
  initPlatform(isWeb)
  window.__TRACELEVEL__ = 2
  adjustSnashotSerializer()

  let
    wrapper = mount(<prim.Icon>Icon</prim.Icon>)
  expect(wrapper).toMatchSnapshot()
  return

  wrapper = mount(<prim.Text>Text</prim.Text>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<prim.AnimatedText>AnimatedText</prim.AnimatedText>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<prim.View>View</prim.View>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<prim.AnimatedView>AnimatedView</prim.AnimatedView>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<prim.Icon>Icon</prim.Icon>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<prim.AnimatedIcon>AnimatedIcon</prim.AnimatedIcon>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<prim.ScrollView>ScrollView</prim.ScrollView>)
  expect(wrapper).toMatchSnapshot()
}