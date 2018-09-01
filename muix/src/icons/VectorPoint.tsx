import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const VectorPointData = 'M12,20L7,22L12,11L17,22L12,20M8,2H16V5H22V7H16V10H8V7H2V5H8V2M10,4V8H14V4H10Z'
export default createSvgIcon(
  VectorPointData,
  'VectorPoint',
  true
)