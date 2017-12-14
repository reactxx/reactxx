//import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

//import { Dimensions, PixelRatio } from 'react-native'

//export default function createTypography(palette: Mui.Palette, optionOrCreator: Mui.nw.TypographyOptionsCreator) {
//  const {
//    fontWeightLightNew,
//    fontWeightMediumNew,
//    fontWeightRegularNew,
//    fontSizeNormalizerNative,
//    fontSize,
//    ...other
//  } = (typeof optionOrCreator === 'function' ? optionOrCreator(palette) : (optionOrCreator || {})) as Mui.nw.TypographyOptions


//  //http://typecast.com/blog/a-more-modern-scale-for-web-typography
//  const sheet: Mui.nw.TypographyOptions = {
//    fontWeightLight: fontWeightLightNew.fontWeight,
//    fontWeightRegular: fontWeightRegularNew.fontWeight,
//    fontWeightMedium: fontWeightMediumNew.fontWeight,
//    fontWeightLightNew,
//    fontWeightRegularNew,
//    fontWeightMediumNew,
//    fontSizeNormalizerNative,
//    fontSize,
//    //fontsNative,
//    display4: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.display4),
//      color: palette.text.secondary,
//      ...fontWeightLightNew,
//      //marginLeft: -.06 * htmlFontSize,
//    },
//    display3: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.display3),
//      ...fontWeightRegularNew,
//      //marginLeft: -.04 * htmlFontSize,
//      color: palette.text.secondary,
//    },
//    display2: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.display2),
//      ...fontWeightRegularNew,
//      //marginLeft: -.04 * htmlFontSize,
//      color: palette.text.secondary,
//    },
//    display1: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.display1),
//      ...fontWeightRegularNew,
//      //marginLeft: -.04 * htmlFontSize,
//      color: palette.text.secondary,
//    },
//    headline: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.headline),
//      ...fontWeightRegularNew,
//      color: palette.text.primary,
//    },
//    title: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.title),
//      ...fontWeightMediumNew,
//      color: palette.text.primary,
//    },
//    subheading: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.subheading),
//      ...fontWeightRegularNew,
//      color: palette.text.primary,
//    },
//    body2: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.body2),
//      ...fontWeightMediumNew,
//      color: palette.text.primary,
//    },
//    body1: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.body1),
//      ...fontWeightRegularNew,
//      color: palette.text.primary,
//    },
//    caption: {
//      fontSize: fontSizeNormalizerNative(fontSizesNative.caption),
//      ...fontWeightRegularNew,
//      color: palette.text.secondary,
//    },
//    button: {
//      fontSize: fontSizeNormalizerNative(fontSize),
//      ...fontWeightMediumNew,
//    },
//  }

//  return deepmerge(
//    sheet,
//    other,
//    {
//      clone: false, // No need to clone deep
//    },
//  ) as Mui.nw.Typography
//}

//const enum fontSizesNative {
//  display4 = 32,
//  display3 = 26,
//  display2 = 22,
//  display1 = 18,
//  headline = 20,
//  title = 18,
//  subheading = 16,
//  body2 = 14,
//  body1 = 14,
//  caption = 12,
//}

//////https://stackoverflow.com/questions/36015691/obtaining-the-return-type-of-a-function
////const fnReturnType = (false as true) && createTypography(null, null)
////export type Typography = typeof fnReturnType
////export type TCreateTypography = typeof createTypography

////https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js

//const fontSizeNormalizerDefault = (size: number) => {
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
