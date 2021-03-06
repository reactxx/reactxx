import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const MusicBoxOutlineData = 'M16,9H13V14.5C13,15.88 11.88,17 10.5,17C9.12,17 8,15.88 8,14.5C8,13.12 9.12,12 10.5,12C11.07,12 11.58,12.19 12,12.5V7H16V9M19,3C20.1,3 21,3.9 21,5V19C21,20.1 20.1,21 19,21H5C3.9,21 3,20.1 3,19V5C3,3.9 3.9,3 5,3H19M5,5V19H19V5H5Z'
export default createSvgIcon(
  MusicBoxOutlineData,
  'MusicBoxOutline',
  true
)