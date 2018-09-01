import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ChevronLeftData = 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'
export default createSvgIcon(
  ChevronLeftData,
  'ChevronLeft',
  false
)