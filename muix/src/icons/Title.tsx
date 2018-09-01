import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TitleData = 'M5 4v3h5.5v12h3V7H19V4z'
export default createSvgIcon(
  TitleData,
  'Title',
  false
)