import React from 'react'
import { Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

//import { platform } from 'reactxx-sheeter'
import { Text, View, ScrollView } from 'reactxx-sheeter-native'
import { useSheeter, TUseSheeter } from "reactxx-use-sheeter"
import { TTyped } from "reactxx-typings"


import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const ActView: TTyped.ViewStatic = isAnimated ? Animated.View : View

    const { styleRootNative, propsCode, propsCode: { children, $rootNativeProps }, classes }
        = useSheeter<TPrimitives.ViewShape>(props, authorConfig, displayName, userConfig)

    propsCode.pressable = hasPlatformEvents($rootNativeProps)
    const res = <ActView {...styleRootNative()} {...$rootNativeProps} children={children} /> as any

    return propsCode.pressable ? <TouchableWithoutFeedback {...{/*events*/ }}>{res}</TouchableWithoutFeedback> : res
}

export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const ActIcon: typeof MaterialCommunityIcons = isAnimated ? AnimatedIconLow : MaterialCommunityIcons

    const { styleRootNative, propsCode, propsCode: { data, url, children, $rootNativeProps }, classes }
        = useSheeter<TPrimitives.IconShape>(props, authorConfig, displayName, userConfig)

    propsCode.pressable = hasPlatformEvents($rootNativeProps)
    //Link to URL
    let onPress
    const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
        warning(supported, `Can't handle url: ${url}`)
        return Linking.openURL(url);
    }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

    return <ActIcon
        name={(data || children as string) as MaterialCommunityIconsProps['name']}
        {...styleRootNative() as any as MaterialCommunityIconsProps}
        {...{ onPress: doPress || undefined }}
        {...$rootNativeProps} />
}
const AnimatedIconLow: typeof MaterialCommunityIcons = Animated.createAnimatedComponent(MaterialCommunityIcons)

export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const ActText: TTyped.TextStatic = isAnimated ? Animated.Text : Text

    const { styleRootNative, propsCode, propsCode: { url, children, singleLine, $rootNativeProps }, classes }
        = useSheeter<TPrimitives.TextShape>(props, authorConfig, displayName, userConfig)

    propsCode.pressable = hasPlatformEvents($rootNativeProps)
    let doPress
    const otherProps: TTyped.TextProperties = {
        onPress: !url ? doPress : () => Linking.canOpenURL(url).then(supported => {
            warning(supported, `Can't handle url: ${url}`)
            return Linking.openURL(url);
        }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))
    }
    if (singleLine) {
        otherProps.numberOfLines = 1
    }

    return <ActText {...styleRootNative()} {...$rootNativeProps} {...otherProps} children={children} />
}

export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const ActScrollView: TTyped.ScrollViewStatic = isAnimated ? Animated.ScrollView : ScrollView

    const { styleRootNative, styleNative, propsCode: { children, $rootNativeProps }, classes }
        = useSheeter<TPrimitives.ScrollViewShape>(props, authorConfig, displayName, userConfig)

    return <ActScrollView
        {...styleRootNative()}
        contentContainerStyle={styleNative(classes.container).style}
        {...$rootNativeProps}
        children={children} />
}
