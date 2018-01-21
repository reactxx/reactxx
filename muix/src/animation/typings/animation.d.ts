//https://engineering.salesforce.com/experiments-with-high-performance-animation-in-react-native-80a0cb7052b0
//https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
declare namespace Animation {

  type ToPairs<T, K extends keyof T = keyof T> = {[P in K]?: [T[P], T[P]]}

  type TNativeTransform = ToPairs<ReactN.PerpectiveTransform> | ToPairs<ReactN.RotateTransform> | ToPairs<ReactN.RotateXTransform> | ToPairs<ReactN.RotateYTransform> | ToPairs<ReactN.RotateZTransform> | ToPairs<ReactN.ScaleTransform> |
    ToPairs<ReactN.ScaleXTransform> | ToPairs<ReactN.ScaleYTransform> | ToPairs<ReactN.TranslateXTransform> | ToPairs<ReactN.TranslateYTransform> | ToPairs<ReactN.SkewXTransform> | ToPairs<ReactN.SkewYTransform>
  type Pair = [number | string, number | string]

  type AnimationsX<T extends AnimationsShape> = {[P in keyof T]: AnimationX<T[P]>}
  type AnimationX<T extends AnimationShape> = {[P in keyof T]: RuleSetX<T[P]>} & AnimationConfig

  interface AnimationConfig {
    $easing?: string
    $duration?: number
    $delay?: number
    $opened?: boolean
  }

  type RuleSetX<T extends Muix.CSSPropertiesNative> = ToPairs<T, Muix.commonCSSPropertiesNames<T>> & {
    transform?: Array<TNativeTransform>
    $native?: ToPairs<T, Diff<keyof T, 'transform'>> & { transform?: TNativeTransform[] }
    $web?: ToPairs<Muix.CSSPropertiesWeb, keyof React.CSSPropertiesLow> //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
  }

  type Animations<T extends AnimationsShape> = {[P in keyof T]: Animation<T[P]> }
  type AnimationsWeb<T extends AnimationsShape> = {[P in keyof T]: AnimationWeb<T[P]> }
  type AnimationsNative<T extends AnimationsShape> = {[P in keyof T]: AnimationNative<T[P]> }

  interface Animation<T extends AnimationShape> {
    opened: boolean
    open() 
    close()
    set(isOpen: boolean)
    toggle()
    sheet: Sheet<T>
  }

  interface AnimationWeb<T extends AnimationShape> extends Animation<T> {
    sheet: SheetWeb<T>
  }
  interface AnimationNative<T extends AnimationShape> extends Animation<T> {
    value: ReactN.Animated.Value
    sheet: SheetNative<T>
  }

  type SheetWeb<T extends AnimationShape> = {[P in keyof T]: Muix.CSSPropertiesWeb}
  type SheetNative<T extends AnimationShape> = {[P in keyof T]: T[P]}
  type Sheet<T extends AnimationShape> = {[P in keyof T]: (T[P] | Muix.CSSPropertiesWeb)}

  type AnimationShape = Record<string, Muix.CSSPropertiesNative>
  type AnimationsShape = Record<string, AnimationShape>
}

