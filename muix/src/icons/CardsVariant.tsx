import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CardsVariantData = 'M5,2H19C19.55,2 20,2.45 20,3V13C20,13.55 19.55,14 19,14H5C4.45,14 4,13.55 4,13V3C4,2.45 4.45,2 5,2M6,4V12H18V4H6M20,17C20,17.55 19.55,18 19,18H5C4.45,18 4,17.55 4,17V16H20V17M20,21C20,21.55 19.55,22 19,22H5C4.45,22 4,21.55 4,21V20H20V21Z'
export default createSvgIcon(
  CardsVariantData,
  'CardsVariant',
  true
)