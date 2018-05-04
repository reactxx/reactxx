import React from 'react'
import ReactN from 'react-native'
import * as CSS from 'csstype'

import { TCommonStyles } from 'reactxx-basic'

export namespace TCommon {

  //******************** Shape
  export interface Shape {
    //**** sheet constrains
    common?: Record<string, TCommonStyles.RulesetNativeIds> // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
    native?: Record<string, TCommonStyles.RulesetNativeIds> // ruleset types, which are used only in native code
    web?: string | null // ruleset names, which are used only in web code (its export type is always React.CSSProperties)
    //******************** native style constrain
    style?: TCommonStyles.RulesetNativeIds // for native: export type of component style property (for web, style has always React.CSSProperties type)
    //**** component property constrains
    props?: {} //common (web and native) props
    propsNative?: {} //native only props 
    propsWeb?: React.HTMLAttributes<Element>//web only props
    //**** export type of component name
    nameType?: string | null
    //**** component theme par
    variant?: {}
    //**** component theme par
    theme?: ThemeBase
  }
  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getNameType<R extends Shape> = R['nameType']
  export type getVariant<R extends Shape = Shape> = R['variant']
  export type getTheme<R extends Shape = Shape> = R['theme']

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeScrollViews<P extends string> = { [p in P]: 'ScrollView' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }

  /******************************************
    RULESET
  *******************************************/

  export interface ThemeBase {
    type?: 'ThemeX'
  }

  export interface WithStyleOptions {
    withTheme?: boolean
    withCascading?: boolean
    withActive?: boolean
  }

  export type ThemeCreator<T extends ThemeBase = ThemeBase> = T | ((theme: T) => T)
  export type ThemeProviderTyped<T extends ThemeBase = ThemeBase> = React.ComponentClass<{ theme: ThemeCreator<T> }>
  export interface ThemeContext { theme?: ThemeBase; $cache?: {} }

}
