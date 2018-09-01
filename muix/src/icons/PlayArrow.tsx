import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PlayArrowData = 'M8 5v14l11-7z'
export default createSvgIcon(
  PlayArrowData,
  'PlayArrow',
  false
)