import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PauseData = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z'
export default createSvgIcon(
  PauseData,
  'Pause',
  false
)