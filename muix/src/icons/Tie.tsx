import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TieData = 'M6,2L10,6L7,17L12,22L17,17L14,6L18,2Z'
export default createSvgIcon(
  TieData,
  'Tie',
  true
)