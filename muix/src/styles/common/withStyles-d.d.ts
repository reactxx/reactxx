declare namespace Mui {

  interface Shapes {
  }

  /******************************************
    RULE SET

    Term for CSS in JS ruleset, e.g.
    const ruleset = {
      color: 'red',
      display: 'none'
    }
  *******************************************/

  //**** Platform specific ruleset
  type RuleSetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | RNIconStyle
  type RuleSetWeb = React.CSSProperties

  //**** cross platform ruleset for web and native
  // It's easy to get 'platform specific ruleset' from 'cross platform ruleset' e.g. 
  //   const stylex: RuleSetX<ReactN.TextStyle> = {}
  //   const {web, native, ...rest} = stylex
  //   const txtWeb = <span style={{...rest, ...web}}/> 
  //   const txtNative = <Text style={{...rest, ...native}}/>

  type RuleSetX<T extends RuleSetNative> = commonCSSProperties<T> & {
    native?: T;
    web?: RuleSetWeb
  }

  // common props names for native style and web React.CSSProperties
  type commonCSSPropertiesNames<T extends RuleSetNative> = keyof React.CSSPropertiesLow & keyof T
  // type which contains native props, which are also in React.CSSProperties
  type commonCSSProperties<T extends RuleSetNative> = TakeFrom<T, commonCSSPropertiesNames<T>>

  type TextStyleCommon = commonCSSProperties<ReactN.TextStyle>
  type ViewStyleCommon = commonCSSProperties<ReactN.ViewStyle>
  type TextStyleX = RuleSetX<ReactN.TextStyle>
  type ViewStyleX = RuleSetX<ReactN.ViewStyle>

  /* ruleset usage examples
  Example 1:
    const view: RuleSetX<ReactN.ViewStyle> = {}
    view.overflow = 'scroll' //ERROR, only "visible" | "hidden" are valid for ReactN.ViewStyle['overflow']
    view.overflow = 'hidden' //OK
    view.color = 'red' //ERROR, ReactN.ViewStyle does not contain 'color' prop

  Example 2:
    const text: RuleSetX<ReactN.TextStyle> = {}
    text.color = 'red' //OK, ReactN.TextStyle contains 'color' prop

  Example 3:
    //following rulesets have the same result: 'overflow=visible' for react-native and 'overflow=auto' for web
    const ruleset: RuleSetX<ReactN.ViewStyle> = {
      overflow: 'visible',
      web: {
        overflow: 'auto',
      }
    }
    const ruleset2: RuleSetX<ReactN.ViewStyle> = {
      native: {
        overflow: 'visible',
      },
      web: {
        overflow: 'auto',
      }
    }
  */

  //**** Helpers
  type TRuleSetX = RuleSetX<ReactN.TextStyle>
  type TRuleSet = RuleSetNative | RuleSetWeb
  type RuleSet<T extends RuleSetNative> = T | RuleSetWeb
  interface RNIconStyle { color?: string; fontSize?: number }

  /******************************************
    COMPONENT SHAPE

    'Shape' is fake type alowing to define seven generice type constrains in single place
    Instead of 
      type T<TCommon, TNative, TWeb, TStyle, TProps, TPropsNative, TPropsWeb> = .... type definition with TProps, TStyle etc.
    we can use 
      type T<R extends Shape> = ... type definition with 'getProps<R>' instead of 'TProps', 'getStyle<R>' instead of TStyle etc.

    There never exists any instance of this type - it is used only as a set of constrains for component related types

    If we need Shape definition for material-ui only, it's easy. Shape for every component is defined by
    - xxxClassKey (which defines component style sheet)
        e.g. type ButtonClassKey = 'dense' | 'label' | 'flatPrimary' | ...
      defines button style sheet
        type T = { dense:React.CSSProperties; label:React.CSSProperties; flatPrimary:React.CSSProperties; ...}
      
    - xxxProps (which defines component properties)
       e.g. type ButtonProps = { disabled?: boolean; dense?: boolean; raised?: boolean; ...}

    For react-native we have not React.CSSProperties universality and for every sheet property we need to define its type, e.g. for Button
      type T = { dense:ReactN.ViewStyle; label:ReactN.TextStyle; flatPrimary:ReactN.ViewStyle; flatPrimaryLabel:ReactN.TextStyle; ...}
  *******************************************/
  interface Shape {
    //**** sheet constrains
    common: Record<string, RuleSetNative> // defines sheet rulesets, which are used in both React and ReactNative component code
    native: Record<string, RuleSetNative> // defines sheet rulesets, which is used only in ReactNative code
    web: string | null // defines sheet rulesets names, which is used only in web code
    //**** native style constrain
    style: RuleSetNative // used for ReactNative: type of component style property (for web has style always React.CSSProperties type)
    //**** component property constrains
    props: {} //common (web and native) props
    propsNative: { style?: {}, onPress?: (ev?) => void } //native props only
    propsWeb: { style?: {}, onClick?: (ev?) => void } //web props only
  }

  /*
  Example:
  type ButtonShape = {
    common: {
      dense: ReactN.ViewStyle
      fab: ReactN.ViewStyle
    }
    native: {
      flatPrimaryLabel: ReactN.TextStyle
    }
    web: 'label' | 'flatPrimary'
    style: ReactN.ViewStyle
    props: { 
      disabled?: boolean
    }
    propsNative: propsNative: ReactN.TouchableOpacityProperties
    propsWeb: React.HTMLAttributes<HTMLDivElement>
  }
  */

  //**** Helpers
  type getProps<R extends Shape> = R['props']
  type getNative<R extends Shape> = R['native']
  type getCommon<R extends Shape> = R['common']
  type getWeb<R extends Shape> = R['web']
  type getStyle<R extends Shape> = R['style']
  type getPropsWeb<R extends Shape> = OmitFrom<R['propsWeb'], 'style' | 'onClick'>
  type getPropsNative<R extends Shape> = OmitFrom<R['propsNative'], ('style' | 'onPress')>

  interface DefaultEmptyShape extends Shape {
    common: {}
    native: {}
    web: null
    props: {}
    style: ReactN.ViewStyle
    propsNative: ReactN.ViewProperties
    propsWeb: React.HTMLAttributes<HTMLDivElement>
  }

  /******************************************
    COMPONENT SHEET

    term for CSS in JS sheet, e.g.
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
  type SheetWeb<R extends Shape> = Record<keyof getCommon<R>, RuleSetWeb> & getWeb<R>
  type SheetNative<R extends Shape> = {[P in keyof getCommon<R>]: getCommon<R>[P]} & getNative<R>

  //**** cross platform sheet for web and native
  type SheetX<R extends Shape> = {
    common: {[P in keyof getCommon<R>]: RuleSetX<getCommon<R>[P]>}
    native: getNative<R>
    web: {[P in getWeb<R>]: RuleSetWeb}
  }

  type SheetGetter<R extends Shape> = (par: Theme) => SheetX<R>

  /* sheet getter examples
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
  type SheetCreator<R extends Shape> = (sheetGetter: SheetGetter<R>) => (theme: Theme) => Sheet<R>

  type PlatformSheetCreator<R extends Shape> = Sheet<R> | ((theme: Mui.Theme) => Sheet<R>)

  type PartialSheetX<R extends Shape> = {[P in keyof SheetX<R>]?: Partial<SheetX<R>[P]>}
  type Sheet<R extends Shape> = SheetWeb<R> | SheetNative<R>

  //For web: rule-set is converted to class names (single class for every rule)
  type ClassSheetWeb<R extends Shape> = {[P in keyof SheetWeb<R>]: string}
  type TSheetX = SheetX<Shape>

  /******************************************
     COMPONENT TYPING
 
   *******************************************/

  //**** cross platform Component, used in cross platform application. Component is created by withStyles.
  type PropsX<R extends Shape> = PropsLow<R> & SheetProps<R> & { style?: RuleSetX<getStyle<R>>; web?: getPropsWeb<R>; native?: getPropsNative<R>; onPress?: () => void; onClick?: (ev: React.SyntheticEvent<HTMLElement>) => void }
  type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  type SFCX<R extends Shape> = React.SFC<PropsX<R>>


  //**** Component's code (passed to withStyles)

  // component code is cross-plaftorm
  type CodeProps<R extends Shape> = PropsLow<R> & { classes: Sheet<R>; style?: RuleSetWeb | getStyle<R>; theme: Mui.Theme; flip: boolean; } & (getPropsWeb<R> | getPropsNative<R>)
  type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>

  // component code is different for web x react-native
  type CodePropsWeb<R extends Shape> = PropsLow<R> & { classes: ClassSheetWeb<R>; style?: RuleSetWeb; theme: Mui.Theme; flip: boolean; onClick?: (ev: React.SyntheticEvent<HTMLElement>) => void } & getPropsWeb<R>
  type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  type CodePropsNative<R extends Shape> = PropsLow<R> & { classes: SheetNative<R>; style?: getStyle<R>; theme: Mui.Theme; flip: boolean; onPress?: (ev?) => void } & getPropsNative<R>
  type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  //**** Helpers
  type PropsLow<R extends Shape> = { innerRef?: (node) => void } & getProps<R>
  type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>
  type SheetProps<R extends Shape> = { // classes variants
    classes?: {[P in keyof getCommon<R>]?: RuleSetX<getCommon<R>[P]>}
    classesNative?: Partial<getNative<R>>
    classesWeb?: {[P in getWeb<R>]?: RuleSetWeb}
  }

  /*************************************************
    original material-ui typings

  *************************************************/

  interface WithStylesOptions {
    flip?: boolean
    withTheme?: boolean
    name?: string
  }

  type muiSheet<ClassKey extends string = string> = Record<ClassKey, RuleSetWeb>
  type muiSheetCreator<ClassKey extends string = string> = muiSheet<ClassKey> | ((theme: Mui.Theme) => muiSheet<ClassKey>)
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Mui.Theme }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: RuleSetWeb }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptions) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>

}