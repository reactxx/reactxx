import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PlayPauseData = 'M3,5V19L11,12M13,19H16V5H13M18,5V19H21V5'
export default createSvgIcon(
  PlayPauseData,
  'PlayPause',
  true
)