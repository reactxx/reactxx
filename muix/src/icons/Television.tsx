import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TelevisionData = 'M21,17H3V5H21M21,3H3C1.9,3 1,3.9 1,5V17C1,18.1 1.9,19 3,19H8V21H16V19H21C22.1,19 23,18.1 23,17V5C23,3.9 22.1,3 21,3Z'
export default createSvgIcon(
  TelevisionData,
  'Television',
  true
)