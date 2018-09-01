import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const NearMeData = 'M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z'
export default createSvgIcon(
  NearMeData,
  'NearMe',
  false
)