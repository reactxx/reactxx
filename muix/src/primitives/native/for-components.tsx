import React from 'react'
import ReactN from 'react-native'

import { View as RNView, Text as RNText, ScrollView as RNScrollView } from 'react-native'
import { MaterialCommunityIcons as RNIcon, MaterialCommunityIconsProps } from '@expo/vector-icons'
import warning from 'warning'

export const TypographyNative: React.SFC<Primitives.Typography> = props => {
  const { style, classNameInCode, $noWrapStyle, $type, $native, children } = props
  return <RNText style={[classNameInCode, style]} {...$noWrapStyle} {...$native} children={children} />
}

export const ViewNative: React.SFC<Primitives.View> = props => {
  const { style, classNameInCode, $native, children } = props
  return <RNView style={[classNameInCode, style]} {...$native} children={children} />
}

export const TextNative: React.SFC<Primitives.Text> = props => {
  const { style, classNameInCode, $native, children } = props
  return <RNText style={[classNameInCode, style]} {...$native} children={children} />
}

export const ScrollViewNative: React.SFC<Primitives.ScrollView> = props => {
  const { style, classNameInCode, $native, children, contentContainerStyle } = props
  return <RNScrollView style={[classNameInCode, style]} {...$native} children={children} contentContainerStyle={contentContainerStyle as ReactN.ViewStyle} />
}

export const IconNative: React.SFC<Primitives.Icon> = props => {
  const { style, classNameInCode, $native, data } = props
  return <RNIcon name={data as MaterialCommunityIconsProps['name']} style={[classNameInCode, style]} {...$native} />
}

export const IconX = IconNative as React.SFC<Primitives.IconX>
export const ViewX = ViewNative as React.SFC<Primitives.ViewX>
export const TextX = TextNative as React.SFC<Primitives.TextX>
export const ScrollViewX = ScrollViewNative as React.SFC<Primitives.ScrollViewX>
export const TypographyNativeX = TypographyNative as React.SFC<Primitives.Typography>
