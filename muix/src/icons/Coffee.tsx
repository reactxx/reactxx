import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CoffeeData = 'M2,21H20V19H2M20,8H18V5H20M20,3H4V13C4,15.21 5.79,17 8,17H14C16.21,17 18,15.21 18,13V10H20C21.1,10 22,9.1 22,8V5C22,3.89 21.1,3 20,3Z'
export default createSvgIcon(
  CoffeeData,
  'Coffee',
  true
)