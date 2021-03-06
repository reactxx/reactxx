import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const GlassMugData = 'M10,4V7H18V4H10M8,2H20L21,2V3L20,4V20L21,21V22H20L8,22H7V21L8,20V18.6L4.2,16.83C3.5,16.5 3,15.82 3,15V8C3,6.9 3.9,6 5,6H8V4L7,3V2H8M5,15L8,16.39V8H5V15Z'
export default createSvgIcon(
  GlassMugData,
  'GlassMug',
  true
)