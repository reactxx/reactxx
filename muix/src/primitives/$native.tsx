/** @jsx createElement */

//import React from 'react'
import { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

import { createElement } from 'reactxx-sheeter'
import { TComponents } from 'reactxx-typings'
import { withStylesCreator } from 'reactxx-with-styles'

import { hasPlatformEvents, textSheet, viewSheet, iconSheet, scrollViewSheet } from './sheets'
import { TPrimitives, CompNames } from './d-index'

// for "declaration": true
import { TProvider } from 'reactxx-with-styles'
import { TWithStyles, TSheeter } from 'reactxx-typings'
//import { styleX } from 'reactxx-core/tests/flow/drawer/props';

const anyView: (isAnim: boolean) => TComponents.SFCCode<TPrimitives.ViewShape> = isAnim => {
  const view = props => {
    const ActView = isAnim ? Animated.View : ViewRN
    const { styleX, classNameX, toClassNames, classes, ...rest } = props
    let presses
    const rootStyle = toClassNames([classes.root, classNameX, styleX])
    const res = <ActView style={rootStyle} {...rest} /> as any
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
    const rootStyle = toClassNames([classes.root, classNameX, styleX])
    //Link to URL
    const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
      warning(supported, `Can't handle url: ${url}`)
      return Linking.openURL(url);
    }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

    return <ActText style={rootStyle} {...rest} onPress={doPress} />
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
    return <ActScrollView style={rootStyle} contentContainerStyle={containerStyle} {...rest} />
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

    return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']} style={rootStyle} {...rest} onPress={doPress} />
  }
  icon.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props) }
  return icon
}
const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)

export const view = anyView(false)
export const animatedView = anyView(true)
export const text = anyText(false)
export const animatedText = anyText(true)
export const scrollView = anyScrollView(false)
export const animatedScrollView = anyScrollView(true)
export const icon = anyIcon(false)
export const animatedIcon = anyIcon(true)

export const textCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
  displayName: CompNames.Text,
})
export const Text = textCreator()

export const viewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
  displayName: CompNames.View,
})
export const View = viewCreator()

export const iconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
  displayName: CompNames.Icon,
})
export const Icon = iconCreator()

export const scrollViewCreator = withStylesCreator<TPrimitives.ScrollViewShape>(scrollViewSheet, scrollView, {
  displayName: CompNames.ScrollView,
})
export const ScrollView = scrollViewCreator()

export const animatedTextCreator = withStylesCreator<TPrimitives.TextShape>(textSheet, text, {
  displayName: CompNames.AnimatedText,
})
export const AnimatedText = animatedTextCreator()

export const animatedViewCreator = withStylesCreator<TPrimitives.ViewShape>(viewSheet, view, {
  displayName: CompNames.AnimatedView,
})
export const AnimatedView = animatedViewCreator()

export const animatedIconCreator = withStylesCreator<TPrimitives.IconShape>(iconSheet, icon, {
  displayName: CompNames.AnimatedIcon,
})
export const AnimatedIcon = animatedIconCreator()


// export const Text: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, text as Types.CodeComponentType<TComps.TextShape>, { name: CompNames.Text })()
// export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, animatedText as Types.CodeComponentType<TComps.TextShape>, { name: CompNames.AnimatedText })()
// export const View: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, view as Types.CodeComponentType<TComps.ViewShape>, { name: CompNames.View })()
// export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(viewSheet, animatedView as Types.CodeComponentType<TComps.ViewShape>, { name: CompNames.AnimatedView })()
// export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, icon as Types.CodeComponentType<TComps.IconShape>, { name: CompNames.Icon })()
// export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(iconSheet, animatedIcon as Types.CodeComponentType<TComps.IconShape>, { name: CompNames.AnimatedIcon })()
// export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, scrollView as Types.CodeComponentType<TComps.ScrollViewShape>, { name: CompNames.ScrollView })()
// export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(scrollViewSheet, animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>, { name: CompNames.AnimatedScrollView })()
