import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const LogoutData = 'M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2C14.1,2 15,2.9 15,4V8H13V4H4V20H13V16H15V20C15,21.1 14.1,22 13,22H4C2.9,22 2,21.1 2,20V4C2,2.9 2.9,2 4,2H13Z'
export default createSvgIcon(
  LogoutData,
  'Logout',
  true
)