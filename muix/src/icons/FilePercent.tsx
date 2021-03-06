import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FilePercentData = 'M14,2L20,8V20C20,21.1 19.1,22 18,22H6C4.9,22 4,21.1 4,20V4C4,2.9 4.9,2 6,2H14M7.37,20L15,12.35L13.65,11L6,18.65L7.37,20M13,9H18.5L13,3.5V9M7.5,11C6.67,11 6,11.67 6,12.5C6,13.33 6.67,14 7.5,14C8.33,14 9,13.33 9,12.5C9,11.67 8.33,11 7.5,11M13.5,17C12.67,17 12,17.67 12,18.5C12,19.33 12.67,20 13.5,20C14.33,20 15,19.33 15,18.5C15,17.67 14.33,17 13.5,17Z'
export default createSvgIcon(
  FilePercentData,
  'FilePercent',
  true
)