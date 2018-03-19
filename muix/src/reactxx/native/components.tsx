import * as React from 'react'
import * as ReactN from 'react-native'

import { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { withStyles } from '../common/withStyles'
import * as sheets from '../common/components'

import { ThemeT, CompsT} from 'reactxx-typings'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, onPress, onLongPress, onPressIn, onPressOut, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as ReactXX.CodeSFCNative<CompsT.ViewShape>


const view = anyView(false)
const animatedView = anyView(true)

const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : TextRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, props.numberOfLines === 1 && classes.singleLineStyle, className, style) as ReactN.TextStyle
  return <ActText style={rootStyle} {...rest} />
}) as ReactXX.CodeSFCNative<CompsT.TextShape>

const text = anyText(false)
const animatedText = anyText(true)

const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as ReactXX.CodeSFCNative<CompsT.ScrollViewShape>

const scrollView = anyScrollView(false)
const animatedScrollView = anyScrollView(true)

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, data, children, mediaq,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as ReactXX.CodeSFCNative<CompsT.IconShape>

const icon = anyIcon(false)
const animatedIcon = anyIcon(true)

export const Text = withStyles<CompsT.TextShape>(CompsT.CompNames.Text, sheets.textSheet)(text)
export const AnimatedText = withStyles<CompsT.TextShape>(CompsT.CompNames.AnimatedText, sheets.textSheet)(animatedText)
export const View = withStyles<CompsT.ViewShape>(CompsT.CompNames.View, sheets.viewSheet)(view)
export const AnimatedView = withStyles<CompsT.ViewShape>(CompsT.CompNames.AnimatedView, sheets.viewSheet)(animatedView)
export const Icon = withStyles<CompsT.IconShape>(CompsT.CompNames.Icon, sheets.iconSheet)(icon)
export const AnimatedIcon = withStyles<CompsT.IconShape>(CompsT.CompNames.AnimatedIcon, sheets.iconSheet)(animatedIcon)
export const ScrollView = withStyles<CompsT.ScrollViewShape>(CompsT.CompNames.ScrollView, sheets.scrollViewSheet)(scrollView)
export const AnimatedScrollView = withStyles<CompsT.ScrollViewShape>(CompsT.CompNames.AnimatedScrollView, sheets.scrollViewSheet)(animatedScrollView)
