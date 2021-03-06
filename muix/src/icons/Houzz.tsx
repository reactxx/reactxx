import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const HouzzData = 'M14,20.95H20V10.78L8,7.34V3.05H4V20.95H10V15.31H14V20.95Z'
export default createSvgIcon(
  HouzzData,
  'Houzz',
  true
)