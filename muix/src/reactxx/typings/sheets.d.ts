declare namespace ReactXX {

  interface RNIconStyle { color?: string; fontSize?: number }

  type MouseEvent = (event?: React.MouseEvent<Element>) => void
  interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }
  interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

  interface WithStylesOptionsNew {
    name: keyof SheetsX
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
      $propsWeb?: Partial<getPropsWeb<R>> //web specific props
      $propsNative?: Partial<getPropsNative<R>> //native specific props
      $props?: Partial<getProps<R>> //common props
    } &
    SheetOverridesX<R> // sheet overriding, 

  // rule names, common for native and web
  type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
  // native rules, which are compatible with web
  type commonRules<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

  //type TextStyleCommon = commonRuleset<ReactN.TextStyle>
  type commonViewRuleset = commonRules<ReactN.ViewStyle>
  type TextRulesetX = RulesetX<ReactN.TextStyle>

  //******************** Platform specific ruleset
  type RulesetWeb = React.CSSProperties
  type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle | RNIconStyle
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
    style: RulesetNative // for native: type of component style property (for web, style has always React.CSSProperties type)
    //**** animation shape
    animation: Animation.Shapes
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: {} //native only props 
    propsWeb: React.HTMLAttributes<Element>//web only props
    theme: Theme
  }

  //******************** Helpers for Shape.common and Shape.native definitin
  type ShapeTexts<P extends string> = {[p in P]: ReactN.TextStyle}
  type ShapeViews<P extends string> = {[p in P]: ReactN.ViewStyle}
  type ShapeScrollViews<P extends string> = {[p in P]: ReactN.ScrollViewStyle}
  type ShapeIcons<P extends string> = {[p in P]: RNIconStyle}
  type ShapeImages<P extends string> = {[p in P]: ReactN.ImageStyle}
  type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
    common: {}; native: {}, web: null
    animation: {}
    style: ReactN.ViewStyle
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    theme: Theme
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
  type getTheme<R extends Shape> = R['theme']

  /******************************************
    COMPONENT SHEET
  *******************************************/

  //******************** Cross platform sheet
  type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & { $animations?: Animation.SheetsX<getAnimation<R>> }
  type PartialSheetX<R extends Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & { $animations?: Partial<Animation.SheetsX<getAnimation<R>>> }

  //Cross platform sheet helpers
  type SheetXCommon<R extends Shape> = {[P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R>}
  type SheetXNative<R extends Shape> = {[P in keyof getNative<R>]: (getNative<R>[P] & SheetOverridesX<R>) }
  type SheetXWeb<R extends Shape> = {[P in getWeb<R>]: (RulesetWeb & SheetOverridesX<R>) }
  //Overrides parts of the sheet
  interface SheetOverridesX<R extends Shape> { $overrides?: PartialSheetX<R>; $name?: string }

  //******************** Platform specific sheets
  type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWeb & SheetOverridesWeb<R>> & { $animations?: Animation.SheetsX<getAnimation<R>> }
  type SheetNative<R extends Shape = Shape> = {[P in keyof getCommon<R>]: getCommon<R>[P] & SheetOverridesNative<R>} & {[P in keyof getNative<R>]: getNative<R>[P] & SheetOverridesNative<R>} & { $animations?: Animation.SheetsX<getAnimation<R>> }
  type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  //Overrides parts of the sheet
  interface SheetOverrides<R extends Shape> { $overrides?: Sheet<R>; $name?: string }
  interface SheetOverridesWeb<R extends Shape> { $overrides?: SheetWeb<R>; $name?: string }
  interface SheetOverridesNative<R extends Shape> { $overrides?: SheetNative<R>; $name?: string }

  //******************** Sheet and Theme Creators
  type FromThemeCreator<R extends Shape, T> = (theme: getTheme<R>) => T
  type FromThemeValueOrCreator<R extends Shape, T> = T | FromThemeCreator<R, T>
  type SheetCreator<R extends Shape> = FromThemeCreator<R, Sheet<R>>
  type SheetOrCreator<R extends Shape = Shape> = FromThemeValueOrCreator<R, Sheet<R>>
  //type SheetOrCreatorX<R extends Shape = Shape> = FromThemeValueOrCreator<R, PartialSheetX<R>>

  //******************** Sheet GETTERs
  type MergeRulesetWithOverrides = (...rulesets: (SheetOverrides<Shape> & Ruleset)[]) => Ruleset
  type MergeRulesetWithOverridesNative = (...rulesets: (SheetOverridesNative<MuixView.Shape> | ReactN.TextStyle)[]) => RulesetNative
  type MergeRulesetWithOverridesWeb = (...rulesets: (SheetOverridesWeb<MuixView.Shape> & RulesetWeb)[]) => RulesetWeb


  /******************************************
    ALL SHEETS
  *******************************************/
  interface SheetsX { }
  type SheetsWeb = {[P in keyof SheetsX]?: SheetWeb}
  type SheetsNative = {[P in keyof SheetsX]?: SheetNative}
  type Sheets = {[P in keyof SheetsX]?: Sheet}//  SheetsWeb | SheetsNative

  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** cross platform Component props (Component is created by 'withStyles' ) 

  type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    style?: FromThemeValueOrCreator<R, RulesetX<getStyle<R>>> | RulesetWeb | getStyle<R> //cross platform style
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    classes?: FromThemeValueOrCreator<R, PartialSheetX<R> | PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
    childClasses?: FromThemeValueOrCreator<R, SheetsX> | Sheets
    className?: FromThemeValueOrCreator<R, RulesetX<getStyle<R>>> /*cross platform root ruleset*/ | Ruleset /*platform specific root ruleset (when component is used in other component)*/
  }>>
  type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, Ruleset> // common and web and native

  type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //******************** Component's code (passed to withStyles)

  // component code for web
  type CodePropsWeb<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsWeb<R>, {
    className: RulesetWeb
    classes: SheetWeb<R>
    style: RulesetWeb
    theme: getTheme<R>
    flip: boolean
    mergeRulesetWithOverrides: MergeRulesetWithOverridesWeb
    animations: Animation.DriversWeb<getAnimation<R>>
  } & OnPressAllWeb>
  type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>


  // component code for native
  type CodePropsNative<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsNative<R>, {
    className: getStyle<R>
    classes: SheetNative<R>
    style: getStyle<R>
    theme: getTheme<R>
    flip: boolean
    mergeRulesetWithOverrides: MergeRulesetWithOverridesNative
    animations: Animation.DriversNative<getAnimation<R>>
  } & OnPressAllNative>
  type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //******************** Helpers
  type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  //some code for components could be shared for web and native
  type CodeProps<R extends Shape = Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), {
    className: RulesetWeb | getStyle<R>
    classes: Sheet<R>
    style: RulesetWeb | getStyle<R>
    theme: getTheme<R>; flip: boolean
    mergeRulesetWithOverrides: MergeRulesetWithOverrides
    animations: Animation.Drivers<getAnimation<R>>
  } & (OnPressAllNative | OnPressAllWeb)>
  type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>

}