declare namespace Prim5s {

  interface SheetsX { }
  type SheetsWeb = {[P in keyof SheetsX]: SheetWeb<Shape>}
  type SheetsNative = {[P in keyof SheetsX]: SheetNative<Shape>}
  type Sheets = SheetsWeb | SheetsNative

  /******************************************
    RULESET

    Ruleset is term for CSS in JS ruleset, e.g.
    const ruleset = {
      color: 'red',
      display: 'none'
    }

    where 'color: red' is single Rule
  *******************************************/

  //type RulesetPatch = { $patch?: { [rulesetName: string]: {} }; $name?:string }

  //**** Platform specific ruleset
  type RulesetWeb = React.CSSProperties
  type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle | RNIconStyle

  //**** cross platform ruleset for web and native

  type RulesetX<T extends RulesetNative, R extends Shape = Shape> = commonRuleset<T> & RulesetOverridesX<R> & {
    $native?: T
    $web?: RulesetWeb
  }
  // It's easy to use 'cross platform ruleset' in native or web code:
  //   const stylex: RulesetX<ReactN.TextStyle> = ...
  //   const {web, native, ...rest} = stylex
  //   const txtWeb = <span style={{...rest, ...web}}/> 
  //   const txtNative = <Text style={{...rest, ...native}}/>

  // rule names, common for native and web
  type commonRuleNames<T extends RulesetNative> = keyof React.CSSPropertiesLow & keyof T
  // native rules, which are compatible with web
  type commonRuleset<T extends RulesetNative> = TakeFrom<T, commonRuleNames<T>>

  //type TextStyleCommon = commonRuleset<ReactN.TextStyle>
  type commonViewRuleset = commonRuleset<ReactN.ViewStyle>
  type TextRulesetX = RulesetX<ReactN.TextStyle>

  type TRulesetX = RulesetX<ReactN.TextStyle>
  type Ruleset = RulesetNative | RulesetWeb
  interface RNIconStyle { color?: string; fontSize?: number }


  /* ruleset usage examples
  Example 1:
    const view: RulesetX<ReactN.ViewStyle> = {}
    view.overflow = 'scroll' //ERROR, only "visible" | "hidden" are valid values for ReactN.ViewStyle['overflow'] rule
    view.overflow = 'hidden' //OK
    view.color = 'red' //ERROR, ReactN.ViewStyle does not contain 'color' rule

  Example 2:
    const text: RulesetX<ReactN.TextStyle> = {}
    text.color = 'red' //OK, ReactN.TextStyle contains 'color' rule

  Example 3:
    //following rulesets have the same result: 'overflow:visible' for react-native and 'overflow:auto' for web
    const ruleset: RulesetX<ReactN.ViewStyle> = {
      overflow: 'visible',
      web: {
        overflow: 'auto',
      }
    }
    const ruleset2: RulesetX<ReactN.ViewStyle> = {
      native: {
        overflow: 'visible',
      },
      web: {
        overflow: 'auto',
      }
    }

    //error example
    const ruleset2: RulesetX<ReactN.ViewStyle> = {
      overflow: 'auto', //ERROR: only "visible" | "hidden" are valid values for ReactN.ViewStyle['overflow'] rule
      native: {
        overflow: 'visible',
      },
    }
  */

  //**** Helpers

  /******************************************
    COMPONENT SHAPE

    'Shape' is fake type alowing to define seven generice type constrains in single place
    Instead of 
      type T<TCommon, TNative, TWeb, TStyle, TProps, TPropsNative, TPropsWeb> = (... any type definition with TProps, TStyle etc.)
    we can use 
      type T<R extends Shape> = (... any type definition with R['props'] instead of 'TProps', 'R['style']' instead of TStyle etc.)

    There never exists any instance of this type - it is used only as a set of constrains for types, related to component

    Shape is alternative for original material-ui typing which uses only two constrains (ClassKeys and Props), e.g. 
      - type ButtonClassKey = 'dense' | 'label' | 'flatPrimary' | ...
      - type ButtonProps = { disabled?: boolean; dense?: boolean; raised?: boolean; ...}

  *******************************************/
  type TOnClickWeb = { onClick?: React.MouseEventHandler<HTMLElement> }
  interface Shape {
    //**** sheet constrains
    common: Record<string, RulesetNative> // native ruleset types for rulesets, which are used in both web and native component code
    native: Record<string, RulesetNative> // native ruleset types for rulesets, which are used only in native code
    animation: Animation.AnimationsShape
    web: string | null // ruleset names, which are used only in web code
    //**** native style constrain
    style: RulesetNative // for native: type of component style property (for web, style has always React.CSSProperties type)
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: { style?: {} } //native props only
    propsWeb: React.HTMLAttributes<HTMLElement>//web props only
    theme: {}
  }

  type ShapeTexts<P extends string> = {[p in P]: ReactN.TextStyle}
  type ShapeViews<P extends string> = {[p in P]: ReactN.ViewStyle}
  type ShapeScrollViews<P extends string> = {[p in P]: ReactN.ScrollViewStyle}
  type ShapeIcons<P extends string> = {[p in P]: RNIconStyle}
  type ShapeImages<P extends string> = {[p in P]: ReactN.ImageStyle}


  /*
  Example:
  type ButtonShape = {
    common: { 
      dense: ReactN.ViewStyle
      fab: ReactN.ViewStyle
      ...
    }
    native: {
      flatPrimaryLabel: ReactN.TextStyle // react native has limited style inheritance (button's label cannot inherit color from button's root component, so we need extra rule for primary button label)
      ...
    }
    web: 'label' | 'flatPrimary' | ... //rules, unused in native
    style: ReactN.ViewStyle
    props: { 
      disabled?: boolean
      ...
    }
    propsNative: propsNative: ReactN.TouchableOpacityProperties
    propsWeb: React.HTMLAttributes<HTMLElement>
  }
  */

  //**** Shape getters
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

    sheet is term for CSS in JS sheet, e.g.
    const sheet = {
      root: {
        marginTop: 10,
        backgroundColor: 'blue'
      },
      label; {
        color: 'red'
      }
    }

  *******************************************/

  //**** Platform specific sheets
  type SheetWeb<R extends Shape> = Record<(keyof getCommon<R>) | getWeb<R>, RulesetWeb & RulesetOverridesWeb<R>> //& { $animations: SheetAnimationWeb<R> }
  type SheetNative<R extends Shape> = {[P in keyof getCommon<R>]: getCommon<R>[P] & RulesetOverridesNative<R>} & {[P in keyof getNative<R>]: getNative<R>[P] & RulesetOverridesNative<R>} //& { $animations: SheetAnimationNative<R> }

  //**** cross platform sheet for web and native
  //type SheetX<R extends Shape> = {
  //  common: SheetXCommon<R>
  //  native: SheetXNative<R>
  //  web: SheetXWeb<R>
  //}

  type SheetX<R extends Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & { $animations?: Animation.AnimationsX<getAnimation<R>> }
  type PartialSheetX<R extends Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & { $animations?: Partial<Animation.AnimationsX<getAnimation<R>>> }

  //type SheetXCreator<R extends Shape> = (par: getTheme<R>) => SheetX<R>
  //type SheetXOrCreator<R extends Shape> = ThemeValueOrCreator<R, PartialSheetX<R>>

  type ThemeCreator<R extends Shape, T> = (theme: getTheme<R>) => T
  type ThemeValueOrCreator<R extends Shape, T> = T | ThemeCreator<R, T>
  type SheetCreator<R extends Shape> = ThemeCreator<R, Prim5s.Sheet<R>>


  //type SheetXCommon<R extends Shape> = {[P in keyof getCommon<R>]: RulesetX<getCommon<R>[P]>}
  //type SheetXNative<R extends Shape> = getNative<R>
  //type SheetXWeb<R extends Shape> = {[P in getWeb<R>]: CSSPropertiesWeb}

  type SheetXCommon<R extends Shape> = {[P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R>}
  type SheetXNative<R extends Shape> = {[P in keyof getNative<R>]: getNative<R>[P] & RulesetOverridesX<R>}
  type SheetXWeb<R extends Shape> = {[P in getWeb<R>]: RulesetWeb & RulesetOverridesX<R>}

  interface RulesetOverridesX<R extends Shape> { $overrides?: PartialSheetX<R>; $childOverrides?: SheetsX; $name?: string }
  interface RulesetOverrides<R extends Shape> { $overrides?: Sheet<R>; $childOverrides?: Sheets; $name?: string }
  interface RulesetOverridesWeb<R extends Shape> { $overrides?: SheetWeb<R>; $childOverrides?: SheetsWeb; $name?: string }
  interface RulesetOverridesNative<R extends Shape> { $overrides?: SheetNative<R>; $childOverrides?: SheetsNative; $name?: string }
  type StyleWithSideEffect = (...rulesets: (RulesetOverrides<Shape> & Ruleset)[]) => Ruleset
  type StyleWithSideEffectNative = (...rulesets: (RulesetOverridesNative<MuixView.Shape> | ReactN.TextStyle)[]) => RulesetNative
  type StyleWithSideEffectWeb = (...rulesets: (RulesetOverridesWeb<MuixView.Shape> & RulesetWeb)[]) => RulesetWeb

  /* SheetXCreator examples
  const sheet = theme => {
    common: {
      raised: {
        backgroundColor: theme.palette.grey[300],
        ...theme.shadows[2],
        web: {
          color: theme.palette.getContrastText(theme.palette.grey[300]),
        },
      }
    },
    native: {
      raisedLabel: {
        color: theme.palette.getContrastText(theme.palette.grey[300]),
      }
    }
  }
  */

  //**** Helpers
  //type SheetOrCreator<R extends Shape> = ThemeValueOrCreator<R, Sheet<R>> 
  //type SheetCreator<R extends Shape> = ThemeCreator<R, Sheet<R>>

  //type PartialSheetX<R extends Shape> = {[P in keyof SheetX<R>]?: Partial<SheetX<R>[P]>}
  type Sheet<R extends Shape> = (SheetWeb<R> | SheetNative<R>) & { $animations?: Animation.AnimationsX<getAnimation<R>> }
  type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  type ClassSheetWeb<R extends Shape> = {[P in keyof SheetWeb<R>]: string} //For web: rule-set is converted to css class names (single class for every rule)
  type TSheetX = SheetX<Shape>

  /******************************************
     COMPONENT TYPING
 
  *******************************************/

  //**** cross platform Component props (Component is created by 'withStyles' ) 

  type PropsX<R extends Shape> = Partial<Overwrite<getProps<R>, {
    style?: RulesetX<getStyle<R>> //cross platform style
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    classes?: ThemeValueOrCreator<R, PartialSheetX<R>> /*cross platform sheet*/ | PartialSheetInCode<R> /*platform specific sheet when (when component is used in other component)*/
    className?: RulesetX<getStyle<R>> //| Ruleset
  }>>
  type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, Ruleset> // common and web and native

  type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //**** Component's code (passed to withStyles)

  // component code for web
  type CodePropsWeb<R extends Shape> = Overwrite<getProps<R> & getPropsWeb<R>, { className: RulesetWeb; classes: SheetWeb<R>; style: RulesetWeb; theme: getTheme<R>; flip: boolean; getStyleWithSideEffect: StyleWithSideEffectWeb; animations: Animation.AnimationsWeb<getAnimation<R>> }>
  type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // component code for native
  type CodePropsNative<R extends Shape> = Overwrite<getProps<R> & getPropsNative<R>, { className: getStyle<R>; classes: SheetNative<R>; style: getStyle<R>; theme: getTheme<R>; flip: boolean; getStyleWithSideEffect: StyleWithSideEffectNative; animations: Animation.AnimationsNative<getAnimation<R>> }>
  type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //**** Helpers
  type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  //some code for components could be shared for web and native
  type CodeProps<R extends Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), { className: RulesetWeb | getStyle<R>, classes: Sheet<R>; style: RulesetWeb | getStyle<R>; theme: getTheme<R>; flip: boolean; getStyleWithSideEffect: StyleWithSideEffect; animations: Animation.Animations<getAnimation<R>> }>
  type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>

}