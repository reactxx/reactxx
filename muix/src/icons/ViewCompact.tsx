import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ViewCompactData = 'M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z'
export default createSvgIcon(
  ViewCompactData,
  'ViewCompact',
  false
)