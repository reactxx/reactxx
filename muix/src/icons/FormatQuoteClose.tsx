import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FormatQuoteCloseData = 'M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z'
export default createSvgIcon(
  FormatQuoteCloseData,
  'FormatQuoteClose',
  true
)