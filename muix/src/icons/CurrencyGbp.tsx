import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CurrencyGbpData = 'M6,21V19C10,17 9.5,13 9.5,13H7V11H9.5C8.5,6.5 10,3 14,3C16,3 17,3.5 17,3.5V5.5C11,3.5 11,8 11.5,11H16V13H11.5C11.5,13 12,17 9.5,19H18V21H6Z'
export default createSvgIcon(
  CurrencyGbpData,
  'CurrencyGbp',
  true
)