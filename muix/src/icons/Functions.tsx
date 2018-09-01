import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FunctionsData = 'M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z'
export default createSvgIcon(
  FunctionsData,
  'Functions',
  false
)