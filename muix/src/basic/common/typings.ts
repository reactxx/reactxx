import ReactN from 'react-native'

export namespace TBasic {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void

  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }

  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

  /******************************************
    RULESET
  *******************************************/

  //*************** cross platform ruleset for web and native

  export type RulesetX<T extends RulesetNative = ReactN.TextStyle, R extends Shape = Shape> =
    commonRules<T> & // native rules which are compatible with web
    {
      $native?: T // native specific rules
      $web?: RulesetWeb // web specific rules
    } 

  // rule names, common for native and web
  export type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
  // native rules, which are compatible with web
  export type commonRules<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

  export type ViewRulesetCommonX = commonRules<ReactN.ViewStyle>
  export type TextRulesetCommonX = commonRules<ReactN.TextStyle>
  export type ScrollViewRulesetCommonX = commonRules<ReactN.ScrollViewStyle>
  export type ImageRulesetCommonX = commonRules<ReactN.ImageStyle>

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
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: {} //native only props 
    propsWeb: React.HTMLAttributes<Element>//web only props
  }
  export type getCommon<R extends Shape> = R['common']
  export type getNative<R extends Shape> = R['native']
  export type getWeb<R extends Shape> = R['web']
  export type getStyle<R extends Shape> = R['style']
  export type getProps<R extends Shape> = R['props']
  export type getPropsWeb<R extends Shape> = R['propsWeb']
  export type getPropsNative<R extends Shape> = R['propsNative']

  /******************************************
    COMPONENT SHEET
  *******************************************/
  //******************** Cross platform sheet
  export type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>
  export type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> 

  //Cross platform sheet helpers
  export type SheetXCommon<R extends Shape> = { [P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R> }
  export type SheetXNative<R extends Shape> = { [P in keyof getNative<R>]: getNative<R>[P]}
  export type SheetXWeb<R extends Shape> = { [P in getWeb<R>]: RulesetWeb}

  //******************** Platform specific sheets
  export type SheetWeb<R extends Shape = Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWeb> 
  export type SheetNative<R extends Shape = Shape> = { [P in keyof getCommon<R>]: getNative<R>[P] } & { [P in keyof getNative<R>]: getNative<R>[P] }
  export type Sheet<R extends Shape = Shape> = SheetWeb<R> | SheetNative<R>
  export type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  /******************************************
     COMPONENT TYPING
  *******************************************/

  export type PropsX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    style?: RulesetX<getStyle<R>>
    className?: RulesetX<getStyle<R>>
    classes?: PartialSheetX<R> //| PartialSheetInCode<R>> /*cross platform sheet*/  /*platform specific sheet (when component is used in other component)*/
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    ignore?: boolean
  }>>
  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  export type CodePropsWeb<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsWeb<R>, {
    className: RulesetWeb
    style: RulesetWeb
    mergeRulesetWithOverrides
    classes: SheetWeb<R>
    theme
    animations
    mediaq
  } & OnPressAllWeb>
  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  export type CodePropsNative<R extends Shape = Shape> = Overwrite<getProps<R> & getPropsNative<R>, {
    className: getStyle<R>
    style: getStyle<R>
    classes: SheetNative<R>
    theme
    mergeRulesetWithOverrides
    animations
    mediaq
  } & OnPressAllNative>
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  //some code for components could be shared for web and native
  export type CodeProps<R extends Shape = Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), {
    className: RulesetWeb | getStyle<R>
    classes: Sheet<R>
    style: RulesetWeb | getStyle<R>
    mergeRulesetWithOverrides
    theme
    animations
    mediaq
  } & (OnPressAllNative | OnPressAllWeb)>
  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

  export type ShapeTexts<P extends string> = { [p in P]: ReactN.TextStyle }
  export type ShapeViews<P extends string> = { [p in P]: ReactN.ViewStyle }
  export type ShapeScrollViews<P extends string> = { [p in P]: ReactN.ScrollViewStyle }
  export type ShapeImages<P extends string> = { [p in P]: ReactN.ImageStyle }


  export interface TextShape {
    common: ShapeTexts<'root' | 'singleLineStyle'>
    web: 'pressable'
    native: {}
    style: ReactN.TextStyle,
    props: { numberOfLines?: number; url?: string } & OnPressX
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }

  export interface ViewShape {
    common: ShapeViews<'root'>
    web: null
    native: {}
    style: ReactN.ViewStyle,
    props: OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }

  export interface IconShape {
    common: ShapeViews<'root'>
    web: 'pressable'
    native: {}
    style: ReactN.TextStyle,
    props: { data: string } & OnPressX
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    propsNative: {
      size?: number
      color?: string
    }
  }

  export interface ScrollViewShape {
    common: ShapeScrollViews<'root'> & ShapeViews<'container'>
    web: 'rootHorizontal' | 'containerHorizontal'
    native: {}
    style: ReactN.ScrollViewStyle
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
