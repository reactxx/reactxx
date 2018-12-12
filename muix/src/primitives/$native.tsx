import React from 'react'
import { Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

//import { platform } from 'reactxx-styles'
import { Text, View, ScrollView } from 'reactxx-styles-native'
import { TTyped, TComponents } from "reactxx-typings"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TComponents.GetComponent<TPrimitives.ViewShape> = (useStyles, isAnimated: boolean) => props => {

    const ActView: TTyped.ViewStatic = isAnimated ? Animated.View : View

    const { getStylePropsRootNative, propsCode, propsCode: { children, $rootNativeProps } } = useStyles(props)

    propsCode.pressable = hasPlatformEvents($rootNativeProps)

    const res = <ActView {...getStylePropsRootNative()} {...$rootNativeProps} children={children} /> as any

    return propsCode.pressable ? <TouchableWithoutFeedback {...{/*events*/ }}>{res}</TouchableWithoutFeedback> : res
}

export const getIcon: TComponents.GetComponent<TPrimitives.IconShape> = (useStyles, isAnimated: boolean) => props => {

    const ActIcon: typeof MaterialCommunityIcons = isAnimated ? AnimatedIconLow : MaterialCommunityIcons

    const { getStylePropsRootNative, propsCode, propsCode: { data, url, children, $rootNativeProps } } = useStyles(props)

    propsCode.pressable = hasPlatformEvents($rootNativeProps)

    //Link to URL
    let onPress
    const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
        warning(supported, `Can't handle url: ${url}`)
        return Linking.openURL(url);
    }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

    return <ActIcon
        name={(data || children as string) as MaterialCommunityIconsProps['name']}
        {...getStylePropsRootNative() as any as MaterialCommunityIconsProps}
        {...{ onPress: doPress || undefined }}
        {...$rootNativeProps} />
}
const AnimatedIconLow: typeof MaterialCommunityIcons = Animated.createAnimatedComponent(MaterialCommunityIcons)

export const getText: TComponents.GetComponent<TPrimitives.TextShape> = (useStyles, isAnimated: boolean) => props => {

    const ActText: TTyped.TextStatic = isAnimated ? Animated.Text : Text

    const { getStylePropsRootNative, propsCode, propsCode: { url, children, singleLine, $rootNativeProps } } = useStyles(props)

    propsCode.pressable = hasPlatformEvents($rootNativeProps)

    let doPress
    const otherProps: TTyped.TextProperties = {
        onPress: !url ? doPress : () => Linking.canOpenURL(url).then(supported => {
            warning(supported, `Can't handle url: ${url}`)
            return Linking.openURL(url);
        }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))
    }
    if (singleLine)
        otherProps.numberOfLines = 1

    return <ActText {...getStylePropsRootNative()} {...$rootNativeProps} {...otherProps} children={children} />
}

export const getScrollView: TComponents.GetComponent<TPrimitives.ScrollViewShape> = (useStyles, isAnimated: boolean) => props => {

    const ActScrollView: TTyped.ScrollViewStatic = isAnimated ? Animated.ScrollView : ScrollView

    const { getStylePropsRootNative, getStylePropsNative, propsCode: { children, $rootNativeProps }, classes } = useStyles(props)

    return <ActScrollView
        {...getStylePropsRootNative()}
        contentContainerStyle={getStylePropsNative(classes.container).style}
        {...$rootNativeProps}
        children={children} />
}
