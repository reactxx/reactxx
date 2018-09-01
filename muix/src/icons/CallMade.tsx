import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CallMadeData = 'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z'
export default createSvgIcon(
  CallMadeData,
  'CallMade',
  false
)