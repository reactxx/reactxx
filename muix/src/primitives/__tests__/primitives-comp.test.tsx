import React, { useState, useContext, memo } from 'react'
import { initPlatform, mount } from "reactxx-tests"
import { platform } from 'reactxx-sheeter'

describe("PRIMITIVES SIMPLE", () => {
  it("NATIVE", () => traceTest(false))
  it("WEB", () => traceTest(true))
})

const traceTest = (isWeb: boolean) => {
  initPlatform(isWeb)
  window.__TRACELEVEL__ = 2

  let
  // wrapper = mount(<platform.Icon>Icon</platform.Icon>)
  // expect(wrapper).toMatchSnapshot()
  //   return

  wrapper = mount(<platform.Text>Text</platform.Text>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.Text singleLine>Text singleLine</platform.Text>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.AnimatedText>AnimatedText</platform.AnimatedText>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.View>View</platform.View>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.AnimatedView>AnimatedView</platform.AnimatedView>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.Icon>Icon</platform.Icon>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.AnimatedIcon>AnimatedIcon</platform.AnimatedIcon>)
  expect(wrapper).toMatchSnapshot()
  wrapper = mount(<platform.ScrollView>ScrollView</platform.ScrollView>)
  expect(wrapper).toMatchSnapshot()
}