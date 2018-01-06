import React from 'react'
import ReactN from 'react-native'

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

export const classesPropsToSheet = (theme: Muix.ThemeNew, props: Muix.PropsX<Muix.Shape>) => {
  const applyTheme = valueOrCreator => (typeof valueOrCreator === 'function' ? valueOrCreator(theme) : valueOrCreator)
  const { classes, classesNative, classesWeb } = props as Muix.PropsX<Muix.Shape>
  return toPlatformSheet({ common: applyTheme(classes), native: applyTheme(classesNative), web: applyTheme(classesWeb) }) as Muix.PartialSheetX<Muix.Shape>
}

//create platform specific sheet from cross platform sheet creator
export const sheetCreator = <R extends Muix.Shape>(sheetXCreator: Muix.ThemeCreator<Muix.SheetX<R>>) => ((theme: Muix.ThemeNew) => toPlatformSheet(sheetXCreator(theme as Muix.ThemeNew) as Muix.PartialSheetX<R>)) as Muix.SheetCreator<R>

//create platform specific ruleset from cross platform ruleset
export const toPlatformRuleSetX = (style: Muix.TRulesetX, isNative: boolean) => {
  if (!style) return null
  const { $web, $native, $patch, ...rest } = style
  return { ...rest, ...(isNative ? $native : $web), ...(isNative ? { $patch } : $patch) } as Muix.TRuleset
}

//create platform specific sheet from cross platform sheet
export const toPlatformSheetX = (rules: Muix.PartialSheetX<Muix.Shape>, isNative: boolean) => {
  if (!rules) return null
  const res = { ...(isNative ? rules.native : rules.web) }
  for (const p in rules.common) {
    const common = toPlatformRuleSetX(rules.common[p], isNative)
    res[p] = !!res[p] ? { ...common, ...res[p] } : common
  }
  return res as Muix.Sheet<Muix.Shape>
}

//create platform specific Overrides from cross platform Overrides
const getOverridesX = (theme: Muix.ThemeNew, source: Muix.ThemeValueOrCreator<Muix.OverridesNew>) => {
  if (!source) return null
  if (typeof source === 'function') source = source(theme)
  const result: Muix.Overrides = {}
  for (const p in source) result[p] = toPlatformSheet(source[p])
  return result
}

//convert cross platform typography optionsOrCreator to platform specific optionsOrCreator
const getTypographyOptionOrCreatorX = (optionsOrCreatorX: Muix.TypographyOptionsOrCreatorX) => {

  const getOptionX = (optionsX: Muix.TypographyOptionsX) => {

    let res: Muix.TypographyOptionsNew = {}

    if (optionsX) {
      const { fontFamily, fontSize, htmlFontSize, fontSizeNormalizerNative, ...rulesX } = optionsX

      const rules: PartialRecord<Muix.typoStyle, ReactN.TextStyle> = {}
      for (const p in rulesX) rules[p] = toPlatformRuleSet(rulesX[p]) //toPlatformRuleSet is platform specific

      res = {
        fontFamily, fontSize, htmlFontSize, fontSizeNormalizerNative,
        ...rules
      }
    }
    return res
  }

  let res: Muix.TypographyOptionsOrCreator = {}

  if (optionsOrCreatorX) {
    if (typeof optionsOrCreatorX == 'function') res = palette => getOptionX(optionsOrCreatorX(palette))
    else res = getOptionX(optionsOrCreatorX)
  }

  return res
}

let defaultTheme: Muix.ThemeNew
export const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

//create theme from cross platform ThemeOptions
//resulting theme is (for web) compatible with material-ui
function createMuiTheme(options: Muix.ThemeOptions = {}) {
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
  const shadowsNewInput = shadowsNewInputX && shadowsNewInputX.map(rsx => toPlatformRuleSet(rsx) as Muix.ViewStyleCommon)

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  const typographyOptionOrCreator = getTypographyOptionOrCreatorX(typographyNew)

  const muiTheme: Muix.ThemeNew = {
    direction: 'ltr', //the same format and value for web and native
    palette, //the same format and value for web and native
    //typography: createTypographyX(palette, typographyNew), //the same format, different values for web and native
    typography: createTypography(palette, typographyOptionOrCreator), //the same format, different values for web and native
    mixins: createMixins(breakpoints, spacing, mixinsInput), //the same for web and native
    breakpoints, //the same format and value for web and native
    shadows: (shadowsNewInput || shadows).map(rsx => (toPlatformRuleSetX(rsx, false) as React.CSSProperties).boxShadow), // for material-ui only
    shadowsNew: shadowsNewInput || shadows, //the same format, different values for web and native
    nativeSheetCache: [], //sheet cache (for native only)
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
    )) as Muix.ThemeNew,
  }


  muiTheme.overrides = getOverridesX(muiTheme, overridesNew), //the same format, different values for web and native


    warning(
      muiTheme.shadows.length === 25 && muiTheme.shadowsNew.length === 25,
      'MUIX: the shadows array provided to createMuiTheme should support 25 elevations.',
    )

  return muiTheme
}

export default createMuiTheme