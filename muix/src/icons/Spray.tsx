import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SprayData = 'M10,4H12V6H10V4M7,3H9V5H7V3M7,6H9V8H7V6M6,8V10H4V8H6M6,5V7H4V5H6M6,2V4H4V2H6M13,22C11.9,22 11,21.1 11,20V10C11,8.9 11.9,8 13,8V7H14V4H17V7H18V8C19.1,8 20,8.9 20,10V20C20,21.1 19.1,22 18,22H13M13,10V20H18V10H13Z'
export default createSvgIcon(
  SprayData,
  'Spray',
  true
)