import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const NotificationClearAllData = 'M5,13H19V11H5M3,17H17V15H3M7,7V9H21V7'
export default createSvgIcon(
  NotificationClearAllData,
  'NotificationClearAll',
  true
)