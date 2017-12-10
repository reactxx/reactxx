declare namespace Mui {

  //*********** CONSTS
  //const enum Names {
  //  Icon = 'MuiIcon',
  //  Typography = 'MuiTypography',
  //  ButtonBase = 'MuiButtonBase',
  //  Button = 'MuiButton',
  //  View = 'MuiView',
  //  Text = 'MuiText',
  //  Template = 'MuiTemplate',
  //  ScrollView = 'MuiScrollView',
  //}

  interface Shapes {
    //MuiIcon: MuiIcon.Shape
    //MuiTypography: Typography.Shape
    //MuiButtonBase: MuiButtonBase.Shape
    //MuiButton: MuiButton.Shape
    //MuiView: MuiView.Shape
    //MuiText: MuiText.Shape
    //MuiScrollView: MuiScrollView.Shape

    //MuiTemplate: MuiTemplate.Shape
  }

  type Names = keyof Shapes


  interface WithStylesOptions {
    flip?: boolean
    withTheme?: boolean
    name?: string
  }

  interface RNIconStyle {
    color?: string
    fontSize?: number
  }

  type CSSProperties = React.CSSProperties //& { [propertyName: string]: any }

  //*********** RULE typing
  //available native styles
  type NativeCSS = RN.TextStyle | RN.ViewStyle | RN.ImageStyle | RNIconStyle

  //cross platform style. It contains: 
  //- commonStyle<T>: styles, common to Web and Native
  //- 'native' and 'web' props for platform specific styles
  type Rule<T extends NativeCSS> = { native?: T; web?: CSSProperties } & commonStyle<T>
  type RuleUntyped = Rule<RN.TextStyle>
  //result of transformation cross platform styles to platform specific style
  type PlatformRule<T extends NativeCSS> = T | CSSProperties
  type PlatformRuleUntyped = NativeCSS | CSSProperties

  //select native props from web CSS. E.g. commonStyle<RN.TextStyle> could be used both for native <Text> and web <span>
  type commonStyle<TNative> = TakeFrom<TNative, keyof React.CSSPropertiesLow & keyof TNative>
  //type webUsableInNative = Diff<keyof React.CSSPropertiesLow, 'transform'> //transform native prop is not compatible with web

  //*********** RULES typing NEW
  interface Shape {
    common: Record<string, NativeCSS>
    native: Record<string, NativeCSS>
    web: string | null
    style: NativeCSS
    props: {}
    propsNative: { style?: {}, onPress?: (ev?) => void }
    propsWeb: { style?: {}, onClick?: (ev?) => void }
  }
  interface EmptyShape extends Shape {
    common: {}
    native: {}
    web: null
    props: {}
    style: RN.ViewStyle
    propsNative: RN.ViewProperties
    propsWeb: React.HTMLAttributes<HTMLDivElement>
  }

  type getProps<R extends Shape> = R['props']
  type getNative<R extends Shape> = R['native']
  type getCommon<R extends Shape> = R['common']
  type getWeb<R extends Shape> = R['web']
  type getStyle<R extends Shape> = R['style']
  type getPropsWeb<R extends Shape> = OmitSave<R['propsWeb'], 'style' | 'onClick'>
  type getPropsNative<R extends Shape> = OmitSave<R['propsNative'], ('style' | 'onPress')>
  //type getPropsWeb<R extends Shape> = R['propsWeb']
  //type getPropsNative<R extends Shape> = R['propsNative']

  type Sheet<R extends Shape> = {
    common: {[P in keyof getCommon<R>]: Rule<getCommon<R>[P]>}
    native: getNative<R>
    web: {[P in getWeb<R>]: CSSProperties}
  }
  type PartialSheet<R extends Shape> = {[P in keyof Sheet<R>]?: Partial<Sheet<R>[P]>}

  type SheetProps<R extends Shape> = {
    classes?: {[P in keyof getCommon<R>]?: Rule<getCommon<R>[P]>}
    classesNative?: Partial<getNative<R>>
    classesWeb?: {[P in getWeb<R>]?: CSSProperties}
  }

  //*********** RULES typing
  // for every cross platform component: basic rule definition
  //type TypedSheet = Record<string, NativeCSS>

  //cross platform rules definition
  //type Sheet<R extends TypedSheet> = {[P in keyof R]: Rule<R[P]>}//rules definition type
  type SheetUntyped = Sheet<Shape>

  type SheetGetter<R extends Shape> = (par: Theme) => Sheet<R>
  type SheetCreator<R extends Shape> = (sheetGetter: SheetGetter<R>) => (theme: Theme) => PlatformSheet<R>

  type PlatformSheetCreator<R extends Shape> = PlatformSheet<R> | ((theme: Mui.Theme) => PlatformSheet<R>)

  //platform specific rules (expanded from cross platform rules)
  type PlatformSheetWeb<R extends Shape> = Record<keyof getCommon<R>, CSSProperties> & getWeb<R>
  type PlatformSheetNative<R extends Shape> = {[P in keyof getCommon<R>]: getCommon<R>[P]} & getNative<R>
  type PlatformSheet<R extends Shape> = PlatformSheetWeb<R> | PlatformSheetNative<R> //{[P in keyof R]: CSSProperties | R[P]} //PlatformSheetWeb<R> | PlatformSheetNative<R>

  //For web: rule-set is converted to class names (single class for every rule)
  type ClassSheetWeb<R extends Shape> = {[P in keyof PlatformSheetWeb<R>]: string}

  //*************************************************
  // cross platform COMPONENTs with similar sheet for both web and native
  //*************************************************

  type PropsLow<R extends Shape> = { innerRef?: (node) => void } & getProps<R>

  //cross platform Component, used in web and native application (created by withStyles)
  type Props<R extends Shape> = PropsLow<R> & SheetProps<R> & { /*classes?: PartialSheet<R>;*/ style?: Rule<getStyle<R>>; web?: getPropsWeb<R>; native?: getPropsNative<R>; onPress?: () => void; onClick?: (ev: React.SyntheticEvent<HTMLElement>) => void }
  type ComponentType<R extends Shape> = React.ComponentType<Props<R>>
  type SFC<R extends Shape> = React.SFC<Props<R>>

  //type PropsLowWeb<R extends Shape> = { innerRef?: React.Ref<any> } & getWebProps<R>
  //type PropsWeb<R extends Shape> = PropsLowWeb<R> & { classes?: PartialSheet<R>; style?: Rule<getStyle<R>> }  
  //type SFCWeb<R extends Shape> = React.SFC<PropsWeb<R>>


  //Component's code (passed to withStyles)
  type CodeProps<R extends Shape> = PropsLow<R> & { classes: PlatformSheet<R>; style?: CSSProperties | getStyle<R>; theme: Mui.Theme; flip: boolean; } & (getPropsWeb<R> | getPropsNative<R>)
  type CodePropsWeb<R extends Shape> = PropsLow<R> & { classes: ClassSheetWeb<R>; style?: CSSProperties; theme: Mui.Theme; flip: boolean; onClick?: (ev: React.SyntheticEvent<HTMLElement>) => void } & getPropsWeb<R>
  type CodePropsNative<R extends Shape> = PropsLow<R> & { classes: PlatformSheetNative<R>; style?: getStyle<R>; theme: Mui.Theme; flip: boolean; onPress?: (ev?) => void } & getPropsNative<R>

  type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>
  type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>

  //*************************************************
  // cross platform COMPONENTs with distinct sheet for web and native
  //*************************************************

  //original mui typings
  type muiSheet<ClassKey extends string = string> = Record<ClassKey, CSSProperties>
  type muiSheetCreator<ClassKey extends string = string> = muiSheet<ClassKey> | ((theme: Mui.Theme) => muiSheet<ClassKey>)
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Mui.Theme }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: CSSProperties }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptions) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>

  //  type SheetDistinct<R extends TypedSheet, W extends string> = {[P in (keyof R & W)]?: Rule<R[P]>} & { web: PlatformSheetWebKey<W>; native: R}//rules definition type
  //  type SheetDistinctCreatorWeb<R extends TypedSheet, W extends string> = PlatformSheetWebKey<W> | ((theme: Mui.Theme) => PlatformSheetWebKey<W>) //rules definition (rules or function)
  //  type SheetDistinctCreatorNative<R extends TypedSheet, W extends string> = PlatformSheetNative<R> | ((theme: Mui.Theme) => PlatformSheetNative<R>) //rules definition (rules or function)
  //  type SheetCreatorDistinct<R extends TypedSheet, W extends string> = SheetDistinctCreatorWeb<R,W> | SheetDistinctCreatorNative<R,W>


  //  //rules modification via 'classes' attribute
  //  type ClassesPropDistinct<R extends TypedSheet, TKey extends string> = { native?: Partial<R>; web?: Partial<Record<TKey, CSSProperties>> } //MUI compatible RULES typing

  //  //Component, used in web and native application (after muiWithStyles HOC for Native rewrite or after muiMakeCompatible for original mui component)
  //  type PropsDistinct<C, R extends TypedSheet, TKey extends string> = PropsLow<C> & { classes?: ClassesPropDistinct<R, TKey>; style?: Rule<RN.TextStyle> }
  //  type ComponentTypeDistinct<C, R extends TypedSheet, TKey extends string> = React.ComponentType<PropsDistinct<C, R, TKey>>

  //  //Component's code (passed to withStyles)
  //  type CodePropsDistinct<C, R extends TypedSheet, TKey extends string> = PropsLow<C> & { classes?: ClassesPropDistinct<R, TKey>; style?: { web?: CSSProperties; native?: NativeCSS }; theme: Mui.Theme }
  //  type CodeComponentTypeDistinct<C, R extends TypedSheet, TKey extends string> = React.ComponentType<CodePropsDistinct<C, R, TKey>>

}