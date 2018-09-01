import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const VectorRadiusData = 'M2,4H4V2H10V4C15.52,4 20,8.48 20,14H22V20H20V22H18V20H16V14H18C18,9.58 14.42,6 10,6V8H4V6H2V4M18,16V18H20V16H18M6,4V6H8V4H6Z'
export default createSvgIcon(
  VectorRadiusData,
  'VectorRadius',
  true
)