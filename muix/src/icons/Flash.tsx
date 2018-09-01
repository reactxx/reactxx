import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FlashData = 'M7,2V13H10V22L17,10H13L17,2H7Z'
export default createSvgIcon(
  FlashData,
  'Flash',
  true
)