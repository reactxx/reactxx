import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TuneVerticalData = 'M5,3V12H3V14H5V21H7V14H9V12H7V3M11,3V8H9V10H11V21H13V10H15V8H13V3M17,3V14H15V16H17V21H19V16H21V14H19V3'
export default createSvgIcon(
  TuneVerticalData,
  'TuneVertical',
  true
)