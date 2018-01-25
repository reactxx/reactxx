import { Dimensions, PixelRatio } from 'react-native'
import muiCreateTypography from 'material-ui/styles/createTypography'
import { toPlatformSheet, deepMerge } from 'muix-styles'

export default function createTypography(palette: Muix.Palette, optionOrCreator: Muix.TypographyOptionsOrCreatorX) {
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
    } as Muix.TextStyleX,
    fontWeightRegularNew = {
      fontWeight: '400',
      $web: { fontFamily },
      $native: { fontFamily: 'Roboto' },
    } as Muix.TextStyleX,
    fontWeightMediumNew = {
      fontWeight: '500',
      $web: { fontFamily },
      $native: { fontFamily: 'Roboto_Medium' },
    } as Muix.TextStyleX,
    display1, display2, display3, display4, headline, title, subheading, body1, body2, caption, button,
    pxToRem = mui.pxToRem,
    ...other
  } = options


  const getWebProps = (weightX: Muix.TextStyleX, optionX: Muix.TextStyleX, nativeFontSize: number, mui: React.CSSProperties) => {
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
    } as Muix.TextStyleX
    return optionX ? deepMerge(res, optionX) : res
  }

  const sheetX: Muix.PartialSheetX<MuixTypography.Shape> = {
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
  } as any

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
      ...sheet
    } as Muix.Typography,
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

////https://stackoverflow.com/questions/36015691/obtaining-the-return-type-of-a-function
//const fnReturnType = (false as true) && createTypography(null, null)
//export type Typography = typeof fnReturnType
//export type TCreateTypography = typeof createTypography

//http://typecast.com/blog/a-more-modern-scale-for-web-typography
//https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js

//const fontSizeNormalizerDefault = (size: number) => size
//const fontSizeNormalizerDefault_ = (size: number) => {
//  const pixelRatio = PixelRatio.get()
//  const deviceHeight = Dimensions.get('window').height
//  const deviceWidth = Dimensions.get('window').width
//  if (pixelRatio >= 2 && pixelRatio < 3) {
//    // iphone 5s and older Androids
//    if (deviceWidth < 360) {
//      return size * 0.95;
//    }
//    // iphone 5
//    if (deviceHeight < 667) {
//      return size;
//      // iphone 6-6s
//    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
//      return size * 1.15;
//    }
//    // older phablets
//    return size * 1.25;
//  } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
//    // catch Android font scaling on small machines
//    // where pixel ratio / font scale ratio => 3:3
//    if (deviceWidth <= 360) {
//      return size;
//    }
//    // Catch other weird android width sizings
//    if (deviceHeight < 667) {
//      return size * 1.15;
//      // catch in-between size Androids and scale font up
//      // a tad but not too much
//    }
//    if (deviceHeight >= 667 && deviceHeight <= 735) {
//      return size * 1.2;
//    }
//    // catch larger devices
//    // ie iphone 6s plus / 7 plus / mi 
//    return size * 1.27;
//  } else if (pixelRatio >= 3.5) {
//    // catch Android font scaling on small machines
//    // where pixel ratio / font scale ratio => 3:3
//    if (deviceWidth <= 360) {
//      return size;
//      // Catch other smaller android height sizings
//    }
//    if (deviceHeight < 667) {
//      return size * 1.2;
//      // catch in-between size Androids and scale font up
//      // a tad but not too much
//    }
//    if (deviceHeight >= 667 && deviceHeight <= 735) {
//      return size * 1.25;
//    }
//    // catch larger phablet devices
//    return size * 1.4;
//  } else
//    // if older device ie pixelRatio !== 2 || 3 || 3.5
//    return size;
//}
