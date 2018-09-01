import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const VolumeLowData = 'M7,9V15H11L16,20V4L11,9H7Z'
export default createSvgIcon(
  VolumeLowData,
  'VolumeLow',
  true
)