import React from 'React';
import ReactN from 'react-native';
import CSS from 'csstype';

declare namespace TCommonStyles {

  //React Native styles compatible with Web React.CSSProperties

  export interface Transform {
    perspective?: number
    rotate?: string
    rotateX?: string
    rotateY?: string
    rotateZ?: string
    scale?: number
    scaleX?: number
    scaleY?: number
    translateX?: number
    translateY?: number
    skewX?: string
    skewY?: string
    //time?: string
  }
  export interface TransformProp {
    transform?: Transform
  }

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

  export interface ViewStyle extends ViewStyleLow, TransformProp { }

  export interface ViewStyleLow extends FlexStyle {
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

  export interface TextStyle extends TextStyleLow, TransformProp { }
  export interface TextStyleLow extends ViewStyleLow {
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

  export interface ImageStyle extends ImageStyleLow, TransformProp { }
  export interface ImageStyleLow extends FlexStyle {
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

  export type RulesetNativeIdsLow = 'Text' | 'View' | 'Image'
  export type RulesetNativeIds = RulesetNativeIdsLow | '$NativeText' | '$NativeView' | '$NativeImage' | '$Web'
  export type RulesetNativeIdsEx = RulesetNativeIds | unknown

  // export type RulesetType_<T extends RulesetNativeIds = 'Text'> =
  //   T extends 'View' ? ViewStyle & { $web?: RulesetWeb; $native?: ReactN.ViewStyle } :
  //   T extends 'Text' ? TextStyle & { $web?: RulesetWeb; $native?: ReactN.TextStyle } :
  //   T extends 'Image' ? ImageStyle & { $web?: RulesetWeb; $native?: ReactN.TextStyle } :
  //   T extends '$Web' ? { $web?: RulesetWeb } :
  //   T extends '$NativeView' ? { $native?: ReactN.ViewStyle } :
  //   T extends '$NativeText' ? { $native?: ReactN.TextStyle } :
  //   T extends '$NativeImage' ? { $native?: ReactN.ImageStyle } :
  //   never

  export type RulesetType<T extends RulesetNativeIds = 'Text'> =
    T extends 'View' ? ViewStyle :
    T extends 'Text' ? TextStyle :
    T extends 'Image' ? ImageStyle :
    T extends '$Web' ? RulesetWeb :
    T extends '$NativeView' ? ReactN.ViewStyle :
    T extends '$NativeText' ? ReactN.TextStyle :
    T extends '$NativeImage' ? ReactN.ImageStyle :
    never

  export type RulesetTypeNative<T extends RulesetNativeIds = 'Text'> =
    T extends 'View' ? ReactN.ViewStyle :
    T extends 'Text' ? ReactN.TextStyle :
    T extends 'Image' ? ReactN.ImageStyle :
    T extends '$NativeView' ? ReactN.ViewStyle :
    T extends '$NativeText' ? ReactN.TextStyle :
    T extends '$NativeImage' ? ReactN.ImageStyle :
    never

  export type RulesetTypeWeb<T extends RulesetNativeIds = 'Text'> =
    T extends 'View' ? RulesetWeb :
    T extends 'Text' ? RulesetWeb :
    T extends 'Image' ? RulesetWeb :
    T extends '$Web' ? RulesetWeb :
    never


  //******************** Native ruleset which are compatible with web
  // export type RulesetCommon<T extends RulesetNativeIdsLow> =
  //   T extends '$Web' ? RulesetWeb :
  //   T extends 'View' ? ViewStyle :
  //   T extends 'Image' ? ImageStyle :
  //   TextStyle

  // export type RulesetCommonLow<T extends RulesetNativeIdsLow> =
  //   T extends '$Web' ? RulesetWeb :
  //   T extends 'View' ? ViewStyleLow :
  //   T extends 'Image' ? ImageStyleLow :
  //   TextStyleLow

  //******************** Platform specific ruleset
  export type RulesetNative<T extends RulesetNativeIdsEx = unknown> =
    T extends 'View' ? ReactN.ViewStyle :
    T extends 'Image' ? ReactN.ImageStyle :
    ReactN.TextStyle

  export type NativeProperties<T extends RulesetNativeIdsEx = unknown> =
    T extends 'View' ? ReactN.ViewProperties :
    T extends 'Image' ? ReactN.ImageProperties :
    ReactN.TextProperties

  export type RulesetWeb = React.CSSProperties & { [P in CSS.Pseudos]?: RulesetWeb }
  export type Ruleset = RulesetWeb | RulesetNative

}
