import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ApplicationData = 'M19,4C20.11,4 21,4.9 21,6V18C21,19.1 20.1,20 19,20H5C3.89,20 3,19.1 3,18V6C3,4.9 3.9,4 5,4H19M19,18V8H5V18H19Z'
export default createSvgIcon(
  ApplicationData,
  'Application',
  true
)