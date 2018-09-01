import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ChartBarData = 'M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z'
export default createSvgIcon(
  ChartBarData,
  'ChartBar',
  true
)