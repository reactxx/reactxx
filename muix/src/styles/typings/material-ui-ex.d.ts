declare namespace Muix {

  /*************************************************
    original material-ui typings
  *************************************************/

  interface WithStylesOptionsNew {
    flip?: boolean
    name: keyof Muix2.SheetsX
  }

  type muiSheet<ClassKey extends string = string> = Record<ClassKey, Muix2.RulesetWeb>
  type muiSheetCreator<ClassKey extends string = string> = ThemeValueOrCreator<muiSheet<ClassKey>>
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Muix.Theme }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: Muix2.RulesetWeb }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptionsNew) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>


  //**** helpers
  interface Shape extends Muix2.Shape {
    theme: Muix.ThemeNew
  }
  interface DefaultEmptyShape extends Shape {
    common: {}
    native: {}
    web: null
    animation: {}
    props: {}
    style: ReactN.ViewStyle
    propsNative: ReactN.ViewProperties
  }

  type OverwriteShape<R extends Partial<Muix.Shape>> = Overwrite<Muix.DefaultEmptyShape, R>

  type SheetXCreator<R extends Shape> = ThemeCreator<Muix2.SheetX<R>>
  type SheetXOrCreator<R extends Shape> = ThemeValueOrCreator<Muix2.PartialSheetX<R>>

  type SheetOrCreator<R extends Shape> = ThemeValueOrCreator<Muix2.Sheet<R>>
  type SheetCreator<R extends Shape> = ThemeCreator<Muix2.Sheet<R>>


  type ThemeCreator<T> = (theme: ThemeNew) => T
  type ThemeValueOrCreator<T> = T | ThemeCreator<T>


  interface IMuiThemeProps { theme: ThemeNew | ((theme: ThemeNew) => ThemeNew) }
  type MuiThemeContextValue = { theme: ThemeNew }
  type MuiOverridesContext = { childOverrides: Muix2.Sheets }

  type typoStyle = Style | 'fontWeightLightNew' | 'fontWeightRegularNew' | 'fontWeightMediumNew'

  interface FontStyleNew {
    fontSize: number
    htmlFontSize: number;
    fontFamily: string
    //fontSizeNormalizerNative: (size: number) => number
    pxToRem: (size: number) => string
  }
  interface FontStyleOld {
    fontWeightLight: React.CSSProperties['fontWeight']
    fontWeightRegular: React.CSSProperties['fontWeight']
    fontWeightMedium: React.CSSProperties['fontWeight']
  }

  type TypographyOptionsX = {[type in typoStyle]?: Muix2.TextRulesetX } & Partial<FontStyleNew>
  type TypographyX = {[type in typoStyle]: Muix2.TextRulesetX } & FontStyleNew
  type TypographyOptionsOrCreatorX = TypographyOptionsX | ((palette: Palette) => TypographyOptionsX)

  interface ThemeNew extends Theme {
    shadowsNew: ThemeShadows
    typographyX: TypographyX
    $sheetCache: Array<SheetCacheItem>
  }

  type SheetCacheItem = { sheetOrCreator: Muix.SheetOrCreator<Muix.Shape>; fromTheme: Muix2.Sheet<Muix.Shape> }
  type ShadowsNative = ReactN.ViewStyle[]

  type OverridesX = {
    [Name in keyof Muix2.SheetsX]?: Muix2.SheetsX[Name]
  }

  //type OverridesNewOrCreator = OverridesNew | ((theme: ThemeNew) => OverridesNew)

  type ThemeShadowsX = Muix2.RulesetX<ReactN.ViewStyle>[]
  type ThemeShadows = Muix2.commonViewRuleset[]

  interface ThemeOptions {
    shadowsX?: ThemeShadowsX
    overridesX?: Muix.ThemeValueOrCreator<OverridesX>
    typographyX?: TypographyOptionsOrCreatorX
  }

}
