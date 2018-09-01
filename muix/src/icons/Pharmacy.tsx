import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PharmacyData = 'M16,14H13V17H11V14H8V12H11V9H13V12H16M21,5H18.35L19.5,1.85L17.15,1L15.69,5H3V7L5,13L3,19V21H21V19L19,13L21,7V5Z'
export default createSvgIcon(
  PharmacyData,
  'Pharmacy',
  true
)