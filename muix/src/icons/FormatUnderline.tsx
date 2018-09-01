import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FormatUnderlineData = 'M5,21H19V19H5V21M12,17C15.31,17 18,14.31 18,11V3H15.5V11C15.5,12.93 13.93,14.5 12,14.5C10.07,14.5 8.5,12.93 8.5,11V3H6V11C6,14.31 8.69,17 12,17Z'
export default createSvgIcon(
  FormatUnderlineData,
  'FormatUnderline',
  true
)