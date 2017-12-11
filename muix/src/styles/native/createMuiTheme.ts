import React from 'react'
import RN from 'react-native'

import createTypographyN from 'muix-styles/native/createTypography'
import shadows_n from 'muix-styles/native/shadows'
import { emptyTypography, emptyShadowsWeb } from 'muix-styles/common/empties'

export const createTypographyWeb = (palette, options) => emptyTypography
export const createTypographyNative = createTypographyN

export const shadowsNative = shadows_n
export const shadowsWeb = emptyShadowsWeb
