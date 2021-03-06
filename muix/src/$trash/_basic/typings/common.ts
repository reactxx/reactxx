﻿import React from 'react'
import ReactN from 'react-native'

import { TCommonStyles } from './common-styles'

export namespace TCommon {

  //******************** Shape
  export type TEventOnPress = 'onPress'
  export type TEvents = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'

  export type TEventsX = 'onPress' | 'onLongPress'
  export type TEventsAll = TEvents
  export interface EmptySheet { 
  }
  export interface Shape {
    //**** sheet constrains
    common?: EmptySheet // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
    native?: EmptySheet // ruleset types, which are used only in native code
    web?: string // ruleset names, which are used only in web code (its type is always React.CSSProperties)
    //******************** native style constrain
    style?: TCommonStyles.RulesetNativeIds // for native: export type of component style property (for web, style has always React.CSSProperties type)
    //**** component property constrains
    events?: TEvents | null
    props?: TCommon.EmptySheet //common (web and native) props
    propsNative?: {} //native only props 
    propsWeb?: React.HTMLAttributes<Element>//web only props
    //**** component theme par
    variant?: {}
    //**** component theme
    theme?: ThemeBase
  }
  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  //export type getNameType<R extends Shape> = R['nameType']
  export type getVariant<R extends Shape = Shape> = R['variant']
  export type getTheme<R extends Shape = Shape> = R['theme']
  export type getEvents<R extends Shape = Shape> = R['events']

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeScrollViews<P extends string> = { [p in P]: 'ScrollView' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }

  /******************************************
    RULESET
  *******************************************/

  export interface ThemeBase {
    //type?: 'ThemeX'
    //themeName?:string
  }

  export interface WithStyleOptions {
    name?: string
    withTheme?: boolean
    withCascading?: boolean
    withActive?: boolean
    isMui?: boolean

    getVariant?
    variantToString?
    defaultProps?

  }

  //export type ThemeProviderProp<T extends ThemeBase = ThemeBase> = string | T
  export type ThemeProviderProps<T extends ThemeBase = ThemeBase> = { theme: T | string | ((parentTheme: T) => T) }
  export type ThemeProviderTyped<T extends ThemeBase = ThemeBase> = React.ComponentClass<ThemeProviderProps<T>>
  export interface ThemeContext { theme?: ThemeBase; $cache?: {}[] }

} 