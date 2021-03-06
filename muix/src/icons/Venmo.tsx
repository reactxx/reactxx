import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const VenmoData = 'M19.5,3C20.14,4.08 20.44,5.19 20.44,6.6C20.44,11.08 16.61,16.91 13.5,21H6.41L3.56,4L9.77,3.39L11.28,15.5C12.69,13.21 14.42,9.61 14.42,7.16C14.42,5.81 14.19,4.9 13.83,4.15L19.5,3Z'
export default createSvgIcon(
  VenmoData,
  'Venmo',
  true
)