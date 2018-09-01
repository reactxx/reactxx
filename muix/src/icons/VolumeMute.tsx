import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const VolumeMuteData = 'M7 9v6h4l5 5V4l-5 5H7z'
export default createSvgIcon(
  VolumeMuteData,
  'VolumeMute',
  false
)