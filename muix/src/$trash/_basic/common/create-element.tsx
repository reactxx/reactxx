import React from 'react'
import {TextStyle} from 'react-native'

const createElementCreator = (rulesetsToClassNames: (...rulesets: React.CSSProperties[]) => string | TextStyle) => {
  createElement: (type, props, children) => React.createElement(type, props, children)}
export default createElementCreator

