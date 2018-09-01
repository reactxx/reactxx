import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PublishData = 'M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z'
export default createSvgIcon(
  PublishData,
  'Publish',
  false
)