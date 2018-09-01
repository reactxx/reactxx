import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SkipNextData = 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z'
export default createSvgIcon(
  SkipNextData,
  'SkipNext',
  false
)