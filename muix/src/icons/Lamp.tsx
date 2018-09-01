import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const LampData = 'M8,2H16L20,14H4L8,2M11,15H13V20H18V22H6V20H11V15Z'
export default createSvgIcon(
  LampData,
  'Lamp',
  true
)