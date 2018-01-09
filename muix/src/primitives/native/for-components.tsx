//*** inspired by https://github.com/necolas/react-native-web

import React from 'react'
import { View as RNView, Text as RNText, ScrollView as RNScrollView } from 'react-native'
import warning from 'warning'

export const ViewNative: React.SFC<Primitives.View> = props => {
  const { style, className, $native, children } = props
  return <RNView style={[className, style]} {...$native} children={children} />
}

export const TextNative: React.SFC<Primitives.Text> = props => {
  const { style, className, $native, children } = props
  return <RNText style={[className, style]} {...$native} children={children} />
}

export const ScrollViewNative: React.SFC<Primitives.ScrollView> = props => {
  const { style, className, $native, children, contentContainerStyle } = props
  return <RNScrollView style={[className, style]} {...$native} children={children} contentContainerStyle={contentContainerStyle as ReactN.ViewStyle} />
}

export const ViewX = ViewNative as React.SFC<Primitives.ViewX>
export const TextX = TextNative as React.SFC<Primitives.TextX>
export const ScrollViewX = ScrollViewNative as React.SFC<Primitives.ScrollViewX>

