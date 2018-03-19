
import rn from 'react-native'

declare global {
  namespace ReactN {
    type ViewStyle = rn.ViewStyle
    type TextStyle = rn.TextStyle
    type ScrollViewStyle = rn.ScrollViewStyle
    type ImageStyle = rn.ImageStyle
    type ViewProperties = rn.ViewProperties
    type TextProperties = rn.TextProperties
    type ScrollViewProperties = rn.ScrollViewProperties
    type TouchableOpacityProperties = rn.TouchableOpacityProperties

    type PerpectiveTransform = rn.PerpectiveTransform
    type RotateTransform = rn.RotateTransform
    type RotateXTransform = rn.RotateXTransform
    type RotateYTransform = rn.RotateYTransform
    type RotateZTransform = rn.RotateZTransform
    type ScaleTransform = rn.ScaleTransform
    type ScaleXTransform = rn.ScaleXTransform
    type ScaleYTransform = rn.ScaleYTransform
    type TranslateXTransform = rn.TranslateXTransform
    type TranslateYTransform = rn.TranslateYTransform
    type SkewXTransform = rn.SkewXTransform
    type SkewYTransform = rn.SkewYTransform

    export namespace Animated {
      type Value = rn.Animated.Value
    }

  }
}