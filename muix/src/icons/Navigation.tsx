import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const NavigationData = 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z'
export default createSvgIcon(
  NavigationData,
  'Navigation',
  false
)