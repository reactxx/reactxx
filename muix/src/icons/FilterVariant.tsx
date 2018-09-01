import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FilterVariantData = 'M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z'
export default createSvgIcon(
  FilterVariantData,
  'FilterVariant',
  true
)