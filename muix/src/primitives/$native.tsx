/** @jsx platform.createElement */

//import React from 'react'
import { View as ViewRN, Text as TextRN, ScrollView as ScrollViewRN, Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

/** @jsx platform.createElement */

import { platform } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-typings'
import { useSheeter } from "reactxx-use"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = null
export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> =null
export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> =null
export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> =null


// const anyView = (isAnim: boolean) => {
//   const view: TComponents.SFCCode<TPrimitives.ViewShape> = props => {
//     const ActView = isAnim ? Animated.View : ViewRN
//     const { styleX, classNameX, toClassNames, classes, ...rest } = props
//     let presses: boolean
//     const rootStyle = toClassNames([classes.root, classNameX, styleX])
//     const res = <ActView classNameX={rootStyle} styleX={styleX} {...rest} /> as any
//     return presses ? <TouchableWithoutFeedback {...presses}>{res}</TouchableWithoutFeedback> : res
//   }
//   //view.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: presses }
//   return view
// }

// const anyText = (isAnim: boolean) => {
//   const text: TComponents.SFCCode<TPrimitives.TextShape> = props => {
//     const ActText = isAnim ? Animated.Text : TextRN
//     const { classNameX, classes, toClassNames, singleLine, styleX, url/*, onClick*/, ...rest } = props
//     let onPress
//     const rootStyle = toClassNames([classes.root, classNameX])
//     //Link to URL
//     const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
//       warning(supported, `Can't handle url: ${url}`)
//       return Linking.openURL(url);
//     }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

//     return <ActText classNameX={rootStyle} styleX={styleX} {...rest} onPress={doPress || undefined} />
//   }
//   text.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: false, singleLine: props.singleLine }
//   return text
// }

// const anyScrollView = (isAnim: boolean) => {
//   const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = props => {
//     const ActScrollView = isAnim ? Animated.ScrollView : ScrollViewRN
//     const { styleX, classNameX, classes, toClassNames, horizontal, ...rest } = props
//     const rootStyle = toClassNames([classes.root, classNameX, styleX])
//     const containerStyle = toClassNames([classes.container])
//     return <ActScrollView classNameX={rootStyle} styleX={styleX} contentContainerStyle={containerStyle} {...rest} />
//   }
//   scrollView.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { horizontal: props.horizontal }
//   return scrollView
// }

// const anyIcon = (isAnim: boolean) => {
//   const icon: TComponents.SFCCode<TPrimitives.IconShape> = props => {
//     const ActIcon = isAnim ? AnimatedIconLow : MaterialCommunityIcons
//     const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, ...rest } = props
//     const rootStyle = toClassNames([classes.root, classNameX, styleX])
//     //Link to URL
//     let onPress
//     const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
//       warning(supported, `Can't handle url: ${url}`)
//       return Linking.openURL(url);
//     }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

//     return <ActIcon name={(data || children as string) as MaterialCommunityIconsProps['name']}
//       classNameX={rootStyle} styleX={styleX}
//       {...rest} onPress={doPress || undefined} />
//   }
//   icon.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: false }
//   return icon
// }
// const AnimatedIconLow = Animated.createAnimatedComponent(MaterialCommunityIcons)
