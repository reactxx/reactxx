import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FlagTriangleData = 'M7,2H9V22H7V2M19,9L11,14.6V3.4L19,9Z'
export default createSvgIcon(
  FlagTriangleData,
  'FlagTriangle',
  true
)