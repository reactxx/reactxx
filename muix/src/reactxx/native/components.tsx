import React from 'react'
import ReactN, { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'

import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { withStyles } from '../common/withStyles'
import * as sheets from '../common/components'

import { TComps, TSheets } from 'reactxx-typings'

import * as Comps from '../../basic/native/comps'

const anyView = (isAnim: boolean) => (props => {
  const ActView = isAnim ? Animated.View : ViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, onPress, onLongPress, onPressIn, onPressOut, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ViewStyle
  const presses = onPress || onLongPress || onPressIn || onPressOut ? { onPress, onLongPress, onPressIn, onPressOut } : null
  const res = <ActView style={rootStyle} {...rest} />
  return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
}) as TSheets.CodeSFCNative<TComps.ViewShape>


const view = anyView(false)
const animatedView = anyView(true)

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
}) as TSheets.CodeSFCNative<TComps.TextShape>

const text = anyText(false)
const animatedText = anyText(true)

const anyScrollView = (isAnim: boolean) => (props => {
  const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.ScrollViewStyle
  const containerStyle = mergeRulesetWithOverrides(classes.container) as ReactN.ViewStyle
  return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
}) as TSheets.CodeSFCNative<TComps.ScrollViewShape>

const scrollView = anyScrollView(false)
const animatedScrollView = anyScrollView(true)

const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
const anyIcon = (isAnim: boolean) => (props => {
  const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations, data, children, mediaq, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className, style) as ReactN.TextStyle
  return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} />
}) as TSheets.CodeSFCNative<TComps.IconShape>

const icon = anyIcon(false)
const animatedIcon = anyIcon(true)

export const Text: TSheets.ComponentTypeX<TComps.TextShape> = withStyles(TComps.CompNames.Text, sheets.textSheet)(text)
export const AnimatedText: TSheets.ComponentTypeX<TComps.TextShape> = withStyles(TComps.CompNames.AnimatedText, sheets.textSheet)(animatedText)
export const View: TSheets.ComponentTypeX<TComps.ViewShape> = withStyles<TComps.ViewShape>(TComps.CompNames.View, sheets.viewSheet)(view)
export const AnimatedView: TSheets.ComponentTypeX<TComps.ViewShape> = withStyles<TComps.ViewShape>(TComps.CompNames.AnimatedView, sheets.viewSheet)(animatedView)
export const Icon: TSheets.ComponentTypeX<TComps.IconShape> = withStyles<TComps.IconShape>(TComps.CompNames.Icon, sheets.iconSheet)(icon)
export const AnimatedIcon: TSheets.ComponentTypeX<TComps.IconShape> = withStyles<TComps.IconShape>(TComps.CompNames.AnimatedIcon, sheets.iconSheet)(animatedIcon)
export const ScrollView: TSheets.ComponentTypeX<TComps.ScrollViewShape> = withStyles<TComps.ScrollViewShape>(TComps.CompNames.ScrollView, sheets.scrollViewSheet)(scrollView)
export const AnimatedScrollView: TSheets.ComponentTypeX<TComps.ScrollViewShape> = withStyles<TComps.ScrollViewShape>(TComps.CompNames.AnimatedScrollView, sheets.scrollViewSheet)(animatedScrollView)


//export const Text: TSheets.ComponentTypeX<TComps.TextShape> = withStyles(TComps.CompNames.Text, sheets.textSheet)(Comps.text)
//export const AnimatedText: TSheets.ComponentTypeX<TComps.TextShape> = withStyles(TComps.CompNames.AnimatedText, sheets.textSheet)(Comps.animatedText)
//export const View: TSheets.ComponentTypeX<TComps.ViewShape> = withStyles<TComps.ViewShape>(TComps.CompNames.View, sheets.viewSheet)(Comps.view)
//export const AnimatedView: TSheets.ComponentTypeX<TComps.ViewShape> = withStyles<TComps.ViewShape>(TComps.CompNames.AnimatedView, sheets.viewSheet)(Comps.animatedView)
//export const Icon: TSheets.ComponentTypeX<TComps.IconShape> = withStyles<TComps.IconShape>(TComps.CompNames.Icon, sheets.iconSheet)(Comps.icon)
//export const AnimatedIcon: TSheets.ComponentTypeX<TComps.IconShape> = withStyles<TComps.IconShape>(TComps.CompNames.AnimatedIcon, sheets.iconSheet)(Comps.animatedIcon)
//export const ScrollView: TSheets.ComponentTypeX<TComps.ScrollViewShape> = withStyles<TComps.ScrollViewShape>(TComps.CompNames.ScrollView, sheets.scrollViewSheet)(Comps.scrollView)
//export const AnimatedScrollView: TSheets.ComponentTypeX<TComps.ScrollViewShape> = withStyles<TComps.ScrollViewShape>(TComps.CompNames.AnimatedScrollView, sheets.scrollViewSheet)(Comps.animatedScrollView)
