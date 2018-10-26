import React from 'react'
import { initPlatform, mount, adjustSnashotSerializer } from "reactxx-tests"
import * as Primitives from 'reactxx-primitives'
import * as PrimitivesN from 'reactxx-primitives-native'

describe("PRIMITIVES SIMPLE", () => {
  it("NATIVE", () => traceTest(false, PrimitivesN))
  it("WEB", () => traceTest(true, Primitives))
})

const traceTest = (isWeb: boolean, prim: typeof Primitives | typeof PrimitivesN) => {
  initPlatform(isWeb)
  window.__TRACELEVEL__ = 2
  adjustSnashotSerializer()

  let 
  // wrapper = mount(<prim.Icon>Icon</prim.Icon>)
  // expect(wrapper).toMatchSnapshot()
  // return

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