import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ArrowTopLeftData = 'M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z'
export default createSvgIcon(
  ArrowTopLeftData,
  'ArrowTopLeft',
  true
)