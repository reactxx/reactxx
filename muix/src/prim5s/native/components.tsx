import React from 'react'
import ReactN from 'react-native'

import { View as RNView, Text as RNText, ScrollView as RNScrollView, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons as RNIcon, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

const ViewNative: React.SFC<PrimComps.View> = props => {
  const { style, className, $native, children } = props
  const onPress = $native && $native.onPress; if (onPress) delete $native.onPress
  const res = <RNView style={[className, style]} {...$native} children={children} />
  return onPress ? <TouchableWithoutFeedback onPress={onPress}>{res}</TouchableWithoutFeedback> : res
}

const AnimatedViewNative: React.SFC<PrimComps.View> = props => {
  const { style, className, $native, children } = props
  const onPress = $native && $native.onPress; if (onPress) delete $native.onPress
  //console.log(JSON.stringify({ ...className },null,2))
  const res = <Animated.View style={[className, style]} {...$native} children={children} />
  return onPress ? <TouchableWithoutFeedback onPress={onPress}>{res}</TouchableWithoutFeedback> : res
}

const TextNative: React.SFC<PrimComps.Text> = props => {
  const { style, className, $native, children } = props
  return <RNText style={[className, style]} {...$native} children={children} />
}

const ScrollViewNative: React.SFC<PrimComps.ScrollView> = props => {
  const { style, className, $native, children, contentContainerStyle } = props
  return <RNScrollView style={[className, style]} {...$native} children={children} contentContainerStyle={contentContainerStyle as ReactN.ViewStyle} />
}

const IconNative: React.SFC<PrimComps.Icon> = props => {
  const { style, className, $native, data } = props
  return <RNIcon name={data as string as MaterialCommunityIconsProps['name']} style={[className, style]} {...$native} />
}

export const Icon = IconNative as React.SFC<PrimComps.IconX>
export const View = ViewNative as React.SFC<PrimComps.ViewX>
export const AnimatedView = AnimatedViewNative as React.SFC<PrimComps.ViewX>
export const Text = TextNative as React.SFC<PrimComps.TextX>
export const ScrollView = ScrollViewNative as React.SFC<PrimComps.ScrollViewX>
