import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const RewindOutlineData = 'M10,9.9L7,12L10,14.1V9.9M19,9.9L16,12L19,14.1V9.9M12,6V18L3.5,12L12,6M21,6V18L12.5,12L21,6Z'
export default createSvgIcon(
  RewindOutlineData,
  'RewindOutline',
  true
)