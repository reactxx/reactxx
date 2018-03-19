import ReactN from 'react-native'

import { ThemeT } from './theme'
import { Animation } from './animation'
import { MediaQ } from './media-q'

export namespace SheetsT {

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

  export type RulesetX<T extends RulesetNative = ReactN.TextStyle, R extends Shape = Shape> =
    commonRules<T> & // native rules which are compatible with web
    {
      $native?: T // native specific rules
      $web?: RulesetWeb // web specific rules
    } &
    RulesetAddInX<T, R> // sheet addIn: overriding, media query 


  // rule names, common for native and web
  export type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
  // native rules, which are compatible with web
  export type commonRules<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

  export type ViewRulesetCommonX = commonRules<ReactN.ViewStyle>
  export type ViewRulesetX = RulesetX<ReactN.ViewStyle>
  export type TextRulesetX = RulesetX<ReactN.TextStyle>

  //******************** Platform specific ruleset
  export type RulesetWeb = React.CSSProperties //??? https://github.com/programbo/cssproperties/blob/master/css-properties.d.ts
  export type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle
  export type Ruleset = RulesetNative | RulesetWeb

  /******************************************
    COMPONENT SHAPE
  *******************************************/
  export interface Shape {
    //**** sheet constrains
    common: Record<string, RulesetNative> // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
    native: Record<string, RulesetNative> // ruleset types, which are used only in native code
    web: string | null // ruleset names, which are used only in web code (its export type is always React.CSSProperties)
    //******************** native style constrain
    style: ReactN.ViewStyle // for native: export type of component style property (for web, style has always React.CSSProperties type)
    //**** animation shape
    animation: Animation.Shapes
    //**** mediaq shape
    mediaq: MediaQ.Shape | null
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: {} //native only props 
    propsWeb: React.HTMLAttributes<Element>//web only props
    //**** export type of component name
    nameType: string | null
    compTheme: {}
  }

  //export interface ShapesLow { [name: string]: Shape } 
  export interface Shapes { }

  //******************** Helpers for Shape.common and Shape.native definitin
  export type ShapeTexts<P extends string> = { [p in P]: ReactN.TextStyle }
  export type ShapeViews<P extends string> = { [p in P]: ReactN.ViewStyle }
  export type ShapeScrollViews<P extends string> = { [p in P]: ReactN.ScrollViewStyle }
  export type ShapeImages<P extends string> = { [p in P]: ReactN.ImageStyle }
  export type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
    common: {}; native: {}; web: null
    style: ReactN.ViewStyle
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    animation: {}; mediaq: null,
    nameType: null
    compTheme: never
  }, R>

  //******************** Shape getters
  export type getCommon<R extends Shape> = R['common']
  export type getAnimation<R extends Shape> = R['animation']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']
  export type getNameType<R extends Shape> = R['nameType']
  export type getCompTheme<R extends Shape = Shape> = R['compTheme']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & { $animations?: Animation.SheetsX<getAnimation<R>>, $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & { $animations?: Partial<Animation.SheetsX<getAnimation<R>>> }

  //Cross platform sheet helpers
  export type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
  export type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: (getNative<R>[P] & RulesetAddInX<getNative<R>[P], R>) }
  export type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: (RulesetWeb & RulesetAddInX<never, R>) }
  //Overrides parts of the sheet
  export interface RulesetAddInX<T extends RulesetNative, R extends Shape> { $overrides?: PartialSheetX<R>; $name?: string; $mediaq?: MediaQ.SheetX<T, R>; $props?: PropsInRulesetX<R> }

  //******************** Platform specific sheets
  export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWithAddInWeb<R>> & { $animations?: Animation.SheetsX<getAnimation<R>>, $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
  export type SheetNative<R extends Shape = Shape> = { [P in keyof getCommon<R>]: RulesetWithAddInNative<getCommon<R>[P], R> } & { [P in keyof getNative<R>]: RulesetWithAddInNative<getNative<R>[P], R> } & { $animations?: Animation.SheetsX<getAnimation<R>>, $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  //Overrides parts of the sheet
  export type RulesetWithAddIn<R extends Shape = Shape> = Ruleset & { $overrides?: Sheet<R>; $name?: string; $props?: PropsInRuleset<R>; $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
  export interface RulesetWithAddInWeb<R extends Shape = Shape> extends RulesetWeb { $overrides?: SheetWeb<R>; $name?: string; $props?: PropsInRulesetWeb<R> }
  export type RulesetWithAddInNative<T extends RulesetNative = {}, R extends Shape = Shape> = T & { $overrides?: SheetNative<R>; $name?: string; $props?: PropsInRulesetNative<R> }

  //******************** Sheet and Theme Creators
  //export type FromThemeCreator<T> = (theme: ReactXX.Theme) => T
  //export type FromThemeValueOrCreator<T> = T | FromThemeCreator<T>

  //export type FromThemeCreator2<R extends Shape, T> = (theme: ReactXX.Theme, compTheme?: getThemePar<R>) => T
  //export type FromThemeValueOrCreator2<R extends Shape, T> = T | FromThemeCreator2<R, T>

  //export type SheetCreator<R extends Shape> = FromThemeCreator2<R, Sheet<R>>
  //export type SheetOrCreator<R extends Shape = Shape> = FromThemeValueOrCreator2<R, Sheet<R>>
  //export type SheetOrCreatorX<R extends Shape = Shape> = FromThemeValueOrCreator<R, PartialSheetX<R>>

  //******************** Sheet GETTERs
  export type MergeRulesetWithOverrides = (...rulesets: RulesetWithAddIn[]) => Ruleset
  export type MergeRulesetWithOverridesNative = (...rulesets: (RulesetWithAddInNative | ReactN.TextStyle)[]) => RulesetNative
  export type MergeRulesetWithOverridesWeb = (...rulesets: RulesetWithAddInWeb[]) => RulesetWeb


  /******************************************
    ALL SHEETS
  *******************************************/
  export type SheetsWeb = { [P in keyof Shapes]?: SheetWeb<Shapes[P]> }
  export type SheetsNative = { [P in keyof Shapes]?: SheetNative<Shapes[P]> }
  export type Sheets = { [P in keyof Shapes]?: Sheet<Shapes[P]> }//  SheetsWeb | SheetsNative


  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** cross platform Component props (Component is created by 'withStyles' ) 

  export type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    style?: ThemeT.RulesetCreatorX<R> //| RulesetWeb | getStyle<R> //cross platform style
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    ignore?: boolean
    classes?: ThemeT.PartialSheetCreatorX<R> //| PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
    modifyThemeState?: ThemeT.ThemeModifier
    className?: ThemeT.RulesetCreatorX<R> /*cross platform root ruleset*/ //| RulesetWeb | getStyle<R> /*platform specific root ruleset (when component is used in other component)*/
  }>>
  //export type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, Ruleset> // common and web and native

  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //******************** Component's code (passed to withStyles)

  // component code for web
  export type CodePropsWeb<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsWeb<R>, {
    className: RulesetWeb
    classes: SheetWeb<R>
    style: RulesetWeb
    theme: ThemeT.ThemeX
    mergeRulesetWithOverrides: MergeRulesetWithOverridesWeb
    animations: Animation.DriversWeb<getAnimation<R>>
    mediaq: MediaQ.ComponentsMediaQ<getMediaQ<R>>
  } & OnPressAllWeb>
  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>


  // component code for native
  export type CodePropsNative<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsNative<R>, {
    className: getStyle<R>
    classes: SheetNative<R>
    style: getStyle<R>
    theme: ThemeT.ThemeX
    //flip: boolean
    mergeRulesetWithOverrides: MergeRulesetWithOverridesNative
    animations: Animation.DriversNative<getAnimation<R>>
    mediaq: MediaQ.ComponentsMediaQ<getMediaQ<R>>
  } & OnPressAllNative>
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  export type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //some code for components could be shared for web and native
  export type CodeProps<R extends Shape = Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), {
    className: RulesetWeb | getStyle<R>
    classes: Sheet<R>
    style: RulesetWeb | getStyle<R>
    //flip: boolean
    mergeRulesetWithOverrides: MergeRulesetWithOverrides
    theme: ThemeT.ThemeX
    animations: Animation.Drivers<getAnimation<R>>
    mediaq: MediaQ.ComponentsMediaQ<getMediaQ<R>>
    //this?:boolean //?? why ??
  } & (OnPressAllNative | OnPressAllWeb)>
  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>

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

  //******************** Helpers
  export type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

}
