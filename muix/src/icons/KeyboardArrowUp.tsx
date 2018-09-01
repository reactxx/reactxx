import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const KeyboardArrowUpData = 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z'
export default createSvgIcon(
  KeyboardArrowUpData,
  'KeyboardArrowUp',
  false
)