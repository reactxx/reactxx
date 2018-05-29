import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

export namespace TCommonStyles {

  //React Native styles compatible with Web React.CSSProperties

  export type FlexAlignType = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";

  export interface FlexStyle {
    alignContent?: "flex-start" | "flex-end" | "center" | "stretch" | "space-between" | "space-around"
    alignItems?: FlexAlignType
    alignSelf?: "auto" | FlexAlignType
    borderBottomWidth?: number
    borderLeftWidth?: number
    borderRightWidth?: number
    borderTopWidth?: number
    borderWidth?: number
    bottom?: number | string
    flex?: number
    flexBasis?: number | string
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
    flexGrow?: number
    flexShrink?: number
    flexWrap?: "wrap" | "nowrap"
    height?: number | string
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
    left?: number | string
    margin?: number | string
    marginBottom?: number | string
    marginLeft?: number | string
    marginRight?: number | string
    marginTop?: number | string
    maxHeight?: number | string
    maxWidth?: number | string
    minHeight?: number | string
    minWidth?: number | string
    overflow?: "visible" | "hidden" | "scroll"
    padding?: number | string
    paddingBottom?: number | string
    paddingLeft?: number | string
    paddingRight?: number | string
    paddingTop?: number | string
    position?: "absolute" | "relative"
    right?: number | string
    top?: number | string
    width?: number | string
    zIndex?: number
  }

  export interface ViewStyle extends FlexStyle {
    backfaceVisibility?: "visible" | "hidden"
    backgroundColor?: string;
    opacity?: number;
    overflow?: "visible" | "hidden"
    display?: "none" | "flex";

    borderBottomColor?: string;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomWidth?: number;

    borderTopColor?: string;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderTopWidth?: number;

    borderColor?: string;
    borderLeftColor?: string;
    borderRadius?: number;
    borderRightColor?: string;
    borderRightWidth?: number;
    borderStyle?: "solid" | "dotted" | "dashed"
  }

  export interface ScrollViewStyle extends FlexStyle {
    backfaceVisibility?: "visible" | "hidden"
    backgroundColor?: string
    opacity?: number
    overflow?: "visible" | "hidden"

    borderBottomColor?: string
    borderBottomLeftRadius?: number
    borderBottomRightRadius?: number
    borderBottomWidth?: number

    borderTopColor?: string
    borderTopLeftRadius?: number
    borderTopRightRadius?: number
    borderTopWidth?: number

    borderColor?: string
    borderRadius?: number
    borderStyle?: "solid" | "dotted" | "dashed"
    borderRightColor?: string
    borderRightWidth?: number
    borderLeftColor?: string
    borderLeftWidth?: number
  }

  export interface TextStyle extends ViewStyle {
    color?: string
    fontFamily?: string
    fontSize?: number
    fontStyle?: "normal" | "italic"
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    letterSpacing?: number
    lineHeight?: number
    textAlign?: "auto" | "left" | "right" | "center"
    textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through"
    textDecorationStyle?: "solid" | "double" | "dotted" | "dashed"
    textDecorationColor?: string
  }

  export interface ImageStyle extends FlexStyle {
    backfaceVisibility?: "visible" | "hidden"
    borderBottomLeftRadius?: number
    borderBottomRightRadius?: number
    backgroundColor?: string
    borderColor?: string
    borderRadius?: number
    borderTopLeftRadius?: number
    borderTopRightRadius?: number
    overflow?: "visible" | "hidden"
    opacity?: number
  }

  /******************************************
    COMMON RULESET
  *******************************************/

  export type RulesetNativeIds = 'Text' | 'View' | 'Image' //| 'ScrollView'

  //******************** Native ruleset which are compatible with web
  export type RulesetCommon<T extends RulesetNativeIds> =
    T extends 'Text' ? TCommonStyles.TextStyle :
    T extends 'Image' ? TCommonStyles.ImageStyle :
    //T extends 'ScrollView' ? TCommonStyles.ScrollViewStyle :
    TCommonStyles.ViewStyle

  //******************** Platform specific ruleset
  export type RulesetNative<T extends RulesetNativeIds = never> =
    T extends 'Text' ? ReactN.TextStyle :
    T extends 'Image' ? ReactN.ImageStyle :
    //T extends 'ScrollView' ? ReactN.ScrollViewStyle :
    ReactN.ViewStyle

  export type RulesetWeb = CSS.Properties & { [P in CSS.SimplePseudos]?: CSS.Properties }
  export type Ruleset<T extends RulesetNativeIds = 'Text'> = RulesetWeb | RulesetNative<T>

  /******************************************
    EVENTS
  *******************************************/

  //export type MouseEvent = (event?: React.MouseEvent<Element>) => void

  //export interface OnPressX { onPress?: MouseEvent; onLongPress: () => MouseEvent }
  //export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }

  //export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  //export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }


}
