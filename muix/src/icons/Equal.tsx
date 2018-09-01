import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const EqualData = 'M19,10H5V8H19V10M19,16H5V14H19V16Z'
export default createSvgIcon(
  EqualData,
  'Equal',
  true
)