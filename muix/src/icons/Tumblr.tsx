import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TumblrData = 'M17,11H13V15.5C13,16.44 13.28,17 14.5,17H17V21C17,21 15.54,21.05 14.17,21.05C10.8,21.05 9.5,19 9.5,16.75V11H7V7C10.07,6.74 10.27,4.5 10.5,3H13V7H17'
export default createSvgIcon(
  TumblrData,
  'Tumblr',
  true
)