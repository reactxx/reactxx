/** @jsx platform.createElement */

//import React from 'react'
import { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { assignPlatform, platform } from 'reactxx-sheeter'
import { TComponents } from 'reactxx-typings'
import { withStylesCreator } from 'reactxx-with-styles'

import { hasPlatformEvents, textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'
import { TPrimitives, CompNames } from './d-index'

// for "declaration": true
import { TWithStyles, TSheeter } from 'reactxx-typings'
//import { styleX } from 'reactxx-core/tests/flow/drawer/props';

const anyView: (isAnim: boolean) => TComponents.SFCCode<TPrimitives.ViewShape> = isAnim => {
  const view = props => {
    const ActView = isAnim ? Animated.View : ViewRN
    const { styleX, classNameX, toClassNames, classes, ...rest } = props
    let presses
    const rootStyle = toClassNames([classes.root, classNameX, styleX])
    const res = <ActView classNameX={rootStyle} styleX={styleX} {...rest} /> as any
    return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
  }
  view.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { horizontal: props.horizontal }
  return view
}

const anyText: (isAnim: boolean) => TComponents.SFCCode<TPrimitives.TextShape> = isAnim => {
  const text = props => {
    const ActText = isAnim ? Animated.Text : TextRN
    const { classNameX, classes, toClassNames, singleLine, styleX, url/*, onClick*/, ...rest } = props
    let onPress
    const rootStyle = toClassNames([classes.root, classNameX])
    //Link to URL
    const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
      warning(supported, `Can't handle url: ${url}`)
      return Linking.openURL(url);
    }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

    return <ActText classNameX={rootStyle} styleX={styleX} {...rest} onPress={doPress || undefined} />
  }
  text.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props), singleLine: props.singleLine }
  return text
}

const anyScrollView: (isAnim: boolean) => TComponents.SFCCode<TPrimitives.ScrollViewShape> = isAnim => {
  const scrollView = props => {
    const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
    const { styleX, classNameX, classes, toClassNames, horizontal, ...rest } = props
    const rootStyle = toClassNames([classes.root, classNameX, styleX])
    const containerStyle = toClassNames([classes.container])
    return <ActScrollView classNameX={rootStyle} styleX={styleX} contentContainerStyle={containerStyle} {...rest} />
  }
  scrollView.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { horizontal: props.horizontal }
  return scrollView
}

const anyIcon: (isAnim: boolean) => TComponents.SFCCode<TPrimitives.IconShape> = isAnim => {
  const icon = props => {
    const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
    const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, ...rest } = props
    const rootStyle = toClassNames([classes.root, classNameX, styleX])
    //Link to URL
    let onPress
    const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
      warning(supported, `Can't handle url: ${url}`)
      return Linking.openURL(url);
    }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

    return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} 
    classNameX={rootStyle} styleX={styleX}
     {...rest} onPress={doPress || undefined} />
  }
  icon.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props) }
  return icon
}
const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)

const view = anyView(false)
const animatedView = anyView(true)
const text = anyText(false)
const animatedText = anyText(true)
const scrollView = anyScrollView(false)
const animatedScrollView = anyScrollView(true)
const icon = anyIcon(false)
const animatedIcon = anyIcon(true)

const textCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
  displayName: CompNames.Text,
})
const Text = textCreator()

const viewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
  displayName: CompNames.View,
})
const View = viewCreator()

const iconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
  displayName: CompNames.Icon,
})
const Icon = iconCreator()

const scrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView, {
  displayName: CompNames.ScrollView,
})
const ScrollView = scrollViewCreator()

const animatedTextCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, animatedText, {
  displayName: CompNames.AnimatedText,
})
const AnimatedText = animatedTextCreator()

const animatedViewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, animatedView, {
  displayName: CompNames.AnimatedView,
})
const AnimatedView = animatedViewCreator()

const animatedIconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, animatedIcon, {
  displayName: CompNames.AnimatedIcon,
})
const AnimatedIcon = animatedIconCreator()

export {
  view,
  text,
  icon,
  scrollView,
  viewCreator,
  textCreator,
  iconCreator,
  View,
  Text,
  Icon,
  ScrollView,
  scrollViewCreator,
  animatedViewCreator,
  animatedTextCreator,
  animatedIconCreator,
  AnimatedView,
  AnimatedText,
  AnimatedIcon,
}

export const init = () => assignPlatform({
  view,
  text,
  icon,
  scrollView,
  viewCreator,
  textCreator,
  iconCreator,
  View,
  Text,
  Icon,
  ScrollView,
  scrollViewCreator,
  animatedViewCreator,
  animatedTextCreator,
  animatedIconCreator,
  AnimatedView,
  AnimatedText,
  AnimatedIcon,
})
