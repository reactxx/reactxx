import React from 'react'
import ReactN, { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { Types, withStylesCreator } from 'reactxx-basic'

import { TComps, CompNames } from '../typings/comps'
import { textSheet, viewSheet, iconSheet, scrollViewSheet } from '../common/comps-sheets'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { $system: { classNames }, style, classes, onPress, onLongPress, onPressIn, onPressOut, ...rest } = props
  const rootStyle = classNames<'View'>(classes.root, style)
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as Types.CodeSFCNative<TComps.ViewShape>


const anyText = (isAnim: boolean) => (props => {
  const ActText = isAnim ? Animated.Text : TextRN
  const { $system: { classNames, $developer_RenderCounter }, style, classes, onPress, url, children, ...rest } = props
  const rootStyle = classNames<'Text'>(classes.root, props.numberOfLines === 1 && classes.singleLineStyle, style)
  //Link to URL
  const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
    warning(supported, `Can't handle url: ${url}`)
    return Linking.openURL(url);
  }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

  let child = children
  if ($developer_RenderCounter) {
    const txt = '[' + $developer_RenderCounter + '] '
    child = React.Children.count(children) == 0 ? txt : [txt, ...React.Children.toArray(children)]
  } 
  return <ActText style={rootStyle} {...rest} onPress={doPress}>{child}</ActText>
}) as Types.CodeSFCNative<TComps.TextShape>


const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { $system: { classNames }, style, classes, ...rest } = props
  const rootStyle = classNames<'ScrollView'>(classes.root, style)
  const containerStyle = classNames<'View'>(classes.container)
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as Types.CodeSFCNative<TComps.ScrollViewShape>

const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { $system: { classNames }, style, classes, data, children, onPress, url, ...rest } = props
  const rootStyle = classNames<'Text'>(classes.root, style)
  //Link to URL
  const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
    warning(supported, `Can't handle url: ${url}`)
    return Linking.openURL(url);
  }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} onPress={doPress}/>
}) as Types.CodeSFCNative<TComps.IconShape>
const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)

export const view = anyView(false)
export const animatedView = anyView(true)
export const text = anyText(false)
export const animatedText = anyText(true)
export const scrollView = anyScrollView(false)
export const animatedScrollView = anyScrollView(true)
export const icon = anyIcon(false)
export const animatedIcon = anyIcon(true)

export const Text: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, text as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.Text})()
export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, animatedText as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.AnimatedText})()
export const View: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, view as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.View})()
export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, animatedView as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.AnimatedView})()
export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, icon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.Icon})()
export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, animatedIcon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.AnimatedIcon})()
export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, scrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.ScrollView})()
export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.AnimatedScrollView})()
