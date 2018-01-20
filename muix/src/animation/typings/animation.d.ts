//https://engineering.salesforce.com/experiments-with-high-performance-animation-in-react-native-80a0cb7052b0
//https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
declare namespace Animation {

  type AnimatedPropsNative = 'paddingLeft' | 'paddingTop' | 'opacity'
  type AnimatedPropsWeb = 'marginBottom' | 'transform' //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties

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

  type RuleSetX<T extends Muix.CSSPropertiesNative> = ToPairs<T, Muix.commonCSSPropertiesNames<T> & AnimatedPropsNative> & {
    transform?: Array<TNativeTransform>
    $native?: ToPairs<T, keyof T & AnimatedPropsNative> & { transform?: TNativeTransform[] }
    $web?: ToPairs<Muix.CSSPropertiesWeb, AnimatedPropsWeb>
  }

  interface Animations<T extends AnimationsShape> {
    drivers: {[P in keyof T]: Animation<T[P]>}
  }
  interface AnimationsWeb<T extends AnimationsShape> {
    drivers: {[P in keyof T]: AnimationWeb<T>}
  }
  interface AnimationsNative<T extends AnimationsShape> {
    drivers: {[P in keyof T]: AnimationNative<T[P]>}
  }

  interface Animation<T extends AnimationShape> {
    opened?: 0 | 1
    open() 
    close()
    set(isOpen: boolean)
    toggle()
    className: Sheet<T>
  }

  interface AnimationWeb<T extends AnimationShape> extends Animation<T> {
    className: SheetWeb<T>
  }
  interface AnimationNative<T extends AnimationShape> extends Animation<T> {
    value: ReactN.Animated.Value
    className: SheetNative<T>
  }

  type SheetWeb<T extends AnimationShape> = {[P in keyof T]: Muix.CSSPropertiesWeb}
  type SheetNative<T extends AnimationShape> = {[P in keyof T]: T[P]}
  type Sheet<T extends AnimationShape> = {[P in keyof T]: (T[P] | Muix.CSSPropertiesWeb)}

  type AnimationShape = Record<string, Muix.CSSPropertiesNative>
  type AnimationsShape = Record<string, AnimationShape>

  //type SheetAnimationsWeb<R extends AnimationsShape> = {[P in keyof R]: AnimationWeb<R[P]>}
  //type SheetAnimationsNative<R extends AnimationsShape> = {[P in keyof R]: AnimationNative<R[P]>}
  //type SheetAnimations<R extends AnimationsShape> = SheetAnimationsWeb<R> | SheetAnimationsNative<R>

  //type GetAnimations<R extends AnimationsShape> = () => Animations<R>
  //type GetAnimationsWeb<R extends AnimationsShape> = () => AnimationsWeb<R>
  //type GetAnimationsNative<R extends AnimationsShape> = () => AnimationsNative<R>

}

