import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'

import createBreakpoints from 'material-ui/styles/createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import transitions from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'

import { createTypography, shadows, toRule, toPlatformSheet } from 'muix-styles/current/index'

export const sheetCreator = <R extends Mui.Shape>(sheetGetter: Mui.SheetGetter<R>) => (theme: Mui.Theme) => toPlatformSheet(sheetGetter(theme) as Mui.PartialSheetX<R>)

export const toRuleX = (style: Mui.TRuleSetX, isNative: boolean) => {
  if (!style) return null
  const { web, native, ...rest } = style
  return { ...rest, ...(isNative ? native : web) } as Mui.TRuleSet
}

/* INPUT
const sheet = {
  common: {
    root: {
      color: 'red',
      web: { color: 'blue' },
      native: { color: 'yellow' }
    }
  },
  native: {
    root: { color: 'green' }
  },
  web: {
    root: { }
  }
}
//OUTPUT for WEB
const web = {
  root: {color: 'blue'}
}
//OUTPUT for NATIVE
const native = {
  root: { color: 'green' }
}
*/
export const toPlatformSheetX = (rules: Mui.PartialSheetX<Mui.Shape>, isNative: boolean) => {
  if (!rules) return null
  const res = { ...(isNative ? rules.native : rules.web) }
  for (const p in rules.common) {
    const common = toRuleX(rules.common[p], isNative)
    res[p] = !!res[p] ? { ...common, ...res[p] } : common
  }
  return res as Mui.Sheet<Mui.Shape>
}

const getOverridesX = (source: Mui.OverridesNew) => {
  if (!source) return null
  const result: Mui.Overrides = {}
  for (const p in source) result[p] = toPlatformSheetX(source[p], false)
  return result
}

const createTypographyX = (palette: Mui.Palette, optionOrCreator: Mui.nw.TypographyOptionsCreatorX) => {
  const {
    fontSize = 14, // px
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    fontWeightLightNew = {
      fontWeight: '300',
      native: { fontFamily: 'Roboto_Light' }
    } as Mui.TextStyleX,
    fontWeightMediumNew = {
      fontWeight: '500',
      native: { fontFamily: 'Roboto_Medium' }
    } as Mui.TextStyleX,
    fontWeightRegularNew = {
      fontWeight: '400',
      native: { fontFamily: 'Roboto' }
    } as Mui.TextStyleX,
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    fontAssetPathNative = 'libs/rw-mui-n/fonts/',
    ...other
  } = (typeof optionOrCreator === 'function' ? optionOrCreator(palette) : (optionOrCreator || {})) as Mui.nw.TypographyOptionsX

  const typographyOptions = getTypographyOptions(optionOrCreator)

  return createTypography(palette, typographyOptions)

}

const getTypographyOptions = (optionsOrCreator: Mui.nw.TypographyOptionsCreatorX) => {

  const getOptions = (options: Mui.nw.TypographyOptionsX) => {

    let res: Mui.nw.TypographyOptions = {}

    if (options) {
      const { fontFamily, fontSize, htmlFontSize, fontSizeNormalizerNative, fontAssetPathNative, ...rulesX } = options

      const rules: PartialRecord<Mui.nw.typoStyle, ReactN.TextStyle> = {}
      for (const p in rulesX) rules[p] = toRule(rulesX[p])

      res = {
        fontFamily, fontSize, htmlFontSize, fontSizeNormalizerNative, fontAssetPathNative,
        ...rules
      }
    }
    return res
  }

  let res: Mui.nw.TypographyOptionsCreator = {}

  if (optionsOrCreator) {
    if (typeof optionsOrCreator == 'function') res = palette => getOptions(optionsOrCreator(palette))
    else res = getOptions(optionsOrCreator)
  }

  return res
}

function createMuiTheme(options: Mui.ThemeOptions = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    //typography: typographyInput,
    typographyNew,
    shadowsNew: shadowsNewInputX,
    //shadowsNative: shadowsNativeInput,
    overridesNew, //XPlatform format
    overrides, //ignored
    ...other
  } = options

  const shadowsNewInput = shadowsNewInputX && shadowsNewInputX.map(rsx => toRule(rsx) as Mui.ViewStyleCommon)

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  const muiTheme: Mui.Theme = {
    direction: 'ltr',
    palette,
    typography: createTypographyX(palette, typographyNew),
    //typographyNative: createTypographyNative(palette, typographyOptions.optionsNative),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints,
    shadows: (shadowsNewInput || shadows).map(rsx => (toRuleX(rsx, false) as React.CSSProperties).boxShadow),
    shadowsNew: shadowsNewInput || shadows,
    //shadowsNative: shadowsNativeInput || shadowsNative,
    overrides: getOverridesX(overridesNew),
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
    muiTheme.shadows.length === 25 && muiTheme.shadowsNew.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  )

  return muiTheme
}

export default createMuiTheme