import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const WaterOffData = 'M17.12,17.12L12.5,12.5L5.27,5.27L4,6.55L7.32,9.87C6.55,11.32 6,12.79 6,14C6,17.31 8.69,20 12,20C13.5,20 14.9,19.43 15.96,18.5L18.59,21.13L19.86,19.86L17.12,17.12M18,14C18,10 12,3.2 12,3.2C12,3.2 10.67,4.71 9.27,6.72L17.86,15.31C17.95,14.89 18,14.45 18,14Z'
export default createSvgIcon(
  WaterOffData,
  'WaterOff',
  true
)