import React from 'react'
import ReactN from 'react-native'

import { TBasic } from 'reactxx-basic/typings'

import PropTypes from 'prop-types'

import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'
import getShadows from 'reactxx-shadows'

//material-ui code, used for both web and native
import createBreakpoints from 'material-ui/styles/createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import transitions from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'

import { Muix } from '../typings/muix'

//platform specific code
import createTypography from './createTypography'

import { toPlatformRuleSet } from 'reactxx-basic/to-platform'

//create theme from cross platform ThemeOptions
//resulting theme is compatible with material-ui
export const createMuiTheme = (options: Muix.ThemeOptions = {}) => {
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
    //overridesX,
    overrides: ignored3, //ignored , use cross platform overridesNew instead

    ...other //contains direction, transitions, spacing, zIndex
  } = options

  //convert cross platform shadows to platform specific shadows
  const shadowsNewInput = shadowsNewInputX && shadowsNewInputX.map(rsx => toPlatformRuleSet(rsx) as TBasic.ViewRulesetCommonX)

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  //const typographyOptionOrCreator = getTypographyOptionOrCreatorX(typographyNew)

  const muiTheme: Muix.Theme = {
    direction: 'ltr', //the same value for web and native
    palette, //the same value for web and native
    ...createTypography(palette, typographyX), //different fields for web and native (typography and typographyX)
    mixins: createMixins(breakpoints, spacing, mixinsInput), //the same value for web and native
    breakpoints, //the same value for web and native
    // TODO, commented during reactxx-basic creation shadows: (shadowsNewInput || shadows).map(rsx => (toPlatformRuleSet(rsx) as React.CSSProperties).boxShadow), // for material-ui only
    shadowsNew: shadowsNewInput || shadows, //different value for web and native
    ...(deepmerge(
      { transitions, spacing, zIndex, },
      other,
      { clone: false }, // No need to clone deep
    )) as Muix.Theme,
  }

  //muiTheme.overrides = getOverridesX(muiTheme, overridesX) //different value for web and native

  warning(muiTheme.shadows.length === 25 && muiTheme.shadowsNew.length === 25, 'MUIX: the shadows array provided to createMuiTheme should support 25 elevations.')

  return muiTheme
}

export const shadows: ReactN.ViewStyle[] = getShadows()
