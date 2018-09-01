import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PlusData = 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
export default createSvgIcon(
  PlusData,
  'Plus',
  true
)