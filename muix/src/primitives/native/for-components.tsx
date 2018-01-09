//*** inspired by https://github.com/necolas/react-native-web

import React from 'react'
import { View as RNView, Text as RNText, ScrollView as RNScrollView } from 'react-native'
import warning from 'warning'

export const ViewNative: React.SFC<Primitives.View> = props => {
  const { style, className, ...rest } = props
  return <RNView style={[className, style]} {...rest} />
}

export const TextNative: React.SFC<Primitives.Text> = props => {
  const { style, className, ...rest } = props
  return <RNText style={[className, style]} {...rest} />
}

export const ScrollViewNative: React.SFC<Primitives.ScrollView> = props => {
  const { style, className, ...rest } = props
  return <RNScrollView style={[className, style]} {...rest} />
}
