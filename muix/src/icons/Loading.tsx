import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const LoadingData = 'M12,4V2C6.48,2 2,6.48 2,12H4C4,7.58 7.58,4 12,4Z'
export default createSvgIcon(
  LoadingData,
  'Loading',
  true
)