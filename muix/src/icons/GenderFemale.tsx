import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const GenderFemaleData = 'M12,4C15.31,4 18,6.69 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10C6,6.69 8.69,4 12,4M12,6C9.79,6 8,7.79 8,10C8,12.21 9.79,14 12,14C14.21,14 16,12.21 16,10C16,7.79 14.21,6 12,6Z'
export default createSvgIcon(
  GenderFemaleData,
  'GenderFemale',
  true
)