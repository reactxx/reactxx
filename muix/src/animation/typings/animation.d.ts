//https://engineering.salesforce.com/experiments-with-high-performance-animation-in-react-native-80a0cb7052b0
//https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
declare namespace Animation {

  type ToPairs<T, K extends keyof T = keyof T> = {[P in K]?: [T[P], T[P]] | [T[P], T[P], string]}

  type ToPairsTransform<T, K extends keyof T = keyof T> = {[P in K]?: [T[P], T[P]]}

  type TNativeTransform = string | ToPairsTransform<ReactN.PerpectiveTransform> | ToPairsTransform<ReactN.RotateTransform> | ToPairsTransform<ReactN.RotateXTransform> | ToPairsTransform<ReactN.RotateYTransform> | ToPairsTransform<ReactN.RotateZTransform> | ToPairsTransform<ReactN.ScaleTransform> |
    ToPairsTransform<ReactN.ScaleXTransform> | ToPairsTransform<ReactN.ScaleYTransform> | ToPairsTransform<ReactN.TranslateXTransform> | ToPairsTransform<ReactN.TranslateYTransform> | ToPairsTransform<ReactN.SkewXTransform> | ToPairsTransform<ReactN.SkewYTransform>
  type Pair = [number | string, number | string]

  type AnimationsX<T extends AnimationsShape> = {[P in keyof T]: AnimationX<T[P]>}
  type AnimationX<T extends AnimationShape> = {[P in keyof T]: RuleSetX<T[P]>} & AnimationConfig

  interface AnimationConfig {
    $easing?: string
    $duration?: number
    $delay?: number
    $opened?: boolean
  }

  type RuleSetX<T extends Prim5s.RulesetNative> = ToPairs<T, Prim5s.commonRuleNames<T>> & {
    transform?: Array<TNativeTransform>
    $native?: ToPairs<T, Diff<keyof T, 'transform'>> & { transform?: TNativeTransform[] }
    $web?: ToPairs<Prim5s.RulesetWeb, keyof React.CSSPropertiesLow> //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
  }

  type Animations<T extends AnimationsShape> = {[P in keyof T]: Animation<T[P]> } & AnimationsEx
  type AnimationsWeb<T extends AnimationsShape> = {[P in keyof T]: AnimationWeb<T[P]> } & AnimationsEx
  type AnimationsNative<T extends AnimationsShape> = {[P in keyof T]: AnimationNative<T[P]> } & AnimationsEx

  type AnimationsEx = { reset: (caller?: Animation.Animation<{}>) => void; statefullComponent: React.Component }

  interface Animation<T extends AnimationShape> {
    opened: boolean
    open() 
    close()
    set(isOpen: boolean)
    toggle()
    reset()
    sheet: Sheet<T>
    animations: Animations<{}>
  }

  interface AnimationWeb<T extends AnimationShape> extends Animation<T> {
    sheet: SheetWeb<T>
  }
  interface AnimationNative<T extends AnimationShape> extends Animation<T> {
    value: ReactN.Animated.Value
    sheet: SheetNative<T>
  }

  type SheetWeb<T extends AnimationShape> = {[P in keyof T]: Prim5s.RulesetWeb} & AnimationConfig
  type SheetNative<T extends AnimationShape> = {[P in keyof T]: T[P]} & AnimationConfig
  type Sheet<T extends AnimationShape> = {[P in keyof T]: (T[P] | Prim5s.RulesetWeb) } & AnimationConfig

  type AnimationShape = Record<string, Prim5s.RulesetNative>
  type AnimationsShape = Record<string, AnimationShape>
}

