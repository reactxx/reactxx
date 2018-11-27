import React, { Children } from 'react'
import ReactN from 'react-native'
import CSS from 'csstype';

import { TCommonStyles, TTyped, TEngine, TVariants } from './index'
import { TComponents } from './components';

declare namespace TSheeter {

  /******************************************
    STYLE
  *******************************************/

  export type StyleOrCreator<R extends Shape = Shape> = any //StyleOrAtomized<R> | ((theme: getTheme<R>) => StyleOrAtomized<R>)

  export type StyleOrAtomized<R extends Shape = Shape> = any //StyleItem<R> | StyleItem<R>[]

  export type StyleItem<R extends Shape = Shape> = any //Style<R> | TAtomize.AtomizedRuleset

  export type StyleOrAtomizedWeb = any //Style | Style[]


  export type Style<R extends Shape = Shape> = any/*TODO*/ //TCommonStyles.RulesetType<getStyle<R>>
 
  /******************************************
    SHAPE
  *******************************************/

  // component shape
  export interface Shape extends TVariants.ShapePart {
    staticProps: EmptyInterface
    propsNative: EmptyInterface // native only props 
    propsWeb: React.HTMLAttributes<Element>// web only props
    events: EmptyInterface // common events
  }

  // ancestor for Shape inheritance
  export interface ShapeAncestor extends TVariants.ShapePart {
    staticProps: EmptyInterface
    propsNative: ReactN.ViewProperties
    propsWeb: React.DOMAttributes<Element>
    events: EmptyInterface //ShapeWeb<TEventsAll>
  }

  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getEvents<R extends Shape = Shape> = keyof R['events']
  export type getStaticProps<R extends Shape = Shape> = keyof R['staticProps'] extends never ? FakeInterface : R['staticProps']

  export interface EmptyInterface { }
  export interface FakeInterface { ['`']?: any }
} 