import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const AppleKeyboardOptionData = 'M3,4H9.11L16.15,18H21V20H14.88L7.84,6H3V4M14,4H21V6H14V4Z'
export default createSvgIcon(
  AppleKeyboardOptionData,
  'AppleKeyboardOption',
  true
)