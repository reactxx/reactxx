import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FileMusicData = 'M13,9H18.5L13,3.5V9M6,2H14L20,8V20C20,21.1 19.1,22 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M9,16C7.9,16 7,16.9 7,18C7,19.1 7.9,20 9,20C10.1,20 11,19.1 11,18V13H14V11H10V16.27C9.71,16.1 9.36,16 9,16Z'
export default createSvgIcon(
  FileMusicData,
  'FileMusic',
  true
)