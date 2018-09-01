import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ViewStreamData = 'M4 18h17v-6H4v6zM4 5v6h17V5H4z'
export default createSvgIcon(
  ViewStreamData,
  'ViewStream',
  false
)