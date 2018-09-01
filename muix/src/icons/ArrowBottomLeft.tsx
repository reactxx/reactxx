import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ArrowBottomLeftData = 'M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z'
export default createSvgIcon(
  ArrowBottomLeftData,
  'ArrowBottomLeft',
  true
)