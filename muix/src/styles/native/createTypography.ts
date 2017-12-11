import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

import { Dimensions, PixelRatio } from 'react-native'

import { toPlatformTypographyOptionsLow } from 'muix-styles/common/toPlatform'


const toRule = (style: Mui.RuleUntyped, isNative: boolean) => {
  if (!style) return null
  const { web, native, ...rest } = style
  return { ...rest, ...(isNative ? native : web) } as Mui.PlatformRuleUntyped
}

const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.Sheet<R>, isNative: boolean) => {
  if (!rules) return null
  const res: Mui.PlatformSheet<R> = {} as any
  for (const p in rules) res[p] = toRule(rules[p], isNative)
  return res
}

export const toPlatformTypographyOptions = (options: Mui.TypographyOptions) => toPlatformTypographyOptionsLow(options, true)
//  if (!options) return null
//  const { fontStyle: fontStyleInit, sheet: sheetInit } = options
//  const sheet = sheetInit ? toPlatformSheet(sheetInit, isNative) : sheetInit
//  if (fontStyleInit) {
//    const { web, native, ...rest } = fontStyleInit
//    return { ...rest, ...(isNative ? native : web), ...sheet } as Mui.PlatformTypographyOptions
//  }
//  return { ...sheet } as Mui.PlatformTypographyOptions
//}

export default function createTypography(palette: Mui.Palette, optionOrCreator: Mui.native.TypographyOptionsCreator) {
  const {
    fontAssetPathNative = 'libs/rw-mui-n/fonts/',
    fontSize = 14, // px
    fontsNative: fontsNativeInit,
    fontSizeNormalizerNative = fontSizeNormalizerDefault,
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    ...other
  } = (typeof optionOrCreator === 'function' ? optionOrCreator(palette) : optionOrCreator) as Mui.native.TypographyOptions

  const fontsNative = fontsNativeInit ? deepmerge(fontsNativeDefault, fontsNativeInit) as Mui.native.FontsNative : fontsNativeDefault
  //const fontSizesNative = fontSizesNativeInit ? { ...fontSizesNativeDefault, ...fontSizesNativeInit } : fontSizesNativeDefault

  //http://typecast.com/blog/a-more-modern-scale-for-web-typography
  const sheet: Mui.native.Typography = {
    fontSizeNormalizerNative,
    fontAssetPathNative,
    fontSize,
    htmlFontSize,
    fontsNative,
    display4: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.display4),
      ...fontsNative.light,
      marginLeft: -.06 * htmlFontSize,
      color: palette.text.secondary,
    },
    display3: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.display3),
      ...fontsNative.regular,
      marginLeft: -.04 * htmlFontSize,
      color: palette.text.secondary,
    },
    display2: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.display2),
      ...fontsNative.regular,
      marginLeft: -.04 * htmlFontSize,
      color: palette.text.secondary,
    },
    display1: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.display1),
      ...fontsNative.regular,
      marginLeft: -.04 * htmlFontSize,
      color: palette.text.secondary,
    },
    headline: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.headline),
      ...fontsNative.regular,
      color: palette.text.primary,
    },
    title: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.title),
      ...fontsNative.medium,
      color: palette.text.primary,
    },
    subheading: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.subheading),
      ...fontsNative.regular,
      color: palette.text.primary,
    },
    body2: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.body2),
      ...fontsNative.medium,
      color: palette.text.primary,
    },
    body1: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.body1),
      ...fontsNative.regular,
      color: palette.text.primary,
    },
    caption: {
      fontSize: fontSizeNormalizerNative(fontSizesNative.caption),
      ...fontsNative.regular,
      color: palette.text.secondary,
    },
    button: {
      fontSize: fontSizeNormalizerNative(fontSize),
      ...fontsNative.medium,
    },
  }

  return deepmerge(
    sheet,
    other,
    //{
    //  clone: false, // No need to clone deep
    //},
  ) as Mui.native.Typography
}

const fontsNativeDefault: Mui.native.FontsNative = {
  light: {
    fontFamily: 'Roboto_Light',
    //fontFile: 'Roboto-Light.ttf',
    fontWeight: '300'
  },
  regular: {
    fontFamily: 'Roboto',
    //fontFile: 'Roboto-Regular.ttf',
    fontWeight: '400'
  },
  medium: {
    fontFamily: 'Roboto_Medium',
    //fontFile: 'Roboto-Medium.ttf',
    fontWeight: '500'
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

//https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js

const fontSizeNormalizerDefault = (size: number) => {
  const pixelRatio = PixelRatio.get()
  const deviceHeight = Dimensions.get('window').height
  const deviceWidth = Dimensions.get('window').width
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi 
    return size * 1.27;
  } else if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  } else
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size;
}

//RN unit are dp: https://stackoverflow.com/questions/34493372/what-is-the-default-unit-of-style-in-react-native
//http://typecast.com/blog/a-more-modern-scale-for-web-typography
//const fontSizesNative = {
//  display4: 32,
//  display3: 26,
//  display2: 22,
//  display1: 18,
//  headline: 20,
//  title: 18,
//  subheading: 16,
//  body2: 14,
//  body1: 14,
//  caption: 12,
//  //getFontSizeNormalizer: getFontSizeNormalizer
//}

//export type TFontSizes = typeof fontSizesNative

//const mui_fontSizes = {
//  display4: 112,
//  display3: 56,
//  display2: 45,
//  display1: 34,
//  headline: 24,
//  title: 20,
//  subheading: 16,
//  body2: 14,
//  body1: 14,
//  caption: 12,
//  getFontSizeNormalizer: (pixelRatio: number, deviceWidth: number, deviceHeight: number) => (size: number) => size / pixelRatio
//}

