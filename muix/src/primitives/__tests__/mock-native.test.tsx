import React from 'react'
import { initPlatform, mount } from "reactxx-tests"
import { Text, Animated } from 'react-native'

describe("SWITCH define sheet", () => {
  it("NATIVE", () => {
    initPlatform(false)
    const wrapper = mount(
      <Animated.ScrollView color=''>
        <Text style={{color:'red'}}>Halo world</Text>
      </Animated.ScrollView>)
    expect(wrapper).toMatchSnapshot()
  })
})


