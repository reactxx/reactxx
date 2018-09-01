import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TriangleOutlineData = 'M12,2L1,21H23M12,6L19.53,19H4.47'
export default createSvgIcon(
  TriangleOutlineData,
  'TriangleOutline',
  true
)