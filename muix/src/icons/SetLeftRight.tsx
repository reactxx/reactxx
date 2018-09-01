import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const SetLeftRightData = 'M9,5C10.04,5 11.06,5.24 12,5.68C12.94,5.24 13.96,5 15,5C18.87,5 22,8.13 22,12C22,15.87 18.87,19 15,19C13.96,19 12.94,18.76 12,18.32C11.06,18.76 10.04,19 9,19C5.13,19 2,15.87 2,12C2,8.13 5.13,5 9,5M9,12C9,14.22 10.21,16.16 12,17.2C13.79,16.16 15,14.22 15,12C15,9.78 13.79,7.84 12,6.8C10.21,7.84 9,9.78 9,12Z'
export default createSvgIcon(
  SetLeftRightData,
  'SetLeftRight',
  true
)