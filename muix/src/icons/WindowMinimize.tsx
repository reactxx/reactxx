import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const WindowMinimizeData = 'M20,14H4V10H20'
export default createSvgIcon(
  WindowMinimizeData,
  'WindowMinimize',
  true
)