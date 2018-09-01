import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ArrowTopRightData = 'M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z'
export default createSvgIcon(
  ArrowTopRightData,
  'ArrowTopRight',
  true
)