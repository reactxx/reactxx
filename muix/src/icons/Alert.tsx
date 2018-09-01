import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const AlertData = 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z'
export default createSvgIcon(
  AlertData,
  'Alert',
  true
)