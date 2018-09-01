import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const DetailsData = 'M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z'
export default createSvgIcon(
  DetailsData,
  'Details',
  false
)