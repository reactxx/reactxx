import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SwapVerticalData = 'M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z'
export default createSvgIcon(
  SwapVerticalData,
  'SwapVertical',
  true
)