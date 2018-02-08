import React from 'react'
import ReactN from 'react-native'

import { View as RNView, Text as RNText, ScrollView as RNScrollView, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons as RNIcon, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

export const TypographyNative: React.SFC<PrimComps.Typography> = props => {
  const { style, className, $noWrapStyle, $type, $native, children } = props
  return <RNText style={[className, style]} {...$noWrapStyle} {...$native} children={children} />
}

export const ViewNative: React.SFC<PrimComps.View> = props => {
  const { style, className, $native, children } = props
  const onPress = $native && $native.onPress; if (onPress) delete $native.onPress
  const res = <RNView style={[className, style]} {...$native} children={children} />
  return onPress ? <TouchableWithoutFeedback onPress={onPress}>{res}</TouchableWithoutFeedback> : res
}

export const AnimatedViewNative: React.SFC<PrimComps.View> = props => {
  const { style, className, $native, children } = props
  const onPress = $native && $native.onPress; if (onPress) delete $native.onPress
  //console.log(JSON.stringify({ ...className },null,2))
  const res = <Animated.View style={[className, style]} {...$native} children={children} />
  return onPress ? <TouchableWithoutFeedback onPress={onPress}>{res}</TouchableWithoutFeedback> : res
}

export const TextNative: React.SFC<PrimComps.Text> = props => {
  const { style, className, $native, children } = props
  return <RNText style={[className, style]} {...$native} children={children} />
}

export const ScrollViewNative: React.SFC<PrimComps.ScrollView> = props => {
  const { style, className, $native, children, contentContainerStyle } = props
  return <RNScrollView style={[className, style]} {...$native} children={children} contentContainerStyle={contentContainerStyle as ReactN.ViewStyle} />
}

export const IconNative: React.SFC<PrimComps.Icon> = props => {
  const { style, className, $native, data } = props
  return <RNIcon name={data as string as MaterialCommunityIconsProps['name']} style={[className, style]} {...$native} />
}

export const IconX = IconNative as React.SFC<PrimComps.IconX>
export const ViewX = ViewNative as React.SFC<PrimComps.ViewX>
export const AnimatedViewX = AnimatedViewNative as React.SFC<PrimComps.ViewX>
export const TextX = TextNative as React.SFC<PrimComps.TextX>
export const ScrollViewX = ScrollViewNative as React.SFC<PrimComps.ScrollViewX>
export const TypographyNativeX = TypographyNative as React.SFC<PrimComps.Typography>
