import React from 'react'
import ReactN from 'react-native'

import { View as RNView, Text as RNText, ScrollView as RNScrollView, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons as RNIcon, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

const anyView = (isAnim: boolean) => (props => {
  const View = isAnim ? Animated.View : RNView
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, onPress, onLongPress, onPressIn, onPressOut, animations, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <View style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as ReactXX.CodeSFCNative<ReactXX.ViewShape>


export const view = anyView(false)

export const animatedView = anyView(true)

export const text: ReactXX.CodeSFCNative<ReactXX.TextShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <RNText style={rootStyle} {...rest} />
}

export const scrollView: ReactXX.CodeSFCNative<ReactXX.ScrollViewShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <RNScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}

export const icon: ReactXX.CodeSFCNative<ReactXX.IconShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, data, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <RNIcon name={data as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}

