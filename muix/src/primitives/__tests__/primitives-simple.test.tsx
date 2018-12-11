import React from 'react'

import { initPlatform, render } from "reactxx-primitives-test/init-platform.t"
import { platform } from 'reactxx-styles'

describe("PRIMITIVES SIMPLE", () => {

  const doTest = (isWeb: boolean) => {
    beforeEach(() => {
      initPlatform(isWeb, { dataTraceFlag: 'short' })
    })
    it('01: Text', () => {
      const wrapper = render(<platform.Text>Text</platform.Text>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('02: Text singleLine', () => {
      const wrapper = render(<platform.Text singleLine>Text singleLine</platform.Text>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('03: AnimatedText', () => {
      const wrapper = render(<platform.AnimatedText>AnimatedText</platform.AnimatedText>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('04: View', () => {
      const wrapper = render(<platform.View>View</platform.View>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('05: AnimatedView', () => {
      const wrapper = render(<platform.AnimatedView>AnimatedView</platform.AnimatedView>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('06: Icon', () => {
      const wrapper = render(<platform.Icon>Icon</platform.Icon>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('07: AnimatedIcon', () => {
      const wrapper = render(<platform.AnimatedIcon>AnimatedIcon</platform.AnimatedIcon>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('08: ScrollView', () => {
      const wrapper = render(<platform.ScrollView>ScrollView</platform.ScrollView>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
    it('09: ScrollView horizontal', () => {
      const wrapper = render(<platform.ScrollView horizontal>ScrollView</platform.ScrollView>)
      expect(wrapper.container).toMatchSnapshot()
      wrapper.unmount()
    })
  }

  describe("## NATIVE ##", () => doTest(false))
  describe("## WEB ##", () => doTest(true))

})