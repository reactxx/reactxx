import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PlayData = 'M8,5.14V19.14L19,12.14L8,5.14Z'
export default createSvgIcon(
  PlayData,
  'Play',
  true
)