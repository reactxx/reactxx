import muiCreateTypography from 'material-ui/styles/createTypography'
import { toPlatformSheet, deepMerge } from 'reactxx'
import * as Mui from '../typings/mui'
import { Muix } from '../typings/muix'
import { SheetsT } from 'reactxx-typings'

export default function createTypography(palette: Mui.Palette, optionOrCreator: Muix.TypographyOptionsOrCreatorX) {
  const options = (typeof optionOrCreator === 'function' ? optionOrCreator(palette) : (optionOrCreator || {})) as Muix.TypographyOptionsX
  const mui = muiCreateTypography(palette, options)
  const {
    fontSize = 14, // px
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    //fontFamily = 'Roboto',
    //cross platform font weights
    fontWeightLightNew = {
      fontWeight: '300',
      $web: { fontFamily },
      $native: { fontFamily: 'Roboto_Light' },
    } as SheetsT.TextRulesetX,
    fontWeightRegularNew = {
      fontWeight: '400',
      $web: { fontFamily },
      $native: { fontFamily: 'Roboto' },
    } as SheetsT.TextRulesetX,
    fontWeightMediumNew = {
      fontWeight: '500',
      $web: { fontFamily },
      $native: { fontFamily: 'Roboto_Medium' },
    } as SheetsT.TextRulesetX,
    display1, display2, display3, display4, headline, title, subheading, body1, body2, caption, button,
    pxToRem = mui.pxToRem,
    ...other
  } = options


  const getWebProps = (weightX: SheetsT.TextRulesetX, optionX: SheetsT.TextRulesetX, nativeFontSize: number, mui: React.CSSProperties) => {
    const { color, fontWeight, fontFamily, ...rest } = mui
    const res = {
      fontWeight: weightX.fontWeight,
      color,
      $native: {
        fontFamily: weightX.$native.fontFamily,
        fontSize: nativeFontSize,
      },
      $web: {
        fontFamily: weightX.$web.fontFamily,
        ...mui,
      }
    } as SheetsT.TextRulesetX
    return optionX ? deepMerge(res, optionX) : res
  }

  type Shape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeTexts<Mui.Style | 'fontWeightLightNew' | 'fontWeightRegularNew' | 'fontWeightMediumNew'> & { noWrap?: any /*ReactN.TextProperties*/ }
  }>


  const sheetX: SheetsT.SheetX<Shape> = {
    fontWeightLightNew,
    fontWeightRegularNew,
    fontWeightMediumNew,
    display4: getWebProps(fontWeightLightNew, display4, fontSizesNative.display4, mui.display4),
    display3: getWebProps(fontWeightRegularNew, display3, fontSizesNative.display3, mui.display3),
    display2: getWebProps(fontWeightRegularNew, display2, fontSizesNative.display2, mui.display2),
    display1: getWebProps(fontWeightRegularNew, display1, fontSizesNative.display1, mui.display1),
    headline: getWebProps(fontWeightRegularNew, headline, fontSizesNative.headline, mui.headline),
    title: getWebProps(fontWeightMediumNew, title, fontSizesNative.title, mui.title),
    subheading: getWebProps(fontWeightRegularNew, subheading, fontSizesNative.subheading, mui.subheading),
    body2: getWebProps(fontWeightMediumNew, body2, fontSizesNative.body2, mui.body2),
    body1: getWebProps(fontWeightRegularNew, body1, fontSizesNative.body1, mui.body1),
    caption: getWebProps(fontWeightRegularNew, caption, fontSizesNative.caption, mui.caption),
    button: getWebProps(fontWeightMediumNew, button, fontSize, mui.button),
  } 

  const sheet = toPlatformSheet(sheetX)

  return {
    typography: {
      fontWeightLight: fontWeightLightNew.fontWeight,
      fontWeightRegular: fontWeightRegularNew.fontWeight,
      fontWeightMedium: fontWeightMediumNew.fontWeight,
      fontSize,
      htmlFontSize,
      fontFamily,
      pxToRem,
      ...sheet as any
    } as Mui.Typography,
    typographyX: {
      fontSize,
      htmlFontSize,
      fontFamily,
      ...sheetX
    } as Muix.TypographyX,
  }
}

const enum fontSizesNative {
  display4 = 32,
  display3 = 26,
  display2 = 22,
  display1 = 18,
  headline = 20,
  title = 18,
  subheading = 16,
  body2 = 14,
  body1 = 14,
  caption = 12,
}

