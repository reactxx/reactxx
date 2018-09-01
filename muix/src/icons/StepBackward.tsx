import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const StepBackwardData = 'M19,5V19H16V5M14,5V19L3,12'
export default createSvgIcon(
  StepBackwardData,
  'StepBackward',
  true
)