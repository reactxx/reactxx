
import React from 'react'
import { initPlatform, mount } from "reactxx-tests"
import { Text, Animated } from 'react-native'

describe("SWITCH define sheet", () => {
  it("NATIVE", () => {
    initPlatform(false)
    const wrapper = mount(
      <Animated.View style={{backgroundColor: 'blue'}}>
        <Text style={{color:'red'}}>Hallo world</Text>
      </Animated.View>)
    expect(wrapper).toMatchSnapshot()
  })
})


