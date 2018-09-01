import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const LedOutlineData = 'M12,6C9.79,6 8,7.79 8,10V16H6V18H9V23H11V18H13V23H15V18H18V16H16V10C16,7.79 14.21,6 12,6M12,8C13.1,8 14,8.9 14,10V15H10V10C10,8.9 10.9,8 12,8Z'
export default createSvgIcon(
  LedOutlineData,
  'LedOutline',
  true
)