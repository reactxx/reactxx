import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ForwardData = 'M12 8V4l8 8-8 8v-4H4V8z'
export default createSvgIcon(
  ForwardData,
  'Forward',
  false
)