import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'

import createBreakpoints from 'material-ui/styles/createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import transitions from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'

import { toPlatformSheetLow } from './toPlatform'
import { createTypographyNative, createTypographyWeb, shadowsNative, shadowsWeb } from 'muix/styles/current/createMuiTheme'

export const platformOverrides = (source: Mui.OverridesNew) => {
  if (!source) return null
  const result: Mui.Overrides = {}
  for (const p in source) result[p] = toPlatformSheetLow(source[p], false)
  return result
}

const getTypographyOptions = (optionsOrCreator: Mui.TypographyOptionsCreator) => {

  const getOptions = (options, isNative: boolean) => {
    if (!options) return {}
    const { fontFamily, fontSize, fontWeightLight, fontWeightRegular, fontWeightMedium, htmlFontSize, fontSizeNormalizerNative, fontAssetPathNative, ...rest } = options
    return {
      ...(isNative ? { htmlFontSize, fontSize, fontSizeNormalizerNative, fontAssetPathNative } : { htmlFontSize, fontSize, fontFamily, fontWeightLight, fontWeightRegular, fontWeightMedium }),
      ...toPlatformSheetLow({ common: rest }, isNative) as any
    }
  }

  if (typeof optionsOrCreator == 'function') {
    return { optionsWeb: ((palette => getOptions(optionsOrCreator(palette), false))) as Mui.web.TypographyOptionsCreator /*Mui.web.TypographyOptionsCreator*/, optionsNative: (palette => getOptions(optionsOrCreator(palette), true)) as Mui.native.TypographyOptionsCreator }
  } else
    return { optionsWeb: getOptions(optionsOrCreator, false) as Mui.web.TypographyOptionsCreator, optionsNative: getOptions(optionsOrCreator, true) as Mui.native.TypographyOptionsCreator }
}

function createMuiTheme(options: Mui.ThemeOptions = {}) { 
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput,
    shadows: shadowsInput,
    shadowsNative: shadowsNativeInput,
    overridesNew, //XPlatform format
    overrides, //ignored
    ...other
  } = options

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  const typographyOptions = getTypographyOptions(typographyInput)

  const muiTheme: Mui.Theme = {
    direction: 'ltr',
    palette,
    typography: createTypographyWeb(palette, typographyOptions.optionsWeb),
    typographyNative: createTypographyNative(palette, typographyOptions.optionsNative),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints,
    shadows: shadowsInput || shadowsWeb,
    shadowsNative: shadowsNativeInput || shadowsNative,
    overrides: platformOverrides(overridesNew),
    nativeSheetCache: [],
    ...(deepmerge(
      {
        transitions,
        spacing,
        zIndex,
      },
      other,
      {
        clone: false, // No need to clone deep
      },
    )) as Mui.Theme,
  }

  warning(
    muiTheme.shadows.length === 25 && muiTheme.shadowsNative.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  )

  return muiTheme
}

export default createMuiTheme