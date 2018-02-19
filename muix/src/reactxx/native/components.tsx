import React from 'react'
import ReactN from 'react-native'

import { View, Text, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : View
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, onPress, onLongPress, onPressIn, onPressOut, animations, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as ReactXX.CodeSFCNative<ReactXX.ViewShape>


export const view = anyView(false)
export const animatedView = anyView(true)

const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : Text
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <ActText style={rootStyle} {...rest} />
}) as ReactXX.CodeSFCNative<ReactXX.TextShape>

export const text = anyText(false)
export const animatedText = anyText(true)

const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollView
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as ReactXX.CodeSFCNative<ReactXX.ScrollViewShape>

export const scrollView = anyScrollView(false)
export const animatedScrollView = anyScrollView(true)

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons 
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, data, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <ActIcon name={data as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as ReactXX.CodeSFCNative<ReactXX.IconShape>

export const icon = anyIcon(false)
export const animatedIcon = anyIcon(true)

