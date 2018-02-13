import React from 'react'
import ReactN from 'react-native'

import { View as RNView, Text as RNText, ScrollView as RNScrollView, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons as RNIcon, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

const anyView = (isAnim: boolean) => (props => {
  const View = isAnim ? Animated.View : RNView
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, onPress, onLongPress, onPressIn, onPressOut, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <View style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as Prim5s.CodeSFCNative<Prim5s.ViewShape>


export const view = anyView(false)

export const animatedView = anyView(true)

export const text: Prim5s.CodeSFCNative<Prim5s.TextShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.TextStyle
  return <RNText style={rootStyle} {...rest} />
}

export const scrollView: Prim5s.CodeSFCNative<Prim5s.ScrollViewShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithCascading(classes.container) as ReactN.ViewStyle
  return <RNScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}

export const icon: Prim5s.CodeSFCNative<Prim5s.IconShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, data, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.TextStyle
  return <RNIcon name={data as MaterialCommunityIconsProps['name']} style={[rootStyle]} {...rest} />
}

