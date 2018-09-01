import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from './create-svg-icon'
import { SvgIconProps, Shape } from '../../SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const WarningData = 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
export default createSvgIcon(
  WarningData,
  'Warning',
  false
)