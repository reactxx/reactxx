import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const ChurchData = 'M11,2H13V4H15V6H13V9.4L22,13V15L20,14.2V22H14V17C14,15.9 13.1,15 12,15C10.9,15 10,15.9 10,17V22H4V14.2L2,15V13L11,9.4V6H9V4H11V2M6,20H8V15L7,14L6,15V20M16,20H18V15L17,14L16,15V20Z'
export default createSvgIcon(
  ChurchData,
  'Church',
  true
)