import React from 'react'
import ReactN, { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { withStyles } from '../common/withStyles'
import { TBasic } from '../typings/basic'
import { TComps } from '../typings/comps'
import { CompNames } from '../typings/index'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from '../common/comps-sheets'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { style, classes, mergeRulesetWithOverrides, theme, onPress, onLongPress, onPressIn, onPressOut, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as TBasic.CodeSFCNative<TComps.ViewShape>


const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : TextRN
  const { style, classes, mergeRulesetWithOverrides, theme, animations, mediaq, url, onPress, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, props.numberOfLines === 1 && classes.singleLineStyle, style) as ReactN.TextStyle
  //Link to URL
  const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
    warning(supported, `Can't handle url: ${url}`)
    return Linking.openURL(url);
  }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

  return <ActText style={rootStyle} {...rest} onPress={onPress} />
}) as TBasic.CodeSFCNative<TComps.TextShape>


const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { style, classes, mergeRulesetWithOverrides, theme, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as TBasic.CodeSFCNative<TComps.ScrollViewShape>

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { style, classes, mergeRulesetWithOverrides, theme, animations, data, children, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, style) as ReactN.TextStyle
  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as TBasic.CodeSFCNative<TComps.IconShape>

const view = anyView(false)
const animatedView = anyView(true)
const text = anyText(false)
const animatedText = anyText(true)
const scrollView = anyScrollView(false)
const animatedScrollView = anyScrollView(true)
const icon = anyIcon(false)
const animatedIcon = anyIcon(true)

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, textSheet)(text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, textSheet)(animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, viewSheet)(view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, viewSheet)(animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, iconSheet)(icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, iconSheet)(animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, scrollViewSheet)(scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, scrollViewSheet)(animatedScrollView)
