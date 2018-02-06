declare namespace Muix {

  interface IMuiThemeProps { theme: ThemeNew | ((theme: ThemeNew) => ThemeNew) }
  type MuiThemeContextValue = { theme: ThemeNew }
  type MuiOverridesContext = { childOverrides: Muix.Sheets }

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

  type TypographyOptionsX = {[type in typoStyle]?: TextRulesetX } & Partial<FontStyleNew>
  type TypographyX = {[type in typoStyle]: TextRulesetX } & FontStyleNew
  type TypographyOptionsOrCreatorX = TypographyOptionsX | ((palette: Muix.Palette) => TypographyOptionsX)

  type ThemeNew = Theme & {
    shadowsNew: ThemeShadows
    typographyX: TypographyX
    $sheetCache: Array<SheetCacheItem>
  }

  type SheetCacheItem = { sheetOrCreator: Muix.SheetOrCreator<Muix.Shape>; fromTheme: Muix.Sheet<Muix.Shape> }
  type ShadowsNative = ReactN.ViewStyle[]

  type OverridesX = {
    [Name in keyof SheetsX]?: SheetsX[Name]
  }

  //type OverridesNewOrCreator = OverridesNew | ((theme: ThemeNew) => OverridesNew)

  type ThemeShadowsX = RulesetX<ReactN.ViewStyle>[]
  type ThemeShadows = commonViewRuleset[]

  interface ThemeOptions {
    shadowsX?: ThemeShadowsX
    overridesX?: ThemeValueOrCreator<OverridesX>
    typographyX?: TypographyOptionsOrCreatorX
  }

}
