import ReactN from 'react-native'

import { Types } from 'reactxx-basic'

export namespace TAnimation {
  //https://engineering.salesforce.com/experiments-with-high-performance-animation-in-react-native-80a0cb7052b0
  //https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js

  export type ToPairs<T, K extends keyof T = keyof T> = { [P in K]?: [T[P], T[P]] | [T[P], T[P], string] }

  export type ToPairsTransform<T, K extends keyof T = keyof T> = { [P in K]?: [T[P], T[P]] }

  export type TNativeTransform = string | ToPairsTransform<ReactN.PerpectiveTransform> | ToPairsTransform<ReactN.RotateTransform> | ToPairsTransform<ReactN.RotateXTransform> | ToPairsTransform<ReactN.RotateYTransform> | ToPairsTransform<ReactN.RotateZTransform> | ToPairsTransform<ReactN.ScaleTransform> |
    ToPairsTransform<ReactN.ScaleXTransform> | ToPairsTransform<ReactN.ScaleYTransform> | ToPairsTransform<ReactN.TranslateXTransform> | ToPairsTransform<ReactN.TranslateYTransform> | ToPairsTransform<ReactN.SkewXTransform> | ToPairsTransform<ReactN.SkewYTransform>
  export type Pair = [number | string, number | string]

  export interface AnimationConfig {
    $easing?: string
    $duration?: number
    $delay?: number
    $opened?: boolean
  }

  export type RuleSetX<T extends Types.RulesetNativeIds> = ToPairs<Types.RulesetCommon<T>> & {
    transform?: Array<TNativeTransform>
    $native?: ToPairs<Types.RulesetNative<T>, Diff<keyof Types.RulesetNative<T>, 'transform'>> & { transform?: TNativeTransform[] }
    $web?: ToPairs<Types.RulesetWeb> //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
  }

  export interface Drivers<T extends Shapes = Shapes> extends AnimationsEx { sheets: { [P in keyof T]: Driver<T[P]> } }
  export interface DriversWeb<T extends Shapes> extends AnimationsEx { sheets: { [P in keyof T]: DriverWeb<T[P]> } }
  export interface DriversNative<T extends Shapes> extends AnimationsEx { sheets: { [P in keyof T]: DriverNative<T[P]> } }

  export interface AnimationsEx { init: (sheetsDef: TAnimation.SheetsX<TAnimation.Shapes>) => void; destroy: (caller?: Driver<{}>) => void; statefullComponent: React.Component }

  export interface Driver<T extends Shape> {
    opened: boolean
    open()
    close()
    set(isOpen: boolean)
    toggle()
    reset()
    sheet: Sheet<T>
  }

  export interface DriverWeb<T extends Shape> extends Driver<T> {
    sheet: SheetWeb<T>
  }
  export interface DriverNative<T extends Shape> extends Driver<T> {
    value: ReactN.Animated.Value
    sheet: SheetNative<T>
  }

  export type SheetWeb<T extends Shape> = { [P in keyof T]: Types.RulesetWeb } & AnimationConfig
  export type SheetNative<T extends Shape> = { [P in keyof T]: Types.RulesetNative<T[P]> } & AnimationConfig
  export type Sheet<T extends Shape> = { [P in keyof T]: (Types.RulesetNative<T[P]> | Types.RulesetWeb) } & AnimationConfig

  export type SheetsX<T extends Shapes> = { [P in keyof T]: SheetX<T[P]> }
  export type SheetX<T extends Shape> = { [P in keyof T]: RuleSetX<T[P]> } & AnimationConfig

  export type Shape = Record<string, Types.RulesetNativeIds>
  export type Shapes = Record<string, Shape>
}
export const fake = 0
