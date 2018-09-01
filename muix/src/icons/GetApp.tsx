import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const GetAppData = 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'
export default createSvgIcon(
  GetAppData,
  'GetApp',
  false
)