import React from 'react'
import ReactN from 'react-native'

import { View as RNView, Text as RNText, ScrollView as RNScrollView, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons as RNIcon, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

export const view: Prim5s.CodeSFCNative<Prim5s.ViewShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, onPress, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.ViewStyle
  const res = <RNView style={rootStyle} {...rest} />
  return onPress ? <TouchableWithoutFeedback onPress={onPress}>{res}</TouchableWithoutFeedback> : res
}

export const animatedView: Prim5s.CodeSFCNative<Prim5s.ViewShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, onPress, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.ViewStyle
  const res = <Animated.View style={rootStyle} {...rest} />
  return onPress ? <TouchableWithoutFeedback onPress={onPress}>{res}</TouchableWithoutFeedback> : res
}

export const text: Prim5s.CodeSFCNative<Prim5s.TextShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.TextStyle
  return <RNText style={rootStyle} {...rest} />
}

export const scrollView: Prim5s.CodeSFCNative<Prim5s.ScrollViewShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithCascading(classes.container) as ReactN.ViewStyle
  return <RNScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest}/>
}

export const icon: Prim5s.CodeSFCNative<Prim5s.IconShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, data, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className, style) as ReactN.TextStyle
  return <RNIcon name={data as MaterialCommunityIconsProps['name']} style={[rootStyle]} {...rest} />
}

