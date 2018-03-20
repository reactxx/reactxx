import React from 'react'
import ReactN, { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'

import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { TBasic } from '../common/typings'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, onPress, onLongPress, onPressIn, onPressOut, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as TBasic.CodeSFCNative<TBasic.ViewShape>


const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : TextRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq, url, onPress, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, props.numberOfLines === 1 && classes.singleLineStyle, className, style) as ReactN.TextStyle
  //Link to URL
  const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
    warning(supported, `Can't handle url: ${url}`)
    return Linking.openURL(url);
  }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

  return <ActText style={rootStyle} {...rest} onPress={onPress} />
}) as TBasic.CodeSFCNative<TBasic.TextShape>


const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as TBasic.CodeSFCNative<TBasic.ScrollViewShape>

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, data, children, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as TBasic.CodeSFCNative<TBasic.IconShape>

export const view = anyView(false)
export const animatedView = anyView(true)
export const text = anyText(false)
export const animatedText = anyText(true)
export const scrollView = anyScrollView(false)
export const animatedScrollView = anyScrollView(true)
export const icon = anyIcon(false)
export const animatedIcon = anyIcon(true)

