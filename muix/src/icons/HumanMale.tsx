import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const HumanMaleData = 'M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M10.5,7H13.5C14.6,7 15.5,7.9 15.5,9V14.5H14V22H10V14.5H8.5V9C8.5,7.9 9.4,7 10.5,7Z'
export default createSvgIcon(
  HumanMaleData,
  'HumanMale',
  true
)