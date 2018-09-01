import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ServerMinusData = 'M4,4H20C20.55,4 21,4.45 21,5V9C21,9.55 20.55,10 20,10H4C3.45,10 3,9.55 3,9V5C3,4.45 3.45,4 4,4M9,8H10V6H9V8M5,6V8H7V6H5M8,16H16V18H8V16Z'
export default createSvgIcon(
  ServerMinusData,
  'ServerMinus',
  true
)