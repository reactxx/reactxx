declare namespace Muix {

  /*************************************************
    original material-ui typings
  *************************************************/

  interface WithStylesOptionsNew {
    flip?: boolean
    name: keyof ReactXX.SheetsX
  }

  type muiSheet<ClassKey extends string = string> = Record<ClassKey, ReactXX.RulesetWeb>
  type muiSheetCreator<ClassKey extends string = string> = ThemeValueOrCreator<muiSheet<ClassKey>>
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Muix.Theme }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: ReactXX.RulesetWeb }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptionsNew) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>

  type ThemeCreator<T> = (theme: Theme) => T
  type ThemeValueOrCreator<T> = T | ThemeCreator<T>
  
  interface IMuiThemeProps { theme: Theme | ((theme: Theme) => Theme) }
  type MuiThemeContextValue = { theme: Theme }
  type MuiOverridesContext = { childOverrides: ReactXX.Sheets }

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

  type TypographyOptionsX = {[type in typoStyle]?: ReactXX.TextRulesetX } & Partial<FontStyleNew>
  type TypographyX = {[type in typoStyle]: ReactXX.TextRulesetX } & FontStyleNew
  type TypographyOptionsOrCreatorX = TypographyOptionsX | ((palette: Palette) => TypographyOptionsX)

  interface Theme {
    shadowsNew: ThemeShadows
    typographyX: TypographyX
    $sheetCache: Array<SheetCacheItem>
  }

  type SheetCacheItem = { sheetOrCreator: ReactXX.SheetOrCreator; fromTheme: ReactXX.Sheet<ReactXX.Shape> }
  type ShadowsNative = ReactN.ViewStyle[]

  type OverridesX = {
    [Name in keyof ReactXX.SheetsX]?: ReactXX.SheetsX[Name]
  }

  //type OverridesNewOrCreator = OverridesNew | ((theme: Theme) => OverridesNew)

  type ThemeShadowsX = ReactXX.RulesetX<ReactN.ViewStyle>[]
  type ThemeShadows = ReactXX.ViewRulesetCommonX[]

  interface ThemeOptions {
    shadowsX?: ThemeShadowsX
    overridesX?: Muix.ThemeValueOrCreator<OverridesX>
    typographyX?: TypographyOptionsOrCreatorX
  }

}
