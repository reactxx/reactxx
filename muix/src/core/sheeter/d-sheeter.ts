import React, { Children } from 'react'
import ReactN from 'react-native'
import CSS from 'csstype';

import { TCommonStyles, TAtomize, TVariants } from '../d-index'

export namespace TSheeter {

  /******************************************
    RULESET - Cross platform ruleset for web and native
  *******************************************/

  export type Ruleset<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<T> & // native rules which are compatible with web
    RulesetLow<T, R> &
    { name?: string }

  export interface RulesetLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> extends
    TVariants.VariantPart<T, R> {
    $native?: RulesetNativeOrAtomized<T, R>// native specific rules
    $web?: RulesetWebOrAtomized<T, R> // web specific rules
  }

  export type RulesetItem<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    Ruleset<T, R> | TAtomize.Ruleset
  export type RulesetOrAtomized<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    RulesetItem<T, R> | RulesetItem<T, R>[]
  export type RulesetOrCreator<R extends Shape = Shape> = RulesetOrAtomized<R> | ((theme: getTheme<R>) => RulesetOrAtomized<R>)

  export type RulesetNativeItem<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    RulesetNative<T, R> | TAtomize.Ruleset
  export type RulesetNativeOrAtomized<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    RulesetNativeItem<T, R> | RulesetNativeItem<T, R>[]
  export type RulesetNative<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    TCommonStyles.RulesetNative<T> & // native rules which are compatible with web
    TVariants.VariantPart<T, R>

  export type RulesetWebItem<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    RulesetWeb<T, R> | TAtomize.Ruleset
  export type RulesetWebOrAtomized<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    RulesetWebItem<T, R> | RulesetWebItem<T, R>[]
  export type RulesetWeb<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
    React.CSSProperties &
    { [P in CSS.Pseudos]?: RulesetWeb<T, R> } &
    TVariants.VariantPart<T, R>
  // export type RulesetWebLow<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> =
  //   React.CSSProperties & { [P in CSS.Pseudos]?: RulesetWeb<T, R> }

  /******************************************
    STYLE
  *******************************************/

  export type StyleOrCreator<R extends Shape = Shape> = StyleOrAtomized<R> | ((theme: getTheme<R>) => StyleOrAtomized<R>)
  //export type StyleOrCreator = any

  export type StyleItem<R extends Shape = Shape> = Style<R> | TAtomize.Style

  export type Style<R extends Shape = Shape> =
    TCommonStyles.RulesetCommon<getStyle<R>> & StyleLow<R>

  export type StyleOrAtomized<R extends Shape = Shape> = StyleItem<R> | StyleItem<R>[]

  export type StyleOrAtomizedWeb = Style | (Style | TAtomize.StyleWeb)[]

  //export type StyleWebItem = Style | TAtomize.StyleWeb
  //export type StyleWeb = StyleWebItem | StyleWebItem[]
  //export type StyleWebrCreator<R extends Shape = Shape> = StyleWeb | ((theme: getTheme<R>) => StyleWeb)
  //export type StyleX = StyleWeb | RulesetOrAtomized
  //export type StyleOrCreator<R extends Shape = Shape> = StyleX | ((theme: getTheme<R>) => StyleX)

  export interface StyleLow<R extends Shape = Shape> {
    $native?: TCommonStyles.RulesetNative<getStyle<R>>
    $web?: React.CSSProperties
  }

  /******************************************
      SHEET
  *******************************************/

  export type Sheet<R extends Shape = Shape> = SheetCommon<R> & SheetNative<R> & SheetWeb<R>
  //export type Sheet<R extends Shape = Shape> = SheetCommon2<R>
  export type SheetCreator<R extends Shape = Shape> = (theme: getTheme<R>) => Sheet<R>
  export type SheetOrCreator<R extends Shape = Shape> = SheetCreator<R> | Sheet<R>

  export type PartialSheet<R extends Shape = Shape> = Partial<SheetCommon<R> & SheetNative<R> & SheetWeb<R>>
  //export type PartialSheet<R extends Shape = Shape> = SheetCommonPartial2<R>
  export type PartialSheetCreator<R extends Shape = Shape> = (theme: getTheme<R>) => PartialSheet<R>
  export type PartialSheetOrCreator<R extends Shape = Shape> = PartialSheet<R> | PartialSheetCreator<R>

  export type SheetCommon<R extends Shape> = keyof getCommon<R> extends never ? {} :
    { [P in keyof getCommon<R>]: RulesetOrAtomized<getCommon<R>[P], R> }

  export type SheetNative<R extends Shape> = keyof getNative<R> extends never ? {} :
    { [P in keyof getNative<R>]: {
      $native?: RulesetNativeOrAtomized<getNative<R>[P]>
    } }

  export type SheetWeb<R extends Shape> = getWeb<R> extends never ? {} :
    { [P in getWeb<R>]: {
      $web?: RulesetWebOrAtomized<'Text', R>
    } }


  /******************************************
    SHAPE
  *******************************************/

  // Shape for generic default, e.g. "interface X<R extends Shape = Shape> {} " 
  export interface Shape {
    //**** sheet constrains
    common: EmptyInterface // rulesets (and their native type), which are used in both web and native component code. Rule are compatible with web and native.
    native: EmptyInterface // rulesets, which are used only in native code
    web: EmptyInterface // ruleset names, which are used only in web code (its type is always React.CSSProperties)
    sheetFlags: EmptyInterface
    //******************** style constrain
    style: TCommonStyles.RulesetNativeIds // for web, style has always React.CSSProperties type
    //**** component property constrains
    props: EmptyInterface // common (web and native) props, excluding events
    propsNative: EmptyInterface // native only props 
    propsWeb: React.HTMLAttributes<Element>// web only props
    events: EmptyInterface // common events
    theme: EmptyInterface
  }

  // ancestor for Shape inheritance
  export interface ShapeAncestor {
    common: EmptyInterface
    native: EmptyInterface
    web: EmptyInterface
    sheetFlags: EmptyInterface
    style: unknown
    props: EmptyInterface
    propsNative: ReactN.ViewProperties
    propsWeb: React.DOMAttributes<Element>
    events: EmptyInterface //ShapeWeb<TEventsAll>
    theme: EmptyInterface

    // 
    $Sheet: Sheet<this>
    $PartialSheet: PartialSheet<this>
    $SheetOrCreator: SheetOrCreator<this>
  }

  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = keyof R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getEvents<R extends Shape = Shape> = keyof R['events']
  export type getFlags<R extends Shape = Shape> = keyof R['sheetFlags']
  export type getTheme<R extends Shape = Shape> = R['theme']

  export type RulesetNamesAll<R extends Shape> = keyof getCommon<R> | keyof getNative<R> | getWeb<R>

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }

  export type ShapeWeb<P extends string> = { [p in P]: true }
  export type ShapeFlags<P extends string> = { [p in P]: true }

  export interface EmptyInterface { }

  //export type RulesetItem<R extends Shape = Shape> = Ruleset<getStyle<R>, R> | TAtomize.Ruleset
  //export type RulesetOrAtomized<R extends Shape = Shape> = ClassNameItem<R> | ClassNameItem<R>[]

  export type SheetX<R extends Shape = Shape> = Sheet<R> | TAtomize.Sheet<R>


} 