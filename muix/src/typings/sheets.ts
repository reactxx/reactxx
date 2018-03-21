import ReactN from 'react-native'

import { TAddInConfig } from 'typescript-config'
import { TBasic, TComps } from 'reactxx-basic/typings'


import { TTheme } from './theme'
import { TAnimation } from './animation'
import { TMediaQ } from './media-q'

export namespace TSheets {

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void
  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }
  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

  export interface WithStylesOptionsNew<TName extends (string | null) = null> {
    name: keyof Shapes
    flip?: boolean
  }

  /******************************************
    RULESET
  *******************************************/

  //*************** cross platform ruleset for web and native

  export type RulesetX<T extends TBasic.RulesetNativeIds = 'Text', R extends Shape = Shape> = TBasic.RulesetX<T,R>

  //export type RulesetX<T extends RulesetNative = ReactN.TextStyle, R extends Shape = Shape> =
  //  commonRules<T> & // native rules which are compatible with web
  //  {
  //    $native?: T // native specific rules
  //    $web?: RulesetWeb // web specific rules
  //  } &
  //  TAddInConfig.RulesetAddInX<T, R> // sheet addIn: overriding, media query 


  //// rule names, common for native and web
  //export type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
  //// native rules, which are compatible with web
  //export type commonRules<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

  //export type ViewRulesetCommonX = commonRules<ReactN.ViewStyle>

  //export type ViewRulesetX = RulesetX<ReactN.ViewStyle>
  //export type TextRulesetX = RulesetX<ReactN.TextStyle>

  export type ViewRulesetCommonX = TBasic.ViewRulesetCommonX

  export type ViewRulesetX = TBasic.ViewRulesetX
  export type TextRulesetX = TBasic.TextRulesetX

  //******************** Platform specific ruleset
  export type RulesetWeb = React.CSSProperties //??? https://github.com/programbo/cssproperties/blob/master/css-properties.d.ts
  export type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle
  export type Ruleset = RulesetNative | RulesetWeb

  /******************************************
    COMPONENT SHAPE
  *******************************************/
  export interface Shape extends TBasic.Shape {
    //**** export type of component name
    nameType?: string | null
    //**** animation shape
    animation?: TAnimation.Shapes
    //**** mediaq shape
    mediaq?: TMediaQ.Shape | null
    //**** component theme par
    compTheme?: {}
  }

  //export interface ShapesLow { [name: string]: Shape } 
  export interface Shapes { }

  //******************** Helpers for Shape.common and Shape.native definitin
  export type ShapeTexts<P extends string> = TComps.ShapeTexts<P>
  export type ShapeViews<P extends string> = TComps.ShapeViews<P>
  export type ShapeScrollViews<P extends string> = TComps.ShapeScrollViews<P>
  export type ShapeImages<P extends string> = TComps.ShapeImages<P>
  export type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
    common: {}; native: {}; web: null
    style: 'View'//ReactN.ViewStyle
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    animation: {}; mediaq: null,
    nameType: null
    compTheme: never
  }, R>

  //******************** Shape getters
  export type getCommon<R extends TBasic.Shape> = R['common']
  export type getNative<R extends TBasic.Shape> = R['native']
  export type getWeb<R extends TBasic.Shape> = R['web']
  export type getStyle<R extends TBasic.Shape> = R['style']
  export type getProps<R extends TBasic.Shape> = R['props']
  export type getPropsWeb<R extends TBasic.Shape> = R['propsWeb']
  export type getPropsNative<R extends TBasic.Shape> = R['propsNative']

  export type getAnimation<R extends Shape> = R['animation']
  export type getNameType<R extends Shape> = R['nameType']
  export type getCompTheme<R extends Shape = Shape> = R['compTheme']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']

  /******************************************
    ADDINS
  *******************************************/

  ////******************** Cross platform 
  //export interface RulesetAddInX<T extends RulesetNative, R extends Shape> { $overrides?: PartialSheetX<R>; $name?: string; $mediaq?: TMediaQ.SheetX<T, R>; $props?: PropsInRulesetX<R> }
  //export interface SheetXAddIn<R extends Shape = Shape> { $animations?: TAnimation.SheetsX<getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<getMediaQ<R>> }

  ////******************** Platform specific
  //export type TAddInConfig.RulesetWithAddIn<R extends Shape = Shape> = Ruleset & { $overrides?: Sheet<R>; $name?: string; $props?: PropsInRuleset<R>; $mediaq?: TMediaQ.NotifySheetX<getMediaQ<R>> }
  //export interface TAddInConfig.RulesetWithAddInWeb<R extends Shape = Shape> extends RulesetWeb { $overrides?: SheetWeb<R>; $name?: string; $props?: PropsInRulesetWeb<R> }
  //export type TAddInConfig.RulesetWithAddInNative<T extends RulesetNative = {}, R extends Shape = Shape> = T & { $overrides?: SheetNative<R>; $name?: string; $props?: PropsInRulesetNative<R> }

  //export interface TAddInConfig.SheetAddInWeb<R extends Shape = Shape> { $animations?: TAnimation.SheetsX<getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<getMediaQ<R>> }
  //export interface TAddInConfig.SheetAddInNative<R extends Shape = Shape> { $animations?: TAnimation.SheetsX<getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<getMediaQ<R>> }

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  //export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddInConfig.SheetXAddIn<R>
  //export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & TAddInConfig.SheetXAddIn<R>

  ////Cross platform sheet helpers
  //export type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
  //export type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: (getNative<R>[P] & TAddInConfig.RulesetAddInX<getNative<R>[P], R>) }
  //export type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: (RulesetWeb & TAddInConfig.RulesetAddInX<never, R>) }

  ////******************** Platform specific sheets
  //export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, TAddInConfig.RulesetWithAddInWeb<R>> & TAddInConfig.SheetAddInWeb<R>
  //export type SheetNative<R extends Shape = Shape> =
  //  { [P in keyof getCommon<R>]: TAddInConfig.RulesetWithAddInNative<getCommon<R>[P], R> } &
  //  { [P in keyof getNative<R>]: TAddInConfig.RulesetWithAddInNative<getNative<R>[P], R> } &
  //  TAddInConfig.SheetAddInNative<R>
  //export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  //export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  export type SheetX<R extends Shape = Shape> = TBasic.SheetX<R>
  export type PartialSheetX<R extends Shape = Shape> = TBasic.PartialSheetX<R>

  //Cross platform sheet helpers
  export type SheetXCommon<R extends Shape> = TBasic.SheetXCommon<R>
  export type SheetXNative<R extends Shape> = TBasic.SheetXNative<R>
  export type SheetXWeb<R extends Shape> = TBasic.SheetXWeb<R>

  //******************** Platform specific sheets
  export type SheetWeb<R extends Shape = Shape> = TBasic.SheetWeb<R>
  export type SheetNative<R extends Shape = Shape> = TBasic.SheetNative<R>
  export type Sheet<R extends Shape = Shape> = TBasic.Sheet<R>
  export type PartialSheet<R extends Shape> = TBasic.PartialSheet<R>


  //******************** Ruleset Merge
  export type MergeRulesetWithOverrides = (...rulesets: TAddInConfig.RulesetWithAddIn[]) => Ruleset
  export type MergeRulesetWithOverridesNative = (...rulesets: (TAddInConfig.RulesetWithAddInNative | ReactN.TextStyle)[]) => RulesetNative
  export type MergeRulesetWithOverridesWeb = (...rulesets: TAddInConfig.RulesetWithAddInWeb[]) => RulesetWeb


  /******************************************
    ALL SHEETS
  *******************************************/
  export type SheetsWeb = { [P in keyof Shapes]?: SheetWeb<Shapes[P]> }
  export type SheetsNative = { [P in keyof Shapes]?: SheetNative<Shapes[P]> }
  export type Sheets = { [P in keyof Shapes]?: Sheet<Shapes[P]> }


  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** cross platform Component props (Component is created by 'withStyles' ) 

  export type PropsX<R extends Shape = Shape> = TBasic.PropsX<R>
  //Partial < Overwrite < getProps < R >, {
  //  style?: TTheme.RulesetCreatorX<R> //| RulesetWeb | getStyle<R> //cross platform style
  //  $web?: Partial<getPropsWeb<R>> //web specific style
  //  $native?: Partial<getPropsNative<R>> //native specific style
  //  ignore?: boolean
  //  classes?: TTheme.PartialSheetCreatorX<R> //| PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
  //  modifyThemeState?: TTheme.ThemeModifier
  //  className?: TTheme.RulesetCreatorX<R> /*cross platform root ruleset*/ //| RulesetWeb | getStyle<R> /*platform specific root ruleset (when component is used in other component)*/
  //}>>
  //export type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, Ruleset> // common and web and native

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //******************** Component's code (passed to withStyles)

  // component code for web
  export type CodePropsWeb<R extends Shape = Shape> = TBasic.CodePropsWeb<R>
  //  Overwrite<getProps<R> & getPropsWeb<R>, {
  //  className: RulesetWeb
  //  style: RulesetWeb
  //  classes: SheetWeb<R>

  //  theme: TTheme.ThemeX
  //  mergeRulesetWithOverrides: MergeRulesetWithOverridesWeb
  //  animations: TAnimation.DriversWeb<getAnimation<R>>
  //  mediaq: TMediaQ.ComponentsMediaQ<getMediaQ<R>>
  //} & OnPressAllWeb>
  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>


  // component code for native
  export type CodePropsNative<R extends Shape = Shape> = TBasic.CodePropsNative<R>
  //  Overwrite<getProps<R> & getPropsNative<R>, {
  //  className: getStyle<R>
  //  style: getStyle<R>
  //  classes: SheetNative<R>

  //  theme: TTheme.ThemeX
  //  mergeRulesetWithOverrides: MergeRulesetWithOverridesNative
  //  animations: TAnimation.DriversNative<getAnimation<R>>
  //  mediaq: TMediaQ.ComponentsMediaQ<getMediaQ<R>>
  //} & OnPressAllNative>
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  export type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //some code for components could be shared for web and native
  export type CodeProps<R extends Shape = Shape> = TBasic.CodeProps<R>
  //  Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), {
  //  className: RulesetWeb | getStyle<R>
  //  classes: Sheet<R>
  //  style: RulesetWeb | getStyle<R>
  //  //flip: boolean
  //  mergeRulesetWithOverrides: MergeRulesetWithOverrides
  //  theme: TTheme.ThemeX
  //  animations: TAnimation.Drivers<getAnimation<R>>
  //  mediaq: TMediaQ.ComponentsMediaQ<getMediaQ<R>>
  //  //this?:boolean //?? why ??
  //} & (OnPressAllNative | OnPressAllWeb)>
  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  //******************** $props in rulesets
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    childClasses?: never
    className?: never
  }>>

  export type PropsInRulesetWeb<R extends Shape = Shape> = getProps<R> & getPropsWeb<R>
  export type PropsInRulesetNative<R extends Shape = Shape> = getProps<R> & getPropsNative<R>
  export type PropsInRuleset<R extends Shape = Shape> = getProps<R> & (getPropsNative<R> | getPropsWeb<R>)

}
