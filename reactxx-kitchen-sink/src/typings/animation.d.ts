//https://engineering.salesforce.com/experiments-with-high-performance-animation-in-react-native-80a0cb7052b0
//https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js
declare namespace Animation {

  type ToPairs<T, K extends keyof T = keyof T> = {[P in K]?: [T[P], T[P]] | [T[P], T[P], string]}

  type ToPairsTransform<T, K extends keyof T = keyof T> = {[P in K]?: [T[P], T[P]]}

  type TNativeTransform = string | ToPairsTransform<ReactN.PerpectiveTransform> | ToPairsTransform<ReactN.RotateTransform> | ToPairsTransform<ReactN.RotateXTransform> | ToPairsTransform<ReactN.RotateYTransform> | ToPairsTransform<ReactN.RotateZTransform> | ToPairsTransform<ReactN.ScaleTransform> |
    ToPairsTransform<ReactN.ScaleXTransform> | ToPairsTransform<ReactN.ScaleYTransform> | ToPairsTransform<ReactN.TranslateXTransform> | ToPairsTransform<ReactN.TranslateYTransform> | ToPairsTransform<ReactN.SkewXTransform> | ToPairsTransform<ReactN.SkewYTransform>
  type Pair = [number | string, number | string]

  interface AnimationConfig {
    $easing?: string
    $duration?: number
    $delay?: number
    $opened?: boolean
  }

  type RuleSetX<T extends ReactXX.RulesetNative> = ToPairs<T, ReactXX.commonRuleNames<T>> & {
    transform?: Array<TNativeTransform>
    $native?: ToPairs<T, Diff<keyof T, 'transform'>> & { transform?: TNativeTransform[] }
    $web?: ToPairs<ReactXX.RulesetWeb, keyof React.CSSPropertiesLow> //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
  }

  type Drivers<T extends Shapes = Shapes> = {[P in keyof T]: Driver<T[P]> } & AnimationsEx
  type DriversWeb<T extends Shapes> = {[P in keyof T]: DriverWeb<T[P]> } & AnimationsEx
  type DriversNative<T extends Shapes> = {[P in keyof T]: DriverNative<T[P]> } & AnimationsEx

  type AnimationsEx = { reset: (caller?: Animation.Driver<{}>) => void; statefullComponent: React.Component }

  interface Driver<T extends Shape> {
    opened: boolean
    open() 
    close()
    set(isOpen: boolean)
    toggle()
    reset()
    sheet: Sheet<T>
    animations: Drivers<{}>
  }

  interface DriverWeb<T extends Shape> extends Driver<T> {
    sheet: SheetWeb<T>
  }
  interface DriverNative<T extends Shape> extends Driver<T> {
    value: ReactN.Animated.Value
    sheet: SheetNative<T>
  }

  type SheetWeb<T extends Shape> = {[P in keyof T]: ReactXX.RulesetWeb} & AnimationConfig
  type SheetNative<T extends Shape> = {[P in keyof T]: T[P]} & AnimationConfig
  type Sheet<T extends Shape> = {[P in keyof T]: (T[P] | ReactXX.RulesetWeb) } & AnimationConfig

  type SheetsX<T extends Shapes> = {[P in keyof T]: SheetX<T[P]>}
  type SheetX<T extends Shape> = {[P in keyof T]: RuleSetX<T[P]>} & AnimationConfig

  type Shape = Record<string, ReactXX.RulesetNative>
  type Shapes = Record<string, Shape>
}

