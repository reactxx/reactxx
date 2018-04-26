import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { TCommonStyles } from './common-styles'

export namespace Types {

  /******************************************
    EVENTS
  *******************************************/

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void

  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }


  /******************************************
    RULESET
  *******************************************/

  export type RulesetNativeIds = 'Text' | 'View' | 'Image' | 'ScrollView'

  //*************** cross platform ruleset for web and native

  export type RulesetX<T extends RulesetNativeIds = 'Text'> =
    RulesetCommon<T> & // native rules which are compatible with web
    {
      $native?: RulesetNative<T> // native specific rules
      $web?: RulesetWeb // web specific rules
    } 

  export type RulesetCommon<T extends RulesetNativeIds = never> =
    T extends 'Text' ? TCommonStyles.TextStyle :
    T extends 'Image' ? TCommonStyles.ImageStyle :
    T extends 'ScrollView' ? TCommonStyles.ScrollViewStyle :
    T extends 'View' ? TCommonStyles.ViewStyle :
    TCommonStyles.TextStyle | TCommonStyles.ViewStyle | TCommonStyles.ImageStyle | TCommonStyles.ScrollViewStyle

  export type RulesetNative<T extends RulesetNativeIds = never> =
    T extends 'Text' ? ReactN.TextStyle :
    T extends 'Image' ? ReactN.ImageStyle :
    T extends 'ScrollView' ? ReactN.ScrollViewStyle :
    T extends 'View' ? ReactN.ViewStyle :
    ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle

  //******************** Platform specific ruleset
  export type RulesetWeb = CSS.Properties & { [P in CSS.SimplePseudos]?: CSS.Properties } 
  //export type rulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle
  export type Ruleset<T extends RulesetNativeIds = never> = RulesetWeb | RulesetNative<T>

}
