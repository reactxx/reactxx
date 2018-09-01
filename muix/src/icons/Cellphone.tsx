import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CellphoneData = 'M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.1 5.9,23 7,23H17C18.1,23 19,22.1 19,21V3C19,1.89 18.1,1 17,1Z'
export default createSvgIcon(
  CellphoneData,
  'Cellphone',
  true
)