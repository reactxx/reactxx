import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SkipPreviousData = 'M6 6h2v12H6zm3.5 6l8.5 6V6z'
export default createSvgIcon(
  SkipPreviousData,
  'SkipPrevious',
  false
)