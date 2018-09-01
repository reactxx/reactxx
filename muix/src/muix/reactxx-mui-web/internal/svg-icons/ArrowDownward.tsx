import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from './create-svg-icon'
import { SvgIconProps, Shape } from '../../SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ArrowDownwardData = 'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z'
export default createSvgIcon(
  ArrowDownwardData,
  'ArrowDownward',
  false
)