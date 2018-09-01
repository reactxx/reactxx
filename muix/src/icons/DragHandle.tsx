import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const DragHandleData = 'M20 9H4v2h16V9zM4 15h16v-2H4v2z'
export default createSvgIcon(
  DragHandleData,
  'DragHandle',
  false
)