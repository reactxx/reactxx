import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CurrencyTwdData = 'M3,11H21V13H15V19H21V21H15C13.9,21 13,20.1 13,19V13H10.35L5.73,21L4,20L8.04,13H3V11M5,3H19V5H5V3Z'
export default createSvgIcon(
  CurrencyTwdData,
  'CurrencyTwd',
  true
)