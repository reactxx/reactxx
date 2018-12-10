import React from 'react'

import {
    NativeMethodsMixin, StyleProp,
    View as View_, Text as Text_, Image as Image_, ScrollView as ScrollView_,
    ViewStyle as ViewStyle_, TextStyle as TextStyle_, ImageStyle as ImageStyle_,
    ViewProperties as ViewProperties_, TextProperties as TextProperties_, ImageProperties as ImageProperties_,
    ScrollViewProperties as ScrollViewProperties_
} from 'react-native'

import { $T, $I, $V, TTyped } from 'reactxx-typings'

export namespace TTypedNative {

    type PropsOverride<T, V extends TTyped.NativeIds, S> = T & { style?: StyleProp<S> | TTyped.TAllowed<V> }

    interface Static<P> extends NativeMethodsMixin, React.ClassicComponentClass<P> { }

    export type ViewProperties = PropsOverride<ViewProperties_, $V, ViewStyle_>
    export type TextProperties = PropsOverride<TextProperties_, $T, TextStyle_>
    export type ScrollViewProperties = PropsOverride<ScrollViewProperties_, $V, ViewStyle_> & {contentContainerStyle?: StyleProp<ViewStyle_> | TTyped.TAllowed<$V> }
    export type ImageProperties = PropsOverride<ImageProperties_, $I, ImageStyle_>

    export type ViewStatic = Static<ViewProperties>
    export type ScrollViewStatic = Static<ScrollViewProperties>
    export type TextStatic = Static<TextProperties>
    export type ImageStatic = Static<ImageProperties>

}
