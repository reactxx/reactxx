import RN from 'react-native'
import React from 'react'

import muiCreateTypography from 'material-ui/styles/createTypography' 
import shadows_w from 'material-ui/styles/shadows'
import { emptyTypography, emptyShadowsNative } from 'muix-styles/common/empties'

export const createTypographyWeb = muiCreateTypography
export const createTypographyNative = (palette, options) => emptyTypography //as Mui.native.TypographyOptionsCreator
export const shadowsNative = emptyShadowsNative
export const shadowsWeb = shadows_w

