declare namespace Prim5s {

  interface RNIconStyle { color?: string; fontSize?: number }
  type OnClick = { onClick?: React.MouseEventHandler<Element> }
  type OnPress = { onPress?: () => void }
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
    } &
    SheetCascadingX<R> // sheet overriding, 

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
  type SheetXNative<R extends Shape> = {[P in keyof getNative<R>]: (getNative<R>[P] & SheetCascadingX<R>) }
  type SheetXWeb<R extends Shape> = {[P in getWeb<R>]: (RulesetWeb & SheetCascadingX<R>) }
  //Cascading parts of the sheet
  interface SheetCascadingX<R extends Shape> { $cascading?: PartialSheetX<R>; $childCascading?: SheetsX; $name?: string }

  //******************** Platform specific sheets
  type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWeb & SheetCascadingWeb<R>> & { $animations?: Animation.SheetsX<getAnimation<R>> }
  type SheetNative<R extends Shape = Shape> = {[P in keyof getCommon<R>]: getCommon<R>[P] & SheetCascadingNative<R>} & {[P in keyof getNative<R>]: getNative<R>[P] & SheetCascadingNative<R>} & { $animations?: Animation.SheetsX<getAnimation<R>> }
  type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  //Cascading parts of the sheet
  interface SheetCascading<R extends Shape> { $cascading?: Sheet<R>; $childCascading?: Sheets; $name?: string }
  interface SheetCascadingWeb<R extends Shape> { $cascading?: SheetWeb<R>; $childCascading?: SheetsWeb; $name?: string }
  interface SheetCascadingNative<R extends Shape> { $overrides?: SheetNative<R>; $childCascading?: SheetsNative; $name?: string }

  //******************** Sheet and Theme Creators
  type FromThemeCreator<R extends Shape, T> = (theme: getTheme<R>) => T
  type FromThemeValueOrCreator<R extends Shape, T> = T | FromThemeCreator<R, T>
  type SheetCreator<R extends Shape> = FromThemeCreator<R, Sheet<R>>
  type SheetOrCreator<R extends Shape = Shape> = FromThemeValueOrCreator<R, Sheet<R>>

  //******************** Sheet GETTERs
  type MergeRulesetWithCascading = (...rulesets: (SheetCascading<Shape> & Ruleset)[]) => Ruleset
  type MergeRulesetWithCascadingNative = (...rulesets: (SheetCascadingNative<MuixView.Shape> | ReactN.TextStyle)[]) => RulesetNative
  type MergeRulesetWithCascadingWeb = (...rulesets: (SheetCascadingWeb<MuixView.Shape> & RulesetWeb)[]) => RulesetWeb


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
    style?: FromThemeValueOrCreator<R, RulesetX<getStyle<R>>> //cross platform style
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    classes?: FromThemeValueOrCreator<R, PartialSheetX<R> | PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
    className?: FromThemeValueOrCreator<R, RulesetX<getStyle<R>>> /*cross platform root ruleset*/ | Ruleset /*platform specific root ruleset (when component is used in other component)*/
  }>>
  type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, Ruleset> // common and web and native

  type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //******************** Component's code (passed to withStyles)

  // component code for web
  type CodePropsWeb<R extends Shape> = Overwrite<getProps<R> & getPropsWeb<R>, {
    className: RulesetWeb
    classes: SheetWeb<R>; style: RulesetWeb
    theme: getTheme<R>
    flip: boolean
    mergeRulesetWithCascading: MergeRulesetWithCascadingWeb
    animations: Animation.DriversWeb<getAnimation<R>>
  } & OnClick>
  type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>


  // component code for native
  type CodePropsNative<R extends Shape> = Overwrite<getProps<R> & getPropsNative<R>, {
    className: getStyle<R>
    classes: SheetNative<R>
    style: getStyle<R>
    theme: getTheme<R>
    flip: boolean
    mergeRulesetWithCascading: MergeRulesetWithCascadingNative
    animations: Animation.DriversNative<getAnimation<R>>
  } & OnPress>
  type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //******************** Helpers
  type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  //some code for components could be shared for web and native
  type CodeProps<R extends Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), {
    className: RulesetWeb | getStyle<R>
    classes: Sheet<R>
    style: RulesetWeb | getStyle<R>
    theme: getTheme<R>; flip: boolean
    mergeRulesetWithCascading: MergeRulesetWithCascading
    animations: Animation.Drivers<getAnimation<R>>
  } & OnPress & OnClick>
  type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>

}