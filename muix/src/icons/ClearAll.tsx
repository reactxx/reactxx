import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ClearAllData = 'M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z'
export default createSvgIcon(
  ClearAllData,
  'ClearAll',
  false
)