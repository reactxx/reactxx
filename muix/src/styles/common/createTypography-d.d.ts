declare namespace Mui {

  type TextStyleKeys = 'display1' | 'display2' | 'display3' | 'display4' | 'headline' | 'title' | 'subheading' | 'body1' | 'body2' | 'caption'
  //type TypographyClassKey = TextStyleKeys | 'button' //| 'root'
  type TypographyShape = Overwrite<Mui.DefaultEmptyShape, { common: Record<TypographyClassKey, RN.TextStyle> }>

  //from mui\styles\createTypography.d.ts
  namespace web {
    interface FontStyle {
      fontSize: number
      htmlFontSize: number
      fontFamily: React.CSSProperties['fontFamily']
      fontWeightLight: FontWeight
      fontWeightRegular: FontWeight
      fontWeightMedium: FontWeight
    }
    type FontWeight = RN.TextStyle['fontWeight']
    //type TypographyStyle = CSSProperties
    type Typography = {[type in TypographyClassKey]: React.CSSProperties } & FontStyle
    //type TypographyOptions = Partial<Typography>
    type TypographyOptionsCreator = TypographyOptions | ((palette: Palette) => TypographyOptions)
  }
  //namespace native {
  //  type Font = { fontFamily: string; fontWeight: RN.TextStyle['fontWeight'] }
  //  type FontKey = 'light' | 'regular' | 'medium'
  //  type FontStyleLow = {
  //    fontSize: number
  //    htmlFontSize: number
  //    fontSizeNormalizerNative: (size: number) => number
  //    fontAssetPathNative: string
  //  }
  //  type FontStyle =  FontStyleLow & { fontsNative: Record<FontKey, Font> }
  //  type FontStylePartial = Partial<FontStyleLow> & { fontsNative?: PartialRecord<FontKey, Partial<Font>> }
  //  type Typography = {[type in TypographyClassKey]: RN.TextStyle } & FontStyle
  //  type TypographyOptions = {[type in TypographyClassKey]?: RN.TextStyle } & FontStylePartial
  //  type TypographyOptionsCreator = TypographyOptions | ((palette: Mui.Palette) => TypographyOptions)
  //}

  //cross platform typography options
  //type TypographyOptions = PartialSheet<TypographyShape>['common'] & Partial<web.FontStyle> & native.FontStylePartial
  type TypographyOptionsCreator = TypographyOptions | ((palette: Mui.Palette) => TypographyOptions)

}