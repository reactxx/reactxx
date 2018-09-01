import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SendData = 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z'
export default createSvgIcon(
  SendData,
  'Send',
  false
)