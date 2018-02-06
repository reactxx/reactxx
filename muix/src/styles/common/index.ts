import React from 'react'
import ReactN from 'react-native'
import PropTypes from 'prop-types'

import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'

//material-ui code, used for both web and native
import createBreakpoints from 'material-ui/styles/createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import transitions from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'

//platform specific code
import { createTypography, shadows, toPlatformRuleSet, toPlatformSheet } from 'muix-styles'

export interface AppContainerProps {
  themeOptions?: Muix.ThemeOptions
}

export const classesToPlatformSheet = (theme: Muix.ThemeNew, classes: Muix.ThemeValueOrCreator<Muix2.PartialSheetX<Muix.Shape>>) => {
  const sheetx = typeof classes === 'function' ? classes(theme) : classes
  return toPlatformSheet(sheetx) as Muix2.Sheet<Muix.Shape> //Muix.PartialSheetX<Muix.Shape>
}

//create platform specific sheet from cross platform sheet creator
export const sheetCreator = <R extends Muix.Shape>(sheetXCreator: Muix.ThemeCreator<Muix2.SheetX<R>>) => ((theme: Muix.ThemeNew) => toPlatformSheet(sheetXCreator(theme) as Muix2.PartialSheetX<R>)) as Muix.SheetCreator<R>

//create platform specific ruleset from cross platform ruleset
export const toPlatformRuleSetX = (style: Muix2.TRulesetX, isNative: boolean) => {
  if (!style) return null
  if (!style.$web && !style.$native && !style.$overrides && !style.$childOverrides) return style //optimalization
  const { $web, $native, $overrides, $childOverrides, ...rest } = style
  const res = { ...rest, ...(isNative ? $native : $web), $overrides: toPlatformSheetX($overrides, isNative), $childOverrides: getOverridesX(null, $childOverrides) }
  if (!res.$overrides) delete res.$overrides; if (!res.$childOverrides) delete res.$childOverrides //remove NULL or UNDEFINED
  return res as Muix2.Ruleset
}

export const createAnimations = (props) => null

export const clearSystemProps = obj => {
  if (!obj) return obj
  delete obj.$overrides; delete obj.$childOverrides; delete obj.$name; delete obj.$web; delete obj.$native 
  return obj
}

//create platform specific sheet from cross platform sheet
export const toPlatformSheetX = (sheet: Muix2.PartialSheetX<Muix.Shape>, isNative: boolean) => {
  if (typeof sheet !== 'object') return sheet
  const res: Muix2.Sheet<Muix.Shape> = { }
  for (const p in sheet) {
    if (p === '$animations') {
      const animSrc = sheet[p]
      const animDest = res[p] = {}
      for (const pp in animSrc) animDest[pp] = toPlatformSheetX(animSrc[pp], isNative)
    } else
      res[p] = toPlatformRuleSetX(sheet[p], isNative)
  }
  return res
}

//create platform specific Overrides from cross platform Overrides
const getOverridesX = (theme: Muix.ThemeNew, source: Muix.ThemeValueOrCreator<Muix.OverridesX>) => {
  if (!source) return null
  if (typeof source === 'function') source = source(theme)
  const result: Muix.Overrides = {}
  for (const p in source) result[p] = toPlatformSheet(source[p])
  return result
}

////convert cross platform typography optionsOrCreator to platform specific optionsOrCreator
//const getTypographyOptionOrCreatorX = (optionsOrCreatorX: Muix.TypographyOptionsOrCreatorX) => {

//  const getOptionX = (optionsX: Muix.TypographyOptionsX) => {

//    let res: Muix.TypographyOptionsNew = {}

//    if (optionsX) {
//      const { fontFamily, fontSize, htmlFontSize, ...rulesX } = optionsX

//      const rules: PartialRecord<Muix.typoStyle, ReactN.TextStyle> = {}
//      for (const p in rulesX) rules[p] = toPlatformRuleSet(rulesX[p]) //toPlatformRuleSet is platform specific

//      res = {
//        fontFamily, fontSize, htmlFontSize,
//        ...rules
//      }
//    }
//    return res
//  }

//  let res: Muix.TypographyOptionsOrCreator = {}

//  if (optionsOrCreatorX) {
//    if (typeof optionsOrCreatorX == 'function') res = palette => getOptionX(optionsOrCreatorX(palette))
//    else res = getOptionX(optionsOrCreatorX)
//  }

//  return res
//}

export const MuiThemeContextTypes = { theme: PropTypes.any }
export const MuiOverridesContextTypes = { childOverrides: PropTypes.any }

let defaultTheme: Muix.ThemeNew
export const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

//create theme from cross platform ThemeOptions
//resulting theme is compatible with material-ui
function createMuiTheme(options: Muix.ThemeOptions = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},

    //use cross platform typography options instead
    typographyX,
    typography: ignored1, //ignored, use cross platform typographyNew instead

    //use cross platform shadows options instead
    shadowsX: shadowsNewInputX,
    shadows: ignored2, //ignored, use cross platform shadowsNew instead

    //use cross platform overrides options instead
    overridesX,
    overrides: ignored3, //ignored , use cross platform overridesNew instead

    ...other //contains direction, transitions, spacing, zIndex
  } = options

  //convert cross platform shadows to platform specific shadows
  const shadowsNewInput = shadowsNewInputX && shadowsNewInputX.map(rsx => toPlatformRuleSet(rsx) as Muix2.commonViewRuleset)

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  //const typographyOptionOrCreator = getTypographyOptionOrCreatorX(typographyNew)

  const muiTheme: Muix.ThemeNew = {
    direction: 'ltr', //the same value for web and native
    palette, //the same value for web and native
    ...createTypography(palette, typographyX), //different fields for web and native (typography and typographyX)
    mixins: createMixins(breakpoints, spacing, mixinsInput), //the same value for web and native
    breakpoints, //the same value for web and native
    shadows: (shadowsNewInput || shadows).map(rsx => (toPlatformRuleSetX(rsx, false) as React.CSSProperties).boxShadow), // for material-ui only
    shadowsNew: shadowsNewInput || shadows, //different value for web and native
    ...(deepmerge(
      { transitions, spacing, zIndex, },
      other,
      { clone: false }, // No need to clone deep
    )) as Muix.ThemeNew,
  }

  muiTheme.overrides = getOverridesX(muiTheme, overridesX) //different value for web and native

  warning(muiTheme.shadows.length === 25 && muiTheme.shadowsNew.length === 25, 'MUIX: the shadows array provided to createMuiTheme should support 25 elevations.')

  return muiTheme
}

export default createMuiTheme