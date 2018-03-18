declare namespace Muix {

  /*************************************************
    original material-ui typings
  *************************************************/

  interface WithStylesOptionsNew {
    flip?: boolean
    name: keyof ReactXX.Shapes
  }

  type ThemeCreator<T> = (theme: Theme) => T
  type ThemeValueOrCreator<T> = T | ThemeCreator<T>
  
  interface IMuiThemeProps { theme: Theme | ((theme: Theme) => Theme) }
  type MuiThemeContextValue = { theme: Theme }
  type MuiOverridesContext = { childOverrides: ReactXX.Sheets }

  type typoStyle = Mui.Style | 'fontWeightLightNew' | 'fontWeightRegularNew' | 'fontWeightMediumNew'

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
  type TypographyOptionsOrCreatorX = TypographyOptionsX | ((palette: Mui.Palette) => TypographyOptionsX)

  interface Theme extends Mui.Theme {
    shadowsNew: ThemeShadows
    typographyX: TypographyX
  }

  type ShadowsNative = ReactN.ViewStyle[]

  type OverridesX = {
    [Name in keyof ReactXX.Shapes]?: ReactXX.PartialSheetX<ReactXX.Shapes[Name]>
  }

  type ThemeShadowsX = ReactXX.RulesetX<ReactN.ViewStyle>[]
  type ThemeShadows = ReactXX.ViewRulesetCommonX[]

  interface ThemeOptions extends Mui.ThemeOptions {
    shadowsX?: ThemeShadowsX
    overridesX?: ThemeValueOrCreator<OverridesX>
    typographyX?: TypographyOptionsOrCreatorX
  }

}
