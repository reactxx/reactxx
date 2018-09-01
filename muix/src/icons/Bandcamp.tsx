import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const BandcampData = 'M22,6L15.5,18H2L8.5,6H22Z'
export default createSvgIcon(
  BandcampData,
  'Bandcamp',
  true
)