declare namespace Muix {

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
  type CSSPropertiesWeb = React.CSSProperties
  type CSSPropertiesNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle | RNIconStyle //) & RulesetPatch

  //**** cross platform ruleset for web and native

  type RulesetX<T extends CSSPropertiesNative, R extends Shape = DefaultEmptyShape> = commonCSSProperties<T> & RulesetOverridesX<R> & {
    $native?: T;
    $web?: CSSPropertiesWeb
  }  //& RulesetPatch
  // It's easy to use 'cross platform ruleset' in native or web code:
  //   const stylex: RulesetX<ReactN.TextStyle> = ...
  //   const {web, native, ...rest} = stylex
  //   const txtWeb = <span style={{...rest, ...web}}/> 
  //   const txtNative = <Text style={{...rest, ...native}}/>

  // rule names, common for native and web
  type commonCSSPropertiesNames<T extends CSSPropertiesNative> = keyof React.CSSPropertiesLow & keyof T
  // type which contains native rules, which also exist for web
  type commonCSSProperties<T extends CSSPropertiesNative> = TakeFrom<T, commonCSSPropertiesNames<T>>

  type TextStyleCommon = commonCSSProperties<ReactN.TextStyle>
  type ViewStyleCommon = commonCSSProperties<ReactN.ViewStyle>
  type TextStyleX = RulesetX<ReactN.TextStyle>

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
  type TRulesetX = RulesetX<ReactN.TextStyle>
  type CSSProperties = CSSPropertiesNative | CSSPropertiesWeb
  type Ruleset<T extends CSSPropertiesNative> = T | CSSPropertiesWeb
  interface RNIconStyle { color?: string; fontSize?: number }

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
    common: Record<string, CSSPropertiesNative> // native ruleset types for rulesets, which are used in both web and native component code
    native: Record<string, CSSPropertiesNative> // native ruleset types for rulesets, which are used only in native code
    animation: Record<string, Record<string, CSSPropertiesNative>>
    web: string | null // ruleset names, which are used only in web code
    //**** native style constrain
    style: CSSPropertiesNative // for native: type of component style property (for web, style has always React.CSSProperties type)
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: { style?: {} } //native props only
    propsWeb: React.HTMLAttributes<HTMLElement>//web props only
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

  //**** helpers
  interface DefaultEmptyShape extends Shape {
    common: {}
    native: {}
    web: null
    animation: {}
    props: {}
    style: ReactN.ViewStyle
    propsNative: ReactN.ViewProperties
    propsWeb: React.HTMLAttributes<HTMLElement>
  }

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
  type SheetWeb<R extends Shape> = Record<(keyof getCommon<R>) | getWeb<R>, CSSPropertiesWeb & RulesetOverridesWeb<R>> & { $animations: SheetAnimationWeb<R> }
  type SheetAnimationWeb<R extends Shape> = {[P in keyof getAnimation<R>]: AnimationsWeb<getAnimation<R>[P]>}
  type SheetNative<R extends Shape> = {[P in keyof getCommon<R>]: getCommon<R>[P] & RulesetOverridesNative<R>} & {[P in keyof getNative<R>]: getNative<R>[P] & RulesetOverridesNative<R>} & { $animations: SheetAnimationNative<R> }
  type SheetAnimationNative<R extends Shape> = {[P in keyof getAnimation<R>]: AnimationsNative<getAnimation<R>[P]>}

  //**** cross platform sheet for web and native
  //type SheetX<R extends Shape> = {
  //  common: SheetXCommon<R>
  //  native: SheetXNative<R>
  //  web: SheetXWeb<R>
  //}

  type SheetX<R extends Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & { $animations: SheetXAnimation<R> }
  type PartialSheetX<R extends Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & SheetXAnimation<R>> & { $animations?: Partial<SheetXAnimation<R>> }

  type SheetXCreator<R extends Shape> = (par: ThemeNew) => SheetX<R>
  type SheetXOrCreator<R extends Shape> = ThemeValueOrCreator<PartialSheetX<R>>

  type ThemeCreator<T> = (par: ThemeNew) => T
  type ThemeValueOrCreator<T> = T | ThemeCreator<T>

  //type SheetXCommon<R extends Shape> = {[P in keyof getCommon<R>]: RulesetX<getCommon<R>[P]>}
  //type SheetXNative<R extends Shape> = getNative<R>
  //type SheetXWeb<R extends Shape> = {[P in getWeb<R>]: CSSPropertiesWeb}

  type SheetXCommon<R extends Shape> = {[P in keyof getCommon<R>]: RulesetX<getCommon<R>[P], R>}
  type SheetXNative<R extends Shape> = {[P in keyof getNative<R>]: getNative<R>[P] & RulesetOverridesX<R>}
  type SheetXWeb<R extends Shape> = {[P in getWeb<R>]: CSSPropertiesWeb & RulesetOverridesX<R>}
  type SheetXAnimation<R extends Shape> = {[P in keyof getAnimation<R>]: Animations<getAnimation<R>[P]>}

  type RulesetOverridesX<R extends Shape> = { $overrides?: PartialSheetX<R>; $childOverrides?: SheetsX; $name?: string }
  type RulesetOverrides<R extends Shape> = { $overrides?: Sheet<R>; $childOverrides?: Sheets; $name?: string }
  type RulesetOverridesWeb<R extends Shape> = { $overrides?: SheetWeb<R>; $childOverrides?: SheetsWeb; $name?: string }
  type RulesetOverridesNative<R extends Shape> = { $overrides?: SheetNative<R>; $childOverrides?: SheetsNative; $name?: string }
  type TClassnames = (...rulesets: (RulesetOverrides<Shape> & CSSProperties)[]) => CSSProperties
  type TClassnamesNative = (...rulesets: (Muix.RulesetOverridesNative<MuixView.Shape> | ReactN.TextStyle)[]) => Muix.CSSPropertiesNative
  type TClassnamesWeb = (...rulesets: (Muix.RulesetOverridesWeb<MuixView.Shape> & CSSPropertiesWeb)[]) => Muix.CSSPropertiesWeb

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
  type SheetOrCreator<R extends Shape> = ThemeValueOrCreator<Sheet<R>> // | ((theme: Mui.ThemeNew) => Sheet<R>)
  type SheetCreator<R extends Shape> = ThemeCreator<Sheet<R>>

  //type PartialSheetX<R extends Shape> = {[P in keyof SheetX<R>]?: Partial<SheetX<R>[P]>}
  type Sheet<R extends Shape> = SheetWeb<R> | SheetNative<R>
  type PartialSheet<R extends Shape> = Partial<SheetWeb<R>> | Partial<SheetNative<R>>

  type ClassSheetWeb<R extends Shape> = {[P in keyof SheetWeb<R>]: string} //For web: rule-set is converted to css class names (single class for every rule)
  type TSheetX = SheetX<Shape>

  /******************************************
     COMPONENT TYPING
 
  *******************************************/

  //**** cross platform Component props (Component is created by 'withStyles' ) 

  type PropsX<R extends Shape> = Partial<Overwrite<getProps<R>,{
    style?: RulesetX<getStyle<R>> //cross platform style
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    classes?: ThemeValueOrCreator<PartialSheetX<R>> | PartialSheetInCode<R>//cross platform sheet for web and native 
    //classes?: PartialSheetInCode<R> //cross platform sheet when using component in other component
    className?: CSSProperties | RulesetX<getStyle<R>>
    //className?: CSSProperties
  }>>
  type PartialSheetInCode<R extends Shape> = PartialRecord<keyof getCommon<R> | getWeb<R> | keyof getNative<R>, CSSProperties> // common and web and native

  type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //**** Component's code (passed to withStyles)

  // component code for web
  type CodePropsWeb<R extends Shape> = Overwrite<getProps<R> & getPropsWeb<R>, { className: CSSPropertiesWeb; classes: SheetWeb<R>; style: CSSPropertiesWeb; theme: Muix.ThemeNew; flip: boolean; getStyleWithSideEffect: Muix.TClassnamesWeb }>
  type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // component code for native
  type CodePropsNative<R extends Shape> = Overwrite<getProps<R> & getPropsNative<R>, { className: getStyle<R>; classes: SheetNative<R>; style: getStyle<R>; theme: Muix.ThemeNew; flip: boolean; getStyleWithSideEffect: Muix.TClassnamesNative }>
  type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //**** Helpers
  type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  //some code for components could be shared for web and native
  type CodeProps<R extends Shape> = Overwrite<getProps<R> & (getPropsNative<R> | getPropsWeb<R>), { className: CSSPropertiesWeb | getStyle<R>, classes: Sheet<R>; style: CSSPropertiesWeb | getStyle<R>; theme: Muix.ThemeNew; flip: boolean; getStyleWithSideEffect: Muix.TClassnames}>
  type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>

  /*************************************************
    original material-ui typings
  *************************************************/

  interface WithStylesOptionsNew {
    flip?: boolean
    name: keyof SheetsX
  }

  type muiSheet<ClassKey extends string = string> = Record<ClassKey, CSSPropertiesWeb>
  type muiSheetCreator<ClassKey extends string = string> = ThemeValueOrCreator<muiSheet<ClassKey>> // | ((theme: Mui.ThemeNew) => muiSheet<ClassKey>)
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Muix.ThemeNew }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: CSSPropertiesWeb }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptionsNew) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>

}