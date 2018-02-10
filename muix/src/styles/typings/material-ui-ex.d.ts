declare namespace Prim5s {
  //interface Theme extends Muix.Theme { }
}
declare namespace Muix {

  /*************************************************
    original material-ui typings
  *************************************************/

  interface WithStylesOptionsNew {
    flip?: boolean
    name: keyof Prim5s.SheetsX
  }

  type muiSheet<ClassKey extends string = string> = Record<ClassKey, Prim5s.RulesetWeb>
  type muiSheetCreator<ClassKey extends string = string> = ThemeValueOrCreator<muiSheet<ClassKey>>
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Muix.Theme }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: Prim5s.RulesetWeb }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptionsNew) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>


  //**** helpers
  interface Shape extends Prim5s.Shape {
    theme: Muix.Theme
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

  type SheetXCreator<R extends Shape> = ThemeCreator<Prim5s.SheetX<R>>
  type SheetXOrCreator<R extends Shape> = ThemeValueOrCreator<Prim5s.PartialSheetX<R>>

  type SheetOrCreator<R extends Shape> = ThemeValueOrCreator<Prim5s.Sheet<R>>
  type SheetCreator<R extends Shape> = ThemeCreator<Prim5s.Sheet<R>>


  type ThemeCreator<T> = (theme: Theme) => T
  type ThemeValueOrCreator<T> = T | ThemeCreator<T>


  interface IMuiThemeProps { theme: Theme | ((theme: Theme) => Theme) }
  type MuiThemeContextValue = { theme: Theme }
  type MuiOverridesContext = { childOverrides: Prim5s.Sheets }

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

  type TypographyOptionsX = {[type in typoStyle]?: Prim5s.TextRulesetX } & Partial<FontStyleNew>
  type TypographyX = {[type in typoStyle]: Prim5s.TextRulesetX } & FontStyleNew
  type TypographyOptionsOrCreatorX = TypographyOptionsX | ((palette: Palette) => TypographyOptionsX)

  //interface Theme extends Theme, Prim5s.Theme {
  interface Theme {
    shadowsNew: ThemeShadows
    typographyX: TypographyX
    $sheetCache: Array<SheetCacheItem>
  }

  type SheetCacheItem = { sheetOrCreator: Muix.SheetOrCreator<Muix.Shape>; fromTheme: Prim5s.Sheet<Muix.Shape> }
  type ShadowsNative = ReactN.ViewStyle[]

  type OverridesX = {
    [Name in keyof Prim5s.SheetsX]?: Prim5s.SheetsX[Name]
  }

  //type OverridesNewOrCreator = OverridesNew | ((theme: Theme) => OverridesNew)

  type ThemeShadowsX = Prim5s.RulesetX<ReactN.ViewStyle>[]
  type ThemeShadows = Prim5s.commonViewRuleset[]

  interface ThemeOptions {
    shadowsX?: ThemeShadowsX
    overridesX?: Muix.ThemeValueOrCreator<OverridesX>
    typographyX?: TypographyOptionsOrCreatorX
  }

}
