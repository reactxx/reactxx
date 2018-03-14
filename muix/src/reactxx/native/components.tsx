import * as React from 'react'
import * as ReactN from 'react-native'

import { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { withStyles } from '../common/withStyles'
import * as sheets from '../common/components'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, onPress, onLongPress, onPressIn, onPressOut, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as ReactXX.CodeSFCNative<ReactXX.ViewShape>


const view = anyView(false)
const animatedView = anyView(true)

const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : TextRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, props.numberOfLines === 1 && classes.singleLineStyle, className, style) as ReactN.TextStyle
  return <ActText style={rootStyle} {...rest} />
}) as ReactXX.CodeSFCNative<ReactXX.TextShape>

const text = anyText(false)
const animatedText = anyText(true)

const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as ReactXX.CodeSFCNative<ReactXX.ScrollViewShape>

const scrollView = anyScrollView(false)
const animatedScrollView = anyScrollView(true)

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, data, children, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as ReactXX.CodeSFCNative<ReactXX.IconShape>

const icon = anyIcon(false)
const animatedIcon = anyIcon(true)

export const Text = withStyles<ReactXX.TextShape>(ReactXX.CompNames.Text, sheets.textSheet)(text)
export const AnimatedText = withStyles<ReactXX.TextShape>(ReactXX.CompNames.AnimatedText, sheets.textSheet)(animatedText)
export const View = withStyles<ReactXX.ViewShape>(ReactXX.CompNames.View, sheets.viewSheet)(view)
export const AnimatedView = withStyles<ReactXX.ViewShape>(ReactXX.CompNames.AnimatedView, sheets.viewSheet)(animatedView)
export const Icon = withStyles<ReactXX.IconShape>(ReactXX.CompNames.Icon, sheets.iconSheet)(icon)
export const AnimatedIcon = withStyles<ReactXX.IconShape>(ReactXX.CompNames.AnimatedIcon, sheets.iconSheet)(animatedIcon)
export const ScrollView = withStyles<ReactXX.ScrollViewShape>(ReactXX.CompNames.ScrollView, sheets.scrollViewSheet)(scrollView)
export const AnimatedScrollView = withStyles<ReactXX.ScrollViewShape>(ReactXX.CompNames.AnimatedScrollView, sheets.scrollViewSheet)(animatedScrollView)
