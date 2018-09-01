import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SummitData = 'M15,3H17L22,5L17,7V10.17L22,21H2L8,13L11.5,17.7L15,10.17V3Z'
export default createSvgIcon(
  SummitData,
  'Summit',
  true
)