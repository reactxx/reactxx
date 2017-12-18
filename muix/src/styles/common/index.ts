import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'

import createBreakpoints from 'material-ui/styles/createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import transitions from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'

//platform specific functions
import { createTypography, shadows, toRule, toPlatformSheet } from 'muix-styles/current/index'

//create platform specific sheet from cross platform sheet creator
export const sheetCreator = <R extends Mui.Shape>(sheetXCreator: Mui.SheetXCreator<R>) => (theme: Mui.Theme) => toPlatformSheet(sheetXCreator(theme) as Mui.PartialSheetX<R>)

//create platform specific sheet from cross platform sheet creator
export const toPlatformRuleSetX = (style: Mui.TRulesetX, isNative: boolean) => {
  if (!style) return null
  const { web, native, ...rest } = style
  return { ...rest, ...(isNative ? native : web) } as Mui.TRuleset
}

export const toPlatformSheetX = (rules: Mui.PartialSheetX<Mui.Shape>, isNative: boolean) => {
  if (!rules) return null
  const res = { ...(isNative ? rules.native : rules.web) }
  for (const p in rules.common) {
    const common = toPlatformRuleSetX(rules.common[p], isNative)
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

const createTypographyX = (palette: Mui.Palette, optionOrCreator: Mui.nw.TypographyOptionsOrCreatorX) => {
  //get cross platform options
  const {
    fontSize = 14, // px
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    //cross platform font weights
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
    //web fontFamily
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    //native font assets path
    fontAssetPathNative = 'native/fonts/',
    ...other
  } = (typeof optionOrCreator === 'function' ? optionOrCreator(palette) : (optionOrCreator || {})) as Mui.nw.TypographyOptionsX

  //convert x-platform to platform specific
  const typographyOptions = getTypographyOptions(optionOrCreator)

  //pass platform specific options to platform specific "createTypography"
  return createTypography(palette, typographyOptions)

}

//convert cross platform typography option or creator to platform specific
const getTypographyOptions = (optionsOrCreator: Mui.nw.TypographyOptionsOrCreatorX) => {

  const getOptions = (options: Mui.nw.TypographyOptionsX) => {

    let res: Mui.nw.TypographyOptions = {}

    if (options) {
      const { fontFamily, fontSize, htmlFontSize, fontSizeNormalizerNative, fontAssetPathNative, ...rulesX } = options

      const rules: PartialRecord<Mui.nw.typoStyle, ReactN.TextStyle> = {}
      for (const p in rulesX) rules[p] = toRule(rulesX[p]) //toRule is platform specific

      res = {
        fontFamily, fontSize, htmlFontSize, fontSizeNormalizerNative, fontAssetPathNative,
        ...rules
      }
    }
    return res
  }

  let res: Mui.nw.TypographyOptionsOrCreator = {}

  if (optionsOrCreator) {
    if (typeof optionsOrCreator == 'function') res = palette => getOptions(optionsOrCreator(palette))
    else res = getOptions(optionsOrCreator)
  }

  return res
}

//create theme from new Mui.ThemeOptions cross platform format
//resulting theme is (for web) compatible with material-ui
function createMuiTheme(options: Mui.ThemeOptions = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},

    //use cross platform typography options instead
    typographyNew,
    typography: xxx1, //ignored

    //use cross platform shadows options instead
    shadowsNew: shadowsNewInputX, 
    shadows: xxx2, //ignored

    //use cross platform overrides options instead
    overridesNew,
    overrides: xxx3, //ignored 

    ...other
  } = options

  //convert cross platform shadows to platform specific shadows
  const shadowsNewInput = shadowsNewInputX && shadowsNewInputX.map(rsx => toRule(rsx) as Mui.ViewStyleCommon)

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  const muiTheme: Mui.Theme = {
    direction: 'ltr', //the same for web and native
    palette, //the same for web and native
    typography: createTypographyX(palette, typographyNew), //platform specific typography (compatible with material-ui)
    mixins: createMixins(breakpoints, spacing, mixinsInput), //the same for web and native
    breakpoints, //the same for web and native
    shadows: (shadowsNewInput || shadows).map(rsx => (toPlatformRuleSetX(rsx, false) as React.CSSProperties).boxShadow), // material-ui compatible shadows
    shadowsNew: shadowsNewInput || shadows, //platform specific new shadow format (not compatible with material-ui)
    overrides: getOverridesX(overridesNew), //platform specific overrides (compatible with material-ui)
    nativeSheetCache: [], //helper cache for native only
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
    'MUIX: the shadows array provided to createMuiTheme should support 25 elevations.',
  )

  return muiTheme
}

export default createMuiTheme