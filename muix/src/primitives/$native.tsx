import React from 'react'
import { Animated, TouchableWithoutFeedback, Linking } from 'react-native'
import { MaterialCommunityIcons, MaterialCommunityIconsProps } from '@expo/vector-icons'
import { useStyles } from "reactxx-styles"

//import { platform } from 'reactxx-styles'
import { Text,  View, ScrollView } from 'reactxx-styles-native'
import { TTyped, TComponents, V, T } from "reactxx-typings"

import { getViewEvents, getTextEvents } from './events'


import { TPrimitives } from './shapes'

export const getView: TComponents.GetComponent<TPrimitives.ViewShape> = config => props => {

    const ActView: TTyped.ViewStatic = config.isAnimated ? Animated.View : View

    const { getRootNativeStyleProps, propsCode, propsCode: { url, children, $rootNativeProps } } = useStyles<TPrimitives.ViewShape>(props, config)

    const [hasEvent, events] = getViewEvents(props, url)
    propsCode.pressable = hasEvent

    const res = <ActView {...getRootNativeStyleProps()} {...$rootNativeProps} children={children} />

    return propsCode.pressable ? <TouchableWithoutFeedback {...events}>{res}</TouchableWithoutFeedback> : res
}

export const getIcon: TComponents.GetComponent<TPrimitives.IconShape> = config => props => {

    const ActIcon: typeof MaterialCommunityIcons = config.isAnimated ? AnimatedIconLow : MaterialCommunityIcons

    const { getRootNativeStyleProps, propsCode, propsCode: { data, url, children, $rootNativeProps } } = useStyles<TPrimitives.IconShape>(props, config)

    const [hasEvent, events] = getTextEvents(props as any, url)
    propsCode.pressable = hasEvent

    const iconProps: MaterialCommunityIconsProps = {...getRootNativeStyleProps() as any}
    if ($rootNativeProps) Object.assign(iconProps, $rootNativeProps)
    if (events)Object.assign(iconProps, events)

    return <ActIcon
        name={(data || children as string) as MaterialCommunityIconsProps['name']}
        {...iconProps}
    />
}
const AnimatedIconLow: typeof MaterialCommunityIcons = Animated.createAnimatedComponent(MaterialCommunityIcons)

export const getText: TComponents.GetComponent<TPrimitives.TextShape> = config => props => {

    const ActText: TTyped.TextStatic = config.isAnimated ? Animated.Text : Text

    const { getRootNativeStyleProps, propsCode, propsCode: { url, children, singleLine, $rootNativeProps } } = useStyles<TPrimitives.TextShape>(props, config)

    const [hasEvent, events] = getTextEvents(props, url)
    propsCode.pressable = hasEvent

    const textProps: TTyped.TextProperties = {...getRootNativeStyleProps<T>()}
    if (singleLine) textProps.numberOfLines = 1
    if (events) Object.assign(textProps, events)
    if ($rootNativeProps) Object.assign(textProps, $rootNativeProps)

    return <ActText
        {...textProps}
        children={children}
    />
}

export const getScrollView: TComponents.GetComponent<TPrimitives.ScrollViewShape> = config => props => {

    const ActScrollView: TTyped.ScrollViewStatic = config.isAnimated ? Animated.ScrollView : ScrollView

    const { getRootNativeStyleProps, getNativeStyleProps, propsCode: { children, $rootNativeProps }, classes } = useStyles<TPrimitives.ScrollViewShape>(props, config)

    const scrollViewProps: TTyped.ScrollViewProperties = {...getRootNativeStyleProps<V>()}
    if ($rootNativeProps) Object.assign(scrollViewProps, $rootNativeProps)

    return <ActScrollView
        {...scrollViewProps}
        contentContainerStyle={getNativeStyleProps(classes.container).style}
        children={children} />
}
