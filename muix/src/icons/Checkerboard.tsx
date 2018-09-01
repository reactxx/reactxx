import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CheckerboardData = 'M3,3H21V21H3V3M5,5V12H12V19H19V12H12V5H5Z'
export default createSvgIcon(
  CheckerboardData,
  'Checkerboard',
  true
)