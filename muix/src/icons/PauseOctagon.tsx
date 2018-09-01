import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PauseOctagonData = 'M15.73,3L21,8.27V15.73L15.73,21H8.27L3,15.73V8.27L8.27,3H15.73M15,16V8H13V16H15M11,16V8H9V16H11Z'
export default createSvgIcon(
  PauseOctagonData,
  'PauseOctagon',
  true
)