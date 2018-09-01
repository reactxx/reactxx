import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PlaylistMinusData = 'M2,16H10V14H2M12,14V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z'
export default createSvgIcon(
  PlaylistMinusData,
  'PlaylistMinus',
  true
)