import ReactN from 'react-native'

import * as Sheeter from 'reactxx-sheeter'
import { Types, TCommonStyles } from 'reactxx-basic'
import { SheetsRegistry } from 'jss';

export namespace TAnimation {
  //https://engineering.salesforce.com/experiments-with-high-performance-animation-in-react-native-80a0cb7052b0
  //https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/NativeAnimatedHelper.js

  export type ToPairs<T> = { [P in keyof T]?: [T[P], T[P]] | [T[P], T[P], string] }

  export type RuleSetX<T extends TCommonStyles.RulesetNativeIds> = ToPairs<TCommonStyles.RulesetCommon<T>> & {
    transform?: Sheeter.AnimTransform //Array<TNativeTransform>
    // $native?: ToPairs<TCommonStyles.RulesetNative<T>, Diff<keyof TCommonStyles.RulesetNative<T>, 'transform'>> & { transform?: TNativeTransform[] }
    // $web?: ToPairs<TCommonStyles.RulesetWeb> //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
  }

  //export interface Drivers<T extends Shapes = Shapes> extends AnimationsEx { sheets: { [P in keyof T]: Driver<T[P]> } }
  export type Drivers<T extends Shapes = Shapes> = AnimationsEx & { [P in keyof T]: Driver<T[P]> }
  export interface DriversWeb<T extends Shapes> extends AnimationsEx { sheets: { [P in keyof T]: Driver<T[P]> } }
  export interface DriversNative<T extends Shapes> extends AnimationsEx { sheets: { [P in keyof T]: Driver<T[P]> } }

  export interface AnimationsEx { reset: (exceptOf?: Driver<{}>) => void }

  export type Driver<T extends Shape = Shape> = {
    opened: boolean
    open()
    close()
    set(isOpen: boolean)
    toggle()
    reset()
  } & Sheet<T>

  export type SheetWeb<T extends Shape> = { [P in keyof T]: TCommonStyles.RulesetWeb } & Sheeter.AnimationConfig
  export type SheetNative<T extends Shape> = { [P in keyof T]: TCommonStyles.RulesetNative<T[P]> } & Sheeter.AnimationConfig
  export type Sheet<T extends Shape> = { [P in keyof T]: (TCommonStyles.RulesetNative<T[P]> | TCommonStyles.RulesetWeb) } & Sheeter.AnimationConfig

  export type SheetsX<T extends Shapes = Shapes> = { [P in keyof T]: SheetX<T[P]> }
  export type SheetX<T extends Shape> = { [P in keyof T]: RuleSetX<T[P]> } & Sheeter.AnimationConfig

  export type Shape = Record<string, TCommonStyles.RulesetNativeIds>
  export type Shapes = Record<string, Shape>
}
export const fake = 0
