import React from 'react'
import ReactN, { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { Types, mergeRulesets, withStylesCreator } from 'reactxx-basic'

import { TComps, CompNames } from '../typings/comps'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from '../common/comps-sheets'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { system: { style, classes }, onPress, onLongPress, onPressIn, onPressOut, ...rest } = props
  const rootStyle = mergeRulesets<'View'>(classes.root, style)
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as Types.CodeSFCNative<TComps.ViewShape>


const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : TextRN
  const { system: { style, classes }, onPress, url, ...rest } = props
  const rootStyle = mergeRulesets<'Text'>(classes.root, props.numberOfLines === 1 && classes.singleLineStyle, style)
  //Link to URL
  const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
    warning(supported, `Can't handle url: ${url}`)
    return Linking.openURL(url);
  }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

  return <ActText style={rootStyle} {...rest} onPress={onPress} />
}) as Types.CodeSFCNative<TComps.TextShape>


const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { system: { style, classes }, ...rest } = props
  const rootStyle = mergeRulesets<'ScrollView'>(classes.root, style)
  const containerStyle = mergeRulesets<'View'>(classes.container)
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as Types.CodeSFCNative<TComps.ScrollViewShape>

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { system: { style, classes }, data, children, ...rest } = props
  const rootStyle = mergeRulesets<'Text'>(classes.root, style)
  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as Types.CodeSFCNative<TComps.IconShape>

export const view = anyView(false)
export const animatedView = anyView(true)
export const text = anyText(false)
export const animatedText = anyText(true)
export const scrollView = anyScrollView(false)
export const animatedScrollView = anyScrollView(true)
export const icon = anyIcon(false)
export const animatedIcon = anyIcon(true)

export const Text: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(CompNames.Text, textSheet, text as Types.CodeComponentType<TComps.TextShape>)()
export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(CompNames.AnimatedText, textSheet, animatedText as Types.CodeComponentType<TComps.TextShape>)()
export const View: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(CompNames.View, viewSheet, view as Types.CodeComponentType<TComps.ViewShape>)()
export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(CompNames.AnimatedView, viewSheet, animatedView as Types.CodeComponentType<TComps.ViewShape>)()
export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(CompNames.Icon, iconSheet, icon as Types.CodeComponentType<TComps.IconShape>)()
export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(CompNames.AnimatedIcon, iconSheet, animatedIcon as Types.CodeComponentType<TComps.IconShape>)()
export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(CompNames.ScrollView, scrollViewSheet, scrollView as Types.CodeComponentType<TComps.ScrollViewShape>)()
export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(CompNames.AnimatedScrollView, scrollViewSheet, animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>)()
