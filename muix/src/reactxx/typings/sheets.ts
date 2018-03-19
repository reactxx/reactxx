﻿import ReactN from 'react-native'

import { ThemeT, Animation, MediaQ } from 'reactxx-typings'

declare global {

  namespace ReactXX {

    type MouseEvent = (event?: React.MouseEvent<Element>) => void
    interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
    interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }
    interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
    interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

    interface WithStylesOptionsNew<TName extends (string | null) = null> {
      name: keyof Shapes
      flip?: boolean
    }

    /******************************************
      RULESET
    *******************************************/

    //*************** cross platform ruleset for web and native

    type RulesetX<T extends RulesetNative = ReactN.TextStyle, R extends Shape = Shape> =
      commonRules<T> & // native rules which are compatible with web
      {
        $native?: T // native specific rules
        $web?: RulesetWeb // web specific rules
      } &
      RulesetAddInX<T, R> // sheet addIn: overriding, media query 


    // rule names, common for native and web
    type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
    // native rules, which are compatible with web
    type commonRules<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

    type ViewRulesetCommonX = commonRules<ReactN.ViewStyle>
    type ViewRulesetX = RulesetX<ReactN.ViewStyle>
    type TextRulesetX = RulesetX<ReactN.TextStyle>

    //******************** Platform specific ruleset
    type RulesetWeb = React.CSSProperties //??? https://github.com/programbo/cssproperties/blob/master/css-properties.d.ts
    type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle
    type Ruleset = RulesetNative | RulesetWeb

    /******************************************
      COMPONENT SHAPE
    *******************************************/
    interface Shape {
      //**** sheet constrains
      common: Record<string, RulesetNative> // rulesets (and their native type), which are used in both web and native component code. Rules and its valid values must be compatible with native.
      native: Record<string, RulesetNative> // ruleset types, which are used only in native code
      web: string | null // ruleset names, which are used only in web code (its type is always React.CSSProperties)
      //******************** native style constrain
      style: ReactN.ViewStyle // for native: type of component style property (for web, style has always React.CSSProperties type)
      //**** animation shape
      animation: Animation.Shapes
      //**** mediaq shape
      mediaq: MediaQ.Shape | null
      //**** component property constrains
      props: {} //common (web and native) props
      propsNative: {} //native only props 
      propsWeb: React.HTMLAttributes<Element>//web only props
      //**** type of component name
      nameType: string | null
      compTheme: {}
    }

    //interface ShapesLow { [name: string]: Shape } 
    interface Shapes { }

    //******************** Helpers for Shape.common and Shape.native definitin
    type ShapeTexts<P extends string> = { [p in P]: ReactN.TextStyle }
    type ShapeViews<P extends string> = { [p in P]: ReactN.ViewStyle }
    type ShapeScrollViews<P extends string> = { [p in P]: ReactN.ScrollViewStyle }
    type ShapeImages<P extends string> = { [p in P]: ReactN.ImageStyle }
    type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
      common: {}; native: {}; web: null
      style: ReactN.ViewStyle
      props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
      animation: {}; mediaq: null,
      nameType: null
      compTheme: never
    }, R>

    //******************** Shape getters
    type getCommon<R extends Shape> = R['common']
    type getAnimation<R extends Shape> = R['animation']
    type getNative<R extends Shape> = R['native']
    type getWeb<R extends Shape> = R['web']
    type getStyle<R extends Shape> = R['style']
    type getProps<R extends Shape> = R['props']
    type getPropsWeb<R extends Shape> = R['propsWeb']
    type getPropsNative<R extends Shape> = R['propsNative']
    type getNameType<R extends Shape> = R['nameType']
    type getCompTheme<R extends Shape = Shape> = R['compTheme']
    type getMediaQ<R extends Shape = Shape> = R['mediaq']

    /******************************************
      COMPONENT SHEET
    *******************************************/

    //******************** Cross platform sheet
    type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & { $animations?: Animation.SheetsX<getAnimation<R>>, $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
    type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & { $animations?: Partial<Animation.SheetsX<getAnimation<R>>> }

    //Cross platform sheet helpers
    type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
    type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: (getNative<R>[P] & RulesetAddInX<getNative<R>[P], R>) }
    type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: (RulesetWeb & RulesetAddInX<never, R>) }
    //Overrides parts of the sheet
    interface RulesetAddInX<T extends RulesetNative, R extends Shape> { $overrides?: PartialSheetX<R>; $name?: string; $mediaq?: MediaQ.SheetX<T, R>; $props?: PropsInRulesetX<R> }

    //******************** Platform specific sheets
    type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWithAddInWeb<R>> & { $animations?: Animation.SheetsX<getAnimation<R>>, $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
    type SheetNative<R extends Shape = Shape> = { [P in keyof getCommon<R>]: RulesetWithAddInNative<getCommon<R>[P], R> } & { [P in keyof getNative<R>]: RulesetWithAddInNative<getNative<R>[P], R> } & { $animations?: Animation.SheetsX<getAnimation<R>>, $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
    type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
    type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

    //Overrides parts of the sheet
    type RulesetWithAddIn<R extends Shape = Shape> = Ruleset & { $overrides?: Sheet<R>; $name?: string; $props?: PropsInRuleset<R>; $mediaq?: MediaQ.NotifySheetX<getMediaQ<R>> }
    interface RulesetWithAddInWeb<R extends Shape = Shape> extends RulesetWeb { $overrides?: SheetWeb<R>; $name?: string; $props?: PropsInRulesetWeb<R> }
    type RulesetWithAddInNative<T extends RulesetNative = {}, R extends Shape = Shape> = T & { $overrides?: SheetNative<R>; $name?: string; $props?: PropsInRulesetNative<R> }

    //******************** Sheet and Theme Creators
    //type FromThemeCreator<T> = (theme: ReactXX.Theme) => T
    //type FromThemeValueOrCreator<T> = T | FromThemeCreator<T>

    //type FromThemeCreator2<R extends Shape, T> = (theme: ReactXX.Theme, compTheme?: getThemePar<R>) => T
    //type FromThemeValueOrCreator2<R extends Shape, T> = T | FromThemeCreator2<R, T>

    //type SheetCreator<R extends Shape> = FromThemeCreator2<R, Sheet<R>>
    //type SheetOrCreator<R extends Shape = Shape> = FromThemeValueOrCreator2<R, Sheet<R>>
    //type SheetOrCreatorX<R extends Shape = Shape> = FromThemeValueOrCreator<R, PartialSheetX<R>>

    //******************** Sheet GETTERs
    type MergeRulesetWithOverrides = (...rulesets: RulesetWithAddIn[]) => Ruleset
    type MergeRulesetWithOverridesNative = (...rulesets: (RulesetWithAddInNative | ReactN.TextStyle)[]) => RulesetNative
    type MergeRulesetWithOverridesWeb = (...rulesets: RulesetWithAddInWeb[]) => RulesetWeb


    /******************************************
      ALL SHEETS
    *******************************************/
    type SheetsWeb = { [P in keyof Shapes]?: SheetWeb<Shapes[P]> }
    type SheetsNative = { [P in keyof Shapes]?: SheetNative<Shapes[P]> }
    type Sheets = { [P in keyof Shapes]?: Sheet<Shapes[P]> }//  SheetsWeb | SheetsNative


    /******************************************
       COMPONENT TYPING
    *******************************************/

    //******************** cross platform Component props (Component is created by 'withStyles' ) 

    type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
      style?: ThemeT.RulesetCreatorX<R> //| RulesetWeb | getStyle<R> //cross platform style
      $web?: Partial<getPropsWeb<R>> //web specific style
      $native?: Partial<getPropsNative<R>> //native specific style
      ignore?: boolean
      classes?: ThemeT.PartialSheetCreatorX<R> //| PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
      modifyThemeState?: ThemeT.ThemeModifier
      className?: ThemeT.RulesetCreatorX<R> /*cross platform root ruleset*/ //| RulesetWeb | getStyle<R> /*platform specific root ruleset (when component is used in other component)*/
    }>>
    //type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, Ruleset> // common and web and native

    type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
    type SFCX<R extends Shape> = React.SFC<PropsX<R>>

    //******************** Component's code (passed to withStyles)

    // component code for web
    type CodePropsWeb<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsWeb<R>, {
      className: RulesetWeb
      classes: SheetWeb<R>
      style: RulesetWeb
      theme: ThemeT.ThemeX
      mergeRulesetWithOverrides: MergeRulesetWithOverridesWeb
      animations: Animation.DriversWeb<getAnimation<R>>
      mediaq: MediaQ.ComponentsMediaQ<getMediaQ<R>>
    } & OnPressAllWeb>
    type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>


    // component code for native
    type CodePropsNative<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsNative<R>, {
      className: getStyle<R>
      classes: SheetNative<R>
      style: getStyle<R>
      theme: ThemeT.ThemeX
      //flip: boolean
      mergeRulesetWithOverrides: MergeRulesetWithOverridesNative
      animations: Animation.DriversNative<getAnimation<R>>
      mediaq: MediaQ.ComponentsMediaQ<getMediaQ<R>>
    } & OnPressAllNative>
    type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
    type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

    //some code for components could be shared for web and native
    type CodeProps<R extends Shape = Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), {
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
    type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
    type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>

    //******************** $props in rulesets
    type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
      $web?: Partial<getPropsWeb<R>> //web specific style
      $native?: Partial<getPropsNative<R>> //native specific style
      style?: never
      classes?: never
      childClasses?: never
      className?: never
    }>>

    type PropsInRulesetWeb<R extends Shape = Shape> = getProps<R> & getPropsWeb<R>
    type PropsInRulesetNative<R extends Shape = Shape> = getProps<R> & getPropsNative<R>
    type PropsInRuleset<R extends Shape = Shape> = getProps<R> & (getPropsNative<R> | getPropsWeb<R>)

    //******************** Helpers
    type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  }
}