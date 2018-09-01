import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SwapHorizontalData = 'M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z'
export default createSvgIcon(
  SwapHorizontalData,
  'SwapHorizontal',
  true
)